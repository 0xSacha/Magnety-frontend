import React, { PropsWithChildren, useEffect, useState } from "react";
import Navbar from "./Navbar";
import { getStarknet } from '../starknetWrapper'
import { useAppSelector, useAppDispatch } from '../app/hooks'
import {
  setAccount,
  selectCount,
  increment,
} from '../app/counterSlice'
import { IncrementCounter } from "./IncrementCounter";
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

type fundInfo = {
  image: string;
  name: string;
  address: string;
}[];





const Layout = (props: PropsWithChildren<unknown>) => {
<<<<<<< HEAD
  const dispatch = useAppDispatch()
  let count = useAppSelector(selectCount)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  let [address, setAddress] = useState("connect wallet");

=======
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
    const res = await fetch("http://localhost:3000/api/user/" + address);

    if (res.status == 200) {
      const { data } = await res.json();
      setUserInfo(data);
    } else {
    }
  }

  async function getFundInfo(address: string, amount: number) {
    let currentFundInfo = userFundInfo
    const res = await fetch("http://localhost:3000/api/contract/" + address);
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
    console.log(amount)
    console.log(currentFundInfo.length)
    if (currentFundInfo.length == amount) {
      console.log("donnnnnnne")
      setShowFunds(true)
    }
    console.log(currentFundInfo)
  }

  useEffect(() => {
    if (address !== "connect wallet") {
      getUserInfo();
      console.log(address)
      const res = provider.callContract({
        contractAddress: contractAddress.VaultFactory,
        entrypoint: "getUserVaultAmount",
        calldata: [hexToDecimalString(address)],
      });
      res
        .then((value) => {
          console.log(value)
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
                console.log(value)
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
    console.log("fff");
    console.log(address);
  }, [address]);
>>>>>>> pr/7

  useEffect(() => {
    const connectWalletOnPageLoad = async () => {
      if (localStorage?.getItem('isWalletConnected') === 'true') {
        onClick()
      }
<<<<<<< HEAD
    }
    connectWalletOnPageLoad()
  }, [])
=======
    };
    // localStorage.setItem('isWalletConnected', "false")
    connectWalletOnPageLoad();
  }, []);
>>>>>>> pr/7

  const onClick = () => {
    const starkNet = getStarknet()
    let mod = true
    if (localStorage?.getItem('isWalletConnected') === 'true') {
      mod = false
    }
<<<<<<< HEAD
    starkNet.enable({ showModal: mod }).then(value => {
      setAddress(JSON.stringify(value))
      localStorage.setItem('isWalletConnected', "true")
      dispatch(increment())
      console.log(starkNet.account)
      setIsConnected(true)
    })
  }
=======
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
>>>>>>> pr/7

  function ConnectWallet() {

    return (
      <div className="App">
        <button data-color="secondary" style={{ display: 'flex', margin: '12px auto' }} onClick={onClick}> connect</button>
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
<<<<<<< HEAD
            {!isSidebarOpen && !isConnected && <>
              <div className="fs-16 fw-700">Hello</div>
              <div className="fs-12">please connect you wallect in order to use the full fonctionnalities of Magnety </div>
              <ConnectWallet />

            </>}
            {!isSidebarOpen && isConnected && <>
              <div className="fs-16 fw-700">Hello {address.substring(2, 7)}..</div>
              <div className="fs-12">Your account is verified</div>

              <div className="fs-14 fw-600" style={{ marginTop: '43px', marginBottom: '13px' }}>Statistics</div>
              <div className="d-flex justify-content-space-around">
                <div className="d-flex-column align-items-center">
                  <div className="fs-12 fw-500">funds</div>
                  <div className="fs-14 fw-600" style={{ marginTop: '5px' }}>3</div>
                </div>
                <div>
                  <div className="fs-12 fw-500">PNL</div>
                  <div className="fs-14 fw-600" style={{ marginTop: '5px' }}>$350</div>
                </div>
              </div>

              <div className="fs-14 fw-600" style={{ marginTop: '23px', marginBottom: '6px' }}>Manage</div>
              <div className="fs-12 fw-500">Manage your funds by using the Assets Manager Interface</div>
              <button data-color="secondary" style={{ display: 'flex', margin: '8px auto' }}>Launch</button>

              <div className="fs-14 fw-600" style={{ marginTop: '31px', marginBottom: '6px' }}>Create</div>
              <div className="fs-12 fw-500">Start a new trading adventure by creating a new vault</div>
              <button data-color="secondary" style={{ display: 'flex', margin: '8px auto' }}>Create</button>
            </>}

            {
              isSidebarOpen && <>
                  <Profile></Profile>
              </>
            }
          </div>
          <div className="page__sidebar_toggler">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
            </button>
            {!isSidebarOpen && <>Expand to edit and see all your personnal informations</>}
=======
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
                <button className="social_button">
                  <Image src={Twitter} width="21px" height="21px"></Image>
                </button>
                <button className="social_button">
                  <Image src={Notion} width="17px" height="21px"></Image>
                </button>
                <button className="social_button">
                  <Image src={Discord} width="21px" height="21px"></Image>
                </button>
                <button className="social_button">
                  <Image src={Medium} width="21px" height="21px"></Image>
                </button>
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
>>>>>>> pr/7
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
