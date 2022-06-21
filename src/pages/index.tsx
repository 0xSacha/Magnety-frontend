<<<<<<< HEAD
import { useStarknetCall } from '@starknet-react/core'
import type { NextPage } from 'next'
import Link from 'next/link'
import { useMemo } from 'react'
import { toBN, hexToDecimalString } from 'starknet/dist/utils/number'
import { TransactionList } from '~/components/TransactionList'
import { useCounterContract } from '~/hooks/counter'
import { InitializeFund } from '~/components/InitializeFund'
import { useVaultContract } from '~/hooks/vault'
import { getSelectorFromName } from '../starknetWrapper'

const Home: NextPage = () => {
  const { contract: counter } = useCounterContract()
  const { contract: vaultLib } = useVaultContract()

  const { data: counterResult } = useStarknetCall({
    contract: counter,
    method: 'counter',
    args: [],
  })

  const { data: fundName } = useStarknetCall({
    contract: vaultLib,
    method: 'getName',
    args: [],
  })

  const fundNameVaue = useMemo(() => {
    if (fundName && fundName.length > 0) {
      const value = toBN(fundName[0])
      return value.toString(10)
    }
  }, [fundName])

  // const { data: sharesTotalSupply } = useStarknetCall({
  //   contract: vaultLib,
  //   method: 'sharesTotalSupply',
  //   args: [],
  // })

  // const sharesTotalSupplyValue = useMemo(() => {
  //   if (sharesTotalSupply && sharesTotalSupply.length > 0) {
  //     const value = toBN(counterResult[0])
  //     return value.toString(10)
  //   }
  // }, [sharesTotalSupply])

  const counterValue = useMemo(() => {
    if (counterResult && counterResult.length > 0) {
      const value = toBN(counterResult[0])
      return value.toString(10)
    }
  }, [counterResult])

  return (
    <div>
      <h2>Wallet</h2>
      <h2>Counter Contract</h2>
      <p>Address: {counter?.address}</p>
      <p>Value: {counterValue}</p>
      {/* <IncrementCounter /> */}
      <InitializeFund />
      <h2>VaultLib Contract</h2>
      <p>Address: {vaultLib?.address}</p>
      <p>0x02fe94b72a6eee4b24da419ba898ca2b0d994b6d0408ce93f53129f6f9df3f25</p>
      <p>{hexToDecimalString("0x02fe94b72a6eee4b24da419ba898ca2b0d994b6d0408ce93f53129f6f9df3f25")}</p>
      <p>fund Name: {fundNameVaue}</p>
      <h2>selector of runPreLogic {getSelectorFromName("runPreLogic")}</h2>
      <h2>selector of removeLiquidity {getSelectorFromName("removeLiquidity")}</h2>
      <h2>selector of swapExactTokensForTokens {getSelectorFromName("swapExactTokensForTokens")}</h2>
      <h2>selector of swap {getSelectorFromName("swap")}</h2>
      <h2>selector of swap {getSelectorFromName("swap")}</h2>
      <h2>Recent Transactions</h2>
      <TransactionList />
      {/* <DeployFund /> */}
=======
import { useStarknetCall } from "@starknet-react/core";
import type { NextPage } from "next";
import { useMemo } from "react";
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

import VDatabase from "./vault/vaults.json";

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

const AssetTab = [btc, eth, zkp, tst, ethzkp, btctst, ethtst, ethbtc]
const ProtocolTab = [alphaRoad]

const Home: NextPage = () => {

  return (
    <Box margin={"auto"} paddingTop={"5%"} gap={"200px"}>
      <Flex
        direction={"row"}
        flexWrap={"wrap"}
        width={"100%"}
        justifyContent={"space-evenly"}
        alignItems={"center"}

      >
        <Flex direction={"column"} gap={"8vh"} width={"45%"}>
          <Flex flexWrap={"wrap"} gap={"12px"}>
            <Text fontWeight={"bold"} fontSize={"3rem"}>Discover / Monetize </Text><Text color={"#f6643c"} fontWeight={"bold"} fontSize={"3rem"}>Extraordinary</Text> <Text fontWeight={"bold"} fontSize={"3rem"}>DeFi strategies</Text>
          </Flex>
          <Flex direction={"row"} gap={"8vh"} alignItems={"center"}>
            <Flex gap={"1vh"} direction={"column"} width={"40%"} alignItems={"justify"}>
              <Text fontSize={"25px"} fontWeight={"semibold"}>
                Too Busy?<br></br>
              </Text>
              <Text fontSize={"13px"} textAlign={"justify"}>
                get connected with qualificated asset managers, save both time and money
              </Text>
              <Button backgroundColor={"#f6643c"} width={"120px"}>
                <Link href={`/marketplace`} padding={"10px"}>


                  <Text fontWeight={"bold"}>Explore</Text>

                </Link>
              </Button>
            </Flex>
            <Flex gap={"1vh"} direction={"column"} width={"40%"} alignItems={"justify"}>
              <Text fontSize={"25px"} fontWeight={"semibold"}>
                Too Pro?<br></br>
              </Text>
              <Text fontSize={"13px"} textAlign={"justify"}>
                Deploy a new Fund and monetize your investment strategy
              </Text>
              <Button backgroundColor={"#f6643c"} width={"120px"}>
                <Link href={`/contract`} padding={"10px"}>

                  <Text fontWeight={"bold"}>Create</Text>

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
      <Flex direction={"row"} justifyContent={"space-evenly"} marginTop={"8vh"}  marginBottom={"5vh"} padding={"2vh"}>
        <Flex direction={"column"} justifyContent={"space-evenly"} gap={"20px"}>
          <Box
            backgroundColor={"#0f0b1f"}
            style={{ borderRadius: "10px" }}
            borderTop={"solid 2px #f6643c"}
            borderBottom={"solid 2px #f6643c"}
            padding={"20px"}
          >
            <Flex direction={"column"}>
              <Text fontSize={"3xl"}>
                Total Funds created
              </Text>
              <Text fontWeight={"bold"} fontSize={"5xl"}>
                56
              </Text>
            </Flex>
          </Box>
          <Box
            backgroundColor={"#0f0b1f"}
            style={{ borderRadius: "10px" }}
            borderTop={"solid 2px #f6643c"}
            borderBottom={"solid 2px #f6643c"}
            padding={"20px"}
          >
            <Flex direction={"column"}>
              <Text fontSize={"3xl"}>
                Avergare APRs
              </Text>
              <Text fontWeight={"bold"} fontSize={"5xl"}>
                12%
              </Text>
            </Flex>
          </Box>
        </Flex>
        <Box
          backgroundColor={"#0f0b1f"}
          style={{ borderRadius: "10px" }}
          borderTop={"solid 2px #f6643c"}
          borderBottom={"solid 2px #f6643c"}
          padding={"20px"}
          width={"30%"}
        >
          <Flex direction={"column"}>
            <Text fontSize={"3xl"}>
              {AssetTab.length} Token Supported
            </Text>
            <Flex overflowY={"scroll"} padding={"15px"} gap={"20px"} flexWrap={"wrap"} maxHeight={"200px"}>
              {AssetTab.map((p, index) => (
                <Box width={"23%"}>
                  <Image src={p} />
                </Box>
              ))}

            </Flex>
          </Flex>
        </Box>
        <Box
          backgroundColor={"#0f0b1f"}
          style={{ borderRadius: "10px" }}
          borderTop={"solid 2px #f6643c"}
          borderBottom={"solid 2px #f6643c"}
          padding={"20px"}
          width={"30%"}
        >
          <Flex direction={"column"}>
            <Text fontSize={"3xl"} >
              {ProtocolTab.length} Protocol supported
            </Text>
            <Flex overflowY={"scroll"} padding={"15px"} gap={"20px"} flexWrap={"wrap"} maxHeight={"200px"}>
              {ProtocolTab.map((p, index) => (
                <Box width={"23%"}>
                  <Image src={p} />
                </Box>
              ))}

            </Flex>
          </Flex>
        </Box>

      </Flex>
    </Box>
  );
};
>>>>>>> pr/7

    </div>
  )
}

export default Home

