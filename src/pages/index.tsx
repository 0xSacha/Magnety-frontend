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
  Stack,
} from "@chakra-ui/react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

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
import moment from "moment";

// const [userFundInfo, setUserFundInfo] = useState<fundInfo[]>([]);
const AssetTab = [btc, eth, zkp, tst, ethzkp, btctst, ethtst, ethbtc]
const ProtocolTab = [alphaRoad]


const Home: NextPage = () => {
  const [vaultAmount, setVaultAmount] = React.useState<string>("");
  const { provider, account } = getStarknet();
  const [vaultInfo, setVaultInfo] = React.useState<ContractInfo[]>();
  const [vaultInfoStakingVault, setVaultInfoStakingVault] = React.useState<ContractInfo>();

  const dateFormatter = (date) => {
    // return moment(date).unix();

    return moment(date).format("L");

  };

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
    loadDataStaking()
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

  const loadDataStaking = async () => {
    const res = await fetch(
      process.env.URL + `api/contract/0x3acdb97d5fc69eeb39ba3517754372c88ccdcc8563d7c49636fde0b0a8f93da`
    );
    if (res.status == 200) {
      await res.json().then((data) =>

        setVaultInfoStakingVault(data.data)
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
        alignItems={"center"}

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
        {vaultInfoStakingVault !== undefined &&
          <Link href={"/vault/" + vaultInfoStakingVault.fundAddress} width={"35%"} style={{ textDecoration: "none" }}>
            {console.log(vaultInfoStakingVault)}

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
                padding={"3vh"}
              >

                <Flex
                  width={"100%"}
                  direction={"column"}
                  justifyContent={"center"}
                  gap={"2vh"}
                >
                  <Flex direction={"row"} alignItems={"center"} justifyContent={"space-between"}>

                    <Box
                      style={{
                        width: "100px",
                        height: "100px",
                        borderRadius: "50%",
                        overflow: "hidden",
                        backgroundColor: "black",
                      }}
                    >
                      <img
                        src={vaultInfoStakingVault?.image}
                        style={{ objectFit: "cover" }}
                      />
                    </Box>

                    <Flex direction={"column"} alignItems={"center"}>
                      <Text fontSize={"3xl"} fontWeight={"bold"}>
                        {vaultInfoStakingVault?.name}
                      </Text>


                      <Stack direction={"row"}>
                        {[...Array(Object.keys(vaultInfoStakingVault.tags).length)].map(
                          (e, i) => {
                            return (
                              <Text fontWeight={"light"} fontSize={"0.75rem"}>
                                {"#" + vaultInfoStakingVault.tags[i]}
                              </Text>
                            );
                          }
                        )}
                      </Stack>
                    </Flex>


                  </Flex>
                  <Flex
                    direction={"row"}
                    gap={"1vw"}
                    alignItems={"center"}
                  >
                    <Flex direction={"column"}>
                      <Flex direction={"row"}>
                        <Text fontSize={"4xl"}>
                          {" "}
                          {vaultInfoStakingVault.dataFinance[vaultInfoStakingVault.dataFinance.length - 1].sharePrice < 1
                            ?
                            (vaultInfoStakingVault.dataFinance[vaultInfoStakingVault.dataFinance.length - 1].sharePrice
                            ).toPrecision(2)
                            : vaultInfoStakingVault.dataFinance[vaultInfoStakingVault.dataFinance.length - 1].sharePrice
                          }


                        </Text>
                        <Box
                          style={{
                            width: "50px",
                            height: "50px",
                            borderRadius: "15px",
                            overflow: "hidden",
                            backgroundColor: "transparent",
                          }}
                        >
                          <Image
                            src={eth}
                          />
                        </Box>

                      </Flex>

                      <Text fontSize={"2xl"}>/ Share</Text>

                    </Flex>
                    <Text
                      fontSize={"4xl"}
                      color={
                        vaultInfoStakingVault.totalIncome
                          ? vaultInfoStakingVault.totalIncome > 0
                            ? "#31c48d"
                            : "rgb(237,33,49)"
                          : "#31c48d"

                      }
                    >
                      {" "}
                      {vaultInfoStakingVault.totalIncome == 0
                        ? "--"
                        :
                        vaultInfoStakingVault.totalIncome
                      }
                      %{" "}
                    </Text>
                  </Flex>
                  <Flex marginTop={"-3vh"}>
                    <ResponsiveContainer
                      width="100%"
                      aspect={12.0 / 3.0}

                    >
                      <AreaChart data={vaultInfoStakingVault.dataFinanceD}>
                        <Tooltip />
                        <defs>
                          <linearGradient
                            id="splitColor"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="5%"
                              stopColor={
                                vaultInfoStakingVault.dataFinanceD[0]
                                  ? vaultInfoStakingVault.dataFinanceD[0].sharePrice >
                                    vaultInfoStakingVault.dataFinanceD[vaultInfoStakingVault.dataFinanceD.length - 1]
                                      .sharePrice
                                    ? "rgb(237,33,49)"
                                    : "#31c48d"
                                  : "rgb(237,33,49)"

                              }
                              stopOpacity={0.9}
                            />
                            <stop
                              offset="90%"
                              stopColor="#31c48d"
                              stopOpacity={0}
                            />
                            {/* <stop offset="95%" stopColor="#FFFFFF" stopOpacity={0.1}/> */}
                          </linearGradient>
                        </defs>
                        <Area
                          type="monotone"
                          dataKey={
                            "sharePrice"
                          }
                          stroke={
                            vaultInfoStakingVault.dataFinanceD[0]
                              ? vaultInfoStakingVault.dataFinanceD[0].sharePrice >
                                vaultInfoStakingVault.dataFinanceD[vaultInfoStakingVault.dataFinanceD.length - 1]
                                  .sharePrice
                                ? "rgb(237,33,49)"
                                : "#31c48d"
                              : "rgb(237,33,49)"

                          }
                          fill="url(#splitColor)"
                          fillOpacity={0.6}
                          strokeWidth={2}
                        />
                        {/* <Area type="monotone" dataKey="sharePriceInitial" stroke="" fill="url(#splitColor2)" /> */}
                      </AreaChart>
                    </ResponsiveContainer>
                  </Flex>
                  <Flex direction={"row"} justifyContent={"space-between"}>
                    <Flex direction={"column"}>
                      <Text fontWeight={"light"} fontSize={"1xl"}>
                        Daily
                      </Text>
                      <Text
                        fontWeight={"bold"}
                        fontSize={"1.125rem"}
                        color={
                          vaultInfoStakingVault?.dailyIncome
                            ? vaultInfoStakingVault?.dailyIncome < 0
                              ? "rgb(237,33,49)"
                              : "#31c48d"
                            : "#31c48d"
                        }
                      >
                        {vaultInfoStakingVault?.dailyIncome == 0
                          ? "--"
                          : vaultInfoStakingVault?.dailyIncome?.toPrecision(4)}
                        %
                      </Text>

                    </Flex>
                    <Flex direction={"column"}>
                      <Text fontWeight={"light"} fontSize={"1xl"}>
                        Weekly
                      </Text>
                      <Text
                        fontWeight={"bold"}
                        fontSize={"1.125rem"}
                        color={
                          vaultInfoStakingVault?.weeklyIncome
                            ? vaultInfoStakingVault?.weeklyIncome < 0
                              ? "rgb(237,33,49)"
                              : "#31c48d"
                            : "#31c48d"
                        }
                      >
                        {vaultInfoStakingVault?.weeklyIncome == 0
                          ? "--"
                          : vaultInfoStakingVault?.weeklyIncome?.toPrecision(4)}
                        %
                      </Text>

                    </Flex>
                    <Flex direction={"column"}>
                      <Text fontWeight={"light"} fontSize={"1xl"}>
                        Monthly
                      </Text>
                      <Text
                        fontWeight={"bold"}
                        fontSize={"1.125rem"}
                        color={
                          vaultInfoStakingVault?.monthlyIncome
                            ? vaultInfoStakingVault?.monthlyIncome < 0
                              ? "rgb(237,33,49)"
                              : "#31c48d"
                            : "#31c48d"
                        }
                      >
                        {vaultInfoStakingVault?.monthlyIncome == 0
                          ? "--"
                          : vaultInfoStakingVault?.monthlyIncome?.toPrecision(4)}
                        %
                      </Text>

                    </Flex>
                    <Flex direction={"column"}>
                      <Text fontWeight={"light"} fontSize={"1xl"}>
                        Total
                      </Text>
                      <Text
                        fontWeight={"bold"}
                        fontSize={"1.125rem"}
                        color={
                          vaultInfoStakingVault?.totalIncome
                            ? vaultInfoStakingVault?.totalIncome < 0
                              ? "rgb(237,33,49)"
                              : "#31c48d"
                            : "#31c48d"
                        }
                      >
                        {vaultInfoStakingVault?.totalIncome == 0
                          ? "--"
                          : vaultInfoStakingVault?.totalIncome?.toPrecision(4)}
                        %
                      </Text>

                    </Flex>

                  </Flex>
                </Flex>
              </Box>
            </Box>
          </Link>
        }
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
            <Flex direction={"column"} overflowY={"scroll"} maxHeight={"18vh"} gap={"1vh"} >
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
