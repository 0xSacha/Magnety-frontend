import React from 'react';
import { NextPage } from 'next';
import styles from '~/styles/vault.module.scss';
import FakeImage from "~/components/FakeImage";
import 'chart.js/auto';
import { Chart, Line } from 'react-chartjs-2';
import { number } from 'starknet';
import { ChartData, ScatterDataPoint, ChartOptions, CoreChartOptions, ElementChartOptions, PluginChartOptions, DatasetChartOptions, ScaleChartOptions, LineControllerChartOptions } from 'chart.js/auto';
import { _DeepPartialObject } from 'chart.js/types/utils';
import Tabs from '~/components/Tabs';
import Tab from '~/components/Tab';

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const times = (n: number, fn: (i: number)=> any = (i: number) => i): any[] => Array.from({ length: n }, (_, x) => fn(x));

const random = (lower: number, upper: number, isIncludeUpper = false) => {
  const min = Math.min(lower, upper)
  const max = Math.max(lower, upper)
  return Math.round((Math.random() * (max - min) + min) * 100) / 100
}

const randomChartData = (n: number, startAt: number = 0, maxChanges: number = 10, minimumValue: number = 0, maximumValue: number = 100 ) => {
  return [...times(n, (i)=> {
    if(current === undefined) {
      current = startAt;
    }else{
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
const chartLabels = [...times(numberOfData, (i)=> MONTHS[i%MONTHS.length])];
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
      data: [...times(numberOfData, (i)=> chartData[0])],
      borderDash: [5,5],
      borderColor: "rgba(75,192,192,0.5)",
      pointRadius: 0,
      pointHoverRadius: 0
    },
    {
      label: 'Current',
      data: [...times(numberOfData, (i)=> chartData[chartData.length - 1])],
      borderDash: [5,5],
      borderColor: chartData[chartData.length - 1] > chartData[0] ?  "#17a54380" : "#ff000080",
      pointRadius: 0,
      pointHoverRadius: 0
    }
  ]
};

const options = {
  responsive: true,
  scales:{
    x:{
      ticks:{
        display: false
      },
      grid:{
        display: false
      },
    },
    y:{
      ticks:{
        display: false
      },
      grid:{
        display: false
      }
    },
  },                
  elements:{
    point: {
      radius: 1,
    },
  },
  plugins:{
    legend: {
      display: false,
    }
  }
}

const vault: NextPage = () => {
  return ( <>
      <div className={`${styles.pageContainer}`}>
        <div className={`${styles.cardWrapper1}`}>
          {/* Left Side */}
          <div>
            <FakeImage width='65px' height='65px' fillColor='black' borderRadius='50%'/>
            <div>
              <div className="fs-38">PKM22</div>
              <div className="">By Michel trader</div>
              <div className="">About this user</div>
            </div>
          </div>
          {/* Right Side */}
          <div>
            <div className='bg__dotted'>
              <div> Annual Percentage rate </div>
              <div className='fs-28 text-align-end text-success'> +5.05% </div>
            </div>
            <div className='bg__dotted'>
              <div> Value managed </div>
              <div className='fs-28 text-align-end'> $101.05k </div>
            </div>
            <div className='bg__dotted'>
              <div> Investors </div>
              <div className='fs-28 text-align-end'> 15 </div>
            </div>
            <div className='bg__dotted'>
              <div> Rewards - Airdrops </div>
              <div className='fs-28 text-align-end'> 0 - 2% </div>
            </div>
          </div>
        </div>
        <div className={`${styles.cardWrapper2}`}>
          {/* Left Side */}
          <div>
            <div className='bg__dotted border-radius-15'>
              <div>
                <div className='fs-20'>About</div>
                <div className='fs-14' style={{marginTop: '5px'}}>Created in order to short </div>
              </div>
              <div style={{marginTop: '15px'}}>
                <div className='fs-20'>Ranking</div>
                <div className='fs-14 d-flex justify-content-space-between' style={{marginTop: '5px'}}>
                  <span>Weekly: 2/234</span>
                  <span>Monthly: 13/234</span>
                </div>
                <div className='fs-14' style={{marginTop: '5px'}}>Airdrop rate:</div>
              </div>
            </div>
            <button data-color="secondary">Buy Shares</button>
            <button data-color="white">Reedem Funds</button>
          </div>
          {/* Right Side */}
          <div className='bg__dotted'>
            <div className='d-flex justify-content-space-between'>
              <div>Share price
                <div>
                  <span className='fs-48'> $0.58 </span>
                  <span className='fs-18'> +1.34% </span> 
                  <span className='fs-14'> past 1D </span> 
                </div>
              </div>
              <div className='border-radius-5' style={{
                height: 'fit-content',
                overflow: 'hidden',
                display: 'flex',
                gap: '5px'
              }}>
                <button className='border-radius-0'>1D</button>
                <button className='border-radius-0'>1W</button>
                <button className='border-radius-0'>1M</button>
                <button className='border-radius-0'>3M</button>
                <button className='border-radius-0'>6M</button>
                <button className='border-radius-0'>1Y</button>
              </div>
            </div>
            <div>
                {/* <Chart<any> type='line' data={data} /> */}
              <Line data={ data } options={ options }></Line>
            </div>
          </div>
        </div>
        {/* Tabs */}
        <div style={{
          height: '400px'
        }}>
          <Tabs activeTab='2'>
              <Tab label='TAB1' id='1'>
                <div> Tab 1 Body </div>
              </Tab>
              <Tab label='tab2' id='2'>
                <div> Tab 2 Body </div>
              </Tab>
          </Tabs>
        </div>
      </div>
    </> )
}

export default vault