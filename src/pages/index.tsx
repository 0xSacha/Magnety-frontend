import { useStarknetCall } from "@starknet-react/core";
import type { NextPage } from "next";
import { useMemo } from "react";
import React, { useEffect } from "react";
import { ContractInfo } from "../utils/type";
import Link from 'next/link'

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

import styles from '../styles/index.module.scss'

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
      process.env.URL + `api/contract/last`
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
    <Box className={styles.container}>
      <Flex className={styles.wrapper}>
        <Flex className={styles.hero}>
          <Flex className={styles.hero_text}>
            <Text>Discover </Text>
            <Text color={"#f6643c"}>Extraordinary</Text>
            <Text>DeFi&nbsp;strategies</Text>
          </Flex>
          <Text>Magnety push your asset management to the next level, currently in version ⍺</Text>
          <Flex>
            <Flex className={styles.hero_btns}>
              <Button backgroundColor={"#00318973"}>
                <Link href={`/marketplace`}>
                    <Text>Delegate</Text>
                </Link>
              </Button>
              <Button backgroundColor={"#f6643c"}>
                <Link href={`/create`}>
                  <Text>Monetize</Text>
                </Link>
              </Button>
            </Flex>
          </Flex>
        </Flex>
        {vaultInfoStakingVault !== undefined &&
          <Link href={"/vault/" + vaultInfoStakingVault.fundAddress}>
            <Box className={styles.hero_vault}>
              <Box className={styles.content}>
                <Flex className={styles.flex}>
                  <Flex className={styles.title}>
                    <Box className={styles.box}>
                      <img
                        src={vaultInfoStakingVault?.image}
                        style={{ objectFit: "cover" }}
                      />
                    </Box>

                    <Flex direction={"column"} alignItems={"center"}>
                      <Text>
                        {vaultInfoStakingVault?.name}
                      </Text>

                      <Stack direction={"row"}>
                        {[...Array(Object.keys(vaultInfoStakingVault.tags).length)].map(
                          (e, i) => {
                            return (
                              <Text>
                                {"#" + vaultInfoStakingVault.tags[i]}
                              </Text>
                            );
                          }
                        )}
                      </Stack>
                    </Flex>
                  </Flex>
                  <Flex className={styles.share}>
                    <Flex direction={"column"}>
                      <Flex direction={"row"}>
                        <Text>
                          {" "}
                          {vaultInfoStakingVault.dataFinance[vaultInfoStakingVault.dataFinance.length - 1].sharePrice < 1
                            ?
                            (vaultInfoStakingVault.dataFinance[vaultInfoStakingVault.dataFinance.length - 1].sharePrice
                            ).toPrecision(2)
                            : vaultInfoStakingVault.dataFinance[vaultInfoStakingVault.dataFinance.length - 1].sharePrice
                          }
                        </Text>
                        <Box>
                          <Image src={eth}/>
                        </Box>
                      </Flex>
                      <Text>/ Share</Text>
                    </Flex>
                    <Text
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
                        vaultInfoStakingVault.totalIncome.toPrecision(2)
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
                  <Flex className={styles.plotlegend}>
                    <Flex direction={"column"}>
                      <Text className={styles.date}>
                        Daily
                      </Text>
                      <Text className={styles.percent}
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
                      <Text className={styles.date}>
                        Weekly
                      </Text>
                      <Text className={styles.percent}
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
                      <Text className={styles.date}>
                        Monthly
                      </Text>
                      <Text className={styles.percent}
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
                      <Text className={styles.date}>
                        Total
                      </Text>
                      <Text className={styles.percent}
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
        <Flex direction={"column"} justifyContent={"space-evenly"} gap={"20px"} width={"30%"}>
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
              <Text fontSize={"2xl"} color={"whiteAlpha"} fontWeight='extrabold'>
                {AssetTab.length} Token Supported
              </Text>
              <Flex overflowY={"scroll"} padding={"15px"} gap={"20px"} flexWrap={"wrap"} maxHeight={"100px"}>
                {AssetTab.map((p, index) => (
                  <Box width={"50px"}>
                    <Image src={p} />
                  </Box>
                ))}

              </Flex>
            </Flex>
            <Flex direction={"column"}>
              <Text fontSize={"2xl"} color={"whiteAlpha"} fontWeight='extrabold'>
                {ProtocolTab.length} Protocol supported
              </Text>
              <Flex overflowY={"scroll"} padding={"15px"} gap={"20px"} flexWrap={"wrap"} maxHeight={"100px"}>
                {ProtocolTab.map((p, index) => (
                  <Box width={"50px"}>
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
            <Text fontSize={"2xl"} color={"whiteAlpha"} fontWeight='extrabold'>
              Last funds created
            </Text>
            <Flex direction={"column"} overflowY={"scroll"} maxHeight={"25vh"} gap={"1vh"} >
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
      </Flex>
    </Box>
  );
};

export default Home;
