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
      console.log("fff");
      console.log(vaultAddress);
      loadData();
    }
  }, [vad]);

  const loadData = async () => {
    console.log("loading db Fund Data");
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
      console.log(res);
      const { data } = await res.json();
      console.log(data);
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


  const [defiSelected, setDefiSelected] = React.useState<number>(1);


  const [sellSwapTokenBalance, setSellSwapTokenBalance] = React.useState<number>(0);
  const [buySwapTokenBalance, setBuySwapTokenBalance] = React.useState<number>(0);
  const [buySwapTokenFundBalance, setBuySwapTokenFundBalance] = React.useState<number>(0);
  const [bringLiquidityTokenFundBalance, setBringLiquidityTokenFundBalance] = React.useState<number>(0);







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
        entrypoint: "balanceOf",
        calldata: [hexToDecimalString(sellSwapToken), (sellSwapTokenBalance * 1000000000000000000).toString(), hexToDecimalString(buySwapToken)],
      });
      res1
        .then((value) => {
          const fundBalance__ = hexToDecimalString(value.result[0]);
          const fundBalance_ = parseFloat(fundBalance__) / 1000000000000000000;
          setBuySwapTokenBalance(fundBalance_)
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
  };



  function addNewAsset(address_: string, percent_: number, symbol_: string) {

    setSellShareDataTab((state) => {
      const elem = { percent: percent_, address: address_, symbol: symbol_ }
      console.log(elem)
      const index = state.findIndex((x) => x.address == address_);
      console.log(index)
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
              console.log("integrationnn");
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
              console.log(tabIntegrationFinal);
              setAllowedIntegration(tabIntegrationFinal);
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });

      // const res17 = provider.callContract({
      //   contractAddress: policyManager,
      //   entrypoint: "getAllowedTrackedAsset",
      //   calldata: [hexToDecimalString(vaultAddress)],
      // });
      // res17
      //   .then((value) => {
      //     const tab__ = value.result[0];
      //     setTimeLock(_timeLock);
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
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
    console.log("useEffectAddress");
    const { account } = getStarknet();
    setAccountInterface(account);
    console.log("accountInteface set");
    console.log(accountInterface);
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
          console.log("usersharebalance");
          console.log(userShareBalance__);
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
          console.log("assetManagersharebalance");
          console.log(userShareBalance__);
          for (let pas = 0; pas < parseFloat(userShareBalance__); pas++) {
            const res4 = provider.callContract({
              contractAddress: vaultAddress,
              entrypoint: "tokenOfOwnerByIndex",
              calldata: [hexToDecimalString(assetManager), pas.toString(), "0"],
            });
            res4
              .then((value) => {
                const tokenId = hexToDecimalString(value.result[0]);
                console.log("tokenId AssetManager");
                console.log(tokenId);
                const res5 = provider.callContract({
                  contractAddress: vaultAddress,
                  entrypoint: "sharesBalance",
                  calldata: [tokenId, "0"],
                });
                res5
                  .then((value) => {
                    const sharesBalance = hexToDecimalString(value.result[0]);
                    console.log("share balance Asset Manager");
                    console.log(sharesBalance);
                    console.log(parseFloat(sharesBalance));
                    shareAmount = shareAmount + parseFloat(sharesBalance);
                    console.log("totalshareAmountFromAssetManager");
                    console.log(shareAmount);
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
    if (denominationAssetAddress != "deno" && gav != "0") {
      const res9 = provider.callContract({
        contractAddress: vaultAddress,
        entrypoint: "getTrackedAssets",
        calldata: [],
      });
      res9
        .then((value) => {
          let tab__ = value.result;
          let size_ = tab__.shift();
          let tab_ = tab__;
          setTrackedAssetsAddress(tab_)
          for (let pas = 0; pas < tab_.length; pas++) {
            let address_ = tab_[pas];
            const name = provider.callContract({
              contractAddress: address_,
              entrypoint: "name",
              calldata: [],
            });
            name
              .then((value) => {
                const coinName_ = shortStringFeltToStr(
                  BigInt(hexToDecimalString(value.result[0]))
                );

                const symbol = provider.callContract({
                  contractAddress: address_,
                  entrypoint: "symbol",
                  calldata: [],
                });
                symbol
                  .then((value) => {
                    const coinSymbol_ = shortStringFeltToStr(
                      BigInt(hexToDecimalString(value.result[0]))
                    );

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
                              (parseFloat(gav) / parseFloat(coinPrice_)) *
                              100
                            ).toString();
                            coinAllocation_ = coinAllocation_.concat("%");

                            let portfolioData2: PortfolioData = trackedAssets;
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
                            let TrackedAssetLen_ = trackedAssetsLen + 1;
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
    console.log(sellShareDataTab
    )
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
    let tx1 = await accountInterface.execute([
      {
        contractAddress: comptroller,
        entrypoint: "sell_share",
        calldata: _tab,
      },
    ]);
    console.log(tx1);
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
                          {console.log(shareSupply)}
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
                          <Tab fontSize={"1xl"} fontWeight={"bold"}>
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
                                {trackedAssetsLen > 0 ? (
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
                                                <span> {p.coinName} </span>
                                                <span> {p.coinSymbol} </span>
                                              </div>
                                            </td>
                                            <td>
                                              {" "}
                                              {p.balance} {p.coinSymbol}
                                            </td>
                                            <td>
                                              {p.value} {denominationAsset}
                                            </td>
                                            <td>{p.allocation}</td>
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
                                    <Flex direction={"column"} gap={"25px"} justifyContent={"center"} width={"100%"}>
                                      <Text fontSize={"2xl"} textAlign={"center"}>Assets not tracked yet</Text>
                                      <Flex direction={"column"} gap={"5px"} justifyContent={"center"} width={"30%"} alignSelf={"center"}>
                                        {allowedTrackedAsset.filter(item => !trackedAssetsAddress.includes(item)).map((item, index) => (
                                          <Flex direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
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

                                      <Text fontSize={"2xl"} textAlign={"center"}>Tracked Assets</Text>

                                      <Flex direction={"column"} gap={"5px"} justifyContent={"center"} width={"30%"} alignSelf={"center"}>
                                        {allowedTrackedAsset.filter(item => trackedAssetsAddress.includes(item)).map((item, index) => (
                                          <Flex direction={"row"} justifyContent={"space-between"}>
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
                                            <Button onClick={() => handleUntrack(item)} type="undefined" backgroundColor={"#f6643c"}> Untrack </Button>
                                          </Flex>
                                        ))}
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

export default vault;
