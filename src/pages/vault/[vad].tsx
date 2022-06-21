import React, { useEffect } from 'react';
import { useRouter } from 'next/router'
import { NextPage } from 'next';
import Link from 'next/link'
import styles from '~/styles/vault.module.scss';
import FakeImage from "~/components/FakeImage";
import Image from "next/image";
<<<<<<< HEAD
import { useAppSelector } from '../../app/hooks'
import {
  selectCount,
} from '../../app/counterSlice'
import 'chart.js/auto';
import { Chart, Line } from 'react-chartjs-2';
import { Button, ButtonGroup } from '@chakra-ui/react'
import { Select } from '@chakra-ui/react'
=======
import { useAppSelector } from "../../app/hooks";
import { selectCount } from "../../app/counterSlice";
// import "chart.js/auto";
import { IconContext } from "react-icons";
// import { Chart, Line } from "react-chartjs-2";
import { background, Button, ButtonGroup, color } from "@chakra-ui/react";
import { Select } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Icon } from "@chakra-ui/react";
import { BsShare } from "react-icons/bs";
import { BiArrowBack } from "react-icons/bi";

import { MdOutlineSwapVert, MdArrowCircleDown } from "react-icons/md";
import { AiOutlinePlus } from "react-icons/ai";



import { GiPayMoney } from "react-icons/gi";
import { MdManageSearch } from "react-icons/md";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import moment from "moment";

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

>>>>>>> pr/7
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Text,
<<<<<<< HEAD
  Center
} from '@chakra-ui/react'
=======
  Center,
  Stack,
} from "@chakra-ui/react";
>>>>>>> pr/7
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
  Box,
  SliderMark,
<<<<<<< HEAD
} from '@chakra-ui/react'
import { ChartData, ScatterDataPoint, ChartOptions, CoreChartOptions, ElementChartOptions, PluginChartOptions, DatasetChartOptions, ScaleChartOptions, LineControllerChartOptions } from 'chart.js/auto';
import { _DeepPartialObject } from 'chart.js/types/utils';
import Tabs from '~/components/Tabs';
import Tab from '~/components/Tab';
import { getStarknet, AccountInterface } from "../../starknetWrapper"
import { contractAddress } from '~/registry/address';
import { hexToDecimalString } from 'starknet/dist/utils/number';
import { number } from 'starknet';
import Ether from '../../image/ETH.png';
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
      fill: true,
      backgroundColor: "rgba(75,192,192,0.2)",
      borderColor: "rgba(75,192,192,1)",
      tension: 0.3,
    },
    {
      label: 'Initial',
      data: [...times(numberOfData, (i) => chartData[0])],
      borderDash: [5, 5],
      borderColor: "rgba(75,192,192,0.5)",
      pointRadius: 0,
      pointHoverRadius: 0,
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
      radius: 2,
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
=======
} from "@chakra-ui/react";

import { _DeepPartialObject } from "chart.js/types/utils";
// import Tabs from "~/components/Tabs";
// import Tab from "~/components/Tab";
import { getStarknet, AccountInterface } from "../../starknetWrapper";
import { contractAddress } from "~/registry/address";
import { hexToDecimalString } from "starknet/dist/utils/number";
import { number } from "starknet";
import Ether from "../../image/ETH.png";
import { Flex, Spacer } from "@chakra-ui/react";
import { Slider as MultiSlider } from "react-multi-thumb-slider";
import { MaterialSlider } from "react-multi-thumb-slider";

import btc from "../../image/BTC.png";
import eth from "../../image/ETH.png";
import zkp from "../../image/ZKP.png";
import tst from "../../image/TST.svg";
import alphaRoad from "../../image/alphaRoad.jpg";
import ethzkp from "../../image/ETH-ZKP.png";
import btctst from "../../image/BTC-TST.png";
import ethtst from "../../image/ETH-TST.png";
import ethbtc from "../../image/ETH-BTC.png";
import { ContractInfo } from "../../utils/type";

const { provider, account } = getStarknet();
const databaseInfo = {
  path: eth,
};

type PortfolioData = {
  balance: string;
  value: string;
  allocation: string;
  address: string;
>>>>>>> pr/7
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

<<<<<<< HEAD

import VDatabase from "./vaults.json"

const vault: NextPage = () => {
  let count = useAppSelector(selectCount)

  const router = useRouter()
  var { vad } = router.query /* vault address*/
  var addressdata = VDatabase["default"];
  if (vad !== undefined) {
    /* vad = contractAddress.StakingVault */
    addressdata = VDatabase[String(vad)];  /* replace with get vault vaultaddress*/
  }
=======
type DataChart = {
  epoch: number;
  sharePrice: number;
  gav: number;
}[];

type sellShareData = {
  percent: number;
  address: string;
  symbol: string;
}[];

import VDatabase from "./vaults.json";
import { useDeprecatedAnimatedState } from "framer-motion";

const vault: NextPage = () => {
  let count = useAppSelector(selectCount);

  const router = useRouter();
  var { vad } = router.query; /* vault address*/
  const [vaultAddress, setVaultAddess] = React.useState<string>("");
  const [assetManagerImage, setAssetManagerImage] = React.useState<string>("");
  const [assetManagerName, setAssetManagerName] = React.useState<string>("");
  const [fundExist, setFundExist] = React.useState<Boolean>(true);
  const [loading, setLoading] = React.useState<Boolean>(true);

  const [vaultInfo, setVaultInfo] = React.useState<ContractInfo>();
  useEffect(() => {
    if (vad !== undefined && typeof vad == "string") {
      setVaultAddess(vad);
      loadData();
    }
  }, [vad]);

  const loadData = async () => {
    const res = await fetch(
      "http://localhost:3000/api/contract/" + String(vad)
    );
    if (res.status == 200) {
      const { data } = await res.json();
      setVaultInfo(data);
      setLoading(false);
    } else {
      setFundExist(false);
      setLoading(false);
    }
  };

  const loadDataAssetManager = async (assetManager_: string) => {
    const res = await fetch(
      "http://localhost:3000/api/user/" + `${assetManager_}`
    );
    if (res.status == 200) {
      const { data } = await res.json();
      setAssetManagerImage(data.profilePic);
      setAssetManagerName(data.name);
    } else {
      console.log("not found");
    }
  };
>>>>>>> pr/7


  /* TODO : check if address is correct else use stakingvault address ! */

<<<<<<< HEAD
  const vaultAddress = contractAddress.StakingVault
  const comptroller = contractAddress.Comptroller
  const valueIntepretor = contractAddress.valueInterpretor
  const feeManager = contractAddress.FeeManager
  const policyManager = contractAddress.PolicyManager

=======
  const comptroller = contractAddress.Comptroller;
  const valueIntepretor = contractAddress.ValueInterpreter;
  const feeManager = contractAddress.FeeManager;
  const policyManager = contractAddress.PolicyManager;
>>>>>>> pr/7
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

  const [sellShareTab, setSellShareTab] = React.useState<SellShareData>([]);

  const [allowedTrackedAsset, setAllowedTrackedAsset] = React.useState<string[]>([]);
  const [allowedIntegration, setAllowedIntegration] = React.useState<
    Array<string[]>
  >([]);

  const [chartData, setChartData] = React.useState<DataChart>([]);
  const [dailyIncome, setDailyIncome] = React.useState<number>();
  const [monthlyIncome, setMonthlyIncome] = React.useState<number>();
  const [weeklyIncome, setWeeklyIncome] = React.useState<number>();
  const [totalIncome, setTotalIncome] = React.useState<number>();
  const [assetManagerShareAmount, setAssetManagerShareAmount] =
    React.useState<number>();
  const [sellList, setSellList] = React.useState<userShareData>([]);
  const [trackedAssetsLen, setTrackedAssetsLen] = React.useState<number>(0);
  const [userBalance, setUserBalance] = React.useState<string>("0");
  const [isAllowedDepositor, setIsAllowedDepositor] = React.useState<string>("0");
  const [userShareBalance, setUserShareBalance] = React.useState<string>("");
  const [sellTokenId, setSellTokenId] = React.useState<string>("");
  const [percentShare, setPercentShare] = React.useState<string>("0");
<<<<<<< HEAD
  const [buyValue, setBuyValue] = React.useState<any>(0)
  const [sellValue, setSellValue] = React.useState<any>(0)
  const [onChange, setOnChange] = React.useState<boolean>(true)

  const [onPopUp, setonPopUp] = React.useState<boolean>(false)
=======
  const [buyValue, setBuyValue] = React.useState<any>(0);
  const [sellValue, setSellValue] = React.useState<number>(10);
  const [onChange, setOnChange] = React.useState<boolean>(true);
  let [timeframe, setTimeframe] = React.useState<number>(0);
  let [chartSelected, setChartSelected] = React.useState<number>(1);
  let [menuSelected, setMenuSelected] = React.useState<number>(0);
  let [sellShareDataTab, setSellShareDataTab] = React.useState<sellShareData>([]);
  const [dataSetChange, setDataSetChange] = React.useState<boolean>(true);
  const [trackedAssetsAddress, setTrackedAssetsAddress] = React.useState<string[]>();
  const [sellSwapToken, setSellSwapToken] = React.useState<string>();
  const [buySwapToken, setBuySwapToken] = React.useState<string>();
  const [bringLiquidtyToken, setBringLiquidtyToken] = React.useState<string>();


  const [defiSelected, setDefiSelected] = React.useState<number>(1);

  const [sellSwapTokenInput, setSellSwapTokenInput] = React.useState<number>(0);
  const [buySwapTokenRate, setBuySwapTokenRate] = React.useState<number>(0);

  const [sellSwapTokenBalance, setSellSwapTokenBalance] = React.useState<number>(0);
  const [buySwapTokenBalance, setBuySwapTokenBalance] = React.useState<number>(0);
  const [buySwapTokenFundBalance, setBuySwapTokenFundBalance] = React.useState<number>(0);
  const [bringLiquidityTokenFundBalance, setBringLiquidityTokenFundBalance] = React.useState<number>(0);

  const [TokenLP1, setTokenLP1] = React.useState<string>();
  const [TokenLP2, setTokenLP2] = React.useState<string>();







  const ETH_ad = "0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7"
  const BTC_ad = "0x72df4dc5b6c4df72e4288857317caf2ce9da166ab8719ab8306516a2fddfff7"
  const ZKP_ad = "0x7a6dde277913b4e30163974bf3d8ed263abb7c7700a18524f5edf38a13d39ec"
  const TST_ad = "0x7394cbe418daa16e42b87ba67372d4ab4a5df0b05c6e554d158458ce245bc10"

  // LP
  const Eth_ZKP_ad = "0x68f02f0573d85b5d54942eea4c1bf97c38ca0e3e34fe3c974d1a3feef6c33be"
  const ETH_TST_ad = "0x212040ea46c99455a30b62bfe9239f100271a198a0fdf0e86befc30e510e443"
  const ETH_BTC_ad = "0x61fdcf831f23d070b26a4fdc9d43c2fbba1928a529f51b5335cd7b738f97945"
  const BTC_TST_ad = "0x6d0845eb49bcbef8c91f9717623b56331cc4205a5113bddef98ec40f050edc8"



  const ARFSWAPTABADDRESS = [ETH_ad, BTC_ad, ZKP_ad, TST_ad]
  const ARFLPTABADDRESS = [Eth_ZKP_ad, ETH_TST_ad, ETH_BTC_ad, BTC_TST_ad]


  useEffect(() => {
    if (sellSwapToken) {
      const res1 = provider.callContract({
        contractAddress: sellSwapToken,
        entrypoint: "balanceOf",
        calldata: [hexToDecimalString(vaultAddress)],
      });
      res1
        .then((value) => {
          const fundBalance__ = hexToDecimalString(value.result[0]);
          const fundBalance_ = parseFloat(fundBalance__) / 1000000000000000000;
          setSellSwapTokenBalance(fundBalance_)
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [sellSwapToken]);

  useEffect(() => {
    if (bringLiquidtyToken) {
      if(bringLiquidtyToken == "0x212040ea46c99455a30b62bfe9239f100271a198a0fdf0e86befc30e510e443"){
        setTokenLP1()
        setTokenLP1
      }
    }
  }, [bringLiquidtyToken]);


  // const ETH_ad = "0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7"
  // const BTC_ad = "0x72df4dc5b6c4df72e4288857317caf2ce9da166ab8719ab8306516a2fddfff7"
  // const ZKP_ad = "0x7a6dde277913b4e30163974bf3d8ed263abb7c7700a18524f5edf38a13d39ec"
  // const TST_ad = "0x7394cbe418daa16e42b87ba67372d4ab4a5df0b05c6e554d158458ce245bc10"

  // // LP
  // const Eth_ZKP_ad = "0x68f02f0573d85b5d54942eea4c1bf97c38ca0e3e34fe3c974d1a3feef6c33be"
  // const ETH_TST_ad = "0x212040ea46c99455a30b62bfe9239f100271a198a0fdf0e86befc30e510e443"
  // const ETH_BTC_ad = "0x61fdcf831f23d070b26a4fdc9d43c2fbba1928a529f51b5335cd7b738f97945"
  // const BTC_TST_ad = "0x6d0845eb49bcbef8c91f9717623b56331cc4205a5113bddef98ec40f050edc8"

  useEffect(() => {
    if (buySwapToken) {
      const res1 = provider.callContract({
        contractAddress: buySwapToken,
        entrypoint: "balanceOf",
        calldata: [hexToDecimalString(vaultAddress)],
      });
      res1
        .then((value) => {
          const fundBalance__ = hexToDecimalString(value.result[0]);
          const fundBalance_ = parseFloat(fundBalance__) / 1000000000000000000;
          setBuySwapTokenFundBalance(fundBalance_)
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [buySwapToken]);

  useEffect(() => {
    if (sellSwapToken && buySwapToken) {
      const res1 = provider.callContract({
        contractAddress: contractAddress.ValueInterpreter,
        entrypoint: "calculAssetValue",
        calldata: [hexToDecimalString(sellSwapToken), "1000000000000000000", "0", hexToDecimalString(buySwapToken)],
      });
      res1
        .then((value) => {
          const newPrice = hexToDecimalString(value.result[0]);
          const newPrice__ = 1000000000000000000 / parseFloat(newPrice);
          setBuySwapTokenRate(newPrice__)
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [buySwapToken, sellSwapToken]);

  const [onPopUp, setonPopUp] = React.useState<boolean>(false);
  const handleInputChange = (value) => setChartSelected(value.target.value);

>>>>>>> pr/7



  const handleChange3 = (value) => setSellValue(value)

<<<<<<< HEAD
  const addPercent = (symbol: string, address: string, index: number) => {
    console.log("current sell share tab")
    console.log(sellShareTab)

    let currentSaleTabe = sellShareTab

    let newElem = {
      symbol: symbol,
      percent: sellValue,
      address: address,
    }

    for (let pas = 0; pas < currentSaleTabe.length; pas++) {
      if (newElem.symbol == currentSaleTabe[pas].symbol) {
        let currentTab: PortfolioData = trackedAssets
        currentTab[index].selected = false
        setOnChange(!onChange)
        return
      }
    }
    currentSaleTabe.push(newElem)
    setSellShareTab(currentSaleTabe)
    console.log("new sell share tab")
    console.log(sellShareTab)

    let currentTab: PortfolioData = trackedAssets
    currentTab[index].selected = false
    setOnChange(!onChange)

  }

  const clearSellTab = () => {
    setSellShareTab([])
  }



  const handleSelected = (index: number) => {
    let currentTab: PortfolioData = trackedAssets
    for (let pas = 0; pas < trackedAssets.length; pas++) {
      if (index == pas) {
        currentTab[pas].selected = true
      }
      else {
        currentTab[pas].selected = false
      }
    }
    setTrackedAssets(currentTab)

    setOnChange(!onChange)
  }




  const handleChange = (value) => setBuyValue(value)
  const handleChange2 = (value) => setPercentShare(value)
  function shortStringFeltToStr(felt: bigint): string {
    const newStrB = Buffer.from(felt.toString(16), 'hex')
    return newStrB.toString()
  }







  function returnImagefromSymbol(symb: string) {
    if (symb == "Ether" || symb == "ETH" || symb == "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7") {
      return (
        <Image src={Ether} alt="eth" />
      )
    }
  }

  function returnFundImage() {
    return (
      <FakeImage fillColor='black' borderRadius='50%' />
    )

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
=======
  const setSellValueToIndex = (index: number) => {
    let tab = sellShareDataTab
    tab[index].percent = sellValue
    setSellShareDataTab(tab)
    setDataSetChange(!dataSetChange)
  };



  function addNewAsset(address_: string, percent_: number, symbol_: string) {

    setSellShareDataTab((state) => {
      const elem = { percent: percent_, address: address_, symbol: symbol_ }
      const index = state.findIndex((x) => x.address == address_);
      state =
        index === -1
          ? [...state, elem]
          : [...state.slice(0, index), ...state.slice(index + 1)];
      return state;
    });
  }

  const handleSelected = (index: number) => {
    let currentTab: PortfolioData = trackedAssets;
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

  const handleChangeSell = (value) => setSellSwapTokenInput(value);


  const handleChange = (value) => setBuyValue(value);
  const handleChange2 = (value) => setPercentShare(value);
  function shortStringFeltToStr(felt: bigint): string {
    const newStrB = Buffer.from(felt.toString(16), "hex");
    return newStrB.toString();
  }


  function getUserTotalShare() {
    let userTotalShare_ = 0;
    for (let index = 0; index < userShareInfo.length; index++) {
      userTotalShare_ =
        userTotalShare_ + parseFloat(userShareInfo[index].shareAmount);
    }
    userTotalShare_ = userTotalShare_ / 1000000000000000000;
    return userTotalShare_;
  }

  function returnImagefromAddress(address: string) {
    if (
      address ==
      "0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7"
    ) {
      return eth;
    } else {
      if (
        address ==
        "0x72df4dc5b6c4df72e4288857317caf2ce9da166ab8719ab8306516a2fddfff7"
      ) {
        return btc;
      } else {
        if (
          address ==
          "0x7a6dde277913b4e30163974bf3d8ed263abb7c7700a18524f5edf38a13d39ec"
        ) {
          return zkp;
        } else {
          if (
            address ==
            "0x7394cbe418daa16e42b87ba67372d4ab4a5df0b05c6e554d158458ce245bc10"
          ) {
            return tst;
          } else {
            if (
              address ==
              "0x68f02f0573d85b5d54942eea4c1bf97c38ca0e3e34fe3c974d1a3feef6c33be"
            ) {
              return ethzkp;
            } else {
              if (
                address ==
                "0x6d0845eb49bcbef8c91f9717623b56331cc4205a5113bddef98ec40f050edc8"
              ) {
                return btctst;
              } else {
                if (
                  address ==
                  "0x212040ea46c99455a30b62bfe9239f100271a198a0fdf0e86befc30e510e443"
                ) {
                  return ethtst;
                } else {
                  if (
                    address ==
                    "0x61fdcf831f23d070b26a4fdc9d43c2fbba1928a529f51b5335cd7b738f97945"
                  ) {
                    return ethbtc;
                  } else {
                    if (
                      address ==
                      "0x4aec73f0611a9be0524e7ef21ab1679bdf9c97dc7d72614f15373d431226b6a"
                    ) {
                      return alphaRoad;
                    } else {
                      return ethtst;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  function returnSymbolfromAddress(address: string) {
    if (
      address ==
      "0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7"
    ) {
      return "eth";
    } else {
      if (
        address ==
        "0x72df4dc5b6c4df72e4288857317caf2ce9da166ab8719ab8306516a2fddfff7"
      ) {
        return "btc";
      } else {
        if (
          address ==
          "0x7a6dde277913b4e30163974bf3d8ed263abb7c7700a18524f5edf38a13d39ec"
        ) {
          return "zkp";
        } else {
          if (
            address ==
            "0x7394cbe418daa16e42b87ba67372d4ab4a5df0b05c6e554d158458ce245bc10"
          ) {
            return "tst";
          } else {
            if (
              address ==
              "0x68f02f0573d85b5d54942eea4c1bf97c38ca0e3e34fe3c974d1a3feef6c33be"
            ) {
              return "ethzkp";
            } else {
              if (
                address ==
                "0x6d0845eb49bcbef8c91f9717623b56331cc4205a5113bddef98ec40f050edc8"
              ) {
                return "btctst";
              } else {
                if (
                  address ==
                  "0x212040ea46c99455a30b62bfe9239f100271a198a0fdf0e86befc30e510e443"
                ) {
                  return "ethtst";
                } else {
                  if (
                    address ==
                    "0x61fdcf831f23d070b26a4fdc9d43c2fbba1928a529f51b5335cd7b738f97945"
                  ) {
                    return "ethbtc";
                  } else {
                    if (
                      address ==
                      "0x4aec73f0611a9be0524e7ef21ab1679bdf9c97dc7d72614f15373d431226b6a"
                    ) {
                      return "alphaRoad";
                    } else {
                      return "ethtst";
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  function returnNamefromAddress(address: string) {
    if (
      address ==
      "0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7"
    ) {
      return "Ethererum";
    } else {
      if (
        address ==
        "0x72df4dc5b6c4df72e4288857317caf2ce9da166ab8719ab8306516a2fddfff7"
      ) {
        return "Alpha Road Bitcoin";
      } else {
        if (
          address ==
          "0x7a6dde277913b4e30163974bf3d8ed263abb7c7700a18524f5edf38a13d39ec"
        ) {
          return "Astraly";
        } else {
          if (
            address ==
            "0x7394cbe418daa16e42b87ba67372d4ab4a5df0b05c6e554d158458ce245bc10"
          ) {
            return "Test Token";
          } else {
            if (
              address ==
              "0x68f02f0573d85b5d54942eea4c1bf97c38ca0e3e34fe3c974d1a3feef6c33be"
            ) {
              return "Ether-Astraly LP";
            } else {
              if (
                address ==
                "0x6d0845eb49bcbef8c91f9717623b56331cc4205a5113bddef98ec40f050edc8"
              ) {
                return "Bitcoin-TestToken LP";
              } else {
                if (
                  address ==
                  "0x212040ea46c99455a30b62bfe9239f100271a198a0fdf0e86befc30e510e443"
                ) {
                  return "Ethereum-TestToken LP";
                } else {
                  if (
                    address ==
                    "0x61fdcf831f23d070b26a4fdc9d43c2fbba1928a529f51b5335cd7b738f97945"
                  ) {
                    return "Ethereum-Bitcoin LP";
                  } else {
                    if (
                      address ==
                      "0x4aec73f0611a9be0524e7ef21ab1679bdf9c97dc7d72614f15373d431226b6a"
                    ) {
                      return "alphaRoad";
                    } else {
                      return "ethtst";
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  function returnSelectorfromAddress(address: string) {
    if (
      address ==
      "0x3f35dbce7a07ce455b128890d383c554afbc1b07cf7390a13e2d602a38c1a0a"
    ) {
      return "Swap";
    } else {
      if (
        address ==
        "0x147fd8f7d12de6da66feedc6d64a11bd371e5471ee1018f11f9072ede67a0fa"
      ) {
        return "Add Liquidity";
      } else {
        if (
          address ==
          "0x2c0f7bf2d6cf5304c29171bf493feb222fef84bdaf17805a6574b0c2e8bcc87"
        ) {
          return "Remove Liquidity";
        }
      }
    }
  }

  useEffect(() => {
    if (vaultAddress != "") {
      const res = provider.callContract({
        contractAddress: vaultAddress,
        entrypoint: "getName",
        calldata: [],
      });
      res
        .then((value) => {
          const _name = shortStringFeltToStr(
            BigInt(hexToDecimalString(value.result[0]))
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
            BigInt(hexToDecimalString(value.result[0]))
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
          loadDataAssetManager(_assetManager);
          //look for asset manager image
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
                BigInt(hexToDecimalString(value.result[0]))
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
        entrypoint: "calculGav",
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
          setMaxAmount(minAmount_.toString());
          const maxAmount__ = hexToDecimalString(value.result[2]);
          const maxAmount_ = parseFloat(maxAmount__) / 1000000000000000000;
          setMinAmount(maxAmount_.toString());
        })
        .catch((err) => {
          console.log(err);
        });

      const res16 = provider.callContract({
        contractAddress: policyManager,
        entrypoint: "getAllowedTrackedAsset",
        calldata: [hexToDecimalString(vaultAddress)],
      });
      res16
        .then((value) => {
          let tabAsset = value.result;
          tabAsset[0] = hexToDecimalString(tabAsset[0]);
          const lenghtTab = tabAsset.shift();
          setAllowedTrackedAsset(tabAsset);
          const res17 = provider.callContract({
            contractAddress: policyManager,
            entrypoint: "getAllowedIntegration",
            calldata: [hexToDecimalString(vaultAddress)],
          });
          res17
            .then((value) => {
              let tabIntegration = value.result;
              let tabIntegrationFinal: string[][] = [];
              let firstIndex =
                1 + parseFloat(lenghtTab == undefined ? "0" : lenghtTab) * 2;
              const removeApproveIntegration = tabIntegration.splice(
                0,
                firstIndex
              );
              for (
                let index = 0;
                index < tabIntegration.length;
                index = index + 2
              ) {
                const element = tabIntegration[index];
                const element2 = tabIntegration[index + 1];
                let shortTab: string[] = [];
                shortTab.push(element);
                shortTab.push(element2);
                tabIntegrationFinal.push(shortTab);
              }
              setAllowedIntegration(tabIntegrationFinal);
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });

        const res18 = provider.callContract({
          contractAddress: vaultAddress,
          entrypoint: "getTrackedAssets",
          calldata: [],
        });
        res18
          .then((value) => {
            let tab__ = value.result;
            let size_ = tab__.shift();
            let tab_ = tab__;
            let TABBBE:PortfolioData = [];
            setTrackedAssetsAddress(tab_)
            for (let index = 0; index < tab_.length; index++) {
              TABBBE.push({
                balance: "",
                value: "",
                allocation: "",
                address: tab_[index],
              })}
            setTrackedAssets(TABBBE)
            console.log(TABBBE)
            
            setTrackedAssetsLen(TABBBE.length);
            }
            )
            .catch((err) => {
              console.log(err);
            });

     
    }
  }, [vaultAddress]);

  const dateFormatter = (date) => {
    // return moment(date).unix();
    if (timeframe == 0) {
      return moment(date).format("LT");
    } else {
      return moment(date).format("L");
    }
  };
>>>>>>> pr/7




  useEffect(() => {
<<<<<<< HEAD
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

              const res6 = provider.callContract({ contractAddress: vaultAddress, entrypoint: "sharePricePurchased", calldata: [tokenId, "0"] })
              res6.then(value => {
                const __sharePricePurchased = (hexToDecimalString(value.result[0]))
                const _sharePricePurchased = parseFloat(__sharePricePurchased) / 1000000000000000000
                const sharePricePurchased = _sharePricePurchased.toString()
                let userShareInfo__: userShareData = userShareInfo
                userShareInfo__.push(
                  {
                    tokenId: tokenId,
                    shareAmount: sharesBalance,
                    pricePurchased: sharePricePurchased
                  }
                )
                console.log(userShareInfo__)
                setUserShareInfo(userShareInfo__)
              }).catch(err => {
=======
    const { account } = getStarknet();
    setAccountInterface(account);
    if (account.address != "" && denominationAssetAddress != "deno") {
      setAcccountAddress(account.address);
      const res1 = provider.callContract({
        contractAddress: denominationAssetAddress,
        entrypoint: "balanceOf",
        calldata: [hexToDecimalString(account.address)],
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
                hexToDecimalString(account.address),
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
        calldata: [hexToDecimalString(account.address)],
      });
      res3
        .then((value) => {
          const userShareBalance__ = hexToDecimalString(value.result[0]);
          setUserShareBalance(userShareBalance__);
          for (let pas = 0; pas < parseFloat(userShareBalance__); pas++) {
            const res4 = provider.callContract({
              contractAddress: vaultAddress,
              entrypoint: "tokenOfOwnerByIndex",
              calldata: [
                hexToDecimalString(account.address),
                pas.toString(),
                "0",
              ],
            });
            res4
              .then((value) => {
                const tokenId = hexToDecimalString(value.result[0]);
                const res5 = provider.callContract({
                  contractAddress: vaultAddress,
                  entrypoint: "sharesBalance",
                  calldata: [tokenId, "0"],
                });
                res5
                  .then((value) => {
                    const sharesBalance = hexToDecimalString(value.result[0]);

                    const res6 = provider.callContract({
                      contractAddress: vaultAddress,
                      entrypoint: "sharePricePurchased",
                      calldata: [tokenId, "0"],
                    });
                    res6
                      .then((value) => {
                        const __sharePricePurchased = hexToDecimalString(
                          value.result[0]
                        );
                        const _sharePricePurchased =
                          parseFloat(__sharePricePurchased) /
                          1000000000000000000;
                        const sharePricePurchased =
                          _sharePricePurchased.toString();
                        let userShareInfo__: userShareData = userShareInfo;
                        userShareInfo__.push({
                          tokenId: tokenId,
                          shareAmount: sharesBalance,
                          pricePurchased: sharePricePurchased,
                        });
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
>>>>>>> pr/7
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

  }, [count, denominationAssetAddress]);



  useEffect(() => {
<<<<<<< HEAD
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
                      selected: false,
                      address: address_,
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
=======
    if (assetManager !== "add" && gav != "0") {
      const res3 = provider.callContract({
        contractAddress: vaultAddress,
        entrypoint: "getBalanceOf",
        calldata: [hexToDecimalString(assetManager)],
      });
      let shareAmount = 0;
      res3
        .then((value) => {
          const userShareBalance__ = hexToDecimalString(value.result[0]);
          for (let pas = 0; pas < parseFloat(userShareBalance__); pas++) {
            const res4 = provider.callContract({
              contractAddress: vaultAddress,
              entrypoint: "tokenOfOwnerByIndex",
              calldata: [hexToDecimalString(assetManager), pas.toString(), "0"],
            });
            res4
              .then((value) => {
                const tokenId = hexToDecimalString(value.result[0]);
                const res5 = provider.callContract({
                  contractAddress: vaultAddress,
                  entrypoint: "sharesBalance",
                  calldata: [tokenId, "0"],
                });
                res5
                  .then((value) => {
                    const sharesBalance = hexToDecimalString(value.result[0]);
                    shareAmount = shareAmount + parseFloat(sharesBalance);
                    setAssetManagerShareAmount(shareAmount);
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
  }, [assetManager, gav]);

  useEffect(() => {
    if (denominationAssetAddress != "deno" && gav != "0" && trackedAssetsAddress?.length == trackedAssets.length) {
          let tab_ = trackedAssets;
          for (let pas = 0; pas < tab_.length; pas++) {
            let address_ = tab_[pas].address;        
                    const balance = provider.callContract({
                      contractAddress: address_,
                      entrypoint: "balanceOf",
                      calldata: [hexToDecimalString(vaultAddress)],
                    });
                    balance
                      .then((value) => {
                        const __coinBalance = hexToDecimalString(
                          value.result[0]
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
                              value.result[0]
                            );
                            const _coinPrice =
                              parseFloat(__coinPrice) / 1000000000000000000;
                            const coinPrice_ = _coinPrice.toString();

                            let coinAllocation_ = (
                              (parseFloat(coinPrice_) / parseFloat(gav)) *
                              100
                            ).toPrecision(3).toString();
                            coinAllocation_ = coinAllocation_.concat("%");

                            tab_[pas].balance = coinBalance_
                            tab_[pas].value = coinPrice_
                            tab_[pas].allocation = coinAllocation_
                            setTrackedAssets(tab_);
                          })
                          .catch((err) => {
                            console.log(err);
                          });
                      })
                      .catch((err) => {
                        console.log(err);
                      });
                  

          }

    }
  }, [denominationAssetAddress, gav, trackedAssetsAddress]);
>>>>>>> pr/7






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



  useEffect(() => {
    if (vaultInfo?.dataFinance != undefined) {
      setChartData([]);
      let list = vaultInfo?.dataFinance;
      let render: DataChart = [];
      let tabEpoch: number[] = [];
      //convert date in epoch
      list.forEach((d) => {
        tabEpoch.push(d.date); // date -> epoch
      });

      if (list.length != 0) {
        setTotalIncome(
          ((list[list.length - 1].sharePrice - list[0].sharePrice) /
            list[0].sharePrice) *
          100
        );
      } else {
        setTotalIncome(0);
      }

      let day_epoch = moment().subtract(1, "days").valueOf();
      let now = moment().valueOf();
      const closestD = tabEpoch.reduce((a, b) => {
        return Math.abs(b - day_epoch) < Math.abs(a - day_epoch) ? b : a;
      });
      let closestIndexD = tabEpoch.indexOf(closestD);
      let diffEpochD = Math.abs(day_epoch - closestD);
      if (diffEpochD <= 3600000) {
        setDailyIncome(
          ((list[list.length - 1].sharePrice - list[closestIndexD].sharePrice) /
            list[closestIndexD].sharePrice) *
          100
        );
      } else {
        setDailyIncome(0);
      }

      let week_epoch = moment().subtract(1, "weeks").valueOf();
      const closestW = tabEpoch.reduce((a, b) => {
        return Math.abs(b - week_epoch) < Math.abs(a - week_epoch) ? b : a;
      });
      let closestIndexW = tabEpoch.indexOf(closestW);
      let diffEpochW = Math.abs(week_epoch - closestW);
      if (diffEpochW <= 3600000) {
        setWeeklyIncome(
          ((list[list.length - 1].sharePrice - list[closestIndexW].sharePrice) /
            list[closestIndexW].sharePrice) *
          100
        );
      } else {
        setWeeklyIncome(0);
      }

      let month_epoch = moment().subtract(1, "months").valueOf();
      const closestM = tabEpoch.reduce((a, b) => {
        return Math.abs(b - month_epoch) < Math.abs(a - month_epoch) ? b : a;
      });
      let closestIndexM = tabEpoch.indexOf(closestM);
      let diffEpochM = Math.abs(month_epoch - closestM);
      if (diffEpochM < 3600000) {
        setMonthlyIncome(
          ((list[list.length - 1].sharePrice - list[closestIndexM].sharePrice) /
            list[closestIndexM].sharePrice) *
          100
        );
      } else {
        setMonthlyIncome(0);
      }

      if (timeframe == 0) {
        if (diffEpochD >= 3600000) {
          let elemAmount = Math.floor(diffEpochD / 3600000);
          for (let pas = 0; pas < elemAmount; pas++) {
            let _epoch = day_epoch + pas * 3600000;
            let _sharePrice = 0;
            let _gav = 0;
            render.push({
              epoch: _epoch,
              sharePrice: _sharePrice,
              gav: _gav,
            });
          }
        }
        for (let pas = closestIndexD; pas < tabEpoch.length; pas++) {
          let _epoch = tabEpoch[pas];
          let _sharePrice = list[pas].sharePrice;
          let _gav = list[pas].gav;
          render.push({
            epoch: _epoch,
            sharePrice: _sharePrice,
            gav: _gav,
          });
        }
        setChartData(render);
      }
      if (timeframe == 1) {
        if (diffEpochW >= 3600000) {
          let elemAmount = Math.floor(diffEpochW / 3600000);
          for (let pas = 0; pas < elemAmount; pas++) {
            let _epoch = week_epoch + pas * 3600000;
            let _sharePrice = 0;
            let _gav = 0;
            render.push({
              epoch: _epoch,
              sharePrice: _sharePrice,
              gav: _gav,
            });
          }
        }
        for (let pas = closestIndexW; pas < tabEpoch.length; pas++) {
          let _epoch = tabEpoch[pas];
          let _sharePrice = list[pas].sharePrice;
          let _gav = list[pas].gav;
          render.push({
            epoch: _epoch,
            sharePrice: _sharePrice,
            gav: _gav,
          });
        }
        setChartData(render);
      }
      if (timeframe == 2) {
        if (diffEpochM >= 3600000) {
          let elemAmount = Math.floor(diffEpochM / 3600000);
          for (let pas = 0; pas < elemAmount; pas++) {
            let _epoch = month_epoch + pas * 3600000;
            let _sharePrice = 0;
            let _gav = 0;
            render.push({
              epoch: _epoch,
              sharePrice: _sharePrice,
              gav: _gav,
            });
          }
        }
        for (let pas = closestIndexM; pas < tabEpoch.length; pas++) {
          let _epoch = tabEpoch[pas];
          let _sharePrice = list[pas].sharePrice;
          let _gav = list[pas].gav;
          render.push({
            epoch: _epoch,
            sharePrice: _sharePrice,
            gav: _gav,
          });
        }
        setChartData(render);
      }
      if (timeframe == 3) {
        for (let pas = 0; pas < tabEpoch.length; pas++) {
          let _epoch = tabEpoch[pas];
          let _sharePrice = list[pas].sharePrice;
          let _gav = list[pas].gav;
          render.push({
            epoch: _epoch,
            sharePrice: _sharePrice,
            gav: _gav,
          });
        }
        setChartData(render);
      }
    }
  }, [timeframe, vaultInfo]);


  const handleMintShare = () => {

<<<<<<< HEAD
    const newAmount = parseFloat(buyValue) * 1000000000000000000

    let Tab: string[] = [];
    Tab.push(hexToDecimalString(vaultAddress))
    Tab.push(hexToDecimalString(denominationAssetAddress))
    Tab.push(newAmount.toString())
    Tab.push("0")

    let TabA: string[] = [];
    TabA.push(hexToDecimalString(comptroller))
    TabA.push((newAmount.toString()))
    TabA.push("0")
=======
    let Tab: string[] = [];
    Tab.push(hexToDecimalString(vaultAddress));
    Tab.push(newAmount.toString());
    Tab.push("0");

    let TabA: string[] = [];
    TabA.push(hexToDecimalString(comptroller));
    TabA.push(newAmount.toString());
    TabA.push("0");
>>>>>>> pr/7


    if (!accountInterface.address) {
      console.log("no account detected")
    }
    else {
      console.log("connected")
      multicall(Tab, TabA)
    }
  };

  const handleSwap = () => {
    const newAmount = sellSwapTokenInput * 1000000000000000000;

    let TabApprove: any[] = [];
    TabApprove.push(hexToDecimalString(vaultAddress));
    TabApprove.push(hexToDecimalString(sellSwapToken));
    TabApprove.push("949021990203918389843157787496164629863144228991510976554585288817234167820");
    TabApprove.push("3")
    TabApprove.push("0x4aec73f0611a9be0524e7ef21ab1679bdf9c97dc7d72614f15373d431226b6a")
    TabApprove.push(newAmount.toString())
    TabApprove.push("0")


    let Tab: any[] = [];
    Tab.push(hexToDecimalString(vaultAddress));
    Tab.push(hexToDecimalString("0x4aec73f0611a9be0524e7ef21ab1679bdf9c97dc7d72614f15373d431226b6a"));
    Tab.push(hexToDecimalString("0x2c0f7bf2d6cf5304c29171bf493feb222fef84bdaf17805a6574b0c2e8bcc87"));
    Tab.push("6")
    Tab.push(hexToDecimalString(sellSwapToken));
    Tab.push(hexToDecimalString(buySwapToken));
    Tab.push(newAmount.toString());
    Tab.push("0");
    Tab.push("0");
    Tab.push("0");

    if (!accountInterface.address) {
      console.log("no account detected");
    } else {
      console.log("connected");
      multicallSwap(TabApprove, Tab);
    }
  };

  const multicallSwap = async ( _tabApprove: any[], _tab: any[]) => {
    console.log("invoke");
    let tx1 = await accountInterface.execute([
      {
        contractAddress: comptroller,
        entrypoint: "executeCall",
        calldata: _tabApprove,
      },
      {
        contractAddress: comptroller,
        entrypoint: "executeCall",
        calldata: _tab,
      },
    ]);
    console.log(tx1);
    // return (tx1)
  };

  const handleTrack = (_address: string) => {
    let Tab: string[] = [];
    Tab.push(hexToDecimalString(vaultAddress));
    Tab.push(hexToDecimalString(_address));

    if (!accountInterface.address) {
      console.log("no account detected");
    } else {
      console.log("connected");
      multicall3(Tab)
    }
  };

  const handleUntrack = (_address: string) => {
    let Tab: string[] = [];
    Tab.push(hexToDecimalString(vaultAddress));
    Tab.push(hexToDecimalString(_address));

    if (!accountInterface.address) {
      console.log("no account detected");
    } else {
      console.log("connected");
      multicall4(Tab)
    }
  };

  const handleSellShare = () => {
<<<<<<< HEAD

    let Tab: string[] = [];
    Tab.push(hexToDecimalString(vaultAddress))
    Tab.push(sellTokenId)
    Tab.push("0")
    Tab.push(percentShare)
    Tab.push("0")
    Tab.push(sellShareTab.length.toString())
    sellShareTab.forEach(element => {
      Tab.push(hexToDecimalString(element.address))
    });
    Tab.push(sellShareTab.length.toString())
    sellShareTab.forEach(element => {
      Tab.push(hexToDecimalString(element.percent))
    });
    console.log(Tab)
=======
    let Tab: string[] = [];

    Tab.push(hexToDecimalString(vaultAddress));
    Tab.push(sellTokenId);
    Tab.push("0");

    let amount = (parseFloat(userShareInfo[userShareInfo.findIndex(item => item.tokenId = sellTokenId)].shareAmount) * (parseFloat(percentShare) / 100))
    Tab.push(amount.toString());
    Tab.push("0");

    Tab.push(sellShareDataTab.length.toString());
    for (let index = 0; index < sellShareDataTab.length; index++) {
      Tab.push(sellShareDataTab[index].address)
    }

    Tab.push(sellShareDataTab.length.toString());
    for (let index = 0; index < sellShareDataTab.length; index++) {
      Tab.push(sellShareDataTab[index].percent.toString())
    }

    // Tab.push(sellShareTab.length.toString());
    // sellShareTab.forEach((element) => {
    //   Tab.push(hexToDecimalString(element.address));
    // });
    // Tab.push(sellShareTab.length.toString());
    // sellShareTab.forEach((element) => {
    //   Tab.push(hexToDecimalString(element.percent));
    // });
>>>>>>> pr/7

    if (!accountInterface.address) {
      console.log("no account detected")
    }
    else {
      console.log("connected")
      multicall2(Tab)
    }
  };

  const multicall2 = async (_tab: any[]) => {
<<<<<<< HEAD
    console.log("invoke")
    let tx1 = await accountInterface.execute(
      [
        {
          contractAddress: comptroller,
          entrypoint: 'sell_share',
          calldata: _tab,
        }
      ]
    );
    console.log(tx1)
=======
    console.log("invoke");
    let tx1 = await accountInterface.execute([
      {
        contractAddress: comptroller,
        entrypoint: "sell_share",
        calldata: _tab,
      },
    ]);
    console.log(tx1);
>>>>>>> pr/7
    // return (tx1)
  };

  const multicall3 = async (_tab: string[]) => {
    let tx1 = await accountInterface.execute([
      {
        contractAddress: contractAddress.Comptroller,
        entrypoint: "addTrackedAsset",
        calldata: _tab,
      },
    ]);
    console.log(tx1);
  };

  const multicall4 = async (_tab: string[]) => {
    let tx1 = await accountInterface.execute([
      {
        contractAddress: contractAddress.Comptroller,
        entrypoint: "removeTrackedAsset",
        calldata: _tab,
      },
    ]);
    console.log(tx1);
  };


  const multicall = async (_tab: any[], _tabA: any[]) => {
<<<<<<< HEAD
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
      {onPopUp ?
        <div style={{position: "absolute", backgroundColor:"black", width:"50%", marginLeft:"25%", display:"flex", flexDirection : "column", padding:"30px"}}>
          <button onClick={() => setonPopUp(false)}>Close</button>
          <p className='fs-35'>Edit Your Vault Description</p>
          <p className='fs-22'>Description :</p>
          <input></input>
          <p className='fs-22'>Tags :</p>
          <input></input>
          <p className='fs-22'>Image :</p>
          <input></input>
          <button>Validate</button>
        </div>
      :
        <></>
      }
      <div className={`${styles.head}`}>
        <div>
          <div className={`${styles.title}`}>
            {/* <FakeImage width='120px' height='120px' fillColor='black' borderRadius='50%' /> */}
            <div style={{ width: '120px', height: '120px', borderRadius: '50%', overflow: 'hidden', backgroundColor: "black" }}>
              <img src={addressdata.photo_link} style={{ objectFit: "cover" }} />
            </div>
            <span className='fs-48' style={{ fontWeight: "bold" }}> {name} </span>
            <button style={{cursor:"pointer"}} onClick={() => setonPopUp(true)}>EDIT</button >
          </div>

          <div className={`${styles.description}`}>
            <span className='fs-22' style={{ fontWeight: "400" }}>{addressdata.description}</span>
            <div>
              {[...Array(Object.keys(addressdata.tags).length)].map((e, i) => {
                return (
                  <span className='fs-20' style={{ fontWeight: "400" }}>{"#" + addressdata.tags[i]}</span>
                )
              })}
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
                    <Link href={"../user/"+assetManager}>
                      <a>
                        {assetManager.substring(0, 5)}...
                      </a>
                    </Link>
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
              <div className={` bg__dotted`} style={{ minHeight: "300px" }}>

                <div className={`${styles.mint}`}>
                  <div className='fs-14' style={{ fontWeight: "bold" }}>
                    <div>
                      {acccountAddress.substring(0, 7)}...
                    </div>
                    <div className='fs-14 '>
                      &nbsp;&nbsp;&nbsp;{isAllowedDepositor ? "allowed depositor" : "not allowed to mint"}
                    </div>
                  </div>
                </div>

                <Flex direction={"column"} gap={"20px"} alignItems={"center"}>
                  <Flex justifyContent={'space-between'} alignItems='center' backgroundColor={"blackAlpha.400"} width={'70%'}
                    borderRadius={'20px'} padding={'10px'}>
                    <NumberInput height={'50px'} variant={'unstyled'} fontFamily={'IBM Plex Mono, sans-serif'} padding={"10px 10px"}
                      alignSelf={"center"} value={buyValue} onChange={handleChange} defaultValue={"0"}>
                      <NumberInputField />
                      <NumberInputStepper>
                      </NumberInputStepper>
                    </NumberInput>
                    {denominationAsset != "deno" &&
                      <Flex alignItems={"center"} >
                        <Text fontSize={"1xl"} fontWeight={"bold"}>
                          {denominationAsset}
                        </Text>
                        <div style={{ width: "30px" }}>
                          {/* {returnImagefromSymbol(denominationAsset)} */}
                          <img src={`require(../../image/${denominationAsset}.png)`} />
                        </div>
                      </Flex>}
                    <Flex flexDir={'column'}>
                      <Text marginLeft={'30px'} color={"whiteAlpha.500"} fontSize={'sm'}>Balance : ~{parseFloat(userBalance).toPrecision(2)}</Text>
                    </Flex>
                  </Flex>
                  <Flex justifyContent={'space-between'} alignItems='center' backgroundColor={"blackAlpha.400"} width={'70%'}
                    borderRadius={'20px'} padding={'10px'} paddingRight={'30px'}>
                    <Text height={'50px'} variant={'unstyled'} fontFamily={'IBM Plex Mono, sans-serif'} padding={"10px 10px"}
                      alignSelf={"center"} width={"50%"}>
                      {((parseFloat(buyValue) / parseFloat(sharePrice)) - ((parseFloat(buyValue) / parseFloat(sharePrice)) * parseFloat(entranceFee))) == NaN ? 0
                        : ((parseFloat(buyValue) / parseFloat(sharePrice)) - ((parseFloat(buyValue) / parseFloat(sharePrice)) * parseFloat(entranceFee)))}
                    </Text>
                    {denominationAsset != "deno" &&
                      <Flex alignItems={"center"} gap={"2px"}>
                        <Text fontSize={"1xl"} fontWeight={"bold"}>
                          {symbol}
                        </Text>

                        <FakeImage height='30px' width='30px' borderRadius='50%' fillColor='black' />

                      </Flex>
                    }
                    <Flex flexDir={'column'}>
                      <Text color={"whiteAlpha.500"} fontSize={'sm'}>  NFTs : ~{parseFloat(userShareBalance)}</Text>
                    </Flex>
                  </Flex>

                  <Button backgroundColor={'#f6643c'} color={'white'} onClick={() => handleMintShare()} size='md'> Mint</Button>

                </Flex>


              </div>
            </Tab>
            <Tab label='Sell Shares' id='2'>
              {sellTokenId == "" ?
                <div className={` bg__dotted`} style={{ minHeight: "300px" }}>
                  <div className={`${styles.mint}`}>

                    <div className='fs-14' style={{ fontWeight: "bold" }}>
                      <div>
                        {acccountAddress.substring(0, 7)}...
                      </div>
                      <div className='fs-14 '>
                        &nbsp;&nbsp;&nbsp;{userShareBalance == "" ? "Fetching your shares" : userShareBalance == '0' ? "you don't have any shares" : "See below your shares"}
                      </div>
                    </div>
                    {userShareInfo.length != 0 &&
                      userShareInfo.map((p, index) => (
                        <div>
                          <div>
                            tokenID : {p.tokenId}
                          </div>
                          <div>
                            Share amount: {p.shareAmount}
                          </div>
                          <div>
                            <Button backgroundColor={"#f6643c"} style={{ margin: '8px auto' }} onClick={() => setSellTokenId(p.tokenId)}>Sell</Button>
                          </div>
                        </div>
                      ))
                    }

                  </div>
                </div>

                :
                <div className={` bg__dotted`}>
                  <div className={`${styles.mint}`}>

                    <div className='fs-14' style={{ fontWeight: "bold" }}>
                      <div>
                        tokenID : {sellTokenId}
                      </div>
                      {/* <div className='fs-14 '>
                        &nbsp;&nbsp;&nbsp; 
                      </div> */}
                    </div>
                    <Text>You are allowed to sell this share</Text>
                    <Text>Selling {(parseFloat(userShareInfo[parseFloat(sellTokenId)].shareAmount) * (parseFloat(percentShare) / 100)).toPrecision(5)} {symbol} Shares</Text>
                    <Slider
                      flex='1'
                      focusThumbOnChange={false}
                      value={parseFloat(percentShare)}
                      onChange={handleChange2}
                      width={"80%"}
                      colorScheme='#f6643c'
                    >
                      <SliderTrack>
                        <SliderFilledTrack />
                      </SliderTrack>
                      <SliderThumb fontSize='sm' boxSize='32px' children={parseFloat(percentShare)} />
                    </Slider>
                    <div>
                      {percentShare == "0" ?
                        <>
                          ~ {userShareInfo[parseFloat(sellTokenId)].shareAmount} shares available
                        </>
                        :
                        <>
                          ~ {(((parseFloat(userShareInfo[parseFloat(sellTokenId)].shareAmount) * (parseFloat(percentShare) / 100) * parseFloat(sharePrice)) - ((parseFloat(userShareInfo[parseFloat(sellTokenId)].shareAmount) * (parseFloat(percentShare) / 100) * parseFloat(sharePrice)) * (((parseFloat(sharePrice) - parseFloat(userShareInfo[parseFloat(sellTokenId)].pricePurchased)) / (parseFloat(sharePrice))) * (parseFloat(performanceFee) / 100)))) - (((parseFloat(userShareInfo[parseFloat(sellTokenId)].shareAmount) * (parseFloat(percentShare) / 100) * parseFloat(sharePrice)) - ((parseFloat(userShareInfo[parseFloat(sellTokenId)].shareAmount) * (parseFloat(percentShare) / 100) * parseFloat(sharePrice)) * (((parseFloat(sharePrice) - parseFloat(userShareInfo[parseFloat(sellTokenId)].pricePurchased)) / (parseFloat(sharePrice))) * (parseFloat(performanceFee) / 100)))) * (parseFloat(exitFee) / 100))).toPrecision(2)} {denominationAsset} including Performance and exit fees
                        </>
                      }

                    </div>
                    <div>
                      <div>
                        Reedem funds with
                      </div>
                      {onChange == true ?
                        <div>
                          {trackedAssets.map((p, index) => (
                            <div>
                              <div>
                                <button type="button" style={{ width: "50px" }} onClick={() => handleSelected(index)}>
                                  {console.log(index)}
                                  {returnImagefromSymbol(p.coinSymbol)}

                                </button>
                                {

                                }
                                {p.selected == true &&
                                  <Flex direction={"row"}>
                                    <NumberInput size='md' maxW={24} defaultValue={15} min={10} value={sellValue
                                    } onChange={handleChange3}>
                                      <NumberInputField />
                                      <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                      </NumberInputStepper>
                                    </NumberInput>
                                    <Button backgroundColor={'#f6643c'} color={'white'} onClick={() => addPercent(p.coinSymbol, p.address, index)} > Set</Button>
                                  </Flex>
                                }
                              </div>
                            </div>
                          ))}
                        </div>
                        :
                        <div>
                          {trackedAssets.map((p, index) => (
                            <div>
                              <div>
                                <button type="button" style={{ width: "50px" }} onClick={() => handleSelected(index)}>
                                  {returnImagefromSymbol(p.coinSymbol)}
                                </button>
                                {p.selected == true &&
                                  <Flex direction={"row"}>
                                    <NumberInput size='md' maxW={24} defaultValue={100} min={1} value={sellValue
                                    } onChange={handleChange3}>
                                      <NumberInputField />
                                      <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                      </NumberInputStepper>
                                    </NumberInput>
                                    <Button backgroundColor={'#f6643c'} color={'white'} onClick={() => addPercent(p.coinSymbol, p.address, index)}> Set</Button>
                                  </Flex>
                                }
                              </div>
                            </div>
                          ))}
                        </div>
                      }


                    </div>
                    <Flex>
                      <Text>Sum must be 100% : </Text>
                      {sellShareTab.map((p, index) => (
                        <Text>
                          {console.log(index)}
                          {console.log(sellShareTab)}
                          {p.percent}% {p.symbol} {index == sellShareTab.length - 1 ? "" : "+"}
                        </Text>
                      ))}
                    </Flex>

                    <Button backgroundColor={'#f6643c'} color={'white'} onClick={() => handleSellShare()} size='md'> Sell</Button>


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
            <Line id="graph" data={data} options={options} ></Line>
            
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
=======
    let tx1 = await accountInterface.execute([
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
      <Box padding={"4vw"}>
        {loading == true ? (
          <Text alignSelf={"center"} fontSize={"5xl"}>
            Just A moment ⌛⏳
          </Text>
        ) : fundExist == true ? (
          <Flex direction={"column"} gap={"2vw"}>
            <Flex direction={"row"} justifyContent={"space-between"}>
              <Flex direction={"column"} gap={"1vw"}>
                <Flex direction={"row"} gap={"2vw"} alignItems={"center"}>
                  <Box
                    style={{
                      width: "120px",
                      height: "120px",
                      borderRadius: "30px",
                      overflow: "hidden",
                      backgroundColor: "black",
                    }}
                  >
                    <img
                      src={vaultInfo?.image}
                      style={{ objectFit: "cover" }}
                    />
                  </Box>
                  <Flex direction={"column"}>
                    <Flex direction={"row"} alignItems={"center"}>
                      <Text fontWeight={"extrabold"} fontSize={"4xl"}>
                        {" "}
                        {name}
                      </Text>
                      <Text
                        fontWeight={"semibold"}
                        fontSize={"1xl"}
                        marginLeft={"5px"}
                      >
                        ({symbol})
                      </Text>
                    </Flex>

                    {vaultInfo !== undefined && (
                      <Stack direction={"row"}>
                        {[...Array(Object.keys(vaultInfo.tags).length)].map(
                          (e, i) => {
                            return (
                              <Text fontWeight={"semibold"} fontSize={"1.5rem"}>
                                {"#" + vaultInfo.tags[i]}
                              </Text>
                            );
                          }
                        )}
                      </Stack>
                    )}
                    <Text fontWeight={"light"} fontSize={"1rem"}>
                      <Link
                        href={"https://goerli.voyager.online/contract/" + vad}
                      >
                        <a>
                          <>
                            {vad && typeof vad == "string" && (
                              <>
                                {vad.substring(0, 5)}
                                ...
                              </>
                            )}
                            <ExternalLinkIcon mx="2px" marginTop={"-2px"} />
                          </>
                        </a>
                      </Link>
                    </Text>
                  </Flex>
                </Flex>
                <Box maxWidth={"40vw"} marginLeft={"1vw"}>
                  <Text fontWeight={"light"} fontSize={"2xl"}>
                    {vaultInfo?.strategy}
                  </Text>
                </Box>
              </Flex>

              <Flex
                direction={"column"}
                padding={"1vw"}
                marginRight={"1vw"}
                alignItems={"center"}
                gap={"2vh"}
                marginTop={"-50px"}
              >
                <Flex direction={"row"} alignItems={"center"} gap={"0.5vw"}>
                  {denominationAsset != "deno" && (
                    <Box
                      style={{
                        width: "80px",
                        height: "80px",
                        borderRadius: "15px",
                        overflow: "hidden",
                        backgroundColor: "transparent",
                      }}
                    >
                      <Image
                        src={returnImagefromAddress(denominationAssetAddress)}
                      />
                    </Box>
                  )}
                  <Flex direction={"column"}>
                    <Text
                      fontSize={"4xl"}
                      color={
                        totalIncome
                          ? totalIncome < 0
                            ? "rgb(237,33,49)"
                            : "#31c48d"
                          : "#31c48d"
                      }
                    >
                      {totalIncome == 0 ? "--" : totalIncome?.toPrecision(4)}%
                    </Text>
                    <Text
                      fontSize={"-moz-initial"}
                      marginTop={"-10px"}
                      marginLeft={"60px"}
                    >
                      Projected APR
                    </Text>
                  </Flex>
                </Flex>

                <Flex
                  direction={"row"}
                  borderRadius={"20px"}
                  gap={"2vw"}
                  padding={"2vh"}
                  borderTop={" 2px solid #f6643c; "}
                  borderBottom={" 2px solid #f6643c; "}
                  backgroundColor={"#01000dc7"}
                  className={` bg__dotted`}
                >
                  <Flex direction={"column"} gap={"1vh"} alignItems={"center"}>
                    <Text fontWeight={"light"} fontSize={"-moz-initial"}>
                      Risk
                    </Text>
                    <Text fontWeight={"bold"} fontSize={"2xl"}>
                      Low
                    </Text>
                  </Flex>
                  <Flex direction={"column"} gap={"1vh"} alignItems={"center"}>
                    <Text fontWeight={"light"} fontSize={"-moz-initial"}>
                      GAV
                    </Text>
                    <Text fontWeight={"bold"} fontSize={"2xl"}>
                      {parseFloat(gav) < 0.01
                        ? parseFloat(gav).toExponential(2)
                        : parseFloat(gav)}
                    </Text>
                  </Flex>
                  <Flex direction={"column"} gap={"1vh"} alignItems={"center"}>
                    <Text fontWeight={"light"} fontSize={"-moz-initial"}>
                      Rank
                    </Text>
                    <Text fontWeight={"bold"} fontSize={"2xl"}>
                      --
                    </Text>
                  </Flex>
                  <Flex direction={"column"} gap={"1vh"} alignItems={"center"}>
                    <Text fontWeight={"light"} fontSize={"-moz-initial"}>
                      Access
                    </Text>
                    <Text fontWeight={"bold"} fontSize={"2xl"}>
                      {isPublic == "1" ? "Public" : "Private"}
                    </Text>
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
            <Box
              className={` bg__dotted`}
              padding={"3vh"}
              backgroundColor={"#01000dc7"}
              borderRadius={"25px"}
              display={"flex"}
              flexDirection={"column"}
              gap={"1vh"}
            >
              <Flex
                direction={"row"}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Flex direction={"row"} gap={"1vw"}>
                  <Box
                    style={{
                      width: "80px",
                      height: "80px",
                      borderRadius: "50%",
                      overflow: "hidden",
                      backgroundColor: "black",
                    }}
                  >
                    <img
                      src={assetManagerImage}
                      style={{ objectFit: "cover" }}
                    />
                  </Box>
                  <Flex direction={"column"}>
                    <div>
                      <Flex direction={"row"} gap={"0.5rem"}>
                        <Text fontWeight={"light"} fontSize={"2xl"}>
                          Managed by{" "}
                        </Text>
                        <Text fontWeight={"semibold"} fontSize={"2xl"}>
                          <Link href={"../user/" + assetManager}>
                            <a>
                              {assetManagerName != "" ? (
                                assetManagerName
                              ) : (
                                <>
                                  {assetManager.substring(0, 5)}
                                  ...
                                  {assetManager.substring(
                                    assetManager.length - 5,
                                    assetManager.length
                                  )}
                                </>
                              )}
                            </a>
                          </Link>
                        </Text>
                      </Flex>
                    </div>
                    <Flex direction={"column"}>
                      <Flex direction={"row"} gap={"2px"}>
                        <Text fontSize={"0.8rem"} fontWeight={"light"}>
                          Last active{" "}
                        </Text>
                        <Text
                          fontSize={"0.8rem"}
                          style={{ fontWeight: "bold" }}
                        >
                          18 days ago{" "}
                        </Text>
                      </Flex>
                      <Flex direction={"row"} gap={"2px"}>
                        <Text fontSize={"0.8rem"} fontWeight={"light"}>
                          Fund's allocation{" "}
                        </Text>
                        <Text
                          fontSize={"0.8rem"}
                          style={{ fontWeight: "bold" }}
                        >
                          {assetManagerShareAmount
                            ? (assetManagerShareAmount / (parseFloat(shareSupply))
                            ) *
                            100
                            : "--"}
                          %
                        </Text>
                      </Flex>
                    </Flex>
                  </Flex>
                </Flex>
                <Flex
                  direction={"row"}
                  gap={"1vw"}
                  marginRight={"2vw"}
                  marginTop={"-25px"}
                >
                  <Button backgroundColor={"#030135"} padding={"10px"}>
                    <Icon as={BsShare} w={6} h={6} />
                  </Button>
                  {menuSelected == 1 ? (
                    <Button
                      backgroundColor={"#f6643c"}
                      padding={"10px"}
                      onClick={() => setMenuSelected(0)}
                    >
                      <Flex direction={"row"} gap={"5px"} alignItems={"center"}>
                        <Icon as={BiArrowBack} w={6} h={6} />
                        <Text fontWeight={"bold"} fontSize={"2xl"}>
                          Back
                        </Text>
                      </Flex>
                    </Button>
                  ) : (
                    <Button
                      backgroundColor={"#f6643c"}
                      padding={"10px"}
                      onClick={() => setMenuSelected(1)}
                    >
                      <Flex direction={"row"} gap={"5px"} alignItems={"center"}>
                        <Icon as={GiPayMoney} w={6} h={6} />
                        <Text fontWeight={"bold"} fontSize={"2xl"}>
                          Invest
                        </Text>
                      </Flex>
                    </Button>
                  )}
                  {assetManager != acccountAddress && menuSelected == 5 ? (
                    <Button
                      backgroundColor={"#f6643c"}
                      padding={"10px"}
                      onClick={() => setMenuSelected(0)}
                    >
                      <Flex direction={"row"} gap={"5px"} alignItems={"center"}>
                        <Icon as={BiArrowBack} w={6} h={6} />
                        <Text fontWeight={"bold"} fontSize={"2xl"}>
                          Back
                        </Text>
                      </Flex>
                    </Button>
                  ) : (
                    <Button
                      backgroundColor={"#f6643c"}
                      padding={"10px"}
                      onClick={() => setMenuSelected(5)}
                    >
                      <Flex direction={"row"} gap={"5px"} alignItems={"center"}>
                        <Icon as={MdManageSearch} w={6} h={6} />
                        <Text fontWeight={"bold"} fontSize={"2xl"}>
                          Manage
                        </Text>
                      </Flex>
                    </Button>
                  )}
                </Flex>
              </Flex>
              <Box
                backgroundColor={"#0f0b1f"}
                padding={"1vw"}
                borderTop={"solid 1px #f6643c"}
              >
                {menuSelected == 0 ? (
                  <Tabs>
                    <Flex
                      direction={"column"}
                      alignItems={"center"}
                      gap={"1vw"}
                    >
                      <TabList>
                        <Flex direction={"row"} alignItems={"center"}>
                          <Tab fontSize={"1xl"} fontWeight={"bold"}>
                            Overview
                          </Tab>
                          <Tab fontSize={"1xl"} fontWeight={"bold"}>
                            Holdings
                          </Tab>
                          <Tab fontSize={"1xl"} fontWeight={"bold"}>
                            Fees
                          </Tab>
                          <Tab fontSize={"1xl"} fontWeight={"bold"}>
                            Policies
                          </Tab>
                          {/* <Tab fontSize={"1xl"} fontWeight={"bold"}>
                            Financial
                          </Tab>
                          <Tab fontSize={"1xl"} fontWeight={"bold"}>
                            Activity
                          </Tab>
                          <Tab fontSize={"1xl"} fontWeight={"bold"}>
                            Depositors
                          </Tab>
                          <Tab fontSize={"1xl"} fontWeight={"bold"}>
                            Social
                          </Tab> */}
                        </Flex>
                      </TabList>
                      <Box
                        width={"60vw"}
                        minHeight={"30vw"}
                        borderRadius="10%"
                        borderTop={"solid 2px #f6643c"}
                        borderBottom={"solid 2px #f6643c"}
                        backgroundColor="blackAlpha.400"
                        padding={"2%"}
                      >
                        <TabPanels>
                          <TabPanel>
                            <Flex flexDirection={"column"} gap={"1rem"}>
                              <Flex
                                justifyContent={"space-between"}
                                direction={"row"}
                              >
                                <Flex
                                  direction={"row"}
                                  gap={"1vw"}
                                  alignItems={"center"}
                                >
                                  <Flex direction={"column"}>
                                    <Flex direction={"row"}>
                                      <Text fontSize={"4xl"}>
                                        {" "}
                                        {chartSelected == 1
                                          ? `${parseFloat(sharePrice) < 1
                                            ? parseFloat(
                                              sharePrice
                                            ).toExponential(2)
                                            : parseFloat(sharePrice)
                                          }`
                                          : `GAV: ${parseFloat(gav) < 1
                                            ? parseFloat(gav).toExponential(
                                              2
                                            )
                                            : parseFloat(gav)
                                          }`}
                                      </Text>
                                      {denominationAsset != "deno" && (
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
                                            src={returnImagefromAddress(
                                              denominationAssetAddress
                                            )}
                                          />
                                        </Box>
                                      )}
                                    </Flex>
                                    {chartSelected == 1 && (
                                      <Text fontSize={"2xl"}>/ Share</Text>
                                    )}
                                  </Flex>
                                  <Text
                                    fontSize={"4xl"}
                                    color={
                                      timeframe == 0
                                        ? dailyIncome
                                          ? dailyIncome > 0
                                            ? "#31c48d"
                                            : "rgb(237,33,49)"
                                          : "#31c48d"
                                        : timeframe == 1
                                          ? weeklyIncome
                                            ? weeklyIncome > 0
                                              ? "#31c48d"
                                              : "rgb(237,33,49)"
                                            : "#31c48d"
                                          : timeframe == 2
                                            ? monthlyIncome
                                              ? monthlyIncome > 0
                                                ? "#31c48d"
                                                : "rgb(237,33,49)"
                                              : "#31c48d"
                                            : timeframe == 3
                                              ? totalIncome
                                                ? totalIncome > 0
                                                  ? "#31c48d"
                                                  : "rgb(237,33,49)"
                                                : "#31c48d"
                                              : "31c48d"
                                    }
                                  >
                                    {" "}
                                    {timeframe == 0
                                      ? dailyIncome == 0
                                        ? "--"
                                        : dailyIncome?.toPrecision(4)
                                      : timeframe == 1
                                        ? weeklyIncome == 0
                                          ? "--"
                                          : weeklyIncome?.toPrecision(4)
                                        : timeframe == 2
                                          ? monthlyIncome == 0
                                            ? "--"
                                            : monthlyIncome?.toPrecision(4)
                                          : timeframe == 3
                                            ? totalIncome == 0
                                              ? "--"
                                              : totalIncome?.toPrecision(4)
                                            : "--"}
                                    %{" "}
                                  </Text>
                                </Flex>
                                <Flex
                                  direction={"row"}
                                  alignItems={"center"}
                                  gap={"1rem"}
                                >
                                  <Select onChange={handleInputChange}>
                                    <option value={1}>Share price</option>
                                    <option value={2}>Gross Asset value</option>
                                  </Select>
                                  <Flex direction={"row"} gap={"1px"}>
                                    <Button
                                      borderRadius={"25% 0% 0% 25%"}
                                      backgroundColor={
                                        timeframe == 0 ? "#f6643c" : "#030135"
                                      }
                                      onClick={() => setTimeframe(0)}
                                    >
                                      1D
                                    </Button>
                                    <Button
                                      borderRadius={"0px"}
                                      backgroundColor={
                                        timeframe == 1 ? "#f6643c" : "#030135"
                                      }
                                      onClick={() => setTimeframe(1)}
                                    >
                                      1W
                                    </Button>
                                    <Button
                                      borderRadius={"0px"}
                                      backgroundColor={
                                        timeframe == 2 ? "#f6643c" : "#030135"
                                      }
                                      onClick={() => setTimeframe(2)}
                                    >
                                      1M
                                    </Button>

                                    <Button
                                      borderRadius={"0% 25% 25% 0%"}
                                      backgroundColor={
                                        timeframe == 3 ? "#f6643c" : "#030135"
                                      }
                                      onClick={() => setTimeframe(3)}
                                    >
                                      ALL
                                    </Button>
                                  </Flex>
                                </Flex>
                              </Flex>
                              <ResponsiveContainer
                                width="100%"
                                aspect={9.0 / 3.0}
                              >
                                <AreaChart data={chartData}>
                                  <XAxis
                                    dataKey="epoch"
                                    tickFormatter={dateFormatter}
                                    minTickGap={25}
                                  />
                                  {/* <YAxis dataKey="sharePrice"/> */}
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
                                          chartSelected == 1
                                            ? chartData[0]
                                              ? chartData[0].sharePrice >
                                                chartData[chartData.length - 1]
                                                  .sharePrice
                                                ? "rgb(237,33,49)"
                                                : "#31c48d"
                                              : "rgb(237,33,49)"
                                            : chartData[0]
                                              ? chartData[0].gav >
                                                chartData[chartData.length - 1]
                                                  .gav
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
                                      chartSelected == 1 ? "sharePrice" : "gav"
                                    }
                                    stroke={
                                      chartSelected == 1
                                        ? chartData[0]
                                          ? chartData[0].sharePrice >
                                            chartData[chartData.length - 1]
                                              .sharePrice
                                            ? "rgb(237,33,49)"
                                            : "#31c48d"
                                          : "rgb(237,33,49)"
                                        : chartData[0]
                                          ? chartData[0].gav >
                                            chartData[chartData.length - 1].gav
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
                              <Flex
                                direction={"row"}
                                justifyContent={"space-between"}
                              >
                                <Flex direction={"column"} gap={".200rem"}>
                                  <Text
                                    fontWeight={"light"}
                                    fontSize={".875rem"}
                                  >
                                    Creation Date
                                  </Text>
                                  <Text
                                    fontWeight={"bold"}
                                    fontSize={"1.125rem"}
                                  >
                                    {vaultInfo?.dataFinance != undefined &&
                                      moment(
                                        vaultInfo?.dataFinance[0].date
                                      ).format("dddd, MMMM Do, YYYY h:mm:ss A")}
                                  </Text>
                                </Flex>
                                <Flex direction={"row"} gap={"1rem"}>
                                  <Flex direction={"column"} gap={".200rem"}>
                                    <Text
                                      fontWeight={"light"}
                                      fontSize={".875rem"}
                                    >
                                      Last Day
                                    </Text>
                                    <Text
                                      fontWeight={"bold"}
                                      fontSize={"1.125rem"}
                                      color={
                                        dailyIncome
                                          ? dailyIncome < 0
                                            ? "rgb(237,33,49)"
                                            : "#31c48d"
                                          : "#31c48d"
                                      }
                                    >
                                      {dailyIncome == 0
                                        ? "--"
                                        : dailyIncome?.toPrecision(4)}
                                      %
                                    </Text>
                                  </Flex>
                                  <Flex direction={"column"} gap={".200rem"}>
                                    <Text
                                      fontWeight={"light"}
                                      fontSize={".875rem"}
                                    >
                                      Last Week
                                    </Text>
                                    <Text
                                      fontWeight={"bold"}
                                      fontSize={"1.125rem"}
                                      color={
                                        weeklyIncome
                                          ? weeklyIncome < 0
                                            ? "rgb(237,33,49)"
                                            : "#31c48d"
                                          : "#31c48d"
                                      }
                                    >
                                      {weeklyIncome == 0
                                        ? "--"
                                        : weeklyIncome?.toPrecision(4)}
                                      %
                                    </Text>
                                  </Flex>
                                  <Flex direction={"column"} gap={".200rem"}>
                                    <Text
                                      fontWeight={"light"}
                                      fontSize={".875rem"}
                                    >
                                      Last Month
                                    </Text>
                                    <Text
                                      fontWeight={"bold"}
                                      fontSize={"1.125rem"}
                                      color={
                                        monthlyIncome
                                          ? monthlyIncome < 0
                                            ? "rgb(237,33,49)"
                                            : "#31c48d"
                                          : "#31c48d"
                                      }
                                    >
                                      {monthlyIncome == 0
                                        ? "--"
                                        : monthlyIncome?.toPrecision(4)}
                                      %
                                    </Text>
                                  </Flex>
                                  <Flex direction={"column"} gap={".200rem"}>
                                    <Text
                                      fontWeight={"light"}
                                      fontSize={".875rem"}
                                    >
                                      Since Creation
                                    </Text>
                                    <Text
                                      fontWeight={"bold"}
                                      fontSize={"1.125rem"}
                                      color={
                                        totalIncome
                                          ? totalIncome < 0
                                            ? "rgb(237,33,49)"
                                            : "#31c48d"
                                          : "#31c48d"
                                      }
                                    >
                                      {totalIncome == 0
                                        ? "--"
                                        : totalIncome?.toPrecision(4)}
                                      %
                                    </Text>
                                  </Flex>
                                </Flex>
                              </Flex>
                              {/* </Box> */}
                            </Flex>
                          </TabPanel>
                          <TabPanel>
                            <Flex direction={"column"} gap={"2vw"}>
                              <div>
                                {trackedAssetsLen != 0  ? (
                                  <div
                                    className={`${styles.portfolioTable} bg__dotted`}
                                  >
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
                                              <Box
                                                style={{
                                                  width: "50px",
                                                  height: "50px",
                                                  borderRadius: "15px",
                                                  overflow: "hidden",
                                                  backgroundColor:
                                                    "transparent",
                                                }}
                                              >
                                                <Image
                                                  src={returnImagefromAddress(
                                                    p.address
                                                  )}
                                                />
                                              </Box>

                                              <div>
                                                <span> {
                                                returnNamefromAddress(p.address)} </span>
                                                <span> {returnSymbolfromAddress(p.address)} </span>
                                              </div>
                                            </td>
                                            <td>
                                              {" "}
                                              {p.balance == "" ? "⌛⏳" : p.balance} {returnSymbolfromAddress(p.address)}
                                            </td>
                                            <td>
                                            {p.value == "" ? "⌛⏳" : p.value} {denominationAsset}
                                            </td>
                                            <td>{p.allocation == "" ? "⌛⏳" : p.allocation}</td>
                                          </tr>
                                        ))}
                                      </tbody>
                                    </table>
                                  </div>
                                ) : (
                                  <div
                                    className={`${styles.portfolioTable} bg__dotted`}
                                  >
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
                                          <td>
                                            {" "}
                                            Fetching Tracked Assets, please
                                            wait..
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                )}
                              </div>

                            </Flex>
                          </TabPanel>
                          <TabPanel>
                            <div className={`${styles.feesTable} bg__dotted`}>
                              <table cellSpacing="0" cellPadding="0">
                                <thead>
                                  <tr>
                                    <th>Fee Type</th>
                                    <th>Fee Value</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr key={1}>
                                    <td>Entrance Fee</td>
                                    <td>
                                      <div>
                                        <div> {entranceFee}%</div>
                                      </div>
                                    </td>
                                  </tr>
                                  <tr key={2}>
                                    <td>Exit Fee</td>
                                    <td>
                                      <div>
                                        <div> {exitFee}%</div>
                                      </div>
                                    </td>
                                  </tr>
                                  <tr key={3}>
                                    <td>Performance Fee</td>
                                    <td>
                                      <div>
                                        <div> {performanceFee}%</div>
                                      </div>
                                    </td>
                                  </tr>
                                  <tr key={4}>
                                    <td>Management Fee</td>
                                    <td>
                                      <div>
                                        <div> {managementFee}%</div>
                                      </div>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </TabPanel>
                          <TabPanel>
                            <div
                              className={`bg__dotted ${styles.policiesTabContent}`}
                            >
                              {isPublic == "1" ? (
                                <div>
                                  <div className="fs-24 fw-600">
                                    {name} is a public fund
                                  </div>
                                </div>
                              ) : (
                                <div>
                                  <div className="fs-24 fw-600">
                                    {name} is a private fund
                                  </div>
                                </div>
                              )}
                              <div>
                                <div className="fs-24 fw-600">
                                  Deposit Limits
                                </div>
                                <div className="fs-20 fw-600">
                                  minimum : {minAmount} {denominationAsset}
                                </div>
                                <div className="fs-20 fw-600">
                                  maximum : {maxAmount} {denominationAsset}
                                </div>
                              </div>
                              <div>
                                <div className="fs-24 fw-600">Timelock</div>
                                <div className="fs-20 fw-600">
                                  After minting shares, you'll have to wait :{" "}
                                  {timeLock} seconds before you can sell it
                                </div>
                              </div>
                              <div>
                                <Flex direction={"column"}>
                                  <div className="fs-24 fw-600">
                                    Allowed Asset to Track
                                  </div>
                                  <Flex
                                    direction={"row"}
                                    gap={"10px"}
                                    alignItems={"center"}
                                  >
                                    {allowedTrackedAsset.map((p, index) => (
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
                                          src={returnImagefromAddress(p)}
                                        />
                                      </Box>
                                    ))}
                                  </Flex>
                                </Flex>
                              </div>
                              <div>
                                <Flex direction={"column"}>
                                  <div className="fs-24 fw-600">
                                    Allowed Integrations
                                  </div>
                                  <Flex
                                    direction={"row"}
                                    gap={"10px"}
                                    alignItems={"center"}
                                  >
                                    {allowedIntegration.map((p, index) => (
                                      <Flex
                                        direction={"column"}
                                        justifyContent={"center"}
                                        alignItems={"center"}
                                        gap={"10px"}
                                      >
                                        <Box
                                          style={{
                                            width: "100px",
                                            height: "100px",
                                            borderRadius: "15px",
                                            overflow: "hidden",
                                            backgroundColor: "transparent",
                                          }}
                                        >
                                          <Image
                                            src={returnImagefromAddress(p[0])}
                                          />
                                        </Box>
                                        <Text>
                                          {" "}
                                          {returnSelectorfromAddress(p[1])}
                                        </Text>
                                      </Flex>
                                    ))}
                                  </Flex>
                                </Flex>
                              </div>
                            </div>
                          </TabPanel>
                          <TabPanel>
                            <div
                              className={`bg__dotted ${styles.financialTabContent}`}
                            >
                              <div>
                                <div className="fs-24 fw-600">
                                  General Information
                                </div>
                                <div>
                                  <div className="fw-600">
                                    General Assets Vault (GAV)
                                  </div>
                                  <div>
                                    <span className="fw-700">
                                      1,993,516.452 MGTY
                                    </span>
                                    <span>$1,993,516.452</span>
                                  </div>
                                </div>
                              </div>
                              <div>
                                <div>
                                  <div className="fw-600">
                                    Net Assets Valut (NAV)
                                  </div>
                                  <div>
                                    <span className="fw-700">
                                      1,993,516.452 MGTY
                                    </span>
                                    <span>$1,993,516.452</span>
                                  </div>
                                </div>
                              </div>
                              <div>
                                <div className="fs-24 fw-600">
                                  Financial Metrics
                                </div>
                                <div>
                                  <div className="fw-600">
                                    Return Month-to-Date
                                  </div>
                                  <div>
                                    <span className="text-success">+0.5%</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </TabPanel>
                          <TabPanel>
                            <div
                              className={`${styles.depositorsTable} bg__dotted`}
                            >
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
                                      <td>{d.depositor}</td>
                                      <td>{d.Since}</td>
                                      <td>{d.numberOfShares}</td>
                                      <td>{d.percentage} %</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </TabPanel>
                          <TabPanel>
                            <div className={`${styles.activitiesContainer}`}>
                              <div className="bg__dotted">
                                <div>
                                  <div>
                                    <div>
                                      <div className="fs-12">
                                        29 Apr 2022 01:22
                                      </div>
                                      <div className="fs-24 fw-600">
                                        Deposit
                                      </div>
                                    </div>
                                    <div>
                                      <FakeImage
                                        height="50px"
                                        width="50px"
                                        borderRadius="50%"
                                        fillColor="black"
                                      />
                                      <div>
                                        <div className="fs-20 fw-700">
                                          Vault name
                                        </div>
                                        <div className="fs-12">
                                          0x4s21...1452
                                        </div>
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
                              <div className="bg__dotted"></div>
                            </div>
                          </TabPanel>
                        </TabPanels>
                      </Box>
                    </Flex>
                  </Tabs>
                ) : menuSelected == 1 ? (
                  <Tabs>
                    <Flex
                      direction={"column"}
                      alignItems={"center"}
                      gap={"1vw"}
                    >
                      <TabList borderBottom={"0px solid "}>
                        <Flex direction={"row"} alignItems={"center"}>
                          <Tab fontSize={"1xl"} fontWeight={"bold"}>
                            Buy
                          </Tab>
                          <Tab fontSize={"1xl"} fontWeight={"bold"}>
                            Sell
                          </Tab>
                        </Flex>
                      </TabList>
                      <Box
                        borderRadius="10%"
                        borderTop={"solid 2px #f6643c"}
                        borderBottom={"solid 2px #f6643c"}
                        backgroundColor="blackAlpha.400"
                        padding={"2%"}
                      >
                        <TabPanels>
                          <TabPanel>
                            <Box>
                              {/* <div className={`${styles.mint}`}>
  <div className='fs-14' style={{ fontWeight: "bold" }}>
    <div>
      {acccountAddress.substring(0, 7)}...
    </div>
    <div className='fs-14 '>
      &nbsp;&nbsp;&nbsp;{isAllowedDepositor ? "allowed depositor" : "not allowed to mint"}
    </div>
  </div>
</div> */}

                              <Flex
                                direction={"column"}
                                gap={"20px"}
                                alignItems={"center"}
                              >
                                <Text fontSize={"2xl"}>
                                  {" "}
                                  {isAllowedDepositor
                                    ? "Allowed to Mint 🎉"
                                    : "not allowed to mint"}{" "}
                                </Text>

                                <Flex
                                  direction={"column"}
                                  gap={"20px"}
                                  alignItems={"center"}
                                >
                                  <Flex
                                    justifyContent={"space-between"}
                                    alignItems="center"
                                    backgroundColor={"blackAlpha.400"}
                                    width={"90%"}
                                    borderRadius={"20px"}
                                    padding={"10px"}
                                  >
                                    <NumberInput
                                      height={"50px"}
                                      variant={"unstyled"}
                                      fontFamily={"IBM Plex Mono, sans-serif"}
                                      padding={"10px 10px"}
                                      alignSelf={"center"}
                                      value={buyValue}
                                      onChange={handleChange}
                                      defaultValue={0}
                                      max={parseFloat(userBalance)}
                                    >
                                      <NumberInputField />
                                    </NumberInput>
                                    <Flex direction={"row"}>
                                      {denominationAsset != "deno" && (
                                        <Flex alignItems={"center"} gap={"5px"}>
                                          <Text
                                            fontSize={"1xl"}
                                            fontWeight={"bold"}
                                          >
                                            {denominationAsset}
                                          </Text>
                                          <Box
                                            style={{
                                              width: "50px",
                                              height: "50px",
                                              borderRadius: "10px",
                                              overflow: "hidden",
                                            }}
                                          >
                                            <Image
                                              src={returnImagefromAddress(
                                                denominationAssetAddress
                                              )}
                                            />
                                          </Box>
                                        </Flex>
                                      )}
                                      <Flex
                                        marginLeft={"30px"}
                                        flexDir={"column"}
                                      >
                                        <Text
                                          color={"whiteAlpha.300"}
                                          fontSize={"sm"}
                                        >
                                          Balance{" "}
                                        </Text>
                                        <Text
                                          color={"whiteAlpha.700"}
                                          fontSize={"sm"}
                                        >
                                          {parseFloat(userBalance).toPrecision(
                                            2
                                          )}
                                        </Text>
                                      </Flex>
                                    </Flex>
                                  </Flex>
                                  <Flex
                                    justifyContent={"space-between"}
                                    alignItems="center"
                                    backgroundColor={"blackAlpha.400"}
                                    width={"90%"}
                                    borderRadius={"20px"}
                                    padding={"10px"}
                                  >
                                    <Text
                                      height={"50px"}
                                      variant={"unstyled"}
                                      fontFamily={"IBM Plex Mono, sans-serif"}
                                      padding={"10px 10px"}
                                      alignSelf={"center"}
                                      width={"50%"}
                                    >
                                      {buyValue / sharePrice -
                                        (buyValue / parseFloat(sharePrice)) *
                                        parseFloat(entranceFee)}
                                    </Text>
                                    {denominationAsset != "deno" && (
                                      <Flex alignItems={"center"} gap={"15px"}>
                                        <Text
                                          fontSize={"1xl"}
                                          fontWeight={"bold"}
                                        >
                                          {symbol}
                                        </Text>

                                        <Box
                                          style={{
                                            width: "50px",
                                            height: "50px",
                                            borderRadius: "10px",
                                            overflow: "hidden",
                                            backgroundColor: "black",
                                          }}
                                        >
                                          <img
                                            src={vaultInfo?.image}
                                            style={{ objectFit: "cover" }}
                                          />
                                        </Box>
                                      </Flex>
                                    )}
                                    <Flex
                                      marginLeft={"30px"}
                                      flexDir={"column"}
                                    >
                                      <Text
                                        color={"whiteAlpha.300"}
                                        fontSize={"sm"}
                                      >
                                        Balance{" "}
                                      </Text>
                                      <Text
                                        color={"whiteAlpha.700"}
                                        fontSize={"sm"}
                                      >
                                        {" "}
                                        ~{getUserTotalShare().toPrecision(2)}
                                      </Text>
                                    </Flex>
                                  </Flex>

                                  <Button
                                    backgroundColor={"#f6643c"}
                                    color={"white"}
                                    onClick={() => handleMintShare()}
                                    size="md"
                                  >
                                    {" "}
                                    Mint
                                  </Button>
                                </Flex>
                              </Flex>
                            </Box>
                          </TabPanel>
                          <TabPanel>
                            <Flex minWidth={"60vh"} direction={"column"} gap={"40px"}>
                              <Box >
                                <Flex
                                  direction={"column"}
                                  gap={"20px"}
                                  alignItems={"center"}
                                >
                                  <Text fontSize={"2xl"}>
                                    {userShareBalance == ""
                                      ? "Fetching your shares"
                                      : userShareBalance == "0"
                                        ? "you don't have any shares"
                                        : "See below your shares "}
                                  </Text>
                                  <Flex direction={"row"} gap={"10px"}>
                                    {userShareInfo.length != 0 &&
                                      userShareInfo.map((p, index) => (
                                        <Flex
                                          direction={"column"}
                                          alignItems={"center"}
                                        >
                                          <Box
                                            style={{
                                              width: "100px",
                                              height: "100px",
                                              borderRadius: "20px",
                                              overflow: "hidden",
                                              backgroundColor: "black",
                                            }}
                                          >
                                            <img
                                              src={vaultInfo?.image}
                                              style={{ objectFit: "cover" }}
                                            />
                                          </Box>
                                          <Flex
                                            direction={"column"}
                                            justifyContent={"space-between"}
                                            alignItems={"center"}
                                          >
                                            <Text> ID : {p.tokenId}</Text>
                                            <Text>
                                              Amount :{" "}
                                              {parseFloat(p.shareAmount) /
                                                1000000000000000000}
                                            </Text>
                                          </Flex>
                                          <Button
                                            backgroundColor={"#f6643c"}
                                            onClick={() =>
                                              setSellTokenId(p.tokenId)
                                            }
                                          >
                                            Sell
                                          </Button>
                                        </Flex>
                                      ))}
                                  </Flex>
                                </Flex>
                              </Box>

                              {sellTokenId && (
                                <Flex direction={"column"} marginTop={"40px"}>
                                  <Box borderTop={"solid 2px #f6643c"} padding={"2vw"}>
                                    <Flex direction={"column"} gap={"20px"} alignItems={"center"}>
                                      <Text fontSize={"2xl"}>
                                        ID {sellTokenId} : Allowed to sell 🎉
                                      </Text>
                                      <Text>
                                        Selling{" "}
                                        {(

                                          (parseFloat(
                                            userShareInfo[userShareInfo.findIndex(item => item.tokenId = sellTokenId)]
                                              .shareAmount
                                          ) *
                                            (parseFloat(percentShare) / 100)) / 1000000000000000000

                                        ).toPrecision(5)}{" "}
                                        {symbol}
                                      </Text>
                                      <Slider
                                        flex="1"
                                        focusThumbOnChange={false}
                                        value={parseFloat(percentShare)}
                                        onChange={handleChange2}
                                        width={"80%"}
                                        colorScheme="#f6643c"
                                      >
                                        <SliderTrack bg="red.100">
                                          <SliderFilledTrack bg="tomato" />
                                        </SliderTrack>
                                        <SliderThumb
                                          fontSize="lg"
                                          boxSize="50px"
                                          children={percentShare + "%"}
                                          color={"#f6643c"}
                                        />
                                      </Slider>
                                      <div>
                                        {percentShare == "0" ? (
                                          <Text>
                                            ~{" "}
                                            {
                                              userShareInfo[userShareInfo.findIndex(item => item.tokenId = sellTokenId)]
                                                .shareAmount / 1000000000000000000
                                            }{" "}
                                            shares available
                                          </Text>
                                        ) : (
                                          <Flex direction={"column"} justifyContent={"center"} alignItems={"center"}>
                                            <Text fontWeight={"bold"}>
                                              ~{" "}
                                              {((
                                                parseFloat(
                                                  userShareInfo[
                                                    userShareInfo.findIndex(item => item.tokenId = sellTokenId)
                                                  ].shareAmount
                                                ) *
                                                (parseFloat(percentShare) / 100) *
                                                parseFloat(sharePrice) -
                                                parseFloat(
                                                  userShareInfo[
                                                    userShareInfo.findIndex(item => item.tokenId = sellTokenId)
                                                  ].shareAmount
                                                ) *
                                                (parseFloat(percentShare) / 100) *
                                                parseFloat(sharePrice) *
                                                (((parseFloat(sharePrice) -
                                                  parseFloat(
                                                    userShareInfo[
                                                      userShareInfo.findIndex(item => item.tokenId = sellTokenId)
                                                    ].pricePurchased
                                                  )) /
                                                  parseFloat(sharePrice)) *
                                                  (parseFloat(performanceFee) /
                                                    100)) -
                                                (parseFloat(
                                                  userShareInfo[
                                                    userShareInfo.findIndex(item => item.tokenId = sellTokenId)
                                                  ].shareAmount
                                                ) *
                                                  (parseFloat(percentShare) / 100) *
                                                  parseFloat(sharePrice) -
                                                  parseFloat(
                                                    userShareInfo[
                                                      userShareInfo.findIndex(item => item.tokenId = sellTokenId)
                                                    ].shareAmount
                                                  ) *
                                                  (parseFloat(percentShare) / 100) *
                                                  parseFloat(sharePrice) *
                                                  (((parseFloat(sharePrice) -
                                                    parseFloat(
                                                      userShareInfo[
                                                        userShareInfo.findIndex(item => item.tokenId = sellTokenId)
                                                      ].pricePurchased
                                                    )) /
                                                    parseFloat(sharePrice)) *
                                                    (parseFloat(performanceFee) /
                                                      100))) *
                                                (parseFloat(exitFee) / 100)
                                              ) / 1000000000000000000).toPrecision(2)}{" "}
                                              {denominationAsset}
                                            </Text>
                                            <Text fontSize={"0.75rem"} fontWeight={"light"}>
                                              including
                                              Performance and exit fees
                                            </Text>
                                          </Flex>
                                        )}
                                      </div>

                                    </Flex>

                                  </Box>
                                  <Box>
                                    <Flex direction={"column"} gap={"20px"} alignItems={"center"} padding={"2vw"} borderTop={"solid 2px #f6643c"}>
                                      <Text fontSize={"2xl"}>Reedem funds with</Text>
                                      <Flex minWidth={"20vw"} gap={"50px"}>
                                        <div className={styles.asset_container}>
                                          {trackedAssets.map((item, index) => (
                                            <Button
                                              key={index}
                                              backgroundColor={"#0f0b1"}
                                              type="button"
                                              data-color="transparent"
                                              onClick={() => addNewAsset(item.address, 0, item.coinSymbol)}
                                              className={`${styles.asset_button} ${sellShareDataTab.includes({ percent: 0, address: item.address, symbol: "d" })
                                                ? styles.asset_selected
                                                : ""
                                                }`}
                                            >
                                              <Image src={returnImagefromAddress(item.address)} />
                                              {sellShareDataTab.find((x) => x.address == item.address) && (
                                                <>
                                                  <span
                                                    className={styles.asset_selected_checkmark}
                                                  >
                                                    <Image
                                                      src={"/checkmark-circle-outline.svg"}
                                                      width="48px"
                                                      height="48px"
                                                    />
                                                  </span>
                                                </>
                                              )}
                                            </Button>
                                          ))}
                                        </div>
                                        <Flex direction={"column"} gap={"5px"}>
                                          {sellShareDataTab.map((item, index) => (
                                            <Flex direction={"row"} gap={"5px"} alignItems={"center"}>
                                              <Box width={"40px"}> <Image src={returnImagefromAddress(item.address)} /></Box>

                                              <NumberInput
                                                size="sm"
                                                defaultValue={10}
                                                min={10}
                                                step={1}
                                                value={sellValue}
                                                onChange={handleChange3}
                                              >
                                                <NumberInputField />
                                                <NumberInputStepper>
                                                  <NumberIncrementStepper />
                                                  <NumberDecrementStepper />
                                                </NumberInputStepper>
                                              </NumberInput>
                                              <Button backgroundColor={"#f6643c"} onClick={() => setSellValueToIndex(index)}>
                                                Set
                                              </Button>
                                            </Flex>
                                          ))}

                                        </Flex>
                                      </Flex>
                                      {dataSetChange == true ?
                                        <Flex direction={"column"} gap={"10px"} alignItems={"center"}>
                                          <Flex direction={"row"} gap={"10px"}>
                                            {
                                              sellShareDataTab.map((item, index) => (
                                                <Flex direction={"row"} gap={"10px"}>
                                                  <Text>{item.percent}% {item.symbol}</Text>

                                                  {index == sellShareDataTab.length &&
                                                    <Text>+</Text>
                                                  }
                                                </Flex>

                                              ))
                                            }
                                          </Flex>
                                          {
                                            sellShareDataTab.reduce((accumulator, current) => accumulator + current.percent, 0) == 100 ?

                                              <Button
                                                backgroundColor={"#f6643c"}
                                                color={"white"}
                                                onClick={() => handleSellShare()}
                                                size="md"
                                                width={"200px"}
                                              >

                                                {" "}
                                                Sell
                                              </Button>
                                              :
                                              <Text fontWeight={"bold"} color={"#f6643c"}> Sum must be equal to 100%</Text>
                                          }

                                        </Flex>
                                        :
                                        <Flex direction={"column"} gap={"10px"} alignItems={"center"}>
                                          <Flex direction={"row"} gap={"10px"}>
                                            {
                                              sellShareDataTab.map((item, index) => (
                                                <Flex direction={"row"} gap={"10px"}>
                                                  <Text>{item.percent}% {item.symbol}</Text>

                                                  {index == sellShareDataTab.length &&
                                                    <Text>+</Text>
                                                  }
                                                </Flex>

                                              ))
                                            }
                                          </Flex>
                                          {
                                            sellShareDataTab.reduce((accumulator, current) => accumulator + current.percent, 0) == 100 ?

                                              <Button
                                                backgroundColor={"#f6643c"}
                                                color={"white"}
                                                onClick={() => handleSellShare()}
                                                size="md"
                                                width={"200px"}
                                              >

                                                {" "}
                                                Sell
                                              </Button>
                                              :
                                              <Text> Sum must be equal to 100%</Text>
                                          }

                                        </Flex>
                                      }
                                    </Flex>
                                  </Box>
                                  <Flex>
                                    {/* <Text>Sum must be 100% : </Text>
                                    {sellShareTab.map((p, index) => (
                                      <Text>

                                        {p.percent}% {p.symbol}{" "}
                                        {index == sellShareTab.length - 1
                                          ? ""
                                          : "+"}
                                      </Text>
                                    ))} */}
                                  </Flex>


                                </Flex>
                              )}
                            </Flex>
                          </TabPanel>
                        </TabPanels>
                      </Box>
                    </Flex>
                  </Tabs>
                ) : (
                  <div>
                    <Tabs>
                      <Flex
                        direction={"column"}
                        alignItems={"center"}
                        gap={"1vw"}
                      >
                        <TabList borderBottom={"0px solid "}>
                          <Flex direction={"row"} alignItems={"center"}>
                            <Tab fontSize={"1xl"} fontWeight={"bold"}>
                              DeFi
                            </Tab>
                            <Tab fontSize={"1xl"} fontWeight={"bold"}>
                              Track
                            </Tab>
                            <Tab fontSize={"1xl"} fontWeight={"bold"}>
                              Policies
                            </Tab>
                          </Flex>
                        </TabList>
                        <Box
                          width={"60vw"}
                          minHeight={"30vw"}
                          borderRadius="10%"
                          borderTop={"solid 2px #f6643c"}
                          borderBottom={"solid 2px #f6643c"}
                          backgroundColor="blackAlpha.400"
                          padding={"2%"}
                        >
                          <TabPanels>
                            <TabPanel>
                              <Flex width={"100%"} justifyContent={"space-evenly"} marginBottom={"80px"}>
                                <Button onClick={() => setDefiSelected(1)} backgroundColor={defiSelected == 1 ? "#f6643c" : "#0f0b1f"}>
                                  Swap
                                </Button>
                                <Button onClick={() => setDefiSelected(2)} backgroundColor={defiSelected == 2 ? "#f6643c" : "#0f0b1f"}>
                                  Bring Liquidity
                                </Button>
                                <Button onClick={() => setDefiSelected(3)} backgroundColor={defiSelected == 3 ? "#f6643c" : "#0f0b1f"}>
                                  Remove Liquidity
                                </Button>
                              </Flex>
                              {defiSelected == 1 ?
                                <>
                                  {trackedAssetsAddress &&

                                    <Flex
                                      direction={"column"}
                                      gap={"20px"}
                                      alignItems={"center"}
                                    >
                                      <Flex direction={"row"} gap={"50px"} position={"relative"}>

                                        <Box

                                        >
                                          <div className={styles.asset_container} style={{ position: "absolute", left: "-200px", width: "220px" }}>
                                            {ARFSWAPTABADDRESS.filter(item => trackedAssetsAddress.includes(item)).map((item, index) => (
                                              <Button
                                                key={index}
                                                type="button"
                                                backgroundColor={"#0f0b1f"}
                                                onClick={() => setSellSwapToken(item)}
                                                className={`${styles.asset_button} ${sellSwapToken == item
                                                  ? styles.asset_selected
                                                  : ""
                                                  }`}
                                              >
                                                <Image src={returnImagefromAddress(item)} />
                                                {sellSwapToken == item && (
                                                  <>
                                                    <span className={styles.asset_selected_checkmark}>
                                                      <Image
                                                        src={"/checkmark-circle-outline.svg"}

                                                        width="24px"
                                                        height="24px"
                                                      />
                                                    </span>
                                                  </>
                                                )}
                                              </Button>
                                            ))}
                                          </div>
                                        </Box>

                                        <Flex
                                          justifyContent={"space-between"}
                                          alignItems="center"
                                          backgroundColor={"#04062f"}
                                          width={"450px"}
                                          borderRadius={"20px"}
                                          padding={"10px"}
                                        >
                                          <NumberInput
                                            height={"50px"}
                                            variant={"unstyled"}
                                            fontFamily={"IBM Plex Mono, sans-serif"}
                                            padding={"10px 10px"}
                                            alignSelf={"center"}
                                            value={sellSwapTokenInput}
                                            onChange={handleChangeSell}
                                            max={sellSwapTokenBalance}
                                          >
                                            <NumberInputField />
                                          </NumberInput>
                                          <Flex direction={"row"}>
                                            {denominationAsset != "deno" && (
                                              <Flex alignItems={"center"} gap={"5px"}>
                                                <Text
                                                  fontSize={"1xl"}
                                                  fontWeight={"bold"}
                                                >
                                                  {sellSwapToken ? returnSymbolfromAddress(sellSwapToken) : ""}
                                                </Text>
                                                <Box
                                                  style={{
                                                    width: "50px",
                                                    height: "50px",
                                                    borderRadius: "10px",
                                                    overflow: "hidden",
                                                  }}
                                                >{sellSwapToken && <Image
                                                  src={returnImagefromAddress(
                                                    sellSwapToken
                                                  )}
                                                />}

                                                </Box>
                                              </Flex>
                                            )}
                                            <Flex
                                              marginLeft={"30px"}
                                              flexDir={"column"}
                                            >
                                              <Text
                                                color={"whiteAlpha.300"}
                                                fontSize={"sm"}
                                              >
                                                Balance{" "}
                                              </Text>
                                              <Text
                                                color={"whiteAlpha.700"}
                                                fontSize={"sm"}
                                              >
                                                {sellSwapTokenBalance.toPrecision(
                                                  2
                                                )}
                                              </Text>
                                            </Flex>
                                          </Flex>
                                        </Flex>
                                      </Flex>
                                      <IconContext.Provider
                                        value={{ color: '#f6643c', size: '50px' }}
                                      >
                                        <div>
                                          <MdOutlineSwapVert />
                                        </div>
                                      </IconContext.Provider>

                                      <Flex direction={"row"} gap={"50px"} position={"relative"}>
                                        <Box

                                        >
                                          <div className={styles.asset_container} style={{ position: "absolute", left: "-200px", width: "220px" }}>
                                            {ARFSWAPTABADDRESS.filter(item => trackedAssetsAddress.includes(item)).map((item, index) => (
                                              <Button
                                                key={index}
                                                type="button"
                                                backgroundColor={"#0f0b1f"}
                                                onClick={() => setBuySwapToken(item)}
                                                className={`${styles.asset_button} ${buySwapToken == item
                                                  ? styles.asset_selected
                                                  : ""
                                                  }`}
                                              >
                                                <Image src={returnImagefromAddress(item)} />
                                                {buySwapToken == item && (
                                                  <>
                                                    <span className={styles.asset_selected_checkmark}>
                                                      <Image
                                                        src={"/checkmark-circle-outline.svg"}

                                                        width="24px"
                                                        height="24px"
                                                      />
                                                    </span>
                                                  </>
                                                )}
                                              </Button>
                                            ))}
                                          </div>
                                        </Box>
                                        <Flex
                                          justifyContent={"space-between"}
                                          alignItems="center"
                                          backgroundColor={"#04062f"}
                                          width={"450px"}
                                          borderRadius={"20px"}
                                          padding={"10px"}
                                        >
                                          <Text
                                            height={"50px"}
                                            variant={"unstyled"}
                                            fontFamily={"IBM Plex Mono, sans-serif"}
                                            padding={"10px 10px"}
                                            alignSelf={"center"}
                                            width={"100%"}
                                          >
                                            { buySwapTokenRate != 0 ? sellSwapTokenInput / buySwapTokenRate : 0 }
                                          </Text>

                                          <Flex alignItems={"center"} gap={"5px"}>
                                            <Text
                                              fontSize={"1xl"}
                                              fontWeight={"bold"}
                                            >
                                              {buySwapToken ? returnSymbolfromAddress(buySwapToken) : ""}
                                            </Text>
                                            {buySwapToken &&

                                              <Box
                                                style={{
                                                  width: "50px",
                                                  height: "50px",
                                                  borderRadius: "10px",
                                                  overflow: "hidden",

                                                }}
                                              >
                                                <Image
                                                  src={returnImagefromAddress(buySwapToken)}
                                                  style={{ objectFit: "cover" }}
                                                />
                                              </Box>
                                            }

                                          </Flex>

                                          <Flex
                                            marginLeft={"30px"}
                                            flexDir={"column"}
                                          >
                                            <Text
                                              color={"whiteAlpha.300"}
                                              fontSize={"sm"}
                                            >
                                              Balance{" "}
                                            </Text>
                                            <Text
                                              color={"whiteAlpha.700"}
                                              fontSize={"sm"}
                                            >
                                              {" "}
                                              {buySwapTokenFundBalance.toPrecision(2)}
                                            </Text>
                                          </Flex>

                                        </Flex>
                                      </Flex>
                                      <Spacer />
                                      <Spacer />



                                      {buySwapToken && sellSwapToken ?

                                        buySwapToken == sellSwapToken ?
                                          <Text fontWeight={"bold"} color={"#f6643c"}> Swap {returnSymbolfromAddress(buySwapToken)} for {returnSymbolfromAddress(sellSwapToken)} is very smart ! </Text>

                                          :

                                          trackedAssetsAddress.includes(buySwapToken) ?
                                            <Button
                                              backgroundColor={"#f6643c"}
                                              color={"white"}
                                              onClick={() => handleSwap()}
                                              size="md"
                                            >
                                              {" "}
                                              Swap
                                            </Button>
                                            :
                                            <Text fontWeight={"bold"} color={"#f6643c"}>Incoming asset not tracked</Text>

                                        :
                                        <Text fontWeight={"bold"} color={"#f6643c"}>Select the assets you want to Swap </Text>
                                      }

                                    </Flex>
                                  }
                                </> :
                                defiSelected == 2 ?
                                  <>
                                    {trackedAssetsAddress &&

                                      <Flex
                                        direction={"column"}
                                        gap={"20px"}
                                        alignItems={"center"}
                                      >
                                        <Flex direction={"row"} gap={"25px"} alignItems={"center"}>
                                          <Flex
                                            justifyContent={"space-between"}
                                            alignItems="center"
                                            backgroundColor={"blackAlpha.400"}
                                            width={"300px"}
                                            borderRadius={"20px"}
                                            padding={"10px"}
                                          >
                                            <NumberInput
                                              height={"50px"}
                                              variant={"unstyled"}
                                              fontFamily={"IBM Plex Mono, sans-serif"}
                                              padding={"10px 10px"}
                                              alignSelf={"center"}
                                              value={buyValue}
                                              onChange={handleChange}
                                              defaultValue={0}
                                              max={parseFloat(userBalance)}
                                            >
                                              <NumberInputField />
                                            </NumberInput>
                                            <Flex direction={"row"}>
                                              {denominationAsset != "deno" && (
                                                <Flex alignItems={"center"} gap={"5px"}>
                                                  <Text
                                                    fontSize={"1xl"}
                                                    fontWeight={"bold"}
                                                  >
                                                    {sellSwapToken ? returnSymbolfromAddress(sellSwapToken) : ""}
                                                  </Text>
                                                  <Box
                                                    style={{
                                                      width: "50px",
                                                      height: "50px",
                                                      borderRadius: "10px",
                                                      overflow: "hidden",
                                                    }}
                                                  >{sellSwapToken && <Image
                                                    src={returnImagefromAddress(
                                                      sellSwapToken
                                                    )}
                                                  />}

                                                  </Box>
                                                </Flex>
                                              )}
                                              <Flex
                                                marginLeft={"30px"}
                                                flexDir={"column"}
                                              >
                                                <Text
                                                  color={"whiteAlpha.300"}
                                                  fontSize={"sm"}
                                                >
                                                  Balance{" "}
                                                </Text>
                                                <Text
                                                  color={"whiteAlpha.700"}
                                                  fontSize={"sm"}
                                                >
                                                  {sellSwapTokenBalance.toPrecision(
                                                    2
                                                  )}
                                                </Text>
                                              </Flex>
                                            </Flex>
                                          </Flex>
                                          <IconContext.Provider
                                            value={{ color: 'white', size: '25px' }}
                                          >
                                            <div>
                                              <AiOutlinePlus />
                                            </div>
                                          </IconContext.Provider>


                                          <Flex
                                            justifyContent={"space-between"}
                                            alignItems="center"
                                            backgroundColor={"blackAlpha.400"}
                                            width={"300px"}
                                            borderRadius={"20px"}
                                            padding={"10px"}
                                          >
                                            <NumberInput
                                              height={"50px"}
                                              variant={"unstyled"}
                                              fontFamily={"IBM Plex Mono, sans-serif"}
                                              padding={"10px 10px"}
                                              alignSelf={"center"}
                                              value={buyValue}
                                              onChange={handleChange}
                                              defaultValue={0}
                                              max={parseFloat(userBalance)}
                                            >
                                              <NumberInputField />
                                            </NumberInput>
                                            <Flex direction={"row"}>
                                              {denominationAsset != "deno" && (
                                                <Flex alignItems={"center"} gap={"5px"}>
                                                  <Text
                                                    fontSize={"1xl"}
                                                    fontWeight={"bold"}
                                                  >
                                                    {sellSwapToken ? returnSymbolfromAddress(sellSwapToken) : ""}
                                                  </Text>
                                                  <Box
                                                    style={{
                                                      width: "50px",
                                                      height: "50px",
                                                      borderRadius: "10px",
                                                      overflow: "hidden",
                                                    }}
                                                  >{sellSwapToken && <Image
                                                    src={returnImagefromAddress(
                                                      sellSwapToken
                                                    )}
                                                  />}

                                                  </Box>
                                                </Flex>
                                              )}
                                              <Flex
                                                marginLeft={"30px"}
                                                flexDir={"column"}
                                              >
                                                <Text
                                                  color={"whiteAlpha.300"}
                                                  fontSize={"sm"}
                                                >
                                                  Balance{" "}
                                                </Text>
                                                <Text
                                                  color={"whiteAlpha.700"}
                                                  fontSize={"sm"}
                                                >
                                                  {sellSwapTokenBalance.toPrecision(
                                                    2
                                                  )}
                                                </Text>
                                              </Flex>
                                            </Flex>
                                          </Flex>
                                        </Flex>

                                        <IconContext.Provider
                                          value={{ color: '#f6643c', size: '50px' }}
                                        >
                                          <div>
                                            <MdArrowCircleDown />
                                          </div>
                                        </IconContext.Provider>

                                        <Flex direction={"row"} gap={"50px"} position={"relative"}>
                                          <Box

                                          >
                                            <div className={styles.asset_container} style={{ position: "absolute", left: "-120px" }}>
                                              {ARFLPTABADDRESS.filter(item => trackedAssetsAddress.includes(item)).map((item, index) => (
                                                <Button
                                                  key={index}
                                                  type="button"
                                                  backgroundColor={"#0f0b1f"}
                                                  onClick={() => setBringLiquidtyToken(item)}
                                                  className={`${styles.asset_button} ${bringLiquidtyToken == item
                                                    ? styles.asset_selected
                                                    : ""
                                                    }`}
                                                >
                                                  <Image src={returnImagefromAddress(item)} />
                                                  {bringLiquidtyToken == item && (
                                                    <>
                                                      <span className={styles.asset_selected_checkmark}>
                                                        <Image
                                                          src={"/checkmark-circle-outline.svg"}

                                                          width="24px"
                                                          height="24px"
                                                        />
                                                      </span>
                                                    </>
                                                  )}
                                                </Button>
                                              ))}
                                            </div>
                                          </Box>
                                          <Flex
                                            justifyContent={"space-between"}
                                            alignItems="center"
                                            backgroundColor={"blackAlpha.400"}
                                            width={"450px"}
                                            borderRadius={"20px"}
                                            padding={"10px"}
                                          >
                                            <Text
                                              height={"50px"}
                                              variant={"unstyled"}
                                              fontFamily={"IBM Plex Mono, sans-serif"}
                                              padding={"10px 10px"}
                                              alignSelf={"center"}
                                              width={"100%"}
                                            >
                                              {buySwapTokenBalance}
                                            </Text>

                                            <Flex alignItems={"center"} gap={"5px"}>
                                              <Text
                                                fontSize={"1xl"}
                                                fontWeight={"bold"}
                                              >
                                                {bringLiquidtyToken ? returnSymbolfromAddress(bringLiquidtyToken) : ""}
                                              </Text>
                                              {bringLiquidtyToken &&

                                                <Box
                                                  style={{
                                                    width: "50px",
                                                    height: "50px",
                                                    borderRadius: "10px",
                                                    overflow: "hidden",

                                                  }}
                                                >
                                                  <Image
                                                    src={returnImagefromAddress(bringLiquidtyToken)}
                                                    style={{ objectFit: "cover" }}
                                                  />
                                                </Box>
                                              }

                                            </Flex>

                                            <Flex
                                              marginLeft={"30px"}
                                              flexDir={"column"}
                                            >
                                              <Text
                                                color={"whiteAlpha.300"}
                                                fontSize={"sm"}
                                              >
                                                Balance{" "}
                                              </Text>
                                              <Text
                                                color={"whiteAlpha.700"}
                                                fontSize={"sm"}
                                              >
                                                {" "}
                                                {bringLiquidityTokenFundBalance.toPrecision(2)}
                                              </Text>
                                            </Flex>

                                          </Flex>
                                        </Flex>
                                        <Spacer />
                                        <Spacer />



                                        {buySwapToken && sellSwapToken ?

                                          buySwapToken == sellSwapToken ?
                                            <Text fontWeight={"bold"} color={"#f6643c"}> Swap {returnSymbolfromAddress(buySwapToken)} for {returnSymbolfromAddress(sellSwapToken)} is very smart ! </Text>

                                            :

                                            trackedAssetsAddress.includes(buySwapToken) ?
                                              <Button
                                                backgroundColor={"#f6643c"}
                                                color={"white"}
                                                onClick={() => handleMintShare()}
                                                size="md"
                                              >
                                                {" "}
                                                Mint
                                              </Button>
                                              :
                                              <Text fontWeight={"bold"} color={"#f6643c"}>Incoming asset not tracked</Text>

                                          :
                                          <Text fontWeight={"bold"} color={"#f6643c"}>Select the assets you want to Swap </Text>
                                        }

                                      </Flex>
                                    }
                                  </> :
                                  defiSelected == 3 &&
                                  <>
                                    {trackedAssetsAddress &&

                                      <Flex
                                        direction={"column"}
                                        gap={"20px"}
                                        alignItems={"center"}
                                      >
                                        <Flex direction={"row"} gap={"50px"} position={"relative"}>

                                          <Box

                                          >
                                            <div className={styles.asset_container} style={{ position: "absolute", left: "-120px" }}>
                                              {ARFLPTABADDRESS.filter(item => trackedAssetsAddress.includes(item)).map((item, index) => (
                                                <Button
                                                  key={index}
                                                  type="button"
                                                  backgroundColor={"#0f0b1f"}
                                                  onClick={() => setSellSwapToken(item)}
                                                  className={`${styles.asset_button} ${sellSwapToken == item
                                                    ? styles.asset_selected
                                                    : ""
                                                    }`}
                                                >
                                                  <Image src={returnImagefromAddress(item)} />
                                                  {sellSwapToken == item && (
                                                    <>
                                                      <span className={styles.asset_selected_checkmark}>
                                                        <Image
                                                          src={"/checkmark-circle-outline.svg"}

                                                          width="24px"
                                                          height="24px"
                                                        />
                                                      </span>
                                                    </>
                                                  )}
                                                </Button>
                                              ))}
                                            </div>
                                          </Box>
                                          <Box width={"300px"} >
                                            {ARFLPTABADDRESS.filter(item => trackedAssetsAddress.includes(item)) == [] ?


                                              <Slider
                                                flex="1"
                                                focusThumbOnChange={false}
                                                value={parseFloat(percentShare)}
                                                onChange={handleChange2}
                                                width={"80%"}
                                                colorScheme="#f6643c"
                                              >
                                                <SliderTrack bg="red.100">
                                                  <SliderFilledTrack bg="tomato" />
                                                </SliderTrack>
                                                <SliderThumb
                                                  fontSize="md"
                                                  boxSize="40px"
                                                  children={percentShare + "%"}
                                                  color={"#f6643c"}
                                                />
                                              </Slider>
                                              :
                                              <Text textAlign={"center"} fontWeight={"bold"}>
                                                Start by Selecting LP!
                                              </Text>
                                            }
                                          </Box>



                                        </Flex>
                                        <IconContext.Provider
                                          value={{ color: '#f6643c', size: '50px' }}
                                        >
                                          <div>
                                            <MdArrowCircleDown />
                                          </div>
                                        </IconContext.Provider>

                                        <Flex direction={"row"} gap={"25px"} alignItems={"center"}>
                                          <Flex
                                            justifyContent={"space-between"}
                                            alignItems="center"
                                            backgroundColor={"blackAlpha.400"}
                                            width={"450px"}
                                            borderRadius={"20px"}
                                            padding={"10px"}
                                          >
                                            <Text
                                              height={"50px"}
                                              variant={"unstyled"}
                                              fontFamily={"IBM Plex Mono, sans-serif"}
                                              padding={"10px 10px"}
                                              alignSelf={"center"}
                                              width={"100%"}
                                            >
                                              {buySwapTokenBalance}
                                            </Text>

                                            <Flex alignItems={"center"} gap={"5px"}>
                                              <Text
                                                fontSize={"1xl"}
                                                fontWeight={"bold"}
                                              >
                                                {buySwapToken ? returnSymbolfromAddress(buySwapToken) : ""}
                                              </Text>
                                              {buySwapToken &&

                                                <Box
                                                  style={{
                                                    width: "50px",
                                                    height: "50px",
                                                    borderRadius: "10px",
                                                    overflow: "hidden",

                                                  }}
                                                >
                                                  <Image
                                                    src={returnImagefromAddress(buySwapToken)}
                                                    style={{ objectFit: "cover" }}
                                                  />
                                                </Box>
                                              }

                                            </Flex>

                                            <Flex
                                              marginLeft={"30px"}
                                              flexDir={"column"}
                                            >
                                              <Text
                                                color={"whiteAlpha.300"}
                                                fontSize={"sm"}
                                              >
                                                Balance{" "}
                                              </Text>
                                              <Text
                                                color={"whiteAlpha.700"}
                                                fontSize={"sm"}
                                              >
                                                {" "}
                                                {buySwapTokenFundBalance.toPrecision(2)}
                                              </Text>
                                            </Flex>

                                          </Flex>
                                          <IconContext.Provider
                                            value={{ color: 'white', size: '25px' }}
                                          >
                                            <div>
                                              <AiOutlinePlus />
                                            </div>
                                          </IconContext.Provider>

                                          <Flex
                                            justifyContent={"space-between"}
                                            alignItems="center"
                                            backgroundColor={"blackAlpha.400"}
                                            width={"450px"}
                                            borderRadius={"20px"}
                                            padding={"10px"}
                                          >
                                            <Text
                                              height={"50px"}
                                              variant={"unstyled"}
                                              fontFamily={"IBM Plex Mono, sans-serif"}
                                              padding={"10px 10px"}
                                              alignSelf={"center"}
                                              width={"100%"}
                                            >
                                              {buySwapTokenBalance}
                                            </Text>

                                            <Flex alignItems={"center"} gap={"5px"}>
                                              <Text
                                                fontSize={"1xl"}
                                                fontWeight={"bold"}
                                              >
                                                {buySwapToken ? returnSymbolfromAddress(buySwapToken) : ""}
                                              </Text>
                                              {buySwapToken &&

                                                <Box
                                                  style={{
                                                    width: "50px",
                                                    height: "50px",
                                                    borderRadius: "10px",
                                                    overflow: "hidden",

                                                  }}
                                                >
                                                  <Image
                                                    src={returnImagefromAddress(buySwapToken)}
                                                    style={{ objectFit: "cover" }}
                                                  />
                                                </Box>
                                              }

                                            </Flex>

                                            <Flex
                                              marginLeft={"30px"}
                                              flexDir={"column"}
                                            >
                                              <Text
                                                color={"whiteAlpha.300"}
                                                fontSize={"sm"}
                                              >
                                                Balance{" "}
                                              </Text>
                                              <Text
                                                color={"whiteAlpha.700"}
                                                fontSize={"sm"}
                                              >
                                                {" "}
                                                {buySwapTokenFundBalance.toPrecision(2)}
                                              </Text>
                                            </Flex>

                                          </Flex>
                                        </Flex>
                                        <Spacer />
                                        <Spacer />



                                        {buySwapToken && sellSwapToken ?

                                          buySwapToken == sellSwapToken ?
                                            <Text fontWeight={"bold"} color={"#f6643c"}> Swap {returnSymbolfromAddress(buySwapToken)} for {returnSymbolfromAddress(sellSwapToken)} is very smart ! </Text>

                                            :

                                            trackedAssetsAddress.includes(buySwapToken) ?
                                              <Button
                                                backgroundColor={"#f6643c"}
                                                color={"white"}
                                                onClick={() => handleMintShare()}
                                                size="md"
                                              >
                                                {" "}
                                                Mint
                                              </Button>
                                              :
                                              <Text fontWeight={"bold"} color={"#f6643c"}>Incoming asset not tracked</Text>

                                          :
                                          <Text fontWeight={"bold"} color={"#f6643c"}>Select the assets you want to Swap </Text>
                                        }

                                      </Flex>
                                    }
                                  </>}

                            </TabPanel>
                            <TabPanel>


                              {

                              }

                              <Flex direction={"column"} gap={"25px"} justifyContent={"center"}>
                                <Text fontWeight={"bold"} fontSize={"2xl"} textAlign={"center"}>Track and Remove assets to manage your {name} Holdings</Text>
                                {
                                  allowedTrackedAsset && trackedAssetsAddress ?
                                    <Flex direction={"row"} gap={"25px"} justifyContent={"center"} width={"100%"} alignItems={"baseline"}>
                                      <Flex direction={"column"} gap={"25px"} justifyContent={"center"} alignItems={"center"} width={"40%"}>
                                      <Text fontSize={"2xl"} textAlign={"center"}>Assets not tracked yet</Text>
                                      <Flex direction={"column"} gap={"5px"} justifyContent={"center"} alignSelf={"center"} width={"100%"}>
                                        {allowedTrackedAsset.filter(item => !trackedAssetsAddress.includes(item)).map((item, index) => (
                                          <Flex direction={"row"} justifyContent={"space-between"} alignItems={"center"}  width={"100%"}>
                                            <Flex direction={"row"} gap={"4px"} alignItems={"center"}>
                                              <Box
                                                style={{
                                                  width: "50px",
                                                  height: "50px",
                                                  borderRadius: "10px",
                                                  overflow: "hidden",

                                                }}
                                              >
                                                <Image
                                                  src={returnImagefromAddress(item)}
                                                  style={{ objectFit: "cover" }}
                                                />
                                              </Box>
                                              <Text fontWeight={"bold"} fontSize={"2xl"}>{returnSymbolfromAddress(item)}</Text>

                                            </Flex>
                                            <Button onClick={() => handleTrack(item)} type="undefined" backgroundColor={"#f6643c"}>  Track </Button>
                                          </Flex>
                                        ))}
                                      </Flex>
                                      </Flex>
                                      <Flex direction={"column"} gap={"25px"} justifyContent={"center"} alignItems={"center"} width={"40%"}>
                                      <Text fontSize={"2xl"} textAlign={"center"}>Tracked Assets</Text>

                                      <Flex direction={"column"} gap={"5px"} justifyContent={"center"}  alignSelf={"center"} width={"100%"}>
                                        {allowedTrackedAsset.filter(item => trackedAssetsAddress.includes(item)).map((item, index) => (
                                          <Flex direction={"row"} justifyContent={"space-between"} width={"100%"}>
                                            <Flex direction={"row"} gap={"8px"}>
                                              <Box
                                                style={{
                                                  width: "50px",
                                                  height: "50px",
                                                  borderRadius: "10px",
                                                  overflow: "hidden",

                                                }}
                                              >
                                                <Image
                                                  src={returnImagefromAddress(item)}
                                                  style={{ objectFit: "cover" }}
                                                />
                                              </Box>
                                              <Text fontWeight={"bold"} fontSize={"2xl"}>{returnSymbolfromAddress(item)}</Text>

                                            </Flex>
                                            <Button padding={"1vh"} onClick={() => handleUntrack(item)} type="undefined" backgroundColor={"#f6643c"}> Untrack </Button>
                                          </Flex>
                                        ))}
                                      </Flex>
                                      </Flex>
                                    </Flex>
                                    :
                                    <Text> Fetching Data </Text>
                                }
                                <Flex>
                                </Flex>
                              </Flex>
                            </TabPanel>
                            <TabPanel>Policies</TabPanel>
                          </TabPanels>
                        </Box>
                      </Flex>
                    </Tabs>
                  </div>
                )}
              </Box>
            </Box>
          </Flex>
        ) : (
          <Text alignSelf={"center"} fontSize={"5xl"}>
            Fund not found 😥
          </Text>
        )}
      </Box>
    </>
  );
};
>>>>>>> pr/7

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