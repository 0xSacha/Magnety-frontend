import React, { PropsWithChildren, useEffect, useState } from "react";
import Navbar from "./Navbar";
import { getStarknet } from "../starknetWrapper";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { setAccount, selectCount, increment } from "../app/counterSlice";
import Profile from "./Profile";
import Image from "next/image";
import {
  Button,
  ButtonGroup,
  Flex,
  Text,
  Input,
  Spacer,
  Select,
  Box,
} from "@chakra-ui/react";
import { starknetKeccak } from "starknet/dist/utils/hash";
import Link from "next/link";
import { contractAddress } from "~/registry/address";


import Twitter from "../image/twitter.svg";
import Discord from "../image/discord.svg";
import Linkedin from "../image/linkedin.svg";
import Medium from "../image/medium.svg";
import Notion from "../image/notion.svg";
import { hexToDecimalString } from "starknet/dist/utils/number";
import process from "process";

type fundInfo = {
  image: string;
  name: string;
  address: string;
}[];



const Layout = (props: PropsWithChildren<unknown>) => {
  const dispatch = useAppDispatch();
  let count = useAppSelector(selectCount);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  let [address, setAddress] = useState("connect wallet");
  const [userInfo, setUserInfo] = useState<any>(undefined);
  const [userFundInfo, setUserFundInfo] = useState<fundInfo>([]);
  const [userFundAmount, setUserFundAmount] = useState<number>(-1);
  const { provider } = getStarknet();
  const [showFunds, setShowFunds] = useState(false);

  async function getUserInfo() {
    const res = await fetch(process.env.URL + `api/user/` + address);

    if (res.status == 200) {
      const { data } = await res.json();
      setUserInfo(data);
    } else {
    }
  }

  async function getFundInfo(address: string, amount: number) {
    let currentFundInfo = userFundInfo
    const res = await fetch(process.env.URL + `api/contract/` + address);
    if (res.status == 200) {
      const { data } = await res.json();
      currentFundInfo.push(
        {
          image: data.image,
          name: data.name,
          address: address,
        }
      )
      setUserFundInfo(data);
    } else {
      currentFundInfo.push(
        {
          image: "",
          name: address.substring(0, 5),
          address: address,
        }
      )
    }
    setUserFundInfo(currentFundInfo)

    if (currentFundInfo.length == amount) {
      setShowFunds(true)
    }
  }

  useEffect(() => {
    if (address !== "connect wallet") {
      getUserInfo();
      const res = provider.callContract({
        contractAddress: contractAddress.VaultFactory,
        entrypoint: "getUserVaultAmount",
        calldata: [hexToDecimalString(address)],
      });
      res
        .then((value) => {
          const amount = parseFloat(hexToDecimalString(value.result[0]))
          setUserFundAmount(amount)
          for (let index = 0; index < amount; index++) {
            const res2 = provider.callContract({
              contractAddress: contractAddress.VaultFactory,
              entrypoint: "getUserVault",
              calldata: [
                hexToDecimalString(address),
                index.toString()
              ],
            });
            res2
              .then((value) => {
                getFundInfo(value.result[0], amount)

              }).catch((err) => {
                console.log(err);
              });

          }
        }
        )
        .catch((err) => {
          console.log(err);
        });
    }

  }, [address]);

  useEffect(() => {
    const connectWalletOnPageLoad = async () => {
      if (localStorage?.getItem("isWalletConnected") === "true") {
        onClick();
      }
    };
    // localStorage.setItem('isWalletConnected', "false")
    connectWalletOnPageLoad();
  }, []);

  const onClick = () => {
    const starkNet = getStarknet();
    let mod = true;
    if (localStorage?.getItem("isWalletConnected") === "true") {
      mod = false;
    }
    starkNet.enable({ showModal: mod }).then((value) => {
      if (value.length == 0) {
        console.log("no address detected");
      } else {
        setAddress(value[0]);
        localStorage.setItem("isWalletConnected", "true");
        dispatch(increment());
        setIsConnected(true);
      }
    });
  };

  function ConnectWallet() {
    return (
      <div className="App">
        <Button padding={"5px"} borderRadius={"15px"} backgroundColor={"#f6643c"} onClick={onClick} width={"100%"}>
          {" "}
          connect
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="page">
        <Navbar />
        <div className="page__wrapper">
          <div className="page__backdrop" />
          <div className="page__content">{props.children}</div>
        </div>
        <div
          className={`page__sidebar_wrapper ${isSidebarOpen ? "page__sidebar_open" : ""
            }`}
        >
          <div className="page__sidebar">
            {!isSidebarOpen && !isConnected && (
              <Flex direction={"column"} gap={"2vh"}>
                <Flex direction={"column"} textAlign="center" gap={"2vh"}>
                  <Text fontWeight={"bold"} fontSize={"1xl"}>
                    Welcome to Magnety
                  </Text>
                  <Text fontWeight={"light"} fontSize={"0.75rem"}>
                    please connect you wallet to access the full
                    fonctionnalities
                  </Text>


                </Flex>
                <ConnectWallet />
              </Flex>
            )}
            {!isSidebarOpen && isConnected && (
              <>
                <Flex direction={"column"} gap={"2vh"} alignItems={"center"} justifyContent={"center"}>
                  {userInfo == undefined ? (
                    <Flex direction={"column"} textAlign="center" gap={"2vh"}>
                      <Text fontWeight={"bold"} fontSize={"1xl"}>
                        Welcome to Magnety
                      </Text>
                      <Text fontWeight={"light"} fontSize={"0.75rem"}>
                        customize your profile and start the adventure!{" "}
                      </Text>
                      <Button padding={"5px"} borderRadius={"15px"} backgroundColor={"#f6643c"}>
                        <Link href={`/user/${address}`}> My profile</Link></Button>
                    </Flex>
                  ) : (
                    <Flex direction={"column"} alignItems={"center"} justifyContent={"center"} gap={"15px"}>
                      {/* <Text fontWeight={"bold"} fontSize={"1.5rem"}>
                      GM 
                    </Text> */}
                      <Button padding={"5px"} borderRadius={"15px"} border={"solid 1px #f6643c"}>
                        <Link href={`/user/${address}`}>
                          <Flex direction={"row"} gap={"7px"} alignItems={"center"}>
                            <Box
                              style={{
                                width: "40px",
                                height: "40px",
                                borderRadius: "50%",
                                overflow: "hidden",
                                backgroundColor: "black",
                              }}
                            >
                              <img
                                src={userInfo.profilePic}
                                style={{ objectFit: "cover" }}
                              />
                            </Box>
                            <Text fontWeight={"semibold"} fontSize={"1.25rem"}>
                              {userInfo.name}
                            </Text>
                          </Flex>
                        </Link>
                      </Button>
                    </Flex>
                  )}

                  {/* <Button>
                    <Link href={`/user/${address}`}>
                      <Box
                        backgroundColor={"#f6643c"}
                        padding={"0.8vh"}
                        borderRadius={"10px"}
                        alignItems={"center"}
                      >
                        <Text fontWeight={"bold"}>My profile</Text>
                      </Box>
                    </Link>
                  </Button> */}
                  <Spacer />
                  <Spacer />
                  <Flex
                    direction={"column"}
                    alignItems={"center"}
                    width={"100%"}
                    gap={"18px"}
                  >
                    <Flex direction={"row"} gap={"7px"}>
                      <Text> Global Performance</Text>
                      <Text fontWeight={"bold"}>--%</Text>
                    </Flex>
                    <Flex
                      direction={"row"}
                      justifyContent={"space-between"}
                      width={"90%"}
                      alignItems={"center"}
                    >
                      <Flex
                        direction={"column"}
                        alignItems={"center"}
                        gap={"5px"}
                      >
                        <Text
                          fontWeight={"100"}
                          fontSize={"0.9rem"}
                          color={"#f6643c"}
                        >
                          Daily
                        </Text>
                        <Text fontWeight={"bold"}>--%</Text>
                      </Flex>
                      <Flex
                        direction={"column"}
                        alignItems={"center"}
                        gap={"5px"}
                      >
                        <Text
                          fontWeight={"100"}
                          fontSize={"0.9rem"}
                          color={"#f6643c"}
                        >
                          Weekly
                        </Text>
                        <Text fontWeight={"bold"}>--%</Text>
                      </Flex>
                      <Flex
                        direction={"column"}
                        alignItems={"center"}
                        gap={"5px"}
                      >
                        <Text
                          fontWeight={"100"}
                          fontSize={"0.9rem"}
                          color={"#f6643c"}
                        >
                          Monthly
                        </Text>
                        <Text fontWeight={"bold"}>--%</Text>
                      </Flex>
                    </Flex>
                  </Flex>
                  <Spacer />
                  <Spacer />
                  {userFundAmount == -1 ?
                    <Text>Fetching your funds</Text>
                    :
                    userFundAmount > 0 ?
                      <Flex direction={"column"}>
                        <Text fontWeight={"bold"}>
                          You are managing {userFundAmount} funds
                        </Text>
                        {showFunds == true ?
                          <Flex direction={"column"} overflowY={"scroll"} maxHeight={"120px"} padding={"15px"} gap={"7px"}>
                            {userFundInfo.map((p, index) => (
                              <Button padding={"3px"} borderRadius={"15px"} border={"solid 1px #f6643c"}>
                                <Link href={`/vault/${p.address}`}>
                                  <Flex direction={"row"} alignItems={"center"} justifyContent={"space-between"} minWidth={"120px"}>
                                    <Box
                                      style={{
                                        width: "30px",
                                        height: "30px",
                                        borderRadius: "50%",
                                        overflow: "hidden",
                                        backgroundColor: "black",
                                      }}
                                    >
                                      <img
                                        src={p.image}
                                        style={{ objectFit: "cover" }}
                                      />
                                    </Box>
                                    <Text fontWeight={"semibold"} fontSize={"0.7rem"}>
                                      {p.name.length > 10 ? `${p.name.substring(0, 10)}...` : p.name}
                                    </Text>
                                  </Flex>
                                </Link>
                              </Button>

                            ))}
                          </Flex>
                          :
                          <Text textAlign={"center"}>⌛⏳</Text>
                        }
                      </Flex>
                      :
                      <Text fontWeight={"bold"} textAlign={"center"}>
                        You are not Managing any funds
                      </Text>
                  }
                </Flex>

              </>
            )}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: "10px",
                right: "10px",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                margin: "20px 0",
              }}
            >
              <Flex direction={"row"} justifyContent={"space-between"} margin={"5%"}>
                <a href="https://twitter.com/magnetyfi" target="_blank">
                  <button className="social_button">
                    <Image src={Twitter} width="21px" height="21px"></Image>
                  </button>
                </a>
                <a href="https://magnety.notion.site/magnety/Magnety-538f55a2ee1d4a39b8ed2141beb5e383" target="_blank">
                  <button className="social_button">
                    <Image src={Notion} width="17px" height="21px"></Image>
                  </button>
                </a>
                <a href="https://discord.gg/magnety" target="_blank">
                  <button className="social_button">
                    <Image src={Discord} width="21px" height="21px"></Image>
                  </button>
                </a>
                <a href="https://medium.com/@magnety.finance" target="_blank">
                  <button className="social_button">
                    <Image src={Medium} width="21px" height="21px"></Image>
                  </button>
                </a>
              </Flex>
              <div className="fs-12 text-center">
                © 2022 - Magnety - All Rights Reserved
              </div>
              <div className="fs-12 text-center">Terms & conditions</div>
            </div>

            {/* {
              isSidebarOpen && <>
                  <Profile></Profile>
              </>
            } */}
          </div>

          {/* <div className="page__sidebar_toggler">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
            </button>
            {!isSidebarOpen && <>Expand to edit and see all your personnal informations</>}
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Layout;
