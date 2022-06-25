import React, { useEffect } from "react";
import Link from 'next/link'
import { NextPage } from "next";
import styles from "~/styles/vault.module.scss";
import { useAppSelector } from "../app/hooks";
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
import { selectCount } from "../app/counterSlice";
import {
  Select,
  Button,
  ButtonGroup,
  SimpleGrid,
  Box,
  Flex,
  Text,
  Stack
} from "@chakra-ui/react";
import moment from "moment";
import eth from "../image/ETH.png";

import { _DeepPartialObject } from "chart.js/types/utils";

import VDatabase from "./vault/vaults.json";

import { ContractInfo } from "../utils/type";

const dateFormatter = (date) => {
  // return moment(date).unix();

  return moment(date).format("LT");

};

const vault: NextPage = () => {
  let count = useAppSelector(selectCount);
  const [vaultInfo, setVaultInfo] = React.useState<ContractInfo[]>();

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
  useEffect(() => {
    loadData()
  }, []);

  return (
    <>
      <Box padding={"4vw"}>
        <Flex direction={"column"} gap={"5vh"}>
          <Text fontSize={"4xl"} fontWeight={"bold"}>
            {" "}
            Marketplace (coming soon)
          </Text>
          {vaultInfo &&
            <SimpleGrid columns={2} spacing={10}>
              {vaultInfo.map((key, index) => (
                <Link href={"/vault/" + key.fundAddress}>
                  <a>
                  {console.log(key)}

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
                              src={key.image}
                              style={{ objectFit: "cover" }}
                            />
                          </Box>

                          <Flex direction={"column"} alignItems={"center"}>
                            <Text fontSize={"3xl"} fontWeight={"bold"}>
                              {key?.name}
                            </Text>


                            <Stack direction={"row"}>
                              {[...Array(Object.keys(key.tags).length)].map(
                                (e, i) => {
                                  return (
                                    <Text fontWeight={"light"} fontSize={"0.75rem"}>
                                      {"#" + key.tags[i]}
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
                                {key.dataFinance[key.dataFinance.length - 1].sharePrice < 1
                                  ?
                                  (key.dataFinance[key.dataFinance.length - 1].sharePrice
                                  ).toPrecision(2)
                                  : key.dataFinance[key.dataFinance.length - 1].sharePrice.toPrecision(2)
                                }


                              </Text>
                              {/* <Box
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
                              </Box> */}

                            </Flex>

                            <Text fontSize={"2xl"}>/ Share</Text>

                          </Flex>
                          <Text
                            fontSize={"4xl"}
                            color={
                              key.totalIncome
                                ? key.totalIncome > 0
                                  ? "#31c48d"
                                  : "rgb(237,33,49)"
                                : "#31c48d"

                            }
                          >
                            {" "}
                            {key.totalIncome == 0
                              ? "--"
                              :
                              key.totalIncome.toPrecision(2)
                            }
                            %{" "}
                          </Text>
                        </Flex>
                        <Flex marginTop={"-3vh"}>
                          <ResponsiveContainer
                            width="100%"
                            aspect={12.0 / 3.0}

                          >
                            <AreaChart data={key.dataFinanceD}>
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
                                      key.dataFinanceD[0]
                                        ? key.dataFinanceD[0].sharePrice >
                                          key.dataFinanceD[key.dataFinanceD.length - 1]
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
                                  key.dataFinanceD[0]
                                    ? key.dataFinanceD[0].sharePrice >
                                      key.dataFinanceD[key.dataFinanceD.length - 1]
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
                                key?.dailyIncome
                                  ? key?.dailyIncome < 0
                                    ? "rgb(237,33,49)"
                                    : "#31c48d"
                                  : "#31c48d"
                              }
                            >
                              {key?.dailyIncome == 0
                                ? "--"
                                : key?.dailyIncome?.toPrecision(4)}
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
                                key?.weeklyIncome
                                  ? key?.weeklyIncome < 0
                                    ? "rgb(237,33,49)"
                                    : "#31c48d"
                                  : "#31c48d"
                              }
                            >
                              {key?.weeklyIncome == 0
                                ? "--"
                                : key?.weeklyIncome?.toPrecision(4)}
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
                                key?.monthlyIncome
                                  ? key?.monthlyIncome < 0
                                    ? "rgb(237,33,49)"
                                    : "#31c48d"
                                  : "#31c48d"
                              }
                            >
                              {key?.monthlyIncome == 0
                                ? "--"
                                : key?.monthlyIncome?.toPrecision(4)}
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
                                key?.totalIncome
                                  ? key?.totalIncome < 0
                                    ? "rgb(237,33,49)"
                                    : "#31c48d"
                                  : "#31c48d"
                              }
                            >
                              {key?.totalIncome == 0
                                ? "--"
                                : key?.totalIncome?.toPrecision(4)}
                              %
                            </Text>

                          </Flex>

                        </Flex>
                      </Flex>
                    </Box>
                  </Box>
                  </a>
                </Link>
              ))}
            </SimpleGrid>
          }
        </Flex>
      </Box>
    </>
  );
};

export default vault;
