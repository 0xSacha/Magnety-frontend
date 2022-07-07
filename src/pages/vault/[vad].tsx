import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { NextPage } from "next";
import Link from "next/link";
import styles from "~/styles/vault.module.scss";
import FakeImage from "~/components/FakeImage";
import Image from "next/image";
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
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
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

import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Text,
  Center,
  Stack,
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
  Box,
  SliderMark,
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

type DataChart = {
  date: number;
  sharePrice: number;
  gav: number;
}[];

type sellShareData = {
  percent: number;
  address: string;
  symbol: string;
  rate: number;
}[];

type rateAsset = {
  address: string;
  rate: number;
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
  const [isOpenError, setIsOpenError] = React.useState<boolean>(false);
  const [errorMessage, setErrorMessage] = React.useState<string>("");

  const [vaultInfo, setVaultInfo] = React.useState<ContractInfo>();
  useEffect(() => {
    if (vad !== undefined && typeof vad == "string") {
      setVaultAddess(vad);
      loadData();
    }
  }, [vad]);

  const loadData = async () => {
    const res = await fetch(
      process.env.URL + `api/contract/` + String(vad)
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
      process.env.URL + `api/user/${assetManager_}`
    );
    if (res.status == 200) {
      const { data } = await res.json();
      setAssetManagerImage(data.profilePic);
      setAssetManagerName(data.name);
    } else {
      console.log("not found");
    }
  };

  /* TODO : check if address is correct else use stakingvault address ! */

  const comptroller = contractAddress.Comptroller;
  const valueIntepretor = contractAddress.ValueInterpreter;
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
  const [generalAllowedTrackedAsset, setGeneralAllowedTrackedAsset] = React.useState<string[]>([]);
  const [generalAllowedIntegration, setGeneralAllowedIntegration] = React.useState<string[][]>([]);


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
  const [isAllowedDepositor, setIsAllowedDepositor] =
    React.useState<string>("0");
  const [userShareBalance, setUserShareBalance] = React.useState<string>("");
  const [sellTokenId, setSellTokenId] = React.useState<string>("");
  const [percentShare, setPercentShare] = React.useState<string>("0");
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
  const [withdrawLiquidtyToken, setWithdrawLiquidtyToken] = React.useState<string>();
  const [poolExist, setPoolExist] = React.useState<Boolean>(true);




  const [defiSelected, setDefiSelected] = React.useState<number>(1);

  const [sellSwapTokenInput, setSellSwapTokenInput] = React.useState<number>(0);
  const [buySwapTokenRate, setBuySwapTokenRate] = React.useState<number>(0);

  const [sellSwapTokenBalance, setSellSwapTokenBalance] = React.useState<number>(0);
  const [buySwapTokenBalance, setBuySwapTokenBalance] = React.useState<number>(0);
  const [buySwapTokenFundBalance, setBuySwapTokenFundBalance] = React.useState<number>(0);
  const [bringLiquidityTokenFundBalance, setBringLiquidityTokenFundBalance] = React.useState<number>(0);


  const [TokenLP1, setTokenLP1] = React.useState<string>();
  const [TokenLP2, setTokenLP2] = React.useState<string>();

  const [TokenLP1FundBalance, setTokenLP1FundBalance] = React.useState<number>();
  const [TokenLP2FundBalance, setTokenLP2FundBalance] = React.useState<number>();

  const [TokenLPW1FundBalance, setTokenLP1WFundBalance] = React.useState<number>();
  const [TokenLPW2FundBalance, setTokenLP2WFundBalance] = React.useState<number>();

  const [TokenLPW1, setTokenLPW1] = React.useState<string>();
  const [TokenLPW2, setTokenLPW2] = React.useState<string>();

  const [TokenLP1Input, setTokenLP1Input] = React.useState<number>(0);
  const [TokenLP2Rate, setTokenLP2Rate] = React.useState<number>(0);
  const [tokenLPRate, setTokenLPRate] = React.useState<number>(0);
  const [sellAllowed, setSellAllowed] = React.useState<Boolean>(false);


  const [TokenLPW1Rate, setTokenLP1WRate] = React.useState<number>(0);
  const [TokenLPW2Rate, setTokenLP2WRate] = React.useState<number>(0);

  const [TokenLPInput, setTokenLPInput] = React.useState<number>(0);
  const [allowedToSell, setAllowedToSell] = React.useState<Boolean>();
  const [remainingTime, setRemainingTime] = React.useState<number>(0);
  const [managementFeeToCollect, setManagementFeeToCollect] = React.useState<number>();




  const [allowNewTrackedAsset, setAllowNewTrackedAsset] = React.useState<string[]>([]);




  function addAllowedNewTrackedAsset(address: string) {
    setAllowNewTrackedAsset((state) => {
      const index = state.findIndex((x) => x == address);
      state =
        index === -1
          ? [...state, address]
          : [...state.slice(0, index), ...state.slice(index + 1)];
      return state;
    });
  }



  const ETH_ad = "0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7"
  const BTC_ad = "0x72df4dc5b6c4df72e4288857317caf2ce9da166ab8719ab8306516a2fddfff7"
  const AST_ad = "0x5a6b68181bb48501a7a447a3f99936827e41d77114728960f22892f02e24928"
  const TST_ad = "0x7394cbe418daa16e42b87ba67372d4ab4a5df0b05c6e554d158458ce245bc10"

  // LP
  const Eth_AST_ad = "0x38bd0f8aff67ade736159d373cf3399d15529445b147b6b3348cc96cdf66ad8"
  const BTC_TST_ad = "0x6d0845eb49bcbef8c91f9717623b56331cc4205a5113bddef98ec40f050edc8"
  const ETH_BTC_ad = "0x61fdcf831f23d070b26a4fdc9d43c2fbba1928a529f51b5335cd7b738f97945"



  const ARFSWAPTABADDRESS = [ETH_ad, BTC_ad, AST_ad, TST_ad]
  const ARFLPTABADDRESS = [Eth_AST_ad, ETH_BTC_ad, BTC_TST_ad]


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
    if (sellSwapToken) {
      if (sellSwapToken && buySwapToken) {
        if (sellSwapToken == AST_ad && buySwapToken == BTC_ad || buySwapToken == AST_ad && sellSwapToken == BTC_ad) {
          setPoolExist(false)
        }
        else {
          setPoolExist(true)
        }
      }
    }
  }, [sellSwapToken, buySwapToken]);

  useEffect(() => {
    if (withdrawLiquidtyToken) {

      let LP1 = ""
      let LP2 = ""
      if (withdrawLiquidtyToken == ETH_BTC_ad) {
        setTokenLPW1(ETH_ad)
        setTokenLPW2(BTC_ad)
        LP1 = ETH_ad
        LP2 = BTC_ad
      }

      if (withdrawLiquidtyToken == Eth_AST_ad) {
        setTokenLPW1(ETH_ad)
        setTokenLPW2(AST_ad)
        LP1 = ETH_ad
        LP2 = AST_ad
      }

      if (withdrawLiquidtyToken == ETH_BTC_ad) {
        setTokenLPW1(BTC_ad)
        setTokenLPW2(TST_ad)
        LP1 = BTC_ad
        LP2 = TST_ad
      }





      const res1 = provider.callContract({
        contractAddress: contractAddress.ValueInterpreter,
        entrypoint: "calculAssetValue",
        calldata: [hexToDecimalString(withdrawLiquidtyToken), "1000000000000000000", "0", hexToDecimalString(LP1)],
      });
      res1
        .then((value) => {
          const newPrice = parseFloat(hexToDecimalString(value.result[0])) / 2000000000000000000;
          setTokenLP1WRate(newPrice)
        })
        .catch((err) => {
          console.log(err);
        });


      const res12 = provider.callContract({
        contractAddress: contractAddress.ValueInterpreter,
        entrypoint: "calculAssetValue",
        calldata: [hexToDecimalString(withdrawLiquidtyToken), "1000000000000000000", "0", hexToDecimalString(LP2)],
      });
      res12
        .then((value) => {
          const newPrice = parseFloat(hexToDecimalString(value.result[0])) / 2000000000000000000;
          setTokenLP2WRate(newPrice)
        })
        .catch((err) => {
          console.log(err);
        });


      const res5 = provider.callContract({
        contractAddress: withdrawLiquidtyToken,
        entrypoint: "balanceOf",
        calldata: [hexToDecimalString(vaultAddress)],
      });
      res5
        .then((value) => {
          const fundBalance__ = hexToDecimalString(value.result[0]);
          const fundBalance_ = parseFloat(fundBalance__) / 1000000000000000000;
          setBringLiquidityTokenFundBalance(fundBalance_)
        })
        .catch((err) => {
          console.log(err);
        });


      const res2 = provider.callContract({
        contractAddress: LP1,
        entrypoint: "balanceOf",
        calldata: [hexToDecimalString(vaultAddress)],
      });
      res2
        .then((value) => {
          const fundBalance__ = hexToDecimalString(value.result[0]);
          const fundBalance_ = parseFloat(fundBalance__) / 1000000000000000000;
          setTokenLP1WFundBalance(fundBalance_)
        })
        .catch((err) => {
          console.log(err);
        });

      const res7 = provider.callContract({
        contractAddress: LP2,
        entrypoint: "balanceOf",
        calldata: [hexToDecimalString(vaultAddress)],
      });
      res7
        .then((value) => {
          const fundBalance__ = hexToDecimalString(value.result[0]);
          const fundBalance_ = parseFloat(fundBalance__) / 1000000000000000000;
          setTokenLP2WFundBalance(fundBalance_)
        })
        .catch((err) => {
          console.log(err);
        });



    }
  }, [withdrawLiquidtyToken]);

  useEffect(() => {
    if (bringLiquidtyToken) {

      let LP1 = "";
      let LP2 = "";
      if (bringLiquidtyToken == ETH_BTC_ad) {
        setTokenLP1(ETH_ad)
        setTokenLP2(BTC_ad)
        LP1 = ETH_ad
        LP2 = BTC_ad
      }

      if (bringLiquidtyToken == Eth_AST_ad) {
        setTokenLP1(ETH_ad)
        setTokenLP2(AST_ad)
        LP1 = ETH_ad
        LP2 = AST_ad
      }

      if (bringLiquidtyToken == BTC_TST_ad) {
        setTokenLP1(BTC_ad)
        setTokenLP2(TST_ad)
        LP1 = BTC_ad
        LP2 = TST_ad
      }

      const res1 = provider.callContract({
        contractAddress: contractAddress.ValueInterpreter,
        entrypoint: "calculAssetValue",
        calldata: [hexToDecimalString(LP1), "1000000000000000000", "0", hexToDecimalString(LP2)],
      });
      res1
        .then((value) => {
          const newPrice = parseFloat(hexToDecimalString(value.result[0])) / 1000000000000000000;
          setTokenLP2Rate(newPrice)
        })
        .catch((err) => {
          console.log(err);
        });
      const res2 = provider.callContract({
        contractAddress: LP1,
        entrypoint: "balanceOf",
        calldata: [hexToDecimalString(vaultAddress)],
      });
      res2
        .then((value) => {
          const fundBalance__ = hexToDecimalString(value.result[0]);
          const fundBalance_ = parseFloat(fundBalance__) / 1000000000000000000;
          setTokenLP1FundBalance(fundBalance_)
        })
        .catch((err) => {
          console.log(err);
        });
      const res3 = provider.callContract({
        contractAddress: LP2,
        entrypoint: "balanceOf",
        calldata: [hexToDecimalString(vaultAddress)],
      });
      res3
        .then((value) => {
          const fundBalance__ = hexToDecimalString(value.result[0]);
          const fundBalance_ = parseFloat(fundBalance__) / 1000000000000000000;
          setTokenLP2FundBalance(fundBalance_)
        })
        .catch((err) => {
          console.log(err);
        });
      const res4 = provider.callContract({
        contractAddress: contractAddress.ValueInterpreter,
        entrypoint: "calculAssetValue",
        calldata: [hexToDecimalString(LP1), "2000000000000000000", "0", hexToDecimalString(bringLiquidtyToken)],
      });
      res4
        .then((value) => {
          const newPrice = parseFloat(hexToDecimalString(value.result[0])) / 1000000000000000000;
          setTokenLPRate(newPrice)
        })
        .catch((err) => {
          console.log(err);
        });
      const res5 = provider.callContract({
        contractAddress: bringLiquidtyToken,
        entrypoint: "balanceOf",
        calldata: [hexToDecimalString(vaultAddress)],
      });
      res5
        .then((value) => {
          const fundBalance__ = hexToDecimalString(value.result[0]);
          const fundBalance_ = parseFloat(fundBalance__) / 1000000000000000000;
          setBringLiquidityTokenFundBalance(fundBalance_)
        })
        .catch((err) => {
          console.log(err);
        });


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
    let _sellShareDataTab = sellShareDataTab
    if (_sellShareDataTab) {
      if (_sellShareDataTab.length != 0) {
        for (let index = 0; index < _sellShareDataTab.length; index++) {
          if (_sellShareDataTab[index].rate == 0) {
            const res1 = provider.callContract({
              contractAddress: contractAddress.ValueInterpreter,
              entrypoint: "calculAssetValue",
              calldata: [hexToDecimalString(denominationAssetAddress), "1000000000000000000", "0", hexToDecimalString(_sellShareDataTab[index].address)],
            });
            res1
              .then((value) => {
                const newPrice = parseFloat(hexToDecimalString(value.result[0])) / 1000000000000000000;
                _sellShareDataTab[index].rate = newPrice
                setSellShareDataTab(_sellShareDataTab)
              })
              .catch((err) => {
                console.log(err);
                console.log("errurr")
              });
          }
        }
      }
    }
  }, [sellShareDataTab]);

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


  const handleChange3 = (value) => setSellValue(value);

  const setSellValueToIndex = (index: number) => {
    let tab = sellShareDataTab
    tab[index].percent = sellValue
    setSellShareDataTab(tab)
    setDataSetChange(!dataSetChange)

    if (sellShareDataTab.length != 0) {
      let count = 0
      for (let index = 0; index < sellShareDataTab.length; index++) {
        count = parseFloat(count.toString()) + parseFloat((sellShareDataTab[index].percent.toString()));
      }
      console.log(count)
      if (count == 100) {
        setSellAllowed(true)
      }
      else {
        setSellAllowed(false)
      }


    }
  };

  const removeIndex = (index: number) => {
    let tab = sellShareDataTab
    tab.splice(index, 1)
    setSellShareDataTab(tab)
    setDataSetChange(!dataSetChange)

    if (sellShareDataTab.length != 0) {
      let count = 0
      for (let index = 0; index < sellShareDataTab.length; index++) {
        count = count + sellShareDataTab[index].percent;
      }
      console.log(count)
      if (count == 100) {
        setSellAllowed(true)
      }
      else {
        setSellAllowed(false)
      }


    }
  };




  function addNewAsset(address_: string, percent_: number, symbol_: string) {

    setSellShareDataTab((state) => {
      const elem = { percent: percent_, address: address_, symbol: symbol_, rate: 0 }
      const index = state.findIndex((x) => x.address == address_);
      state =
        index === -1
          ? [...state, elem]
          : [...state.slice(0, index), ...state.slice(index + 1)];
      return state;
    });
  }


  const handleChangeSell = (value) => setSellSwapTokenInput(value);

  const handleChangeLP1Input = (value) => setTokenLP1Input(value)
  const handleChangeLPInput = (value) => setTokenLPInput(value)

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
          "0x5a6b68181bb48501a7a447a3f99936827e41d77114728960f22892f02e24928"
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
              "0x38bd0f8aff67ade736159d373cf3399d15529445b147b6b3348cc96cdf66ad8"
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

  function returnSymbolfromAddress(address: string) {
    if (
      address ==
      "0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7"
    ) {
      return "ETH";
    } else {
      if (
        address ==
        "0x72df4dc5b6c4df72e4288857317caf2ce9da166ab8719ab8306516a2fddfff7"
      ) {
        return "BTC";
      } else {
        if (
          address ==
          "0x5a6b68181bb48501a7a447a3f99936827e41d77114728960f22892f02e24928"
        ) {
          return "AST";
        } else {
          if (
            address ==
            "0x7394cbe418daa16e42b87ba67372d4ab4a5df0b05c6e554d158458ce245bc10"
          ) {
            return "TST";
          } else {
            if (
              address ==
              "0x38bd0f8aff67ade736159d373cf3399d15529445b147b6b3348cc96cdf66ad8"
            ) {
              return "ETH-AST";
            } else {
              if (
                address ==
                "0x6d0845eb49bcbef8c91f9717623b56331cc4205a5113bddef98ec40f050edc8"
              ) {
                return "BTC-TST";
              } else {

                if (
                  address ==
                  "0x61fdcf831f23d070b26a4fdc9d43c2fbba1928a529f51b5335cd7b738f97945"
                ) {
                  return "ETH-BTC";
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
          let TABBBE: PortfolioData = [];
          setTrackedAssetsAddress(tab_)
          for (let index = 0; index < tab_.length; index++) {
            TABBBE.push({
              balance: "",
              value: "",
              allocation: "",
              address: tab_[index],
            })
          }
          setTrackedAssets(TABBBE)
          setTrackedAssetsLen(TABBBE.length);
        }
        )
        .catch((err) => {
          console.log(err);
        });


      const res19 = provider.callContract({
        contractAddress: contractAddress.IntegrationManager,
        entrypoint: "getAvailableAssets",
        calldata: [],
      });
      res19
        .then((value) => {
          let tabAsset = value.result;
          tabAsset[0] = hexToDecimalString(tabAsset[0]);
          const lenghtTab = tabAsset.shift();
          setGeneralAllowedTrackedAsset(tabAsset);
          const res20 = provider.callContract({
            contractAddress: contractAddress.IntegrationManager,
            entrypoint: "getAvailableIntegrations",
            calldata: [],
          });
          res20
            .then((value) => {
              let tabIntegration = value.result;
              const lenghtTab2 = tabIntegration.shift();
              let tabIntegrationFinal: string[][] = [];
              while (tabIntegration.includes("0x219209e083275171774dab1df80982e9df2096516f06319c5c6d71ae0a8480c")) {
                let index = tabIntegration.findIndex((x) => x == "0x219209e083275171774dab1df80982e9df2096516f06319c5c6d71ae0a8480c")
                tabIntegration.splice(index - 1, 2)
              }

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
              setGeneralAllowedIntegration(tabIntegrationFinal);
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });

      const res21 = provider.callContract({
        contractAddress: comptroller,
        entrypoint: "getManagementFeeValue",
        calldata: [hexToDecimalString(vaultAddress)],
      });
      res21
        .then((value) => {
          let res_ = parseFloat(hexToDecimalString(value.result[0]))
          let res = res_ / 1000000000000000000
          setManagementFeeToCollect(res)
        })
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

  useEffect(() => {
    if (sellTokenId) {
      const res18 = provider.callContract({
        contractAddress: vaultAddress,
        entrypoint: "getMintedBlockTimesTamp",
        calldata: [sellTokenId, "0"],
      });
      res18
        .then((value) => {
          let TT = parseFloat(hexToDecimalString(value.result[0]))
          let currentTT_ = Date.now()
          let currentTT = parseInt(currentTT_.toString().slice(0, -3))
          let resultDiff = currentTT - (TT + parseFloat(timeLock))
          if (resultDiff < 0) {
            setAllowedToSell(true)
          }
          else {
            setAllowedToSell(false)
          }
          setRemainingTime(Math.abs(resultDiff))
        }
        )
        .catch((err) => {
          console.log(err);
        });
    }

  }, [sellTokenId]);



  useEffect(() => {
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
                ).toString();
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



  useEffect(() => {
    if (vaultInfo?.dataFinance != undefined) {
      if (timeframe == 0) {
        setChartData(vaultInfo?.dataFinanceD);
      }
      if (timeframe == 1) {
        setChartData(vaultInfo?.dataFinanceW);
      }
      if (timeframe == 2) {
        setChartData(vaultInfo?.dataFinanceM);
      }
      if (timeframe == 3) {
        setChartData(vaultInfo?.dataFinance);
      }
    }
  }, [timeframe, vaultInfo]);


  const handleMintShare = () => {
    const newAmount = parseFloat(buyValue) * 1000000000000000000;

    let Tab: string[] = [];
    Tab.push(hexToDecimalString(vaultAddress));
    Tab.push(newAmount.toString());
    Tab.push("0");

    let TabA: string[] = [];
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


  const handleWithdrawLiquidity = () => {

    let Tab: string[] = [];
    Tab.push(hexToDecimalString(vaultAddress));
    Tab.push(hexToDecimalString("0x4aec73f0611a9be0524e7ef21ab1679bdf9c97dc7d72614f15373d431226b6a"));
    Tab.push(hexToDecimalString("0x147fd8f7d12de6da66feedc6d64a11bd371e5471ee1018f11f9072ede67a0fa"));
    Tab.push("8");
    Tab.push(hexToDecimalString(TokenLPW1));
    Tab.push(hexToDecimalString(TokenLPW2));
    Tab.push("0");
    Tab.push("0");
    Tab.push("0");
    Tab.push("0");
    Tab.push((TokenLPInput * 1000000000000000000).toString());
    Tab.push("0");


    let TabA: string[] = [];
    TabA.push(hexToDecimalString(vaultAddress));
    TabA.push(hexToDecimalString(withdrawLiquidtyToken));
    TabA.push("949021990203918389843157787496164629863144228991510976554585288817234167820");
    TabA.push("3")
    TabA.push(hexToDecimalString("0x4aec73f0611a9be0524e7ef21ab1679bdf9c97dc7d72614f15373d431226b6a"));
    TabA.push((TokenLPInput * 1000000000000000000).toString())
    TabA.push("0");




    if (!accountInterface.address) {
      console.log("no account detected");
    } else {
      console.log("connected");
      multicallWithdrawLiquidity(Tab, TabA);
    }
  };


  const multicallWithdrawLiquidity = async (_tab: any[], _tab1: any[]) => {
    try {
      await accountInterface.execute([
        {
          contractAddress: comptroller,
          entrypoint: "executeCall",
          calldata: _tab1,
        },
        {
          contractAddress: comptroller,
          entrypoint: "executeCall",
          calldata: _tab,
        },
      ])
    }
    catch (err: any) {
      handleErrorMessage(err)
    }

  };



  const handleBringLiquidity = () => {
    const newAmountLP1 = TokenLP1Input * 1000000000000000000;
    const newAmountLP2 = (TokenLP1Input * TokenLP2Rate) * 1000000000000000000;

    let Tab: string[] = [];
    Tab.push(hexToDecimalString(vaultAddress));
    Tab.push(hexToDecimalString("0x4aec73f0611a9be0524e7ef21ab1679bdf9c97dc7d72614f15373d431226b6a"));
    Tab.push(hexToDecimalString("0x3f35dbce7a07ce455b128890d383c554afbc1b07cf7390a13e2d602a38c1a0a"));
    Tab.push("10");
    Tab.push(hexToDecimalString(TokenLP1));
    Tab.push(hexToDecimalString(TokenLP2));
    Tab.push(newAmountLP1.toString());
    Tab.push("0");
    Tab.push(newAmountLP2.toString());
    Tab.push("0");
    Tab.push("0");
    Tab.push("0");
    Tab.push("0");
    Tab.push("0");



    // Tab.push(hexToDecimalString(vaultAddress));
    // Tab.push(hexToDecimalString("0x4aec73f0611a9be0524e7ef21ab1679bdf9c97dc7d72614f15373d431226b6a"));
    // Tab.push(hexToDecimalString("0x3f35dbce7a07ce455b128890d383c554afbc1b07cf7390a13e2d602a38c1a0a"));
    // Tab.push("10");
    // Tab.push(hexToDecimalString("0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7"));
    // Tab.push(hexToDecimalString("0x072df4dc5b6c4df72e4288857317caf2ce9da166ab8719ab8306516a2fddfff7"));
    // // Tab.push(newAmountLP1.toString());
    // Tab.push("443460243719481")
    // Tab.push("0");
    // Tab.push("205308741691598134259")
    // Tab.push("0");
    // Tab.push("0");
    // Tab.push("0");
    // Tab.push("0");
    // Tab.push("0");


    let TabA: string[] = [];
    TabA.push(hexToDecimalString(vaultAddress));
    TabA.push(hexToDecimalString(TokenLP1));
    TabA.push("949021990203918389843157787496164629863144228991510976554585288817234167820");
    TabA.push("3")
    TabA.push(hexToDecimalString("0x4aec73f0611a9be0524e7ef21ab1679bdf9c97dc7d72614f15373d431226b6a"));
    TabA.push((newAmountLP1 * 1000000).toString())
    TabA.push("0");

    let TabB: string[] = [];
    TabB.push(hexToDecimalString(vaultAddress));
    TabB.push(hexToDecimalString(TokenLP2));
    TabB.push("949021990203918389843157787496164629863144228991510976554585288817234167820");
    TabB.push("3")
    TabB.push(hexToDecimalString("0x4aec73f0611a9be0524e7ef21ab1679bdf9c97dc7d72614f15373d431226b6a"));
    TabB.push(newAmountLP2.toString())
    TabB.push("0");

    // let TabA: string[] = [];
    // TabA.push(hexToDecimalString(vaultAddress));
    // TabA.push(hexToDecimalString(TokenLP1));
    // TabA.push("949021990203918389843157787496164629863144228991510976554585288817234167820");
    // TabA.push("3")
    // TabA.push(hexToDecimalString("0x4aec73f0611a9be0524e7ef21ab1679bdf9c97dc7d72614f15373d431226b6a"));
    // TabA.push(newAmountLP1.toString());
    // TabA.push("0");

    // let TabB: string[] = [];
    // TabB.push(hexToDecimalString(vaultAddress));
    // TabB.push(hexToDecimalString(TokenLP2));
    // TabB.push("949021990203918389843157787496164629863144228991510976554585288817234167820");
    // TabB.push("3")
    // TabB.push(hexToDecimalString("0x4aec73f0611a9be0524e7ef21ab1679bdf9c97dc7d72614f15373d431226b6a"));
    // TabB.push(newAmountLP1.toString());
    // TabB.push("0");


    if (!accountInterface.address) {
      console.log("no account detected");
    } else {
      console.log("connected");
      multicallBringLiquidity(Tab, TabA, TabB);
    }
  };

  const multicallBringLiquidity = async (_tab: any[], _tab1: any[], _tab2) => {
    try {
      await accountInterface.execute([
        {
          contractAddress: comptroller,
          entrypoint: "executeCall",
          calldata: _tab1,
        },
        {
          contractAddress: comptroller,
          entrypoint: "executeCall",
          calldata: _tab2,
        },
        {
          contractAddress: comptroller,
          entrypoint: "executeCall",
          calldata: _tab,
        },
      ]);
    }
    catch (err: any) {
      handleErrorMessage(err)
    }
    // return (tx1)
  };

  const handleErrorMessage = (error: Error) => {
    setErrorMessage(error.message);
    setIsOpenError(true);
  };

  const handleCollectManagementFee = () => {
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

  const multicallSwap = async (_tabApprove: any[], _tab: any[]) => {
    try {
      await accountInterface.execute([
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
    }
    catch (err: any) {
      handleErrorMessage(err)
    }

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

    if (!accountInterface.address) {
      console.log("no account detected");
    } else {
      console.log("connected");
      multicall2(Tab);
    }
  };

  const multicall2 = async (_tab: any[]) => {
    try {
      await accountInterface.execute([
        {
          contractAddress: comptroller,
          entrypoint: "sell_share",
          calldata: _tab,
        },
      ]);
    }
    catch (err: any) {
      handleErrorMessage(err)
    }
  };

  const multicall3 = async (_tab: string[]) => {
    try {
      await accountInterface.execute([
        {
          contractAddress: contractAddress.Comptroller,
          entrypoint: "addTrackedAsset",
          calldata: _tab,
        },
      ]);
    }
    catch (err: any) {
      handleErrorMessage(err)
    }
  };

  const multicall4 = async (_tab: string[]) => {
    try {
      await accountInterface.execute([
        {
          contractAddress: contractAddress.Comptroller,
          entrypoint: "removeTrackedAsset",
          calldata: _tab,
        },
      ]);
    }
    catch (err: any) {
      handleErrorMessage(err)
    }
  };


  const multicall = async (_tab: any[], _tabA: any[]) => {
    try {
      await accountInterface.execute([
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
    }
    catch (err: any) {
      handleErrorMessage(err)
    }

  };

  return (
    <>
      <Box padding={"4vw"}>
        <Modal isOpen={isOpenError} onClose={() => setIsOpenError(false)}>
          <ModalOverlay />
          <ModalContent backgroundColor={"#f6643c"}>
            <ModalHeader>Transaction has been canceled</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {/* <Text>Error : {errorMessage}</Text> */}
            </ModalBody>

            <ModalFooter>
            </ModalFooter>
          </ModalContent>
        </Modal>
        {loading == true ? (
          <Text alignSelf={"center"} fontSize={"5xl"}>
            Just A moment ⌛⏳
          </Text>
        ) : fundExist == true ? (
          <Flex direction={"column"} gap={"2vw"}>
            <Flex className={styles.top}>

              {/* vault info */}
              <Flex className={styles.vault_info}>
                <Flex className={styles.head}>
                  <Box className={styles.imgbox}>
                    <img
                      src={vaultInfo?.image}
                      style={{ objectFit: "cover" }}
                    />
                  </Box>
                  <Flex className={styles.name}>
                    <Flex className={styles.titlespan}>
                      <Text className={styles.title}>
                        {" "}
                        {name}
                      </Text>
                      <Text className={styles.symbol}>
                        ({symbol})
                      </Text>
                    </Flex>

                    {vaultInfo !== undefined && (
                      <Stack className={styles.tags}>
                        {[...Array(Object.keys(vaultInfo.tags).length)].map(
                          (e, i) => {
                            return (
                              <Text>
                                {"#" + vaultInfo.tags[i]}
                              </Text>
                            );
                          }
                        )}
                      </Stack>
                    )}
                    <Text className={styles.link}>
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
                            <ExternalLinkIcon mx="1.5vw" marginTop={"-2px"} />
                          </>
                        </a>
                      </Link>
                    </Text>
                  </Flex>
                </Flex>
                <Box className={styles.descp}>
                  <Text>
                    {vaultInfo?.strategy}
                  </Text>
                </Box>
              </Flex>

              {/* Finance info */}
              <Flex className={styles.finance_info}>
                <Flex className={styles.imgrow}>
                  {denominationAsset != "deno" && (
                    <Box className={styles.imgbox}>
                      <Image
                        src={returnImagefromAddress(denominationAssetAddress)}
                      />
                    </Box>
                  )}
                  <Flex className={styles.imgtitle}>
                    <Text
                      color={
                        vaultInfo?.totalIncome
                          ? vaultInfo?.totalIncome < 0
                            ? "rgb(237,33,49)"
                            : "#31c48d"
                          : "#31c48d"
                      }
                    >


                      {vaultInfo?.totalIncome == 0 ? "--" : vaultInfo?.totalIncome?.toPrecision(2)}%
                    </Text>
                    <Text
                      fontSize={"-moz-initial"}
                      marginTop={"-10px"}
                      marginLeft={"30px"}
                    >
                      Projected APR
                    </Text>
                  </Flex>
                </Flex>

                <Flex className={styles.stats}>
                  <Flex>
                    <Text>
                      Risk
                    </Text>
                    <Text>
                      Low
                    </Text>
                  </Flex>
                  <Flex>
                    <Text>
                      GAV
                    </Text>
                    <Text>
                      {parseFloat(gav) < 0.01
                        ? parseFloat(gav).toExponential(2)
                        : parseFloat(gav).toPrecision(3)}
                    </Text>
                  </Flex>
                  <Flex>
                    <Text>
                      Rank
                    </Text>
                    <Text>
                      --
                    </Text>
                  </Flex>
                  <Flex>
                    <Text>
                      Access
                    </Text>
                    <Text>
                      {isPublic == "1" ? "Public" : "Private"}
                    </Text>
                  </Flex>
                </Flex>
              </Flex>
            </Flex>

            {/* User info */}
            <Box className={styles.bigbox}>
              <Flex className={styles.user_info}>
                <Flex className={styles.personal_info}>
                  <Box className={styles.imgbox}>
                    <img
                      src={assetManagerImage}
                      style={{ objectFit: "cover" }}
                    />
                  </Box>
                  <Flex direction={"column"}>
                    <Flex direction={"column"}>
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
                            ? ((assetManagerShareAmount / parseFloat(shareSupply)
                            ) *
                              100).toPrecision(2)
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
                  alignItems={"center"}
                >
                  <Text fontWeight={"light"} fontSize={"2xl"} marginTop={"5px"}>
                    Tweet it !
                  </Text>
                  <a href={"http://twitter.com/share?text=My Fund is going to the moon, invest now & fly with us🚀 &url=" + process.env.URL + "vault/" + vaultAddress + "&hashtags=Magnety,Starknet,StarkPilled,L222"}>
                    <Button backgroundColor={"#030135"} padding={"10px"}>
                      <Icon as={BsShare} w={6} h={6} />
                    </Button>
                  </a>

                  <Flex className={styles.interact}>
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

                    {assetManager == acccountAddress ?

                      menuSelected == 5 ? (
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
                      )
                      :
                      <></>
                    }
                  </Flex>
                </Flex>
              </Flex>
              <Box className={styles.menuline}>
                {menuSelected == 0 ? (
                  <Tabs>
                    <Flex className={styles.graph_menu}>
                      <TabList  className={styles.menu}>
                        <Flex>
                          <Tab>
                            Overview
                          </Tab>
                          <Tab>
                            Holdings
                          </Tab>
                          <Tab>
                            Fees
                          </Tab>
                          <Tab>
                            Policies
                          </Tab>
                          <Tab>
                            Financial
                          </Tab>
                          {/* <Tab>
                            Activity
                          </Tab>
                          <Tab>
                            Depositors
                          </Tab>
                          <Tab>
                            Social
                          </Tab> */}
                        </Flex>
                      </TabList>
                      <Box
                        minHeight={"30vw"}
                        borderRadius="10%"
                        borderTop={"solid 2px #f6643c"}
                        borderBottom={"solid 2px #f6643c"}
                        backgroundColor="blackAlpha.400"
                        marginTop={"1vw"}
                        width={"100%"}
                      >
                        <TabPanels className={styles.graph_container}>
                          <TabPanel className={styles.graph}>
                            <Flex>
                              <Flex className={styles.wrapper}>
                                <Flex className={styles.toptext}>
                                  <Flex className={styles.price}>
                                    <Flex>
                                      <Text>
                                        {" "}
                                        {chartSelected == 1
                                          ? `${parseFloat(sharePrice) < 1
                                            ? parseFloat(
                                              sharePrice
                                            ).toExponential(2)
                                            : parseFloat(sharePrice).toFixed(2)
                                          }`
                                          : `GAV: ${parseFloat(gav) < 1
                                            ? parseFloat(gav).toExponential(
                                              2
                                            )
                                            : parseFloat(gav).toFixed(2)
                                          }`}
                                      </Text>
                                      {denominationAsset != "deno" && (
                                        <Box>
                                          <Image
                                            src={returnImagefromAddress(
                                              denominationAssetAddress
                                            )}
                                          />
                                        </Box>
                                      )}
                                    </Flex>
                                    {chartSelected == 1 && (
                                      <Text>/ Share</Text>
                                    )}
                                  </Flex>
                                  <Text
                                    color={
                                      timeframe == 0
                                        ? vaultInfo
                                          ? vaultInfo.dailyIncome > 0
                                            ? "#31c48d"
                                            : "rgb(237,33,49)"
                                          : "#31c48d"
                                        : timeframe == 1
                                          ? vaultInfo
                                            ? vaultInfo.weeklyIncome > 0
                                              ? "#31c48d"
                                              : "rgb(237,33,49)"
                                            : "#31c48d"
                                          : timeframe == 2
                                            ? vaultInfo
                                              ? vaultInfo.monthlyIncome > 0
                                                ? "#31c48d"
                                                : "rgb(237,33,49)"
                                              : "#31c48d"
                                            : timeframe == 3
                                              ? vaultInfo
                                                ? vaultInfo.totalIncome > 0
                                                  ? "#31c48d"
                                                  : "rgb(237,33,49)"
                                                : "#31c48d"
                                              : "31c48d"
                                    }
                                  >
                                    {" "}
                                    {timeframe == 0
                                      ? vaultInfo.dailyIncome == 0
                                        ? "--"
                                        : vaultInfo.dailyIncome?.toPrecision(2)
                                      : timeframe == 1
                                        ? vaultInfo.weeklyIncome == 0
                                          ? "--"
                                          : vaultInfo.weeklyIncome?.toPrecision(2)
                                        : timeframe == 2
                                          ? vaultInfo.monthlyIncome == 0
                                            ? "--"
                                            : vaultInfo.monthlyIncome?.toPrecision(4)
                                          : timeframe == 3
                                            ? vaultInfo.totalIncome == 0
                                              ? "--"
                                              : vaultInfo.totalIncome?.toPrecision(4)
                                            : "--"}
                                    %{" "}
                                  </Text>
                                </Flex>
                                <Flex className={styles.selectors}>
                                  <Select onChange={handleInputChange}>
                                    <option value={1}>Share price</option>
                                    <option value={2}>Gross Asset value</option>
                                  </Select>
                                  <Flex>
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
                                    dataKey="date"
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
                              <Flex className={styles.infos}>
                                <Flex>
                                  <Text style={{textAlign: "left"}}>
                                    Creation Date
                                  </Text>
                                  <Text style={{textAlign: "left"}}>
                                    {vaultInfo?.dataFinance != undefined &&
                                      moment(
                                        vaultInfo?.dataFinance[0].date
                                      ).format("dddd, MMMM Do, YYYY")}
                                  </Text>
                                </Flex>
                                <Flex>
                                  <Flex>
                                    <Text
                                       
                                    >
                                      Last Day
                                    </Text>
                                    <Text
                                       
                                      color={
                                        vaultInfo?.dailyIncome
                                          ? vaultInfo?.dailyIncome < 0
                                            ? "rgb(237,33,49)"
                                            : "#31c48d"
                                          : "#31c48d"
                                      }
                                    >
                                      {vaultInfo?.dailyIncome == 0
                                        ? "--"
                                        : vaultInfo?.dailyIncome?.toPrecision(4)}
                                      %
                                    </Text>
                                  </Flex>
                                  <Flex  >
                                    <Text
                                       
                                    >
                                      Last Week
                                    </Text>
                                    <Text
                                       
                                      color={
                                        vaultInfo?.weeklyIncome
                                          ? vaultInfo?.weeklyIncome < 0
                                            ? "rgb(237,33,49)"
                                            : "#31c48d"
                                          : "#31c48d"
                                      }
                                    >
                                      {vaultInfo?.weeklyIncome == 0
                                        ? "--"
                                        : vaultInfo?.weeklyIncome?.toPrecision(4)}
                                      %
                                    </Text>
                                  </Flex>
                                  <Flex  >
                                    <Text
                                       
                                    >
                                      Last Month
                                    </Text>
                                    <Text
                                       
                                      color={
                                        vaultInfo?.monthlyIncome
                                          ? vaultInfo?.monthlyIncome < 0
                                            ? "rgb(237,33,49)"
                                            : "#31c48d"
                                          : "#31c48d"
                                      }
                                    >
                                      {vaultInfo?.monthlyIncome == 0
                                        ? "--"
                                        : vaultInfo?.monthlyIncome?.toPrecision(4)}
                                      %
                                    </Text>
                                  </Flex>
                                  <Flex >
                                    <Text>
                                      Since Creation
                                    </Text>
                                    <Text
                                       
                                      color={
                                        vaultInfo?.totalIncome
                                          ? vaultInfo?.totalIncome < 0
                                            ? "rgb(237,33,49)"
                                            : "#31c48d"
                                          : "#31c48d"
                                      }
                                    >
                                      {vaultInfo?.totalIncome == 0
                                        ? "--"
                                        : vaultInfo?.totalIncome?.toPrecision(4)}
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
                                {trackedAssetsLen != 0 ? (
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
                                              {p.balance == "" ? "⌛⏳" : parseFloat(p.balance).toPrecision(2)} {returnSymbolfromAddress(p.address)}
                                            </td>
                                            <td>
                                              {p.value == "" ? "⌛⏳" : parseFloat(p.value).toPrecision(2)} {denominationAsset}
                                            </td>
                                            <td>{p.allocation == "" ? "⌛⏳" : parseFloat(p.allocation).toPrecision(2)}%</td>
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
                                    <td>
                                      <Text fontSize={"2xl"} >Entrance Fee</Text>
                                    </td>
                                    <td>
                                      <div>
                                        <Text fontWeight={"bold"} fontSize={"3xl"}> {entranceFee}%</Text>
                                      </div>
                                    </td>
                                  </tr>
                                  <tr key={2}>
                                    <td>  <Text fontSize={"2xl"} >Exit Fee </Text></td>
                                    <td>
                                      <div>
                                        <Text fontWeight={"bold"} fontSize={"3xl"}> {exitFee}%</Text>
                                      </div>
                                    </td>
                                  </tr>
                                  <tr key={3}>
                                    <td>   <Text fontSize={"2xl"} > Performance Fee </Text></td>
                                    <td>
                                      <div>
                                        <Text fontWeight={"bold"} fontSize={"3xl"}> {performanceFee}%</Text>
                                      </div>
                                    </td>
                                  </tr>
                                  <tr key={4}>
                                    <td>   <Text fontSize={"2xl"} >Management Fee </Text></td>
                                    <td>
                                      <div>
                                        <Text fontWeight={"bold"} fontSize={"3xl"}> {managementFee}%</Text>
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
                                <div className="fs-20 fw-200">
                                  minimum : {minAmount} {denominationAsset}
                                </div>
                                <div className="fs-20 fw-200">
                                  maximum : {maxAmount} {denominationAsset}
                                </div>
                              </div>
                              <div>
                                <div className="fs-24 fw-600">Timelock</div>
                                <div className="fs-20 fw-200">
                                  After minting shares, you'll have to wait :{" "}
                                  {timeLock / 3600} hours before you can sell it
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
                                <div>
                                  <div className="fw-600">
                                    Gross Asset Value
                                  </div>
                                  <div>
                                    <span className="fw-700">
                                      {parseFloat(gav).toPrecision(2)} {denominationAsset}
                                    </span>

                                  </div>
                                </div>
                              </div>
                              <div>
                                <div>
                                  <div className="fw-600">
                                    Daily Returns
                                  </div>
                                  <div>
                                    <span className="fw-700">
                                      {vaultInfo?.dailyIncome}%

                                    </span>

                                  </div>
                                </div>
                              </div>
                              <div>
                                <div>
                                  <div className="fw-600">
                                    Weekly Returns
                                  </div>
                                  <div>
                                    <span className="fw-700">
                                      {vaultInfo?.weeklyIncome}%
                                    </span>

                                  </div>
                                </div>
                              </div>
                              <div>
                                <div>
                                  <div className="fw-600">
                                    Monthly Returns
                                  </div>
                                  <div>
                                    <span className="fw-700">
                                      {vaultInfo?.monthlyIncome}%
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div>
                                <div>
                                  <div className="fw-600">
                                    Total Returns
                                  </div>
                                  <div>
                                    <span className="fw-700">
                                      {vaultInfo?.totalIncome}%
                                    </span>

                                  </div>
                                </div>
                              </div>
                              <div>
                                <div>
                                  <div className="fw-600">
                                    Volatility
                                  </div>
                                  <div>
                                    <span className="fw-700">
                                      --
                                    </span>

                                  </div>
                                </div>
                              </div>
                              <div>
                                <div>
                                  <div className="fw-600">
                                    Shares Supply
                                  </div>
                                  <div>
                                    <span className="fw-700">
                                      {(parseFloat(shareSupply) / 1000000000000000000).toPrecision(2)} {symbol}
                                    </span>

                                  </div>
                                </div>
                              </div>
                              <div>
                                <div>
                                  <div className="fw-600">
                                    Shareholders
                                  </div>
                                  <div>
                                    <span className="fw-700">
                                      {shareHolders}
                                    </span>

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
                    <Flex className={styles.graph_menu}>
                      <TabList>
                        <Flex>
                          <Tab>
                            Buy
                          </Tab>
                          <Tab>
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
                                      min={parseFloat(minAmount)}
                                      max={Math.min(parseFloat(userBalance), parseFloat(maxAmount))}
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
                                  <Flex direction={"row"} justifyContent={'space-between'} width={"90%"}>
                                    <Text fontWeight={"light"}>minimum {minAmount}</Text>
                                    <Text fontWeight={"light"}>maximum {maxAmount}</Text>
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
                                <>
                                  {
                                    allowedToSell != undefined ?

                                      allowedToSell == true ?


                                        <Box borderTop={"solid 2px #f6643c"} padding={"2vw"} marginTop={"40px"}>
                                          <Flex direction={"column"} gap={"20px"} alignItems={"center"}>
                                            <Text fontWeight={"semibold"} fontSize={"2xl"}>
                                              {remainingTime > 3600 ? `${(remainingTime / 3600).toPrecision(1)} more hours` : `${remainingTime / 60} more minutes`} before you can sell
                                            </Text>
                                          </Flex>
                                        </Box>
                                        :
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
                                                      onClick={() => addNewAsset(item.address, 0, 'ffff')}
                                                      className={`${styles.asset_button} ${sellShareDataTab.includes({ percent: 0, address: item.address, symbol: "d", rate: 0 })
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
                                                  {dataSetChange ?
                                                    sellShareDataTab.map((item, index) => (
                                                      <Flex direction={"row"} gap={"5px"} alignItems={"center"}>
                                                        <Box width={"40px"}> <Image src={returnImagefromAddress(item.address)} /></Box>
                                                        {sellShareDataTab[index].percent == 0 ?
                                                          <>
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
                                                          </>
                                                          :
                                                          <Button backgroundColor={"#f6643c"} onClick={() => removeIndex(index)}>Remove</Button>
                                                        }
                                                      </Flex>

                                                    ))
                                                    :
                                                    sellShareDataTab.map((item, index) => (
                                                      <Flex direction={"row"} gap={"5px"} alignItems={"center"}>
                                                        <Box width={"40px"}> <Image src={returnImagefromAddress(item.address)} /></Box>
                                                        {sellShareDataTab[index].percent == 0 ?
                                                          <>
                                                            <NumberInput
                                                              size="sm"
                                                              min={10}
                                                              max={100}
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
                                                          </>
                                                          :
                                                          <Button backgroundColor={"#f6643c"} onClick={() => removeIndex(index)}>Remove</Button>
                                                        }
                                                      </Flex>

                                                    ))}

                                                </Flex>
                                              </Flex>

                                              <Flex direction={"column"} gap={"10px"} alignItems={"center"}>


                                                <Flex direction={"column"} gap={"10px"} alignItems={"center"}>
                                                  {
                                                    sellShareDataTab.map((item, index) => (
                                                      <Flex direction={"column"} alignItems={"center"}>
                                                        <Flex direction={"row"} gap={"10px"}>
                                                          <Text>{item.percent}% = {item.rate != 0 ? (item.rate * (item.percent / 100) * ((parseFloat(
                                                            userShareInfo[
                                                              userShareInfo.findIndex(item => item.tokenId = sellTokenId)
                                                            ].shareAmount
                                                          ) *
                                                            (parseFloat(percentShare) / 100) *
                                                            parseFloat(sharePrice)) / 1000000000000000000)).toPrecision(2)



                                                            : "⌛"} {returnSymbolfromAddress(item.address)} </Text>
                                                          {item.rate != 0 && (item.rate * (item.percent / 100) * ((parseFloat(
                                                            userShareInfo[
                                                              userShareInfo.findIndex(item => item.tokenId = sellTokenId)
                                                            ].shareAmount
                                                          ) *
                                                            (parseFloat(percentShare) / 100) *
                                                            parseFloat(sharePrice)) / 1000000000000000000)) > parseFloat(trackedAssets[trackedAssets.findIndex((x) => x.address == item.address)].balance) ?
                                                            <Text color={"red.400"}> Not enought {returnSymbolfromAddress(item.address)} in the fund</Text>
                                                            :
                                                            <Text color={"green"}> Allowed </Text>
                                                          }

                                                        </Flex>
                                                        {index + 1 != sellShareDataTab.length &&
                                                          <Text>+</Text>
                                                        }
                                                      </Flex>

                                                    ))
                                                  }
                                                </Flex>
                                                {
                                                  sellAllowed == true ?
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
                                              {/* :
                                        <Flex direction={"column"} gap={"10px"} alignItems={"center"}>
                                          <Flex direction={"row"} gap={"10px"}>
                                            {
                                              sellShareDataTab.map((item, index) => (
                                                <Flex direction={"row"} gap={"10px"}>
                                                  <Text>{item.percent}% { item.address}</Text>

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
                                      } */}
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
                                      :
                                      <Box borderTop={"solid 2px #f6643c"} padding={"2vw"} marginTop={"40px"}>
                                        <Flex direction={"column"} gap={"20px"} alignItems={"center"}>
                                          <Text fontWeight={"bold"} fontSize={"3xl"}> ⌛⌛ </Text>
                                        </Flex>
                                      </Box>
                                  }
                                </>
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
                            {/* <Tab fontSize={"1xl"} fontWeight={"bold"}>
                              Policies
                            </Tab>
                            <Tab fontSize={"1xl"} fontWeight={"bold"}>
                              Fee
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
                                          backgroundColor={"blackAlpha.400"}
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
                                            {buySwapTokenRate != 0 ? sellSwapTokenInput / buySwapTokenRate : 0}
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

                                          poolExist == true ?

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
                                            <Text fontWeight={"bold"} color={"#f6643c"}>Pool not Exist</Text>

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
                                              value={TokenLP1Input}
                                              onChange={handleChangeLP1Input}
                                              defaultValue={TokenLP1Input}
                                              max={parseFloat(userBalance)}
                                            >
                                              <NumberInputField />
                                            </NumberInput>
                                            <Flex direction={"row"}>
                                              <Flex alignItems={"center"} gap={"5px"}>
                                                <Text
                                                  fontSize={"1xl"}
                                                  fontWeight={"bold"}
                                                >
                                                  {TokenLP1 ? returnSymbolfromAddress(TokenLP1) : ""}
                                                </Text>
                                                <Box
                                                  style={{
                                                    width: "50px",
                                                    height: "50px",
                                                    borderRadius: "10px",
                                                    overflow: "hidden",
                                                  }}
                                                >{TokenLP1 && <Image
                                                  src={returnImagefromAddress(
                                                    TokenLP1
                                                  )}
                                                />}

                                                </Box>
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
                                                  {TokenLP1FundBalance ? TokenLP1FundBalance.toPrecision(
                                                    2
                                                  ) : "--"}
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
                                            <Text
                                              height={"50px"}
                                              variant={"unstyled"}
                                              fontFamily={"IBM Plex Mono, sans-serif"}
                                              padding={"10px 10px"}
                                              alignSelf={"center"}
                                              width={"100%"}
                                            >
                                              {(TokenLP1Input * TokenLP2Rate).toPrecision(3)}
                                            </Text>

                                            <Flex alignItems={"center"} gap={"5px"}>
                                              <Text
                                                fontSize={"1xl"}
                                                fontWeight={"bold"}
                                              >
                                                {TokenLP2 ? returnSymbolfromAddress(TokenLP2) : ""}
                                              </Text>
                                              {TokenLP2 &&

                                                <Box
                                                  style={{
                                                    width: "50px",
                                                    height: "50px",
                                                    borderRadius: "10px",
                                                    overflow: "hidden",

                                                  }}
                                                >
                                                  <Image
                                                    src={returnImagefromAddress(TokenLP2)}
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
                                                {TokenLP2FundBalance ? TokenLP2FundBalance.toPrecision(2) : "--"}
                                              </Text>
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
                                              {(tokenLPRate * TokenLP1Input).toPrecision(2)}
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



                                        {bringLiquidtyToken ?

                                          TokenLP1Input == 0 ?
                                            <Text fontWeight={"bold"} color={"#f6643c"}>Select an amount </Text>

                                            :

                                            TokenLP1FundBalance || TokenLP2FundBalance ?

                                              TokenLP1Input <= TokenLP1FundBalance && (TokenLP2Rate * TokenLP1Input) <= TokenLP2FundBalance ?
                                                <Button
                                                  backgroundColor={"#f6643c"}
                                                  color={"white"}
                                                  onClick={() => handleBringLiquidity()}
                                                  size="md"
                                                >
                                                  {" "}
                                                  Bring Liquidity
                                                </Button>
                                                :
                                                <Text fontWeight={"bold"} color={"red.300"}> Fund holdings insufficient</Text>
                                              :
                                              <Text fontWeight={"bold"}> ⌛</Text>

                                          :
                                          <Text fontWeight={"bold"} color={"#f6643c"}>Select LP and Bring Liquidity! </Text>
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
                                                  onClick={() => setWithdrawLiquidtyToken(item)}
                                                  className={`${styles.asset_button} ${withdrawLiquidtyToken == item
                                                    ? styles.asset_selected
                                                    : ""
                                                    }`}
                                                >
                                                  <Image src={returnImagefromAddress(item)} />
                                                  {withdrawLiquidtyToken == item && (
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
                                            {withdrawLiquidtyToken ?
                                              <Flex direction={"column-reverse"} alignItems={"center"} gap={"1vh"}>
                                                {/* {bringLiquidityTokenFundBalance &&
                                                  <Slider
                                                    flex="1"
                                                    focusThumbOnChange={false}
                                                    value={TokenLPInput}
                                                    max={100}
                                                    onChange={handleChangeLPInput}
                                                    width={"80%"}
                                                    colorScheme="#f6643c"
                                                  >
                                                    <SliderTrack bg="red.100">
                                                      <SliderFilledTrack bg="tomato" />
                                                    </SliderTrack>
                                                    <SliderThumb
                                                      fontSize="sm"
                                                      boxSize="20px"
                                                      children={percentShare + "%"}
                                                      color={"#f6643c"}
                                                    />
                                                  </Slider>
                                                } */}
                                                <Flex
                                                  justifyContent={"space-between"}
                                                  alignItems="center"
                                                  backgroundColor={"blackAlpha.400"}
                                                  width={"300px"}
                                                  borderRadius={"30px"}
                                                  padding={"10px"}
                                                >
                                                  <NumberInput
                                                    height={"50px"}
                                                    variant={"unstyled"}
                                                    fontFamily={"IBM Plex Mono, sans-serif"}
                                                    padding={"10px 10px"}
                                                    alignSelf={"center"}
                                                    value={TokenLPInput}
                                                    onChange={handleChangeLPInput}
                                                    defaultValue={TokenLPInput}
                                                    max={bringLiquidityTokenFundBalance}
                                                  >
                                                    <NumberInputField />
                                                  </NumberInput>
                                                  <Flex direction={"row"}>
                                                    <Flex alignItems={"center"} gap={"5px"}>
                                                      <Text
                                                        fontSize={"1xl"}
                                                        fontWeight={"bold"}
                                                      >
                                                        {withdrawLiquidtyToken ? returnSymbolfromAddress(withdrawLiquidtyToken) : ""}
                                                      </Text>
                                                      <Box
                                                        style={{
                                                          width: "50px",
                                                          height: "50px",
                                                          borderRadius: "10px",
                                                          overflow: "hidden",
                                                        }}
                                                      >{withdrawLiquidtyToken && <Image
                                                        src={returnImagefromAddress(
                                                          withdrawLiquidtyToken
                                                        )}
                                                      />}

                                                      </Box>
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
                                                        {bringLiquidityTokenFundBalance ? bringLiquidityTokenFundBalance.toPrecision(
                                                          2
                                                        ) : "0"}
                                                      </Text>
                                                    </Flex>
                                                  </Flex>
                                                </Flex>

                                              </Flex>
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
                                            width={"300px"}
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
                                              {(TokenLPW1Rate * TokenLPInput).toPrecision(2)}
                                            </Text>

                                            <Flex alignItems={"center"} gap={"5px"}>
                                              <Text
                                                fontSize={"1xl"}
                                                fontWeight={"bold"}
                                              >
                                                {TokenLPW1 ? returnSymbolfromAddress(TokenLPW1) : ""}
                                              </Text>
                                              {TokenLPW1 &&

                                                <Box
                                                  style={{
                                                    width: "50px",
                                                    height: "50px",
                                                    borderRadius: "10px",
                                                    overflow: "hidden",

                                                  }}
                                                >
                                                  <Image
                                                    src={returnImagefromAddress(TokenLPW1)}
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
                                                {TokenLPW1FundBalance ? TokenLPW1FundBalance.toPrecision(2) : "--"}
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
                                            width={"300px"}
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
                                              {(TokenLPW2Rate * TokenLPInput).toPrecision(2)}
                                            </Text>

                                            <Flex alignItems={"center"} gap={"5px"}>
                                              <Text
                                                fontSize={"1xl"}
                                                fontWeight={"bold"}
                                              >
                                                {TokenLPW2 ? returnSymbolfromAddress(TokenLPW2) : ""}
                                              </Text>
                                              {TokenLPW2 &&

                                                <Box
                                                  style={{
                                                    width: "50px",
                                                    height: "50px",
                                                    borderRadius: "10px",
                                                    overflow: "hidden",

                                                  }}
                                                >
                                                  <Image
                                                    src={returnImagefromAddress(TokenLPW2)}
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
                                                {TokenLPW2FundBalance ? TokenLPW2FundBalance.toPrecision(2) : "--"}
                                              </Text>
                                            </Flex>

                                          </Flex>
                                        </Flex>
                                        <Spacer />
                                        <Spacer />



                                        {withdrawLiquidtyToken ?

                                          TokenLPInput == 0 ?

                                            <Text fontWeight={"bold"} color={"#f6643c"}>Select an Amount </Text>
                                            :

                                            <Button
                                              backgroundColor={"#f6643c"}
                                              color={"white"}
                                              onClick={() => handleWithdrawLiquidity()}
                                              size="md"
                                            >
                                              {" "}
                                              Withdraw
                                            </Button>

                                          :
                                          <Text fontWeight={"bold"} color={"#f6643c"}>Select LP to withdraw liquidity </Text>
                                        }

                                      </Flex>
                                    }
                                  </>}

                            </TabPanel>
                            <TabPanel>
                              <Flex direction={"column"} gap={"25px"} justifyContent={"center"}>
                                <Text fontWeight={"bold"} fontSize={"2xl"} textAlign={"center"}>Track and Remove assets to manage your {name} Holdings</Text>
                                {
                                  allowedTrackedAsset && trackedAssetsAddress ?
                                    <Flex direction={"row"} gap={"25px"} justifyContent={"center"} width={"100%"} alignItems={"baseline"}>
                                      <Flex direction={"column"} gap={"25px"} justifyContent={"center"} alignItems={"center"} width={"40%"}>
                                        <Text fontSize={"2xl"} textAlign={"center"}>Assets not tracked yet</Text>
                                        <Flex direction={"column"} gap={"5px"} justifyContent={"center"} alignSelf={"center"} width={"100%"}>
                                          {allowedTrackedAsset.filter(item => !trackedAssetsAddress.includes(item)).map((item, index) => (
                                            <Flex direction={"row"} justifyContent={"space-between"} alignItems={"center"} width={"100%"}>
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

                                        <Flex direction={"column"} gap={"5px"} justifyContent={"center"} alignSelf={"center"} width={"100%"}>
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

                              </Flex>
                            </TabPanel>
                            <TabPanel>
                              <Flex direction={"column"} gap={"25px"} justifyContent={"center"}>
                                <Text fontWeight={"bold"} fontSize={"2xl"} textAlign={"center"}> Stay up to date with last Protocol integrations {name} Holdings</Text>
                                {
                                  generalAllowedTrackedAsset && allowedTrackedAsset && generalAllowedIntegration && allowedIntegration ?
                                    <Flex direction={"row"} gap={"25px"} justifyContent={"center"} width={"100%"} alignItems={"baseline"}>

                                      <Flex direction={"column"} gap={"5px"} justifyContent={"center"} alignSelf={"center"} width={"40%"}>
                                        {generalAllowedTrackedAsset.filter(item => allowedTrackedAsset.includes(item)).length == 0 ?
                                          <Text>You are up to date with the current assets available on Magnety</Text>
                                          :
                                          <>
                                            <Text>
                                              {generalAllowedTrackedAsset.filter(item => allowedTrackedAsset.includes(item)).length} new assets to integrate
                                            </Text>

                                            <Flex flexWrap={"nowrap"} gap={"5px"} overflowY={"scroll"} width={"80%"} maxHeight={"4vh"}>
                                              {generalAllowedTrackedAsset.filter(item => allowedTrackedAsset.includes(item)).map((item, index) => (
                                                <>

                                                  <Button
                                                    key={index}
                                                    type="button"
                                                    backgroundColor={"#0f0b1"}
                                                    data-color="transparent"
                                                    onClick={() => addAllowedNewTrackedAsset(item)}
                                                    className={`${styles.asset_button} ${allowNewTrackedAsset.includes(item)
                                                      ? styles.asset_selected
                                                      : ""
                                                      }`}
                                                  >
                                                    <Box
                                                      style={{
                                                        width: "50px",
                                                        height: "50px",
                                                        borderRadius: "10px",
                                                        overflow: "hidden",

                                                      }}
                                                    >
                                                      <Image src={returnImagefromAddress(item)} />
                                                      {/* {allowNewTrackedAsset.includes(item) && (
                                                        <>
                                                          <span
                                                            className={
                                                              styles.asset_selected_checkmark
                                                            }
                                                          >
                                                            <Image
                                                              src={"/checkmark-circle-outline.svg"}
                                                              width="10px"
                                                              height="10px"
                                                            />
                                                          </span>
                                                        </>
                                                      )} */}
                                                    </Box>

                                                  </Button>

                                                </>
                                              ))}
                                            </Flex>
                                          </>
                                        }
                                      </Flex>
                                      {/* <Flex direction={"column"} gap={"25px"} justifyContent={"center"} alignItems={"center"} width={"40%"}>
                                        <Text fontSize={"2xl"} textAlign={"center"}>Tracked Assets</Text>

                                        <Flex direction={"column"} gap={"5px"} justifyContent={"center"} alignSelf={"center"} width={"100%"}>
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
                                      </Flex> */}
                                    </Flex>
                                    :
                                    <Text> Fetching Data </Text>
                                }

                              </Flex>
                            </TabPanel>
                            <TabPanel>
                              <Flex direction={"column"} gap={"5vh"} justifyContent={"center"} alignItems={"center"}>

                                {
                                  parseFloat(managementFee) == 0 ?
                                    <Text fontWeight={"bold"} fontSize={"2xl"} textAlign={"center"}> Management Fees are not enabled on your Fund</Text>
                                    :
                                    <Text fontWeight={"bold"} fontSize={"2xl"} >You can collect {managementFee}% Fees from your Fund GAV each year   </Text>
                                }
                                {
                                  managementFeeToCollect ?

                                    <Box>
                                      <Flex direction={"column"} gap={"2vh"} alignItems={"center"}>
                                        <Text fontSize={"5xl"} color={"#f6643c"} fontWeight={"semibold"}> {managementFeeToCollect} {denominationAsset} to collect</Text>

                                        {
                                          managementFeeToCollect > 0 &&
                                          <Button backgroundColor={"#f6643c"} size={"lg"} onClick={handleCollectManagementFee}> Collect </Button>
                                        }
                                      </Flex>
                                    </Box>
                                    :
                                    <Text fontSize={"5xl"} color={"#f6643c"} fontWeight={"semibold"}> ⌛⌛</Text>

                                }
                              </Flex>
                            </TabPanel>
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

export default vault;
