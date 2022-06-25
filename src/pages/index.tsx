import { useStarknetCall } from "@starknet-react/core";
import type { NextPage } from "next";
import { useMemo } from "react";
import React, { useEffect } from "react";
import { ContractInfo } from "../utils/type";

import { toBN, hexToDecimalString } from "starknet/dist/utils/number";
import { TransactionList } from "~/components/TransactionList";
import { InitializeFund } from "~/components/InitializeFund";
import { useVaultContract } from "~/hooks/vault";
import { getSelectorFromName } from "../starknetWrapper";
import clientPromise from "../lib/mongodb";
import Image from "next/image";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Link,
  Text,
} from "@chakra-ui/react";

import neon from "../image/logo_neon.png"

import VDatabase from "./vault/vaults.json";
import { getStarknet, AccountInterface } from "../starknetWrapper";
import { contractAddress } from "~/registry/address";

import btc from "../image/BTC.png";
import eth from "../image/ETH.png";
import zkp from "../image/ZKP.png";
import tst from "../image/TST.svg";
import alphaRoad from "../image/alphaRoad.jpg";
import ethzkp from "../image/ETH-ZKP.png";
import btctst from "../image/BTC-TST.png";
import ethtst from "../image/ETH-TST.png";
import ethbtc from "../image/ETH-BTC.png";
import { Asset } from "~/registry/tokenSupported";
import { GiRadiations } from "react-icons/gi";

// const [userFundInfo, setUserFundInfo] = useState<fundInfo[]>([]);
const AssetTab = [btc, eth, zkp, tst, ethzkp, btctst, ethtst, ethbtc]
const ProtocolTab = [alphaRoad]


const Home: NextPage = () => {
  const [vaultAmount, setVaultAmount] = React.useState<string>("");
  const { provider, account } = getStarknet();
  const [userFundInfo, setUserFundInfo] = React.useState<fundInfo>([]);
  const [vaultInfo, setVaultInfo] = React.useState<ContractInfo[]>();

  useEffect(() => {
    const res1 = provider.callContract({
      contractAddress: contractAddress.VaultFactory,
      entrypoint: "getVaultAmount",
      calldata: [],
    });
    res1
      .then((value) => {
        const vaultAmount_ = (hexToDecimalString(value.result[0]));
        setVaultAmount(vaultAmount_)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  // const [showFunds, setShowFunds] = useState(false);
  useEffect(() => {
    loadData()
  }, []);

  const loadData = async () => {
    const res = await fetch(
      process.env.URL + `api/contract/`
    );
    if (res.status == 200) {
      await res.json().then((data) =>
        setVaultInfo(data)
      );
    } else {

    }
  };
  return (
    <Box margin={"auto"} gap={"200px"} padding={"5%"}>
      <Flex
        direction={"row"}
        flexWrap={"wrap"}
        width={"100%"}
        justifyContent={"space-evenly"}
      // alignItems={"center"}

      >


        <Flex direction={"column"} gap={"3vh"} width={"40%"}>
          <Flex flexWrap={"wrap"} gap={"12px"}>
            <Text fontWeight={"bold"} fontSize={"3rem"}>Discover </Text><Text color={"#f6643c"} fontWeight={"bold"} fontSize={"3rem"}>Extraordinary</Text> <Text fontWeight={"bold"} fontSize={"3rem"}>DeFi strategies</Text>
          </Flex>
          <Text fontWeight={"semibold"} fontSize={"1.5rem"}>
            Magnty push your asset management to the next level, currently in version ⍺
          </Text>
          <Flex >

            <Flex gap={"1vh"} direction={"row"}>
              <Button backgroundColor={"#00318973"} padding={"25px"}>
                <Link href={`/marketplace`} padding={"10px"}>
                  <Flex>
                    <Text fontWeight={"bold"} fontSize={"2xl"} >Delegate</Text>
                  </Flex>
                </Link>
              </Button>

              <Button backgroundColor={"#f6643c"} padding={"25px"}>
                <Link href={`/create`} padding={"10px"}>

                  <Text fontWeight={"bold"} fontSize={"2xl"} >Monetize</Text>

                </Link>
              </Button>
            </Flex>

          </Flex>
        </Flex>
        <Link href={"/vault/"}>
          <Box
            className={` bg__dotted`}
            padding={"10px"}
            style={{ borderRadius: "10px" }}
          >
            <Box
              backgroundColor={"#0f0b1f"}
              style={{ borderRadius: "10px" }}
              borderTop={"solid 2px #f6643c"}
              borderBottom={"solid 2px #f6643c"}
            >
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <div style={{ width: "25%", float: "left" }}>
                  <div
                    style={{
                      width: "60px",
                      height: "60px",
                      margin: "10px",
                      borderRadius: "50%",
                      background: "black",
                    }}
                  ></div>
                </div>
                <div style={{ width: "40%", float: "left" }}>
                  <Text fontSize={"2xl"} fontWeight={"bold"}>
                    FlexFund
                  </Text>
                  <Flex gap={"3px"}>
                    {[
                      ...Array(
                        Object.keys(VDatabase["0x738bb79798127c6d026013b4067a20694a091ddde9b69e36b0a384c9b94610f"].tags).length
                      ),
                    ].map((e, i) => {
                      return (
                        <Text
                          fontSize={"0.8rem"}
                          fontWeight={"light"}
                        >
                          {"#" + VDatabase["0x738bb79798127c6d026013b4067a20694a091ddde9b69e36b0a384c9b94610f"].tags[i]}
                        </Text>
                      );
                    })}
                  </Flex>
                </div>
                <div style={{ width: "35%", float: "left" }}></div>
              </div>

              <div
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    width: "60%",
                    float: "left",
                    paddingLeft: "10px",
                  }}
                >
                  <p>Value Managed :</p>
                  <p>Risk Factor :</p>
                </div>
                <div style={{ width: "40%", float: "left" }}>
                  <p>APR :</p>
                  <p>REWARDS :</p>
                </div>
              </div>
            </Box>
          </Box>
        </Link>
      </Flex>
      <Flex direction={"row"} justifyContent={"space-evenly"} marginTop={"14vh"} padding={"2vh"}>
        <Flex direction={"column"} justifyContent={"space-evenly"} gap={"20px"}>
          <Box
            className={` bg__dotted`}
            style={{ borderRadius: "10px" }}
            borderTop={"solid 2px #f6643c"}
            borderBottom={"solid 2px #f6643c"}
            padding={"20px"}
          >
            <Flex direction={"column"}>
              <Text fontSize={"3xl"} color={"whiteAlpha"} fontWeight='extrabold'>
                Total Funds created
              </Text>
              <Text fontWeight={"bold"} fontSize={"4xl"} color={"#f6643cbb"}>
                {vaultAmount ? vaultAmount : ""}
              </Text>
            </Flex>
          </Box>
          <Box
            backgroundColor={"#f6643c"}
            style={{ borderRadius: "10px" }}
            borderTop={"solid 2px #f6643c"}
            borderBottom={"solid 2px #f6643c"}
            padding={"20px"}
          >
            <Flex direction={"column"}>
              <Text fontSize={"3xl"} color={"whiteAlpha"} fontWeight='extrabold'>
                Total Value Locked
              </Text>
              <Text fontWeight={"bold"} fontSize={"4xl"} color={"whiteAlpha"}>
                12.236 ETH
              </Text>
            </Flex>
          </Box>
        </Flex>
        <Box
          className={` bg__dotted`}
          style={{ borderRadius: "10px" }}
          borderTop={"solid 2px #f6643c"}
          borderBottom={"solid 2px #f6643c"}
          padding={"20px"}
          width={"30%"}
        >
          <Flex direction={"column"} gap={"25px"}>
            <Flex direction={"column"}>
              <Text fontSize={"3xl"} color={"whiteAlpha"} fontWeight='extrabold'>
                {AssetTab.length} Token Supported
              </Text>
              <Flex overflowY={"scroll"} padding={"15px"} gap={"20px"} flexWrap={"wrap"} maxHeight={"100px"}>
                {AssetTab.map((p, index) => (
                  <Box width={"10%"}>
                    <Image src={p} />
                  </Box>
                ))}

              </Flex>
            </Flex>
            <Flex direction={"column"}>
              <Text fontSize={"3xl"} color={"whiteAlpha"} fontWeight='extrabold'>
                {ProtocolTab.length} Protocol supported
              </Text>
              <Flex overflowY={"scroll"} padding={"15px"} gap={"20px"} flexWrap={"wrap"} maxHeight={"100px"}>
                {ProtocolTab.map((p, index) => (
                  <Box width={"10%"}>
                    <Image src={p} />
                  </Box>
                ))}

              </Flex>
            </Flex>
          </Flex>
        </Box>
        <Box
          className={` bg__dotted`}
          style={{ borderRadius: "10px" }}
          borderLeft={"solid 2px #f6643c"}
          borderRight={"solid 2px #f6643c"}
          padding={"20px"}
          width={"30%"}
        >
          <Flex direction={"column"} gap={"2vh"}>
            <Text fontSize={"3xl"} color={"whiteAlpha"} fontWeight='extrabold'>
              Last funds created
            </Text>
            {vaultInfo && vaultInfo.map((vault, index) => (
              <Link href={`/vault/${vault.fundAddress}`}>
                <Flex
                  justifyContent={"space-between"}
                  alignItems={"center"}
                >
                  <Box
                    style={{
                      width: "60px",
                      height: "60px",
                      borderRadius: "50%",
                      overflow: "hidden",
                      backgroundColor: "black",
                    }}
                  >
                    <img
                      src={vault.image}
                      style={{ objectFit: "cover" }}
                    />
                  </Box>
                  <div>{vault.name}</div>
                </Flex>
              </Link>

            ))}
          </Flex>

        </Box>

        {/* <Box
          className={` bg__dotted`}
          style={{ borderRadius: "10px" }}
          borderRight={"solid 2px #f6643c"}
          borderLeft={"solid 2px #f6643c"}
          padding={"20px"}
          width={"30%"}
        >
          <Flex direction={"column"} gap={"25px"}>
            <Flex direction={"column"}>
              <Text fontSize={"3xl"} color={"whiteAlpha"} fontWeight='extrabold'>
                Last funds created
              </Text>
              {showFunds == false ? (
                <Text>Fetching Funds</Text>
              ) : (
                <div>
                  {userFundInfo != [] ? userFundInfo.map((vault, index) => (
                    <Link href={`/vault/${vault.address}`}>
                      <Flex
                        justifyContent={"space-between"}
                        alignItems={"center"}
                      >
                        <Box
                          style={{
                            width: "60px",
                            height: "60px",
                            borderRadius: "50%",
                            overflow: "hidden",
                            backgroundColor: "black",
                          }}
                        >
                          <img
                            src={vault.image}
                            style={{ objectFit: "cover" }}
                          />
                        </Box>
                        <div>{vault.name}</div>
                      </Flex>
                    </Link>
                  ))
                    :
                    <Text>⌛</Text>}
                </div>
              )}
            </Flex>
          </Flex>
        </Box> */}

      </Flex>
    </Box>
  );
};

export default Home;
