import React, { useEffect } from 'react';
import { NextPage } from 'next';
import styles from '~/styles/vault.module.scss';
import FakeImage from "~/components/FakeImage";
import Image from "next/image";
import { useAppSelector } from '../app/hooks'
import {
  selectCount,
} from '../app/counterSlice'
import 'chart.js/auto';
import { Chart, Line } from 'react-chartjs-2';

import { ChartData, ScatterDataPoint, ChartOptions, CoreChartOptions, ElementChartOptions, PluginChartOptions, DatasetChartOptions, ScaleChartOptions, LineControllerChartOptions } from 'chart.js/auto';
import { _DeepPartialObject } from 'chart.js/types/utils';
import Tabs from '~/components/Tabs';
import Tab from '~/components/Tab';
import { getStarknet, AccountInterface } from "../starknetWrapper"
import { contractAddress } from '~/registry/address';
import { hexToDecimalString } from 'starknet/dist/utils/number';
import { number } from 'starknet';
import Ether from '../image/ETH.png';


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




const vaultAddress = contractAddress.StakingVault
const comptroller = contractAddress.Comptroller
const valueIntepretor = contractAddress.valueInterpretor
const feeManager = contractAddress.FeeManager
const policyManager = contractAddress.PolicyManager


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
}[];

type userShareData = {
  tokenId: string,
  shareAmount: string,
}[];

const vault: NextPage = () => {
  let count = useAppSelector(selectCount)


  const [name, setName] = React.useState<string>("name");
  const [symbol, setSymbol] = React.useState<string>("symbol");
  const [accountInterface, setAccountInterface] = React.useState<AccountInterface>(account);
  const [acccountAddress, setAcccountAddress] = React.useState<string>("acccountAddress");
  const [assetManager, setAssetManager] = React.useState<string>("add");
  const [denominationAsset, setDenominationAsset] = React.useState<string>("deno");
  const [entranceFee, setEntranceFee] = React.useState<string>("");
  const [exitFee, setExitFee] = React.useState<string>("");
  const [performanceFee, setPerformanceFee] = React.useState<string>("");
  const [managementFee, setManagementFee] = React.useState<string>("");
  const [isPublic, setIsPublic] = React.useState<string>("");
  const [timeLock, setTimeLock] = React.useState<string>("");
  const [minAmount, setMinAmount] = React.useState<string>("");
  const [maxAmount, setMaxAmount] = React.useState<string>("");
  const [denominationAssetAddress, setDenominationAssetAddress] = React.useState<string>("deno");
  const [shareHolders, setShareHolders] = React.useState<string>("0");
  const [shareSupply, setShareSupply] = React.useState<string>("0");
  const [sharePrice, setSharePrice] = React.useState<string>("0");
  const [gav, setGav] = React.useState<string>("0");
  const [trackedAssets, setTrackedAssets] = React.useState<PortfolioData>([]);
  const [userShareInfo, setUserShareInfo] = React.useState<userShareData>([]);
  const [trackedAssetsLen, setTrackedAssetsLen] = React.useState<number>(0);
  const [userBalance, setUserBalance] = React.useState<string>("0");
  const [isAllowedDepositor, setIsAllowedDepositor] = React.useState<string>("0");
  const [userShareBalance, setUserShareBalance] = React.useState<string>("");
  const [sellTokenId, setSellTokenId] = React.useState<string>("");
  const [percentShare, setPercentShare] = React.useState<string>("");

  function shortStringFeltToStr(felt: bigint): string {
    const newStrB = Buffer.from(felt.toString(16), 'hex')
    return newStrB.toString()
  }

  function returnImagefromSymbol(symb: string) {
    if (symb == "Ether") {
      return (
        <Image src={Ether} alt="eth" />
      )
    }
  }

  useEffect(() => {
    const res = provider.callContract({ contractAddress: vaultAddress, entrypoint: "getName", calldata: [] })
    res.then(value => {
      const _name = shortStringFeltToStr(BigInt(hexToDecimalString(value.result[0])))
      setName(_name)
    }).catch(err => {
      console.log(err);
    });
    const res2 = provider.callContract({ contractAddress: vaultAddress, entrypoint: "getSymbol", calldata: [] })
    res2.then(value => {
      const _symbol = shortStringFeltToStr(BigInt(hexToDecimalString(value.result[0])))
      setSymbol(_symbol)
    }).catch(err => {
      console.log(err);
    });

    const res3 = provider.callContract({ contractAddress: vaultAddress, entrypoint: "getAssetManager", calldata: [] })
    res3.then(value => {
      const _assetManager = value.result[0]
      setAssetManager(_assetManager)
    }).catch(err => {
      console.log(err);
    });

    const res4 = provider.callContract({ contractAddress: vaultAddress, entrypoint: "getDenominationAsset", calldata: [] })
    res4.then(value => {
      const _denominationAsset = (value.result[0])
      setDenominationAssetAddress(_denominationAsset)
      const name = provider.callContract({ contractAddress: _denominationAsset, entrypoint: "name", calldata: [] })
      name.then(value => {
        const _denominationAssetName = shortStringFeltToStr(BigInt(hexToDecimalString(value.result[0])))
        setDenominationAsset(_denominationAssetName)
      }).catch(err => {
        console.log(err);
      });
    }).catch(err => {
      console.log(err);
    });



    const res5 = provider.callContract({ contractAddress: vaultAddress, entrypoint: "totalSupply", calldata: [] })
    res5.then(value => {
      const _shareholders = hexToDecimalString(value.result[0])
      setShareHolders(_shareholders)
    }).catch(err => {
      console.log(err);
    });

    const res6 = provider.callContract({ contractAddress: vaultAddress, entrypoint: "sharesTotalSupply", calldata: [] })
    res6.then(value => {
      const _shareSupply = hexToDecimalString(value.result[0])
      setShareSupply(_shareSupply)
    }).catch(err => {
      console.log(err);
    });

    const res7 = provider.callContract({ contractAddress: comptroller, entrypoint: "getSharePrice", calldata: [hexToDecimalString(vaultAddress)] })
    res7.then(value => {
      const _sharePrice = hexToDecimalString(value.result[0])
      const sharePrice_ = parseFloat(_sharePrice) / 1000000000000000000
      setSharePrice(sharePrice_.toString())
    }).catch(err => {
      console.log(err);
    });


    const res8 = provider.callContract({ contractAddress: comptroller, entrypoint: "calc_gav", calldata: [hexToDecimalString(vaultAddress)] })
    res8.then(value => {
      const _gav = hexToDecimalString(value.result[0])
      const gav_ = parseFloat(_gav) / 1000000000000000000
      setGav(gav_.toString())
    }).catch(err => {
      console.log(err);
    });



    const res9 = provider.callContract({ contractAddress: feeManager, entrypoint: "getEntranceFee", calldata: [hexToDecimalString(vaultAddress)] })
    res9.then(value => {
      const _entranceFee = (hexToDecimalString(value.result[0]))
      setEntranceFee(_entranceFee)
    }).catch(err => {
      console.log(err);
    });

    const res10 = provider.callContract({ contractAddress: feeManager, entrypoint: "getExitFee", calldata: [hexToDecimalString(vaultAddress)] })
    res10.then(value => {
      const _exitFee = (hexToDecimalString(value.result[0]))
      setExitFee(_exitFee)
    }).catch(err => {
      console.log(err);
    });

    const res11 = provider.callContract({ contractAddress: feeManager, entrypoint: "getPerformanceFee", calldata: [hexToDecimalString(vaultAddress)] })
    res11.then(value => {
      const _performanceFee = (hexToDecimalString(value.result[0]))
      setPerformanceFee(_performanceFee)
    }).catch(err => {
      console.log(err);
    });

    const res12 = provider.callContract({ contractAddress: feeManager, entrypoint: "getManagementFee", calldata: [hexToDecimalString(vaultAddress)] })
    res12.then(value => {
      const _managementFee = (hexToDecimalString(value.result[0]))
      setManagementFee(_managementFee)
    }).catch(err => {
      console.log(err);
    });

    const res13 = provider.callContract({ contractAddress: policyManager, entrypoint: "checkIsPublic", calldata: [hexToDecimalString(vaultAddress)] })
    res13.then(value => {
      const _isPublic = (hexToDecimalString(value.result[0]))
      console.log(_isPublic)
      setIsPublic(_isPublic)
    }).catch(err => {
      console.log(err);
    });

    const res14 = provider.callContract({ contractAddress: policyManager, entrypoint: "getTimelock", calldata: [hexToDecimalString(vaultAddress)] })
    res14.then(value => {
      const _timeLock = (hexToDecimalString(value.result[0]))
      setTimeLock(_timeLock)
    }).catch(err => {
      console.log(err);
    });

    const res15 = provider.callContract({ contractAddress: policyManager, entrypoint: "getMaxminAmount", calldata: [hexToDecimalString(vaultAddress)] })
    res15.then(value => {

      const minAmount__ = (hexToDecimalString(value.result[0]))
      const minAmount_ = parseFloat(minAmount__) / 1000000000000000000
      setMinAmount(minAmount_.toString())
      const maxAmount__ = (hexToDecimalString(value.result[2]))
      const maxAmount_ = parseFloat(maxAmount__) / 1000000000000000000
      setMaxAmount(maxAmount_.toString())

    }).catch(err => {
      console.log(err);
    });



    // const res8 = provider.callContract({ contractAddress: feeManager, entrypoint: "getClaimedTimestamp", calldata: [vaultAddress] })
    // res3.then(value => {
    //   const _claimedTimestamp = (value.result[0])
    //   console.log(_claimedTimestamp)
    // }).catch(err => {
    //   console.log(err);
    // });

  }, []);




  useEffect(() => {
    console.log("useEffectAddress")
    const { account } = getStarknet()
    setAccountInterface(account)
    console.log("accountInteface set")
    console.log(accountInterface)

    const address_ = account.address
    setAcccountAddress(address_)
    if (address_ != "" && denominationAssetAddress != "deno") {
      const res1 = provider.callContract({ contractAddress: denominationAssetAddress, entrypoint: "balanceOf", calldata: [hexToDecimalString(address_)] })
      res1.then(value => {
        const userBalance__ = (hexToDecimalString(value.result[0]))
        const userBalance_ = parseFloat(userBalance__) / 1000000000000000000
        setUserBalance(userBalance_.toString())
      }).catch(err => {
        console.log(err);
      });
      const res2 = provider.callContract({ contractAddress: policyManager, entrypoint: "checkIsPublic", calldata: [hexToDecimalString(vaultAddress)] })
      res2.then(value => {
        const _isPublic = (hexToDecimalString(value.result[0]))
        if (_isPublic == "0") {
          const res3 = provider.callContract({ contractAddress: policyManager, entrypoint: "checkIsAllowedDepositor", calldata: [hexToDecimalString(vaultAddress), hexToDecimalString(address_)] })
          res3.then(value => {
            const _isAllowedDepositor = (hexToDecimalString(value.result[0]))
            setIsAllowedDepositor(_isAllowedDepositor)

          }).catch(err => {
            console.log(err);
          });
        }
        else {
          setIsAllowedDepositor("1")
        }
      }).catch(err => {
        console.log(err);
      });
      const res3 = provider.callContract({ contractAddress: vaultAddress, entrypoint: "getBalanceOf", calldata: [hexToDecimalString(address_)] })
      res3.then(value => {
        const userShareBalance__ = (hexToDecimalString(value.result[0]))
        console.log("usersharebalance")
        console.log(userShareBalance__)
        setUserShareBalance(userShareBalance__)
        for (let pas = 0; pas < (parseFloat(userShareBalance__)); pas++) {
          const res4 = provider.callContract({ contractAddress: vaultAddress, entrypoint: "tokenOfOwnerByIndex", calldata: [hexToDecimalString(address_), pas.toString(), "0"], })
          res4.then(value => {
            const tokenId = (hexToDecimalString(value.result[0]))
            console.log("tokenId")
            console.log(tokenId)
            const res5 = provider.callContract({ contractAddress: vaultAddress, entrypoint: "sharesBalance", calldata: [tokenId, "0"], })
            res5.then(value => {
              const sharesBalance = (hexToDecimalString(value.result[0]))
              console.log("share balance")
              console.log(sharesBalance)
              let userShareInfo__: userShareData = userShareInfo
              userShareInfo__.push(
                {
                  tokenId: tokenId,
                  shareAmount: sharesBalance,
                }
              )
              console.log(userShareInfo__)
              setUserShareInfo(userShareInfo__)
            }).catch(err => {
              console.log(err);
            });
          }).catch(err => {
            console.log(err);
          });
        }
      }).catch(err => {
        console.log(err);
      });
    }

  }, [count, denominationAssetAddress]);



  useEffect(() => {
    if (denominationAssetAddress != "deno" && gav != "0") {
      const res9 = provider.callContract({ contractAddress: vaultAddress, entrypoint: "getTrackedAssets", calldata: [] })
      res9.then(value => {
        let tab__ = value.result
        let size_ = tab__.shift()
        let tab_ = tab__
        for (let pas = 0; pas < tab_.length; pas++) {
          let address_ = tab_[pas]
          const name = provider.callContract({ contractAddress: address_, entrypoint: "name", calldata: [] })
          name.then(value => {
            const coinName_ = shortStringFeltToStr(BigInt(hexToDecimalString(value.result[0])))

            const symbol = provider.callContract({ contractAddress: address_, entrypoint: "symbol", calldata: [] })
            symbol.then(value => {
              const coinSymbol_ = shortStringFeltToStr(BigInt(hexToDecimalString(value.result[0])))

              const balance = provider.callContract({ contractAddress: address_, entrypoint: "balanceOf", calldata: [hexToDecimalString(vaultAddress)] })
              balance.then(value => {
                const __coinBalance = hexToDecimalString(value.result[0])
                const _coinBalance = parseFloat(__coinBalance) / 1000000000000000000
                const coinBalance_ = _coinBalance.toString()
                const price = provider.callContract({ contractAddress: valueIntepretor, entrypoint: "calculAssetValue", calldata: [hexToDecimalString(address_), __coinBalance, "0", hexToDecimalString(denominationAssetAddress)] })
                price.then(value => {
                  const __coinPrice = hexToDecimalString(value.result[0])
                  const _coinPrice = parseFloat(__coinPrice) / 1000000000000000000
                  const coinPrice_ = _coinPrice.toString()

                  let coinAllocation_ = ((parseFloat(gav) / parseFloat(coinPrice_)) * 100).toString()
                  coinAllocation_ = coinAllocation_.concat("%")

                  let portfolioData2: PortfolioData = trackedAssets
                  portfolioData2.push(
                    {
                      coinName: coinName_,
                      coinSymbol: coinSymbol_,
                      balance: coinBalance_,
                      value: coinPrice_,
                      allocation: coinAllocation_,
                    }
                  )
                  console.log(portfolioData2)
                  setTrackedAssets(portfolioData2)
                  let TrackedAssetLen_ = trackedAssetsLen + 1
                  setTrackedAssetsLen(TrackedAssetLen_)
                }).catch(err => {
                  console.log(err);
                });
              }).catch(err => {
                console.log(err);
              });
            }).catch(err => {
              console.log(err);
            });
          }).catch(err => {
            console.log(err);
          });
        }
      }).catch(err => {
        console.log(err);
      });
    }

  }, [denominationAssetAddress, gav]);






  const depositorsData = [
    {
      depositor: '0x123...ab',
      Since: '2 Months',
      numberOfShares: 2300,
      percentage: 35
    },
    {
      depositor: '0x123...ab',
      Since: '2 Months',
      numberOfShares: 2300,
      percentage: 35
    },
    {
      depositor: '0x123...ab',
      Since: '2 Months',
      numberOfShares: 2300,
      percentage: 35
    },
    {
      depositor: '0x123...ab',
      Since: '2 Months',
      numberOfShares: 2300,
      percentage: 35
    },
    {
      depositor: '0x123...ab',
      Since: '2 Months',
      numberOfShares: 2300,
      percentage: 35
    }
  ];

  const multicall = async (_tab: any[], _tabA: any[]) => {
    console.log("invoke")
    console.log(denominationAssetAddress)
    console.log(comptroller)
    let tx1 = await accountInterface.execute(
      [
        {
          contractAddress: denominationAssetAddress,
          entrypoint: 'approve',
          calldata: _tabA,
        },
        {
          contractAddress: comptroller,
          entrypoint: 'buyShare',
          calldata: _tab,
        },
      ]
    );
    console.log(tx1)
    // return (tx1)
  };

  return (<>
    <div className={`${styles.pageContainer}`}>
      <div className={`${styles.head}`}>
        <div>
          <div className={`${styles.title}`}>
            <FakeImage width='120px' height='120px' fillColor='black' borderRadius='50%' />
            <span className='fs-48' style={{ fontWeight: "bold" }}> {name} </span>
          </div>

          <div className={`${styles.description}`}>
            <span className='fs-22' style={{ fontWeight: "400" }}> Magnety Staking Vault receive 16% of total protocol platform fees, funds are used buy Starknet BlueChip</span>
            <div>
              <span className='fs-20' style={{ fontWeight: "400" }}> #DeFi </span>
              <span className='fs-20' style={{ fontWeight: "400" }}> #HodL </span>
              <span className='fs-20' style={{ fontWeight: "400" }}> #ETH </span>
              <span className='fs-20' style={{ fontWeight: "400" }}> #StarknetGems </span>
            </div>
          </  div>
        </div>

        <div>
          <div className={`${styles.generalInformation}`}>
            <div>
              <div>
                <div className='fs-20'>Gross Asset Value </div>
              </div>
              <div>
                <div className='fs-28'> {gav} {denominationAsset} </div>
              </div>
            </div>
            <div>
              <div>
                <div className='fs-20'> Shareholders</div>
              </div>
              <div>
                <div className='fs-28'> {shareHolders}</div>
              </div>
            </div>
            <div>
              <div>
                <div className='fs-20'>Projected APR </div>
              </div>
              <div>
                <div className='fs-28' style={{ color: "#0dab45" }}>20.3%</div>
              </div>
            </div>
            <div>
              <div>
                <div className='fs-20'>Risk Factor </div>
              </div>
              <div>
                <div className='fs-28' style={{ color: "#FF0000" }}> 8 / 16</div>
              </div>
            </div>
          </div>
        </div>

      </div>
      <div className={`${styles.cardWrapper2}`}>
        {/* Left Side */}
        <div>
          <div className='bg__dotted'>
            <div className={`${styles.assetManager}`}>
              <FakeImage width='100px' height='100px' fillColor='black' borderRadius='50%' />
              <div>
                <div>
                  <div className='fs-28' style={{ fontWeight: "semi-bold" }}>Managed by
                    <a href="https://google.com" target="_blank" rel="noreferrer">
                      {assetManager.substring(0, 5)}...
                    </a>
                  </div>
                </div>
                <div>
                  <div>
                    <div >Last active:    </div>
                    <div style={{ fontWeight: "bold" }}>18 days ago </div>
                  </div>
                  <div>
                    <div >Fund's allocation:   </div>
                    <div style={{ fontWeight: "bold" }}> 60%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Tabs activeTab='2'>
            <Tab label='Mint shares' id='1' >
              <div className={` bg__dotted`}>
                <div className={`${styles.mint}`}>

                  <div className='fs-14' style={{ fontWeight: "bold" }}>
                    <div>
                      {acccountAddress.substring(0, 7)}...
                    </div>
                    <div className='fs-14 '>
                      &nbsp;&nbsp;&nbsp;{isAllowedDepositor ? "allowed depositor" : "not allowed to mint"}
                    </div>
                  </div>
                  <div>
                  </div>
                  <div>
                    <form
                      onSubmit={(e: React.SyntheticEvent) => {
                        e.preventDefault();
                        const target = e.target as typeof e.target & {
                          amount: { value: string };
                        };
                        const amount = target.amount.value; // typechecks!
                        console.log(amount)
                        const newAmount = parseFloat(amount) * 1000000000000000000
                        console.log(newAmount.toString())
                        console.log(newAmount)

                        let Tab: string[] = [];
                        Tab.push(hexToDecimalString(vaultAddress))
                        Tab.push(hexToDecimalString(denominationAssetAddress))
                        Tab.push(newAmount.toString())
                        Tab.push("0")
                        let TabA: string[] = [];
                        TabA.push(hexToDecimalString(comptroller))
                        TabA.push((newAmount.toString()))
                        TabA.push("0")
                        console.log(Tab)
                        console.log(TabA)
                        if (!accountInterface.address) {
                          console.log("no account detected")
                        }
                        else {
                          console.log("connected")
                          multicall(Tab, TabA)
                        }
                      }}
                    >
                      <div>
                        <label>
                          ETH AMOUNT:
                          <input type="string" name="amount" />
                        </label>
                      </div>
                      <div>
                        <input type="submit" value="Log in" />
                      </div>
                    </form>
                  </div>

                  <div>
                    you'll receive
                  </div>

                </div>
              </div>
            </Tab>
            <Tab label='Sell Shares' id='2'>
              {sellTokenId == "" ?
                <div className={` bg__dotted`}>
                  <div className={`${styles.mint}`}>

                    <div className='fs-14' style={{ fontWeight: "bold" }}>
                      <div>
                        {acccountAddress.substring(0, 7)}...
                      </div>
                      <div className='fs-14 '>
                        &nbsp;&nbsp;&nbsp;{userShareBalance == "" ? "Fetching your shares" : userShareBalance == "0" ? "you don't have any shares" : "See below your shares"}
                      </div>
                    </div>
                    {userShareInfo.map((p, index) => (
                      <div>
                        <div>
                          tokenID : {p.tokenId}
                        </div>
                        <div>
                          Share amount: {p.shareAmount}
                        </div>
                        <div>
                          <button data-color="secondary" style={{ margin: '8px auto' }} onClick={() => setSellTokenId(p.tokenId)}>Sell</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                :
                <div className={` bg__dotted`}>
                  <div className={`${styles.mint}`}>

                    <div className='fs-14' style={{ fontWeight: "bold" }}>
                      <div>
                        tokenID : {sellTokenId}
                      </div>
                      <div className='fs-14 '>
                        &nbsp;&nbsp;&nbsp; You are allowed to sell this share
                      </div>
                    </div>
                    <form
                      onSubmit={(e: React.SyntheticEvent) => {
                        e.preventDefault();
                        const target = e.target as typeof e.target & {
                          percent: { value: string };
                        };
                        const amount = target.percent.value; // typechecks!
                        setPercentShare(amount)
                      }}
                    >
                      <div>
                        <label>
                          <input type="string" name="percent" />
                        </label>
                      </div>
                      <div>
                        <input type="submit" value="Log in" />
                      </div>
                    </form>
                    <div>
                      {percentShare == "" ?
                        <>
                          You own {userShareInfo[parseFloat(sellTokenId)].shareAmount} shares, how many Shares do you want to sell
                        </>
                        :
                        <>
                          You selected {percentShare}%, which represents {parseFloat(userShareInfo[parseFloat(sellTokenId)].shareAmount) * (parseFloat(percentShare) / 100)} {symbol} or {parseFloat(userShareInfo[parseFloat(sellTokenId)].shareAmount) * (parseFloat(percentShare) / 100) * parseFloat(sharePrice)} {denominationAsset}
                        </>
                      }

                    </div>
                    <div>
                      <div>
                        Reedem funds with
                      </div>
                      <div>
                        {trackedAssets.map((p, index) => (
                          <div>
                            <div>
                              <button type="button" style={{ width: "50px" }}>
                                {returnImagefromSymbol(p.coinSymbol)}
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div>
                        <div>

                          <div className={`${styles.portfolioTable} bg__dotted`}>
                            <table cellSpacing="0" cellPadding="0">
                              <thead>
                                <tr>
                                  <th>Assets</th>
                                  <th>Balance</th>
                                  <th>Value</th>

                                  <th>Allocation</th>
                                </tr>
                              </thead>
                              <tbody>
                                {trackedAssets.map((p, index) => (
                                  <tr key={index}>
                                    <td>
                                      <FakeImage width='50px' height='50px' fillColor='var(--color-secondary)' borderRadius='50%'></FakeImage>
                                      <div>
                                        <span> {p.coinName} </span>
                                        <span> {p.coinSymbol} </span>
                                      </div>
                                    </td>
                                    <td> {p.balance} {p.coinSymbol}</td>
                                    <td>{p.value} {denominationAsset}</td>
                                    <td>{p.allocation}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              }
            </Tab>
          </Tabs>

        </div>
        {/* Right Side */}
        <div className='bg__dotted'>
          <div className='d-flex justify-content-space-between'>
            <div>{symbol} price
              <div style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: '16px'
              }}>
                <span className='fs-28'> {sharePrice} {denominationAsset}</span>
                <span className='fs-24 text-success'> +1.34% </span>
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
            <Line data={data} options={options} ></Line>
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
            {trackedAssetsLen > 0 ?

              <div className={`${styles.portfolioTable} bg__dotted`}>
                <table cellSpacing="0" cellPadding="0">
                  <thead>
                    <tr>
                      <th>Assets</th>
                      <th>Balance</th>
                      <th>Value</th>

                      <th>Allocation</th>
                    </tr>
                  </thead>
                  <tbody>
                    {trackedAssets.map((p, index) => (
                      <tr key={index}>
                        <td>
                          <FakeImage width='50px' height='50px' fillColor='var(--color-secondary)' borderRadius='50%'></FakeImage>
                          <div>
                            <span> {p.coinName} </span>
                            <span> {p.coinSymbol} </span>
                          </div>
                        </td>
                        <td> {p.balance} {p.coinSymbol}</td>
                        <td>{p.value} {denominationAsset}</td>
                        <td>{p.allocation}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              :
              <div className={`${styles.portfolioTable} bg__dotted`}>
                <table cellSpacing="0" cellPadding="0">
                  <thead>
                    <tr>
                      <th></th>
                      <th></th>
                      <th></th>

                    </tr>
                  </thead>
                  <tbody>
                    <tr key={1}>
                      <td> .</td>
                      <td> .</td>
                      <td> Fetching Portofolio, please wait..</td>

                    </tr>

                  </tbody>
                </table>
              </div>
            }
          </Tab>
          <Tab label='Fees' id='2'>
            <div className={`${styles.feesTable} bg__dotted`} >
              <table cellSpacing="0" cellPadding="0">
                <thead>
                  <tr>
                    <th>Fee Type</th>
                    <th>Fee Value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr key={1}>
                    <td>
                      Entrance Fee
                    </td>
                    <td>
                      <div>
                        <div> {entranceFee}%</div>
                      </div>
                    </td>
                  </tr>
                  <tr key={2}>
                    <td>
                      Exit Fee
                    </td>
                    <td>
                      <div>
                        <div> {exitFee}%</div>
                      </div>
                    </td>
                  </tr>
                  <tr key={3}>
                    <td>
                      Performance Fee
                    </td>
                    <td>
                      <div>
                        <div> {performanceFee}%</div>
                      </div>
                    </td>
                  </tr>
                  <tr key={4}>
                    <td>
                      Management Fee
                    </td>
                    <td>
                      <div>
                        <div> {managementFee}%</div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Tab>
          <Tab label='Policies' id='3'>
            <div className={`bg__dotted ${styles.policiesTabContent}`}>
              {isPublic ?
                <div>
                  <div className='fs-24 fw-600'>{name} is a public fund</div>
                </div>
                :
                <div>
                  <div className='fs-24 fw-600'>{name} is a private fund</div>

                </div>
              }
              <div>
                <div className='fs-24 fw-600'>Deposit Limits</div>
                <div className='fs-20 fw-600'>minimum : {minAmount} {denominationAsset}</div>
                <div className='fs-20 fw-600'>maximum : {maxAmount} {denominationAsset}</div>
              </div>
              <div>
                <div className='fs-24 fw-600'>Timelock</div>
                <div className='fs-20 fw-600'>After minting shares, you'll have to wait : {timeLock} seconds before you can sell it</div>
              </div>
              <div>
                <div className='fs-24 fw-600'>Allowed Asset to Track</div>

              </div>
              <div>
                <div className='fs-24 fw-600'>Allowed Protocol to interact with</div>

              </div>
            </div>
          </Tab>
          <Tab label='Financials' id='4'>
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
                    <span className='fw-700'>1,993,516.452 MGTY</span>
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
                  {depositorsData.map((d, index) => (
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
              <div className='bg__dotted'>
                <div>
                  <div>
                    <div>
                      <div className='fs-12'>29 Apr 2022 01:22</div>
                      <div className='fs-24 fw-600'>Deposit</div>
                    </div>
                    <div>
                      <FakeImage height='50px' width='50px' borderRadius='50%' fillColor='black' />
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

        </Tabs>
      </div>
    </div>
  </>)
}

export default vault