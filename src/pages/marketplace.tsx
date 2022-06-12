import React, { useEffect } from "react";
import { NextPage } from "next";
import Link from "next/link";
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
} from "@chakra-ui/react";
import moment from "moment";

import { _DeepPartialObject } from "chart.js/types/utils";

import VDatabase from "./vault/vaults.json";

const data = [
  {
    date: "2022-06-09T00:00:00Z",
    sharePrice: 0.02,
    gav: 0.001,
  },
  {
    date: "2022-06-09T01:00:00Z",
    sharePrice: 0.012,
    gav: 0.001,
  },
  {
    date: "2022-06-09T02:00:00Z",
    sharePrice: 0.033,
    gav: 0.001,
  },
  {
    date: "2022-06-09T03:00:00Z",
    sharePrice: 0.042,
    gav: 0.001,
  },
  {
    date: "2022-06-09T04:00:00Z",
    sharePrice: 0.002,
    gav: 0.001,
  },
  {
    date: "2022-06-09T05:00:00Z",
    sharePrice: 0.003,
    gav: 0.001,
  },
  {
    date: "2022-06-09T06:00:00Z",
    sharePrice: 0.002,
    gav: 0.001,
  },
  {
    date: "2022-06-09T07:00:00Z",
    sharePrice: 0.004,
    gav: 0.001,
  },
  {
    date: "2022-06-09T08:00:00Z",
    sharePrice: 0.005,
    gav: 0.001,
  },
  {
    date: "2022-06-09T09:00:00Z",
    sharePrice: 0.006,
    gav: 0.001,
  },
  {
    date: "2022-06-09T10:00:00Z",
    sharePrice: 0.004,
    gav: 0.001,
  },
  {
    date: "2022-06-09T11:00:00Z",
    sharePrice: 0.012,
    gav: 0.002,
  },
  {
    date: "2022-06-09T12:00:00Z",
    sharePrice: 0.014,
    gav: 0.002,
  },
  {
    date: "2022-06-09T13:00:00Z",
    sharePrice: 0.006,
    gav: 0.002,
  },
  {
    date: "2022-06-09T14:00:00Z",
    sharePrice: 0.182,
    gav: 0.002,
  },
  {
    date: "2022-06-09T15:00:00Z",
    sharePrice: 0.0001,
    gav: 0.002,
  },
  {
    date: "2022-06-09T16:00:00Z",
    sharePrice: 0.002,
    gav: 0.002,
  },
  {
    date: "2022-06-09T17:00:00Z",
    sharePrice: 0.003,
    gav: 0.002,
  },
  {
    date: "2022-06-09T18:00:00Z",
    sharePrice: 0.002,
    gav: 0.002,
  },
  {
    date: "2022-06-09T19:00:00Z",
    sharePrice: 0.004,
    gav: 0.003,
  },
  {
    date: "2022-06-09T20:00:00Z",
    sharePrice: 0.005,
    gav: 0.003,
  },
  {
    date: "2022-06-09T21:00:00Z",
    sharePrice: 0.006,
    gav: 0.003,
  },
  {
    date: "2022-06-09T22:00:00Z",
    sharePrice: 0.004,
    gav: 0.003,
  },
  {
    date: "2022-06-09T23:00:00Z",
    sharePrice: 0.012,
    gav: 0.003,
  },
  {
    date: "2022-06-09T24:00:00Z",
    sharePrice: 0.014,
    gav: 0.003,
  },
  {
    date: "2022-06-10T00:00:00Z",
    sharePrice: 0.02,
    gav: 0.003,
  },
  {
    date: "2022-06-10T01:00:00Z",
    sharePrice: 0.012,
    gav: 0.003,
  },
  {
    date: "2022-06-10T02:00:00Z",
    sharePrice: 0.033,
    gav: 0.003,
  },
  {
    date: "2022-06-10T03:00:00Z",
    sharePrice: 0.042,
    gav: 0.003,
  },
  {
    date: "2022-06-10T04:00:00Z",
    sharePrice: 0.002,
    gav: 0.003,
  },
  {
    date: "2022-06-10T05:00:00Z",
    sharePrice: 0.003,
    gav: 0.003,
  },
  {
    date: "2022-06-10T06:00:00Z",
    sharePrice: 0.002,
    gav: 0.003,
  },
  {
    date: "2022-06-10T07:00:00Z",
    sharePrice: 0.004,
    gav: 0.003,
  },
  {
    date: "2022-06-10T08:00:00Z",
    sharePrice: 0.005,
    gav: 0.003,
  },
  {
    date: "2022-06-10T09:00:00Z",
    sharePrice: 0.006,
    gav: 0.003,
  },
  {
    date: "2022-06-10T10:00:00Z",
    sharePrice: 0.004,
    gav: 0.003,
  },
  {
    date: "2022-06-10T11:00:00Z",
    sharePrice: 0.012,
    gav: 0.003,
  },
  {
    date: "2022-06-10T12:00:00Z",
    sharePrice: 0.014,
    gav: 0.004,
  },
  {
    date: "2022-06-10T13:00:00Z",
    sharePrice: 0.006,
    gav: 0.004,
  },
  {
    date: "2022-06-10T14:00:00Z",
    sharePrice: 0.002,
    gav: 0.004,
  },
];

type DataChart = {
  epoch: number;
  sharePrice: number;
}[];



const Adapter = (sharePriceTab) => {
  // return moment(date).unix();

  let render: DataChart = [];
  let tabEpoch: number[] = [];
  let totalIncome = 0
  //convert date in epoch
  sharePriceTab.forEach((d) => {
    tabEpoch.push(moment(d.date).valueOf()); // date -> epoch
  });

  if (sharePriceTab.length != 0) {
     totalIncome = 
      ((sharePriceTab[sharePriceTab.length - 1].sharePrice - sharePriceTab[0].sharePrice) /
        sharePriceTab[0].sharePrice) *
        100
    
  } 


    for (let pas = 0; pas < tabEpoch.length; pas++) {
      let _epoch = tabEpoch[pas];
      let _sharePrice = sharePriceTab[pas].sharePrice;
      render.push({
        epoch: _epoch,
        sharePrice: _sharePrice,
      });
  }
  console.log(render);
  return [render]
};

const dateFormatter = (date) => {
  // return moment(date).unix();

    return moment(date).format("LT");

};

const vault: NextPage = () => {
  let count = useAppSelector(selectCount);

  return (
    <>
      <Box padding={"4vw"}>
        <Flex direction={"column"} gap={"5vh"}>
          <Text fontSize={"4xl"} fontWeight={"bold"}>
            {" "}
            Marketplace
          </Text>

          <SimpleGrid columns={3} spacing={10}>
            {Object.keys(VDatabase).map((key, index) => (
              <>
                {key !== "default" && (
                  <Link href={"/vault/" + key}>
                    <Box
                      className={` bg__dotted`}
                      padding={"10px"}
                      style={{ borderRadius: "10px" }}
                    >
                      <Box
                        backgroundColor={"#0f0b1f"}
                        style={{ borderRadius: "10px" }}
                        key={index}
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
                                  Object.keys(VDatabase[key].tags).length
                                ),
                              ].map((e, i) => {
                                return (
                                  <Text
                                    fontSize={"0.8rem"}
                                    fontWeight={"light"}
                                  >
                                    {"#" + VDatabase[key].tags[i]}
                                  </Text>
                                );
                              })}
                            </Flex>
                          </div>
                          <div style={{ width: "35%", float: "left" }}></div>
                        </div>
                        {/* <ResponsiveContainer width="100%" aspect={9.0 / 3.0}>
                            <AreaChart data={Adapter(data)}>
                              <XAxis
                                dataKey="epoch"
                                tickFormatter={dateFormatter}
                                minTickGap={25}
                              />
                              <YAxis dataKey="sharePrice"/>
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

                                           chartData[0].sharePrice >
                                            chartData[chartData.length - 1]
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
                                  <stop offset="95%" stopColor="#FFFFFF" stopOpacity={0.1}/>
                                </linearGradient>
                              </defs>
                              <Area
                                type="monotone"
                                dataKey={
                                 "sharePrice" 
                                }
                                stroke={
                                       chartData[0].sharePrice >
                                        chartData[chartData.length - 1].sharePrice
                                        ? "rgb(237,33,49)"
                                        : "#31c48d"
                                }
                                fill="url(#splitColor)"
                                fillOpacity={0.6}
                                strokeWidth={2}
                              />
                              <Area type="monotone" dataKey="sharePriceInitial" stroke="" fill="url(#splitColor2)" />
                            </AreaChart>
                          </ResponsiveContainer> */}
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
                )}
              </>
            ))}
          </SimpleGrid>
        </Flex>
      </Box>
    </>
  );
};

export default vault;
