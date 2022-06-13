import React, { useEffect } from "react";
import { NextPage } from "next";
import Link from "next/link";
import styles from "~/styles/vault.module.scss";
import FakeImage from "~/components/FakeImage";
import Image from "next/image";
import { useAppSelector } from "../app/hooks";
import { selectCount } from "../app/counterSlice";
import "chart.js/auto";
import { Chart, Line } from "react-chartjs-2";
import { Select, Button, ButtonGroup, SimpleGrid, Box } from "@chakra-ui/react";
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Text,
  Center,
} from "@chakra-ui/react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";
import {
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
} from "@chakra-ui/react";
import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
} from "@chakra-ui/react";
import {
  ChartData,
  ScatterDataPoint,
  ChartOptions,
  CoreChartOptions,
  ElementChartOptions,
  PluginChartOptions,
  DatasetChartOptions,
  ScaleChartOptions,
  LineControllerChartOptions,
} from "chart.js/auto";
import { _DeepPartialObject } from "chart.js/types/utils";
import Tabs from "~/components/Tabs";
import Tab from "~/components/Tab";
import { getStarknet, AccountInterface } from "../starknetWrapper";
import { contractAddress } from "~/registry/address";
import { hexToDecimalString } from "starknet/dist/utils/number";
import { number } from "starknet";
import Ether from "../image/ETH.png";
import { Flex, Spacer } from "@chakra-ui/react";
import { Slider as MultiSlider } from "react-multi-thumb-slider";
import { MaterialSlider } from "react-multi-thumb-slider";

const { provider, account } = getStarknet();

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const times = (n: number, fn: (i: number) => any = (i: number) => i): any[] =>
  Array.from({ length: n }, (_, x) => fn(x));

const random = (lower: number, upper: number, isIncludeUpper = false) => {
  const min = Math.min(lower, upper);
  const max = Math.max(lower, upper);
  return Math.round((Math.random() * (max - min) + min) * 100) / 100;
};

const randomChartData = (
  n: number,
  startAt = 0,
  maxChanges = 10,
  minimumValue = 0,
  maximumValue = 100,
) => {
  return [
    ...times(n, (i) => {
      if (current === undefined) {
        current = startAt;
      } else {
        const min = random(
          current,
          Math.max(current - maxChanges, minimumValue),
          true,
        );
        const max = random(
          current,
          Math.min(current + maxChanges, maximumValue),
          true,
        );
        current = random(min, max, true);
      }
      return current;
    }),
  ];
};

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
      label: "Initial",
      data: [...times(numberOfData, (i) => chartData[0])],
      borderDash: [5, 5],
      borderColor: "rgba(75,192,192,0.5)",
      pointRadius: 0,
      pointHoverRadius: 0,
    },
    {
      label: "Current",
      data: [...times(numberOfData, (i) => chartData[chartData.length - 1])],
      borderDash: [5, 5],
      borderColor:
        chartData[chartData.length - 1] > chartData[0]
          ? "#17a54380"
          : "#ff000080",
      pointRadius: 0,
      pointHoverRadius: 0,
    },
  ],
};

const options = {
  responsive: true,
  scales: {
    x: {
      ticks: {
        display: false,
      },
      grid: {
        display: false,
      },
    },
    y: {
      ticks: {
        display: false,
      },
      grid: {
        display: false,
      },
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
    },
  },
};

type PortfolioData = {
  coinName: string;
  coinSymbol: string;
  balance: string;
  value: string;
  allocation: string;
  selected: boolean;
  address: string;
}[];

type SellShareData = {
  symbol: string;
  percent: string;
  address: string;
}[];

type userShareData = {
  tokenId: string;
  shareAmount: string;
  pricePurchased: string;
}[];

import VDatabase from "./vault/vaults.json";

const vault: NextPage = () => {
  const count = useAppSelector(selectCount);

  const vaultAddress = contractAddress.StakingVault;
  const comptroller = contractAddress.Comptroller;
  const valueIntepretor = contractAddress.valueInterpretor;
  const feeManager = contractAddress.FeeManager;
  const policyManager = contractAddress.PolicyManager;

  const [name, setName] = React.useState<string>("name");
  const [symbol, setSymbol] = React.useState<string>("symbol");
  const [accountInterface, setAccountInterface] =
    React.useState<AccountInterface>(account);
  const [acccountAddress, setAcccountAddress] =
    React.useState<string>("acccountAddress");
  const [assetManager, setAssetManager] = React.useState<string>("add");
  const [denominationAsset, setDenominationAsset] =
    React.useState<string>("deno");
  const [entranceFee, setEntranceFee] = React.useState<string>("");
  const [exitFee, setExitFee] = React.useState<string>("");
  const [performanceFee, setPerformanceFee] = React.useState<string>("");
  const [managementFee, setManagementFee] = React.useState<string>("");
  const [isPublic, setIsPublic] = React.useState<string>("");
  const [timeLock, setTimeLock] = React.useState<string>("");
  const [minAmount, setMinAmount] = React.useState<string>("");
  const [maxAmount, setMaxAmount] = React.useState<string>("");
  const [denominationAssetAddress, setDenominationAssetAddress] =
    React.useState<string>("deno");
  const [shareHolders, setShareHolders] = React.useState<string>("0");
  const [shareSupply, setShareSupply] = React.useState<string>("0");
  const [sharePrice, setSharePrice] = React.useState<string>("0");
  const [gav, setGav] = React.useState<string>("0");
  const [trackedAssets, setTrackedAssets] = React.useState<PortfolioData>([]);
  const [userShareInfo, setUserShareInfo] = React.useState<userShareData>([]);
  const [sellShareTab, setSellShareTab] = React.useState<SellShareData>([]);

  const [sellList, setSellList] = React.useState<userShareData>([]);
  const [trackedAssetsLen, setTrackedAssetsLen] = React.useState<number>(0);
  const [userBalance, setUserBalance] = React.useState<string>("0");
  const [isAllowedDepositor, setIsAllowedDepositor] =
    React.useState<string>("0");
  const [userShareBalance, setUserShareBalance] = React.useState<string>("");
  const [sellTokenId, setSellTokenId] = React.useState<string>("");
  const [percentShare, setPercentShare] = React.useState<string>("0");
  const [buyValue, setBuyValue] = React.useState<any>(0);
  const [sellValue, setSellValue] = React.useState<any>(0);
  const [onChange, setOnChange] = React.useState<boolean>(true);

  const handleChange3 = (value) => setSellValue(value);

  const addPercent = (symbol: string, address: string, index: number) => {
    console.log("current sell share tab");
    console.log(sellShareTab);

    const currentSaleTabe = sellShareTab;

    const newElem = {
      symbol: symbol,
      percent: sellValue,
      address: address,
    };

    for (let pas = 0; pas < currentSaleTabe.length; pas++) {
      if (newElem.symbol == currentSaleTabe[pas].symbol) {
        const currentTab: PortfolioData = trackedAssets;
        currentTab[index].selected = false;
        setOnChange(!onChange);
        return;
      }
    }
    currentSaleTabe.push(newElem);
    setSellShareTab(currentSaleTabe);
    console.log("new sell share tab");
    console.log(sellShareTab);

    const currentTab: PortfolioData = trackedAssets;
    currentTab[index].selected = false;
    setOnChange(!onChange);
  };

  const clearSellTab = () => {
    setSellShareTab([]);
  };

  const handleSelected = (index: number) => {
    const currentTab: PortfolioData = trackedAssets;
    for (let pas = 0; pas < trackedAssets.length; pas++) {
      if (index == pas) {
        currentTab[pas].selected = true;
      } else {
        currentTab[pas].selected = false;
      }
    }
    setTrackedAssets(currentTab);

    setOnChange(!onChange);
  };

  const handleChange = (value) => setBuyValue(value);
  const handleChange2 = (value) => setPercentShare(value);
  function shortStringFeltToStr(felt: bigint): string {
    const newStrB = Buffer.from(felt.toString(16), "hex");
    return newStrB.toString();
  }

  function returnImagefromSymbol(symb: string) {
    if (
      symb == "Ether" ||
      symb == "ETH" ||
      symb ==
        "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7"
    ) {
      return <Image src={Ether} alt="eth" />;
    }
  }
  function returnFundImage() {
    return <FakeImage fillColor="black" borderRadius="50%" />;
  }

  useEffect(() => {
    const res = provider.callContract({
      contractAddress: vaultAddress,
      entrypoint: "getName",
      calldata: [],
    });
    res
      .then((value) => {
        const _name = shortStringFeltToStr(
          BigInt(hexToDecimalString(value.result[0])),
        );
        setName(_name);
      })
      .catch((err) => {
        console.log(err);
      });
    const res2 = provider.callContract({
      contractAddress: vaultAddress,
      entrypoint: "getSymbol",
      calldata: [],
    });
    res2
      .then((value) => {
        const _symbol = shortStringFeltToStr(
          BigInt(hexToDecimalString(value.result[0])),
        );
        setSymbol(_symbol);
      })
      .catch((err) => {
        console.log(err);
      });

    const res3 = provider.callContract({
      contractAddress: vaultAddress,
      entrypoint: "getAssetManager",
      calldata: [],
    });
    res3
      .then((value) => {
        const _assetManager = value.result[0];
        setAssetManager(_assetManager);
      })
      .catch((err) => {
        console.log(err);
      });

    const res4 = provider.callContract({
      contractAddress: vaultAddress,
      entrypoint: "getDenominationAsset",
      calldata: [],
    });
    res4
      .then((value) => {
        const _denominationAsset = value.result[0];
        setDenominationAssetAddress(_denominationAsset);
        const name = provider.callContract({
          contractAddress: _denominationAsset,
          entrypoint: "name",
          calldata: [],
        });
        name
          .then((value) => {
            const _denominationAssetName = shortStringFeltToStr(
              BigInt(hexToDecimalString(value.result[0])),
            );
            setDenominationAsset(_denominationAssetName);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });

    const res5 = provider.callContract({
      contractAddress: vaultAddress,
      entrypoint: "totalSupply",
      calldata: [],
    });
    res5
      .then((value) => {
        const _shareholders = hexToDecimalString(value.result[0]);
        setShareHolders(_shareholders);
      })
      .catch((err) => {
        console.log(err);
      });

    const res6 = provider.callContract({
      contractAddress: vaultAddress,
      entrypoint: "sharesTotalSupply",
      calldata: [],
    });
    res6
      .then((value) => {
        const _shareSupply = hexToDecimalString(value.result[0]);
        setShareSupply(_shareSupply);
      })
      .catch((err) => {
        console.log(err);
      });

    const res7 = provider.callContract({
      contractAddress: comptroller,
      entrypoint: "getSharePrice",
      calldata: [hexToDecimalString(vaultAddress)],
    });
    res7
      .then((value) => {
        const _sharePrice = hexToDecimalString(value.result[0]);
        const sharePrice_ = parseFloat(_sharePrice) / 1000000000000000000;
        setSharePrice(sharePrice_.toString());
      })
      .catch((err) => {
        console.log(err);
      });

    const res8 = provider.callContract({
      contractAddress: comptroller,
      entrypoint: "calc_gav",
      calldata: [hexToDecimalString(vaultAddress)],
    });
    res8
      .then((value) => {
        const _gav = hexToDecimalString(value.result[0]);
        const gav_ = parseFloat(_gav) / 1000000000000000000;
        setGav(gav_.toString());
      })
      .catch((err) => {
        console.log(err);
      });

    const res9 = provider.callContract({
      contractAddress: feeManager,
      entrypoint: "getEntranceFee",
      calldata: [hexToDecimalString(vaultAddress)],
    });
    res9
      .then((value) => {
        const _entranceFee = hexToDecimalString(value.result[0]);
        setEntranceFee(_entranceFee);
      })
      .catch((err) => {
        console.log(err);
      });

    const res10 = provider.callContract({
      contractAddress: feeManager,
      entrypoint: "getExitFee",
      calldata: [hexToDecimalString(vaultAddress)],
    });
    res10
      .then((value) => {
        const _exitFee = hexToDecimalString(value.result[0]);
        setExitFee(_exitFee);
      })
      .catch((err) => {
        console.log(err);
      });

    const res11 = provider.callContract({
      contractAddress: feeManager,
      entrypoint: "getPerformanceFee",
      calldata: [hexToDecimalString(vaultAddress)],
    });
    res11
      .then((value) => {
        const _performanceFee = hexToDecimalString(value.result[0]);
        setPerformanceFee(_performanceFee);
      })
      .catch((err) => {
        console.log(err);
      });

    const res12 = provider.callContract({
      contractAddress: feeManager,
      entrypoint: "getManagementFee",
      calldata: [hexToDecimalString(vaultAddress)],
    });
    res12
      .then((value) => {
        const _managementFee = hexToDecimalString(value.result[0]);
        setManagementFee(_managementFee);
      })
      .catch((err) => {
        console.log(err);
      });

    const res13 = provider.callContract({
      contractAddress: policyManager,
      entrypoint: "checkIsPublic",
      calldata: [hexToDecimalString(vaultAddress)],
    });
    res13
      .then((value) => {
        const _isPublic = hexToDecimalString(value.result[0]);
        console.log(_isPublic);
        setIsPublic(_isPublic);
      })
      .catch((err) => {
        console.log(err);
      });

    const res14 = provider.callContract({
      contractAddress: policyManager,
      entrypoint: "getTimelock",
      calldata: [hexToDecimalString(vaultAddress)],
    });
    res14
      .then((value) => {
        const _timeLock = hexToDecimalString(value.result[0]);
        setTimeLock(_timeLock);
      })
      .catch((err) => {
        console.log(err);
      });

    const res15 = provider.callContract({
      contractAddress: policyManager,
      entrypoint: "getMaxminAmount",
      calldata: [hexToDecimalString(vaultAddress)],
    });
    res15
      .then((value) => {
        const minAmount__ = hexToDecimalString(value.result[0]);
        const minAmount_ = parseFloat(minAmount__) / 1000000000000000000;
        setMinAmount(minAmount_.toString());
        const maxAmount__ = hexToDecimalString(value.result[2]);
        const maxAmount_ = parseFloat(maxAmount__) / 1000000000000000000;
        setMaxAmount(maxAmount_.toString());
      })
      .catch((err) => {
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
    console.log("useEffectAddress");
    const { account } = getStarknet();
    setAccountInterface(account);
    console.log("accountInteface set");
    console.log(accountInterface);

    const address_ = account.address;
    setAcccountAddress(address_);
    if (address_ != "" && denominationAssetAddress != "deno") {
      const res1 = provider.callContract({
        contractAddress: denominationAssetAddress,
        entrypoint: "balanceOf",
        calldata: [hexToDecimalString(address_)],
      });
      res1
        .then((value) => {
          const userBalance__ = hexToDecimalString(value.result[0]);
          const userBalance_ = parseFloat(userBalance__) / 1000000000000000000;
          setUserBalance(userBalance_.toString());
        })
        .catch((err) => {
          console.log(err);
        });
      const res2 = provider.callContract({
        contractAddress: policyManager,
        entrypoint: "checkIsPublic",
        calldata: [hexToDecimalString(vaultAddress)],
      });
      res2
        .then((value) => {
          const _isPublic = hexToDecimalString(value.result[0]);
          if (_isPublic == "0") {
            const res3 = provider.callContract({
              contractAddress: policyManager,
              entrypoint: "checkIsAllowedDepositor",
              calldata: [
                hexToDecimalString(vaultAddress),
                hexToDecimalString(address_),
              ],
            });
            res3
              .then((value) => {
                const _isAllowedDepositor = hexToDecimalString(value.result[0]);
                setIsAllowedDepositor(_isAllowedDepositor);
              })
              .catch((err) => {
                console.log(err);
              });
          } else {
            setIsAllowedDepositor("1");
          }
        })
        .catch((err) => {
          console.log(err);
        });
      const res3 = provider.callContract({
        contractAddress: vaultAddress,
        entrypoint: "getBalanceOf",
        calldata: [hexToDecimalString(address_)],
      });
      res3
        .then((value) => {
          const userShareBalance__ = hexToDecimalString(value.result[0]);
          console.log("usersharebalance");
          console.log(userShareBalance__);
          setUserShareBalance(userShareBalance__);
          for (let pas = 0; pas < parseFloat(userShareBalance__); pas++) {
            const res4 = provider.callContract({
              contractAddress: vaultAddress,
              entrypoint: "tokenOfOwnerByIndex",
              calldata: [hexToDecimalString(address_), pas.toString(), "0"],
            });
            res4
              .then((value) => {
                const tokenId = hexToDecimalString(value.result[0]);
                console.log("tokenId");
                console.log(tokenId);
                const res5 = provider.callContract({
                  contractAddress: vaultAddress,
                  entrypoint: "sharesBalance",
                  calldata: [tokenId, "0"],
                });
                res5
                  .then((value) => {
                    const sharesBalance = hexToDecimalString(value.result[0]);
                    console.log("share balance");
                    console.log(sharesBalance);

                    const res6 = provider.callContract({
                      contractAddress: vaultAddress,
                      entrypoint: "sharePricePurchased",
                      calldata: [tokenId, "0"],
                    });
                    res6
                      .then((value) => {
                        const __sharePricePurchased = hexToDecimalString(
                          value.result[0],
                        );
                        const _sharePricePurchased =
                          parseFloat(__sharePricePurchased) /
                          1000000000000000000;
                        const sharePricePurchased =
                          _sharePricePurchased.toString();
                        const userShareInfo__: userShareData = userShareInfo;
                        userShareInfo__.push({
                          tokenId: tokenId,
                          shareAmount: sharesBalance,
                          pricePurchased: sharePricePurchased,
                        });
                        console.log(userShareInfo__);
                        setUserShareInfo(userShareInfo__);
                      })
                      .catch((err) => {
                        console.log(err);
                      });
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              })
              .catch((err) => {
                console.log(err);
              });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [count, denominationAssetAddress]);

  useEffect(() => {
    if (denominationAssetAddress != "deno" && gav != "0") {
      const res9 = provider.callContract({
        contractAddress: vaultAddress,
        entrypoint: "getTrackedAssets",
        calldata: [],
      });
      res9
        .then((value) => {
          const tab__ = value.result;
          const size_ = tab__.shift();
          const tab_ = tab__;
          for (let pas = 0; pas < tab_.length; pas++) {
            const address_ = tab_[pas];
            const name = provider.callContract({
              contractAddress: address_,
              entrypoint: "name",
              calldata: [],
            });
            name
              .then((value) => {
                const coinName_ = shortStringFeltToStr(
                  BigInt(hexToDecimalString(value.result[0])),
                );

                const symbol = provider.callContract({
                  contractAddress: address_,
                  entrypoint: "symbol",
                  calldata: [],
                });
                symbol
                  .then((value) => {
                    const coinSymbol_ = shortStringFeltToStr(
                      BigInt(hexToDecimalString(value.result[0])),
                    );

                    const balance = provider.callContract({
                      contractAddress: address_,
                      entrypoint: "balanceOf",
                      calldata: [hexToDecimalString(vaultAddress)],
                    });
                    balance
                      .then((value) => {
                        const __coinBalance = hexToDecimalString(
                          value.result[0],
                        );
                        const _coinBalance =
                          parseFloat(__coinBalance) / 1000000000000000000;
                        const coinBalance_ = _coinBalance.toString();
                        const price = provider.callContract({
                          contractAddress: valueIntepretor,
                          entrypoint: "calculAssetValue",
                          calldata: [
                            hexToDecimalString(address_),
                            __coinBalance,
                            "0",
                            hexToDecimalString(denominationAssetAddress),
                          ],
                        });
                        price
                          .then((value) => {
                            const __coinPrice = hexToDecimalString(
                              value.result[0],
                            );
                            const _coinPrice =
                              parseFloat(__coinPrice) / 1000000000000000000;
                            const coinPrice_ = _coinPrice.toString();

                            let coinAllocation_ = (
                              (parseFloat(gav) / parseFloat(coinPrice_)) *
                              100
                            ).toString();
                            coinAllocation_ = coinAllocation_.concat("%");

                            const portfolioData2: PortfolioData = trackedAssets;
                            portfolioData2.push({
                              coinName: coinName_,
                              coinSymbol: coinSymbol_,
                              balance: coinBalance_,
                              value: coinPrice_,
                              allocation: coinAllocation_,
                              selected: false,
                              address: address_,
                            });
                            console.log(portfolioData2);
                            setTrackedAssets(portfolioData2);
                            const TrackedAssetLen_ = trackedAssetsLen + 1;
                            setTrackedAssetsLen(TrackedAssetLen_);
                          })
                          .catch((err) => {
                            console.log(err);
                          });
                      })
                      .catch((err) => {
                        console.log(err);
                      });
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              })
              .catch((err) => {
                console.log(err);
              });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [denominationAssetAddress, gav]);

  const depositorsData = [
    {
      depositor: "0x123...ab",
      Since: "2 Months",
      numberOfShares: 2300,
      percentage: 35,
    },
    {
      depositor: "0x123...ab",
      Since: "2 Months",
      numberOfShares: 2300,
      percentage: 35,
    },
    {
      depositor: "0x123...ab",
      Since: "2 Months",
      numberOfShares: 2300,
      percentage: 35,
    },
    {
      depositor: "0x123...ab",
      Since: "2 Months",
      numberOfShares: 2300,
      percentage: 35,
    },
    {
      depositor: "0x123...ab",
      Since: "2 Months",
      numberOfShares: 2300,
      percentage: 35,
    },
  ];

  const handleMintShare = () => {
    const newAmount = parseFloat(buyValue) * 1000000000000000000;

    const Tab: string[] = [];
    Tab.push(hexToDecimalString(vaultAddress));
    Tab.push(hexToDecimalString(denominationAssetAddress));
    Tab.push(newAmount.toString());
    Tab.push("0");

    const TabA: string[] = [];
    TabA.push(hexToDecimalString(comptroller));
    TabA.push(newAmount.toString());
    TabA.push("0");

    if (!accountInterface.address) {
      console.log("no account detected");
    } else {
      console.log("connected");
      multicall(Tab, TabA);
    }
  };

  const handleSellShare = () => {
    const Tab: string[] = [];
    Tab.push(hexToDecimalString(vaultAddress));
    Tab.push(sellTokenId);
    Tab.push("0");
    Tab.push(percentShare);
    Tab.push("0");
    Tab.push(sellShareTab.length.toString());
    sellShareTab.forEach((element) => {
      Tab.push(hexToDecimalString(element.address));
    });
    Tab.push(sellShareTab.length.toString());
    sellShareTab.forEach((element) => {
      Tab.push(hexToDecimalString(element.percent));
    });
    console.log(Tab);

    if (!accountInterface.address) {
      console.log("no account detected");
    } else {
      console.log("connected");
      multicall2(Tab);
    }
  };

  const multicall2 = async (_tab: any[]) => {
    console.log("invoke");
    const tx1 = await accountInterface.execute([
      {
        contractAddress: comptroller,
        entrypoint: "sell_share",
        calldata: _tab,
      },
    ]);
    console.log(tx1);
    // return (tx1)
  };

  const multicall = async (_tab: any[], _tabA: any[]) => {
    console.log("invoke");
    console.log(denominationAssetAddress);
    console.log(comptroller);
    const tx1 = await accountInterface.execute([
      {
        contractAddress: denominationAssetAddress,
        entrypoint: "approve",
        calldata: _tabA,
      },
      {
        contractAddress: comptroller,
        entrypoint: "buyShare",
        calldata: _tab,
      },
    ]);
    console.log(tx1);
    // return (tx1)
  };

  return (
    <>
      <div className={`${styles.pageContainer}`}>
        <SimpleGrid columns={3} spacing={10}>
          {Object.keys(VDatabase).map((key, index) => (
            <>
              {key !== "default" && (
                <Box
                  className="bg__dotted"
                  style={{ borderRadius: "10px" }}
                  key={index}
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
                      <p>Name</p>
                      <p>User</p>
                    </div>
                    <div style={{ width: "35%", float: "left" }}>
                      <Link href={"/vault/" + key}>
                        <button
                          className="fs-20"
                          style={{
                            fontWeight: "600",
                            background: "#F6643C",
                            borderRadius: "10px",
                            padding: "6px 10px",
                          }}
                        >
                          open
                        </button>
                      </Link>
                    </div>
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
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {[...Array(Object.keys(VDatabase[key].tags).length)].map(
                      (e, i) => {
                        return (
                          <span
                            className="fs-12"
                            style={{
                              fontWeight: "600",
                              background: "#F6643C",
                              borderRadius: "10px",
                              padding: "6px 10px",
                              margin: "10px",
                            }}
                          >
                            {"#" + VDatabase[key].tags[i]}
                          </span>
                        );
                      },
                    )}
                  </div>
                </Box>
              )}
            </>
          ))}
        </SimpleGrid>
      </div>
    </>
  );
};

export default vault;
