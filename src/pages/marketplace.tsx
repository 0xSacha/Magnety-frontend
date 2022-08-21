import React, { useEffect } from "react";
import Link from 'next/link'
import { NextPage } from "next";
import styles from '../styles/marketplace.module.scss'
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
            Marketplace
          </Text>
          {vaultInfo &&
            <SimpleGrid className={styles.grid}>
              {vaultInfo.map((key, index) => (
                <Link href={"/vault/" + key.fundAddress}>
                  <Box className={styles.hero_vault}>
                  <Box className={styles.content}>
                    <Flex className={styles.flex}>
                      <Flex className={styles.title}>
                        <Box className={styles.box}>
                          <img
                            src={key?.image}
                            style={{ objectFit: "cover" }}
                          />
                        </Box>
    
                        <Flex direction={"column"} alignItems={"center"}>
                          <Text>
                            {key?.name}
                          </Text>
    
                          <Stack direction={"row"}>
                            {[...Array(Object.keys(key.tags).length)].map(
                              (e, i) => {
                                return (
                                  <Text>
                                    {"#" + key.tags[i]}
                                  </Text>
                                );
                              }
                            )}
                          </Stack>
                          <Text className={styles.shares}>
                              {" "}
                              {key.dataFinance[key.dataFinance.length - 1].sharePrice < 1
                                ?
                                (key.dataFinance[key.dataFinance.length - 1].sharePrice
                                ).toPrecision(2)
                                : key.dataFinance[key.dataFinance.length - 1].sharePrice
                              }{" "}/ Share</Text>
                        </Flex>
                      </Flex>
                      <Flex marginTop={"-3vh"}>
                        <ResponsiveContainer
                          width="100%"
                          aspect={4.0 / 1.0}
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
                          <Text className={styles.date}>
                            Weekly
                          </Text>
                          <Text className={styles.percent}
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
                          <Text className={styles.date}>
                            Monthly
                          </Text>
                          <Text className={styles.percent}
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
                          <Text className={styles.date}>
                            Total
                          </Text>
                          <Text className={styles.percent}
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
