import React, { useEffect } from 'react';
import { NextPage } from 'next';
import Link from 'next/link'
import styles from '~/styles/vault.module.scss';
import FakeImage from "~/components/FakeImage";
import Image from "next/image";
import { useAppSelector } from '../app/hooks'
import {
  selectCount,
} from '../app/counterSlice'
import 'chart.js/auto';
import { Chart, Line } from 'react-chartjs-2';
import { Select, Button, ButtonGroup, SimpleGrid , Box } from '@chakra-ui/react'
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Text,
  Center
} from '@chakra-ui/react'
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from '@chakra-ui/react'
import {
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
} from '@chakra-ui/react'
import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
} from '@chakra-ui/react'
import { ChartData, ScatterDataPoint, ChartOptions, CoreChartOptions, ElementChartOptions, PluginChartOptions, DatasetChartOptions, ScaleChartOptions, LineControllerChartOptions } from 'chart.js/auto';
import { _DeepPartialObject } from 'chart.js/types/utils';
import Tabs from '~/components/Tabs';
import Tab from '~/components/Tab';
import { getStarknet, AccountInterface } from "../starknetWrapper"
import { contractAddress } from '~/registry/address';
import { hexToDecimalString } from 'starknet/dist/utils/number';
import { number } from 'starknet';
import Ether from '../image/ETH.png';
import { Flex, Spacer } from '@chakra-ui/react'
import { Slider as MultiSlider } from 'react-multi-thumb-slider';
import { MaterialSlider } from 'react-multi-thumb-slider';

const { provider, account } = getStarknet()

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const times = (n: number, fn: (i: number) => any = (i: number) => i): any[] => Array.from({ length: n }, (_, x) => fn(x));

const random = (lower: number, upper: number, isIncludeUpper = false) => {
  const min = Math.min(lower, upper)
  const max = Math.max(lower, upper)
  return Math.round((Math.random() * (max - min) + min) * 100) / 100
}

const randomChartData = (n: number, startAt: number = 0, maxChanges: number = 10, minimumValue: number = 0, maximumValue: number = 100) => {
  return [...times(n, (i) => {
    if (current === undefined) {
      current = startAt;
    } else {
      const min = random(current, Math.max(current - maxChanges, minimumValue), true);
      const max = random(current, Math.min(current + maxChanges, maximumValue), true);
      current = random(min, max, true);
    }
    return current;
  })]
}


const numberOfData = 200;
const startAt = 20;
let current: number;
const chartLabels = [...times(numberOfData, (i) => MONTHS[i % MONTHS.length])];
const chartData = randomChartData(numberOfData, startAt);

const data: ChartData<"line", (number | ScatterDataPoint | null)[], unknown> = {
  labels: chartLabels,
  datasets: [
    {
      label: "Dataset",
      data: chartData,
      fill: false,
      backgroundColor: "rgba(75,192,192,0.2)",
      borderColor: "rgba(75,192,192,1)",
      tension: 0.1,
    },
    {
      label: 'Initial',
      data: [...times(numberOfData, (i) => chartData[0])],
      borderDash: [5, 5],
      borderColor: "rgba(75,192,192,0.5)",
      pointRadius: 0,
      pointHoverRadius: 0
    },
    {
      label: 'Current',
      data: [...times(numberOfData, (i) => chartData[chartData.length - 1])],
      borderDash: [5, 5],
      borderColor: chartData[chartData.length - 1] > chartData[0] ? "#17a54380" : "#ff000080",
      pointRadius: 0,
      pointHoverRadius: 0
    }
  ]
};

const options = {
  responsive: true,
  scales: {
    x: {
      ticks: {
        display: false
      },
      grid: {
        display: false
      },
    },
    y: {
      ticks: {
        display: false
      },
      grid: {
        display: false
      }
    },
  },
  elements: {
    point: {
      radius: 1,
    },
  },
  plugins: {
    legend: {
      display: false,
    }
  }
}

type PortfolioData = {
  coinName: string,
  coinSymbol: string,
  balance: string,
  value: string,
  allocation: string,
  selected: boolean,
  address: string,
}[];

type SellShareData = {
  symbol: string,
  percent: string,
  address: string,
}[];

type userShareData = {
  tokenId: string,
  shareAmount: string,
  pricePurchased: string,
}[];

import VDatabase from "./vault/vaults.json";

const vault: NextPage = () => {
  let count = useAppSelector(selectCount)

  
  return (<>
    <div className={`${styles.pageContainer}`}>
      <SimpleGrid columns={3} spacing={10}>
        {
          Object.keys(VDatabase).map((key, index) => (
            <>
              {(key !== "default") &&
                <Box className='bg__dotted' style={{borderRadius:"10px"}} key={index}>
                  <div style={{width:"100%", display:"flex", alignItems:"center"}}>
                    <div style={{width:"25%", float: "left"}}>
                      <div style={{width:"60px", height:"60px", margin:"10px", borderRadius:"50%", background:"black"}}></div>
                    </div>
                    <div style={{width:"40%", float: "left"}}>
                      <p>Name</p>
                      <p>User</p>
                    </div>
                    <div  style={{width:"35%", float: "left"}}>
                    <Link href={"/vault/"+key}><button  className='fs-20' style={{ fontWeight: "600", background: "#F6643C", borderRadius: "10px", padding: "6px 10px" }}>open</button></Link>
                    </div>
                  </div>
                  <div style={{width:"100%", display:"flex", alignItems:"center"}}>
                    <div style={{width:"60%", float: "left", paddingLeft: "10px"}}>
                      <p>Value Managed :</p>
                      <p>Risk Factor :</p>
                    </div>
                    <div style={{width:"40%", float: "left"}}>
                      <p>APR :</p>
                      <p>REWARDS :</p>
                    </div>
                  </div>
                  <div style={{width:"100%", display:"flex", alignItems:"center"}}>
                    {[...Array(Object.keys(VDatabase[key].tags).length)].map((e, i) => {
                      return (
                        <span className='fs-12' style={{ fontWeight: "600", background: "#F6643C", borderRadius: "10px", padding: "6px 10px" , margin: "10px" }}>{"#" + VDatabase[key].tags[i]}</span>
                      )
                    })}
                  </div>
                </Box>
              }
            </>
          ))
        }
      </SimpleGrid >
    </div>
  </>)
}

export default vault