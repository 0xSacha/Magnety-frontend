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

type PortfolioData = {
  coinName: string ,
  coinFullName: string,
  balance: number,
  price: number,
  value: number,
  allocationPercentage: number,
}[];

const vault: NextPage = () => {
  const portfolioData: PortfolioData = [
    {
      coinName: 'ETH' ,
      coinFullName: 'Ethereum',
      balance: 1.045,
      price: 100,
      value: 2,
      allocationPercentage: 35,
    },
    {
      coinName: 'other coin' ,
      coinFullName: 'other',
      balance: 10,
      price: 10,
      value: 3,
      allocationPercentage: 5,
    }
  ];
  const feesData = [
    {
      feesType: 'Management Fee' ,
      settingsPercentage: '2.00',
      ratePercentage: '2.00',
      unpaidFeesPercentage: 35,
    },
    {
      feesType: 'Performance Fee' ,
      settingsPercentage: '2.00',
      ratePercentage: '2.00',
      unpaidFeesPercentage: 35,
    },
    {
      feesType: 'Exit Fee(Vault)' ,
      settingsPercentage: '2.00',
      ratePercentage: '2.00',
      unpaidFeesPercentage: 35,
    },
    {
      feesType: 'Protocal Fee' ,
      settingsPercentage: '2.00',
      ratePercentage: '2.00',
      unpaidFeesPercentage: 35,
    }
  ];
  const depositorsData=[
    {
      depositor: '0x123...ab',
      Since: '2 Months',
      numberOfShares:2300,
      percentage: 35
    },
    {
      depositor: '0x123...ab',
      Since: '2 Months',
      numberOfShares:2300,
      percentage: 35
    },
    {
      depositor: '0x123...ab',
      Since: '2 Months',
      numberOfShares:2300,
      percentage: 35
    },
    {
      depositor: '0x123...ab',
      Since: '2 Months',
      numberOfShares:2300,
      percentage: 35
    },
    {
      depositor: '0x123...ab',
      Since: '2 Months',
      numberOfShares:2300,
      percentage: 35
    }
  ];

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
                <div style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: '16px'
                }}>
                  <span className='fs-48'> $0.58 </span>
                  <span className='fs-18 text-success'> +1.34% </span> 
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
          minHeight: '500px',
          maxHeight: '80vh',
        }}>
          <Tabs activeTab='6'>
              <Tab label='Portfolio' id='1'>
                <div  className={`${styles.portfolioTable} bg__dotted`}>
                  <table cellSpacing="0" cellPadding="0">
                    <thead>
                      <tr>
                        <th>Assets</th>
                        <th>Balance</th>
                        <th>Price</th>
                        <th>Value</th>
                        <th>Allocation</th>
                      </tr>
                    </thead>
                    <tbody>
                      {portfolioData.map((p,index)=>(
                        <tr key={index}>
                          <td>
                            <FakeImage width='50px' height='50px' fillColor='var(--color-secondary)' borderRadius='50%'></FakeImage>
                            <div>
                              <span> {p.coinName} </span>
                              <span> {p.coinFullName} </span>
                            </div>
                          </td>
                          <td> ${p.balance}</td>
                          <td>{p.price}</td>
                          <td>{p.value}</td>
                          <td>{p.allocationPercentage}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Tab>
              <Tab label='Financials' id='2'>
                <div className={`bg__dotted ${styles.financialTabContent}`}> 
                  <div>
                    <div className='fs-24 fw-600'>General Information</div>
                    <div>
                      <div className='fw-600'>General Assets Vault (GAV)</div>
                      <div>
                        <span className='fw-700'>1,993,516.452 MGTY</span>
                        <span>$1,993,516.452</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div>
                      <div className='fw-600'>Net Assets Valut (NAV)</div>
                      <div>
                        <span  className='fw-700'>1,993,516.452 MGTY</span>
                        <span>$1,993,516.452</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className='fs-24 fw-600'>Financial Metrics</div>
                    <div>
                      <div className='fw-600'>Return Month-to-Date</div>
                      <div>
                        <span className='text-success'>+0.5%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Tab>
              <Tab label='Fees' id='3'>
                <div className={`${styles.feesTable} bg__dotted`} >
                  <table cellSpacing="0" cellPadding="0">
                    <thead>
                      <tr>
                        <th>Fee Type</th>
                        <th>Settings</th>
                        <th> </th>
                        <th>Unpaid Fees</th>
                      </tr>
                    </thead>
                    <tbody>
                      {feesData.map((f,index)=>(
                        <tr key={index}>
                          <td>
                            {f.feesType}
                          </td>
                          <td>
                            <div>
                              <div>Rate</div>
                              <div>{f.settingsPercentage} %</div>
                            </div>
                          </td>
                          <td>
                            <div>
                              <div>Rate</div>
                              <div>{f.ratePercentage} %</div>
                            </div>
                          </td>
                          <td>{f.unpaidFeesPercentage} %</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Tab>
              <Tab label='Policies' id='4'>
                <div className={`bg__dotted ${styles.policiesTabContent}`}> 
                  <div>
                    <div className='fs-24 fw-600'>Limit Wallets Permitted To Deposit</div>
                    <div>
                      <button data-color= "primary">0x123...ab</button>
                      <button data-color= "primary">0x123...ab</button>
                      <button data-color= "primary">0x123...ab</button>
                      <button data-color= "primary">0x123...ab</button>
                    </div>
                    <div>view more</div>
                  </div>
                  <div>
                    <div className='fs-24 fw-600'>Deposit Limits</div>
                    <div>minimum : 300 MGTY</div>
                    <div>maximum : no</div>
                  </div>
                </div>
              </Tab>
              <Tab label='Depositors' id='5'>
                <div className={`${styles.depositorsTable} bg__dotted`}>
                  <table cellSpacing="0" cellPadding="0">
                    <thead>
                      <tr>
                        <th>Depositor</th>
                        <th>Since</th>
                        <th>Number of Shares</th>
                        <th>Percentage</th>
                      </tr>
                    </thead>
                    <tbody>
                      {depositorsData.map((d,index)=>(
                        <tr key={index}>
                          <td>
                            {d.depositor}
                          </td>
                          <td> 
                            {d.Since}
                          </td>
                          <td>
                            {d.numberOfShares}
                          </td>
                          <td>
                            {d.percentage} %
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Tab>
              <Tab label='Activities' id='6'>
                <div className={`${styles.activitiesContainer}`}>
                  <div  className='bg__dotted'>
                    <div>
                      <div>
                        <div>
                          <div className='fs-12'>29 Apr 2022 01:22</div>
                          <div className='fs-24 fw-600'>Deposit</div>
                        </div>
                        <div>
                          <FakeImage height='50px' width='50px' borderRadius='50%' fillColor='black'/>
                          <div>
                            <div className='fs-20 fw-700'>Vault name</div>
                            <div className='fs-12'>0x4s21...1452</div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div>Amount</div>
                        <div>Shares received</div>
                        <div>Depositor</div>
                      </div>
                    </div>
                  </div>
                  <div className='bg__dotted'>

                  </div>
                </div>
              </Tab>
              <Tab label='Fidelity' id='7'>
                <div className={`bg__dotted ${styles.fidelityTabContent}`}>
                  <div>
                    <div className='fs-24 fw-600'>General Informations</div>
                    <div>
                      <div className='fw-600'>Airdrops accross the time</div>
                      <div>5%</div>
                    </div>
                  </div>
                </div>
              </Tab>
          </Tabs>
        </div>
      </div>
    </> )
}

export default vault