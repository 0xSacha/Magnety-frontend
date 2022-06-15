import { NextPage } from "next";
import React, { useEffect, useRef, useState } from "react";
import styles from "~/styles/contract.module.scss";
import { useContractFactory } from "~/hooks/deploy";
import TargetSource from "../abi/Vault.json";
import { hexToDecimalString } from "starknet/dist/utils/number";
import { getStarknet, toBN } from "../starknetWrapper";
import { contractAddress } from "~/registry/address";
import { ContractInfo } from "../utils/type";

import ERC20 from '../abi/ERC20.json'

import {
  Button,
  ButtonGroup,
  Flex,
  Text,
  Input,
  Select,
  Box,
} from "@chakra-ui/react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  HStack,
  Tag,
  TagCloseButton,
  TagLabel,
} from "@chakra-ui/react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";

import Image from "next/image";
import { Abi, CompiledContract, json } from "starknet";
import { useStarknet } from "@starknet-react/core";

import { Asset } from "../registry/tokenSupported";
import { Integration } from "../registry/protocolSupported";

import btc from "../image/BTC.png";
import eth from "../image/ETH.png";
import zkp from "../image/ZKP.png";
import tst from "../image/TST.svg";
import alphaRoad from "../image/alphaRoad.jpg";
import ethzkp from "../image/ETH-ZKP.png";
import btctst from "../image/BTC-TST.png";
import ethtst from "../image/ETH-TST.png";
import ethbtc from "../image/ETH-BTC.png";
import { compileString } from "sass";
import { useRouter } from "next/router";
import { withCoalescedInvoke } from "next/dist/lib/coalesced-function";
import { toDataUrl } from "~/utils/fileHelper";
import ImageUpload from "~/components/FileUpload";
import postContract from "~/utils/postContract";
import { setValues } from "framer-motion/types/render/utils/setters";

function RemoveAtIndex(array: any[], index: number) {
  return [...array.slice(0, index), ...array.slice(index + 1)];
}

const comptroller =
  "0x04432fc00432c1025c8b03775fc64180948d5a2725cc50882f4dec0b526459f5";

const Contract: NextPage = () => {
  const [formData, setFormData] = React.useState<any>({});
  const [denominationAsset, setDenominationAsset] = React.useState<number>(0);
  const [onPopUp, setonPopUp] = React.useState<boolean>(false);
  const [trackedAsset, setTrackedAsset] = React.useState<number[]>([]);
  const [allowedProtocol, setAllowedProtocol] = React.useState<number[]>([]);
  const { library } = useStarknet();
  const { account, provider } = getStarknet();
  const router = useRouter();
  const [deployedVaultAddress, setDeployedVaultAddress] = useState<string>("");

  const [deployedVaultHash, setDeployedVaultHash] = useState<
    string | undefined
  >("");

  const [compiledTarget, setCompiledTarget] = useState<CompiledContract>();

  const [txAccepted, settxAccepted] = useState(0);

  const handleInputTagEnterKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>,
    cb: Function
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (event?.currentTarget?.value) {
        cb();
      }
    }
  };
  const [deploying, setDeploying] = useState(false);

  // const { contract: comptroller } = useComptrollerContract()
  // const { invoked } = useStarknetInvoke({ contract: comptroller, method: 'activateVault' })

  function addNewAsset(id: number) {
    setTrackedAsset((state) => {
      const index = state.findIndex((x) => x == id);
      state =
        index === -1
          ? [...state, id]
          : [...state.slice(0, index), ...state.slice(index + 1)];
      return state;
    });
  }

  function addNewProtocolMult(idTab: number[]) {
    setAllowedProtocol((state) => {
      const index = state.findIndex((x) => x == idTab[0]);
      state =
        index === -1
          ? [...state, ...idTab]
          : [...state.slice(0, index), ...state.slice(index + idTab.length)];
      return state;
    });
  }

  function strToShortStringFelt(str: string): bigint {
    const strB = Buffer.from(str);
    return BigInt(
      strB.reduce((memo, byte) => {
        memo += byte.toString(16);
        return memo;
      }, "0x")
    );
  }

  const Initialize = async (_tabA: String[], _tabI: any[], _tabDB: ContractInfo) => {
    console.log("yoo")
    const nonce = await account.getNonce();
    try {
      await account.execute([
        {
          contractAddress: Asset[denominationAsset].address.toString(),
          entrypoint: "approve",
          calldata: _tabA,
        },
        // {
        //   contractAddress: contractAddress.VaultFactory,
        //   entrypoint: "initializeFund",
        //   calldata: _tabI,
        // },
      ],
        [
          ERC20 as Abi
        ],

        {
          nonce: nonce,
          maxFee: toBN(464884545484684519863),
          // version: 454n,
        }


      );
      // await fetch(`http://localhost:3000/api/contract/${deployedVaultAddress}`, {
      //   method: "put",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(_tabDB),
      // })
    } catch (error) {
      setonPopUp(true);
      console.error(error);
    }

  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    let tab: any[] = [];
    tab.push(hexToDecimalString(deployedVaultAddress));
    tab.push(strToShortStringFelt(formData.name).toString());
    tab.push(strToShortStringFelt(formData.symbol).toString());
    tab.push(hexToDecimalString(Asset[denominationAsset].address));
    tab.push(formData.maximum_position.toString());
    tab.push("0");
    tab.push("4");
    tab.push(formData.entrance_fees ?? "0");
    tab.push(formData.exit_fees ?? "0");
    tab.push(formData.yearly_management_fees ?? "0");
    tab.push(formData.performance_fees ?? "0");

    tab.push(trackedAsset.length.toString());
    trackedAsset.forEach((track) => {
      tab.push(hexToDecimalString(Asset[track].address));
    });

    tab.push(allowedProtocol.length.toString());
    allowedProtocol.forEach((value) => {
      let integrationArgs = Integration[value].integration;
      tab.push(integrationArgs[0]);
      tab.push(integrationArgs[1]);
      tab.push("0");
    });

    var min = parseFloat(formData.minimum);
    min = min * 1000000000000000000;
    tab.push(min.toString());
    tab.push("0");

    var max = parseFloat(formData.maximum);
    max = max * 1000000000000000000;
    tab.push(max.toString());
    tab.push("0");

    tab.push(formData.harvest_lockup_time ?? "0");

    tab.push(`${+formData.fund_type}`); // selected => 1 else 0


    const _tabA: Array<string> = [];

    _tabA.push(hexToDecimalString(comptroller));

    const _tabB: Array<string> = [];
    _tabB.push(hexToDecimalString(deployedVaultAddress));
    _tabB.push(hexToDecimalString(Asset[denominationAsset].address));
    var amountToInvest = parseFloat(formData.amount_to_invest);
    amountToInvest = amountToInvest * 1000000000000000000;
    _tabA.push(amountToInvest.toString());
    _tabA.push("0");

    _tabB.push(amountToInvest.toString());
    _tabB.push("0");


    if (!account.address) {
      console.log("no account detected");
    } else {
      console.log("connected");
      // multicall(tab, _tabA, _tabB);
    }

    e.preventDefault();
  };

  const handleForm = (key: string, value: any): void => {
    setFormData((state: any) => {
      if (value == undefined) {
        const { [key]: _removedEntity, ...filteredEntities } = state;
        return {
          ...filteredEntities,
        };
      }
      return {
        ...state,
        [key]: value,
      };
    });
  };



  const getCompiledVault = async () => {
    // Can't import the JSON directly due to a bug in StarkNet: https://github.com/0xs34n/starknet.js/issues/104
    // (even if the issue is closed, the underlying Starknet issue remains)
    const raw = await fetch("/Vault.json");
    const compiled = json.parse(await raw.text());
    return compiled;
  };
  getCompiledVault().then(setCompiledTarget);

  const { deploy: deployTarget } = useContractFactory({
    compiledContract: compiledTarget,
    abi: TargetSource as Abi,
  });



  useEffect(() => {
    if (!compiledTarget) {
      getCompiledVault().then(setCompiledTarget);
    }

  }, []);


  useEffect(() => {
    if (compiledTarget != undefined && deployedVaultAddress == "") {
      setTimeout(function () {
        handleDeploy()
      }, 2000);
    }
  }, [compiledTarget]);

  const handleDeploy = async () => {
    onDeploy()
  };

  const onDeploy = async () => {
    if (deploying) return;
    setDeploying(true);
    const _deployTarget = async () => {
      const deployment = await deployTarget({
        constructorCalldata: [
          hexToDecimalString(
            "0x031ed52f5b1ea0dc84172a99fad44d202beaa528e8629d0a1f0d4a8b163a71b1"
          ),
          hexToDecimalString(comptroller),
        ],
      });
      if (deployment) {
        setDeployedVaultAddress(deployment.address);
        setDeployedVaultHash(deployment.deployTransactionHash);
        await library
          .waitForTransaction(deployment.deployTransactionHash)
          .then(() => settxAccepted(1));

        setDeploying(false);
      }
    };
    await _deployTarget();
  };

  const targetLink =
    "https://goerli.voyager.online/contract/" + deployedVaultAddress;

  const targetLink2 = "https://goerli.voyager.online/tx/" + deployedVaultHash;



  const protocalList = [
    { values: [0], path: alphaRoad, alt: "arfS", label: "Swap" },
    { values: [1, 2], path: alphaRoad, alt: "arfL", label: "Liquidity" },
  ];

  const dominationAssetsList = [
    { value: 1, path: btc, alt: "btc" },
    { value: 0, path: eth, alt: "eth" },
  ];
  const assetsList = [
    { value: 0, path: btc, alt: "btc" },
    { value: 1, path: eth, alt: "eth" },
    { value: 2, path: zkp, alt: "zkp" },
    { value: 3, path: tst, alt: "tst" },
    { value: 4, path: ethzkp, alt: "ethzkp" },
    { value: 5, path: btctst, alt: "btctst" },
    { value: 6, path: ethtst, alt: "ethtst" },
    { value: 7, path: ethbtc, alt: "ethbtc" },
  ];

  function validateName(value) {
    let error;
    if (!value) {
      error = "Name is required";
    } else if (value.length > 20) {
      error = "too long 😱";
    }
    return error;
  }

  function validateSymbol(value) {
    let error;
    if (!value) {
      error = "Symbol is required";
    } else if (value.length > 5) {
      error = "too long 😱";
    }
    return error;
  }

  function validateStrategy(value) {
    let error;
    if (value.length > 80) {
      error = "too long 😱";
    }
    return error;
  }

  async function postDB(data: ContractInfo) {
    console.log(data)
    await fetch(`http://localhost:3000/api/contract/${deployedVaultAddress}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
  }

  return (
    <div className={`${styles.pageContent}`}>


      <Formik
        initialValues={{
          name: "My Awesome Fund",
          symbol: "ZKEth",
          strategy: "Half ETH Yield half Hedging",
          type: "Public",
          min: 0.0001,
          max: 20,
          lockup: "3",
          limit: "10",
          entranceFees: "0%",
          exitFees: "0%",
          managementFees: "0%",
          performanceFees: "0%",
          tags: ["DeFi", "Hedging", "Yield", "LongTerm"],
          amount: 1,
          shareAmount: 10,
          image: "data:image/jpeg;base64,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",

        }}
        onSubmit={(values, actions) => {

          console.log("go submited")
          setTimeout(() => {
            alert(JSON.stringify(values, null, 8));

            let dataFinance_ = [{
              sharePrice: values.amount / values.shareAmount,
              date: Date.now(),
              gav: values.amount
            }]
            let data: ContractInfo = {
              fundAddress: deployedVaultAddress,
              name: values.name,
              symbol: values.symbol,
              strategy: values.strategy,
              tags: values.tags,
              dataFinance: dataFinance_,
              image: values.image
            }
            let _tabI: any[] = [];

            _tabI.push(hexToDecimalString(deployedVaultAddress));
            _tabI.push(strToShortStringFelt(values.name).toString());
            _tabI.push(strToShortStringFelt(values.symbol).toString());
            _tabI.push(hexToDecimalString(Asset[denominationAsset].address));
            _tabI.push(values.limit.toString());
            _tabI.push("0");
            var amount = values.amount * 1000000000000000000
            _tabI.push(amount.toString())
            _tabI.push("0");
            var shareAmount = values.shareAmount * 1000000000000000000
            _tabI.push(shareAmount.toString())
            _tabI.push("0");
            _tabI.push("4");
            _tabI.push(values.entranceFees);
            _tabI.push(values.exitFees);
            _tabI.push(values.managementFees);
            _tabI.push(values.performanceFees);

            _tabI.push(trackedAsset.length.toString());
            trackedAsset.forEach((track) => {
              _tabI.push(hexToDecimalString(Asset[track].address));
            });
            _tabI.push("0");

            _tabI.push(allowedProtocol.length.toString());
            allowedProtocol.forEach((value) => {
              let integrationArgs = Integration[value].integration;
              _tabI.push(integrationArgs[0]);
              _tabI.push(integrationArgs[1]);
              _tabI.push("0");
            });

            var min = values.min * 1000000000000000000;
            _tabI.push(min.toString());
            _tabI.push("0");

            var max = values.max * 1000000000000000000;
            _tabI.push(max.toString());
            _tabI.push("0");

            _tabI.push(values.lockup);
            _tabI.push(values.type == "public" ? 1 : 0)

            var _tabA: String[] = []
            _tabA.push(contractAddress.VaultFactory)
            _tabA.push(amount.toString())

            console.log(_tabI)
            console.log(data)
            console.log(_tabA)
            Initialize(_tabA, _tabI, data)
            actions.setSubmitting(false);
          }, 1000);
        }}
      >
        {(props) => (
          <Form>
            <Flex direction={"column"} gap={"20px"}>
              <div
                className={` bg__dotted`}
                style={{ padding: "6%", borderRadius: "20px" }}
              >
                <Flex direction={"column"} gap={"20px"}>
                  <Text
                    fontWeight={"500"}
                    fontSize={"4xl"}
                    marginLeft={"20px"}
                    marginBottom={"20px"}
                  >
                    Identification 🧬
                  </Text>
                  <Flex direction={"row"} gap={"20px"}>
                    <Field name="name" validate={validateName}>
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={form.errors.name && form.touched.name}
                          isRequired
                        >
                          <FormLabel htmlFor="name">Fund Name</FormLabel>
                          <Input {...field} id="name" placeholder="name" />
                          <FormErrorMessage>
                            {form.errors.name}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="symbol" validate={validateSymbol}>
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={form.errors.symbol && form.touched.symbol}
                          isRequired
                        >
                          <FormLabel htmlFor="symbol">Fund Symbol</FormLabel>
                          <Input {...field} id="symbol" placeholder="symbol" />
                          <FormErrorMessage>
                            {form.errors.symbol}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  </Flex>
                  <Field name="strategy" validate={validateStrategy}>
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={form.errors.symbol && form.touched.symbol}
                      >
                        <FormLabel htmlFor="strategy">
                          Fund strategy
                        </FormLabel>
                        <Input
                          {...field}
                          id="strategy"
                          placeholder="strategy"
                        />
                        <FormErrorMessage>
                          {form.errors.strategy}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Flex direction={"row"} gap={"5%"}>
                    <Flex gap={"5%"} direction={"column"} >
                      <Text fontWeight={"600"} marginBottom={"10px"}>
                        Fund Image
                      </Text>
                      <Flex direction={"row"} gap={"50px"}>
                        <div style={{ width: "120px", height: "120px" }}>
                          <ImageUpload
                            onUpload={(image) => {
                              props.setFieldValue("image", image);
                            }}
                          />
                        </div>
                        {props.values.image && (
                          <Flex direction={"column"}>
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
                                src={props.values.image}
                                style={{ objectFit: "cover" }}
                              />
                            </Box>
                          </Flex>
                        )}
                      </Flex>
                    </Flex>
                    <Flex direction={"column"} width={"40%"}>
                      <Text fontWeight={"600"} marginBottom={"10px"}>
                        Fund Tags
                      </Text>
                      <Flex direction={"column"} gap={"10px"}>
                        <Flex direction={"row"} gap={"20px"}>
                          <Input
                            placeholder="Add new tag"
                            maxLength={9}
                            onKeyPress={(e) =>
                              handleInputTagEnterKeyPress(e, () => {
                                if (
                                  !props.values.tags.includes(
                                    e.currentTarget.value as never
                                  ) &&
                                  props.values.tags.length < 5
                                ) {
                                  props.setFieldValue("tags", [
                                    ...props.values.tags,
                                    e.currentTarget.value,
                                  ]);
                                }
                                e.currentTarget.value = "";
                              })
                            }
                          />
                        </Flex>
                        <Flex gap={"10px"} flexWrap={"wrap"}>
                          {props.values.tags.map((tagValue, index) => (
                            <Tag
                              size={"lg"}
                              key={index}
                              borderRadius="full"
                              variant="solid"

                              bg={"#f6643c"}

                            >
                              <TagLabel>#{tagValue}</TagLabel>
                              <TagCloseButton
                                onClick={() =>
                                  props.setFieldValue(
                                    "tags",
                                    RemoveAtIndex(props.values.tags, index)
                                  )
                                }
                              />
                            </Tag>
                          ))}
                        </Flex>
                      </Flex>
                    </Flex>
                  </Flex>

                  <div>
                    <Text fontWeight={"600"} marginBottom={"10px"}>
                      Denomination Asset
                    </Text>
                    <div className={styles.asset_container}>
                      {dominationAssetsList.map((item, index) => (
                        <Button
                          key={index}
                          type="button"
                          backgroundColor={"#0f0b1f"}
                          onClick={() => setDenominationAsset(item.value)}
                          className={`${styles.asset_button} ${denominationAsset == item.value
                            ? styles.asset_selected
                            : ""
                            }`}
                        >
                          <Image src={item.path} alt={item.alt} />
                          {denominationAsset == item.value && (
                            <>
                              <span className={styles.asset_selected_checkmark}>
                                <Image
                                  src={"/checkmark-circle-outline.svg"}
                                  alt={item.alt}
                                  width="24px"
                                  height="24px"
                                />
                              </span>
                            </>
                          )}
                        </Button>
                      ))}
                    </div>
                  </div>

                </Flex>
              </div>
              <div
                className={` bg__dotted`}
                style={{ padding: "6%", borderRadius: "20px" }}
              >
                <Flex direction={"column"} gap={"20px"}>
                  <div>
                    <Text
                      fontWeight={"500"}
                      fontSize={"4xl"}
                      marginLeft={"20px"}
                      marginBottom={"20px"}
                    >
                      Accessibility 🤚
                    </Text>
                    <Flex direction={"row"} gap={"20px"}>
                      <Box width={"40%"}>
                        <Field name="type">
                          {({ field, form }) => (
                            <FormControl isRequired>
                              <FormLabel htmlFor="type">
                                Type of Fund{" "}
                              </FormLabel>
                              <Select {...field} id="type">

                                <option style={{ color: "black" }}>
                                  Private
                                </option>
                                <option style={{ color: "black" }}>
                                  Public
                                </option>
                              </Select>
                            </FormControl>
                          )}
                        </Field>
                      </Box>
                      <Flex direction={"row"} gap={"20px"}>
                        <Field name="min">
                          {({ field, form }) => (
                            <FormControl>
                              <FormLabel htmlFor="min">
                                Minimum Investment (
                                {Asset[denominationAsset].id.toString()}){" "}
                              </FormLabel>
                              <NumberInput
                                onChange={(v) => {
                                  props.setFieldValue("min", v);
                                }}
                                id="min"
                                defaultValue={props.values.min}
                                isRequired
                                step={0.0001}
                                min={0}
                              >
                                <NumberInputField />
                                <NumberInputStepper>
                                  <NumberIncrementStepper />
                                  <NumberDecrementStepper />
                                </NumberInputStepper>
                              </NumberInput>
                            </FormControl>
                          )}
                        </Field>

                        <Field name="max">
                          {({ field, form }) => (
                            <FormControl>
                              <FormLabel htmlFor="max">
                                Maximum Investment (
                                {Asset[denominationAsset].id.toString()})
                              </FormLabel>
                              <NumberInput
                                onChange={(v) => {
                                  props.setFieldValue("max", v);
                                }}
                                id="max"
                                isRequired
                                defaultValue={props.values.max}
                                step={2}
                                min={props.values.min}
                                max={100000}
                              >
                                <NumberInputField />
                                <NumberInputStepper>
                                  <NumberIncrementStepper />
                                  <NumberDecrementStepper />
                                </NumberInputStepper>
                              </NumberInput>
                            </FormControl>
                          )}
                        </Field>
                      </Flex>
                    </Flex>
                  </div>
                  <div>
                    <Text fontWeight={"600"} marginBottom={"10px"}>
                      Harvest Lockup (Hours)
                    </Text>
                    <Flex direction={"row"} gap="50px">
                      <Text>3 hours min</Text>

                      <Slider
                        flex="1"
                        focusThumbOnChange={false}
                        value={parseFloat(props.values.lockup)}
                        onChange={(v) => {
                          props.setFieldValue("lockup", v);
                        }}
                        min={3}
                        max={168}
                        step={1}
                      >
                        <SliderTrack bg="red.100">
                          <SliderFilledTrack bg="tomato" />
                        </SliderTrack>
                        <SliderThumb
                          fontSize="sm"
                          boxSize="32px"
                          children={parseFloat(props.values.lockup)}
                          bgColor={"#f6643c"}
                        />
                      </Slider>
                      <Text>1 week max</Text>
                    </Flex>
                  </div>
                </Flex>
              </div>
              <div
                className={` bg__dotted`}
                style={{ padding: "6%", borderRadius: "20px" }}
              >
                <Flex direction={"column"} gap={"20px"}>
                  <Text
                    fontWeight={"500"}
                    fontSize={"4xl"}
                    marginLeft={"20px"}
                    marginBottom={"20px"}
                  >
                    Integration 🧩
                  </Text>
                  <Flex direction={"row"} gap={"10%"} justifyContent={"center"}>
                    <Box
                      width={"40%"}
                      flexDirection={"column"}
                      display={"flex"}
                      alignItems={"center"}
                    >
                      <Text fontWeight={"600"} marginBottom={"10px"}>
                        Allowed Protocols
                      </Text>

                      <div className={styles.asset_container_2}>
                        {protocalList.map((item, index) => (
                          <Button
                            key={index}
                            type="button"
                            backgroundColor={"#0f0b1"}
                            data-color="transparent"
                            onClick={() => addNewProtocolMult(item.values)}
                            className={`${styles.asset_button} ${allowedProtocol.includes(item.values[0])
                              ? styles.asset_selected
                              : ""
                              }`}
                          >
                            <Flex direction={"column"}>
                              <div>
                                <Image src={item.path} alt={item.alt} />
                                {allowedProtocol.includes(item.values[0]) && (
                                  <>
                                    <span
                                      className={
                                        styles.asset_selected_checkmark
                                      }
                                    >
                                      <Image
                                        src={"/checkmark-circle-outline.svg"}
                                        alt={item.alt}
                                        width="24px"
                                        height="24px"
                                      />
                                    </span>
                                  </>
                                )}
                              </div>
                              <div>{item.label}</div>
                            </Flex>
                          </Button>
                        ))}
                      </div>
                    </Box>
                    <Box
                      maxWidth={"40%"}
                      display={"flex"}
                      flexDirection={"column"}
                      alignItems={"center"}
                    >
                      <Text fontWeight={"600"} marginBottom={"10px"}>
                        Allowed Assets
                      </Text>
                      <div className={styles.asset_container}>
                        {assetsList.map((item, index) => (
                          <Button
                            key={index}
                            backgroundColor={"#0f0b1"}
                            type="button"
                            data-color="transparent"
                            onClick={() => addNewAsset(item.value)}
                            className={`${styles.asset_button} ${trackedAsset.includes(item.value)
                              ? styles.asset_selected
                              : ""
                              }`}
                          >
                            <Image src={item.path} alt={item.alt} />
                            {trackedAsset.includes(item.value) && (
                              <>
                                <span
                                  className={styles.asset_selected_checkmark}
                                >
                                  <Image
                                    src={"/checkmark-circle-outline.svg"}
                                    alt={item.alt}
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
                  </Flex>
                  <div>
                    <Text fontWeight={"600"} marginBottom={"10px"}>
                      Maximum position/assets to track
                    </Text>
                    <Flex direction={"row"} gap="50px">
                      <Text>2 Min</Text>

                      <Slider
                        flex="1"
                        focusThumbOnChange={false}
                        value={parseFloat(props.values.limit)}
                        onChange={(v) => {
                          props.setFieldValue("limit", v);
                        }}
                        min={2}
                        max={1000}
                        step={1}
                      >
                        <SliderTrack bg="red.100">
                          <SliderFilledTrack bg="tomato" />
                        </SliderTrack>
                        <SliderThumb
                          fontSize="sm"
                          boxSize="32px"
                          children={parseFloat(props.values.limit)}
                          bgColor={"#f6643c"}
                        />
                      </Slider>
                      <Text>1000 max</Text>
                    </Flex>
                  </div>


                </Flex>
              </div>
              <div
                className={` bg__dotted`}
                style={{ padding: "6%", borderRadius: "20px" }}
              >
                <Flex direction={"column"} gap={"20px"}>
                  <Text
                    fontWeight={"500"}
                    fontSize={"4xl"}
                    marginLeft={"20px"}
                    marginBottom={"20px"}
                  >
                    Monetisation 💰
                  </Text>
                  <Flex
                    direction={"row"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    gap={"10%"}
                  >
                    <Box width={"40%"}>
                      <Flex direction={"column"}>
                        <Text fontWeight={"600"} marginBottom={"10px"}>
                          Entrance Fees
                        </Text>
                        <Flex direction={"row"} gap="50px">
                          <Text> 0%</Text>

                          <Slider
                            flex="1"
                            focusThumbOnChange={false}
                            value={parseFloat(props.values.entranceFees)}
                            onChange={(v) => {
                              props.setFieldValue("entranceFees", v);
                            }}
                            min={0}
                            max={10}
                            step={1}
                          >
                            <SliderTrack bg="red.100">
                              <SliderFilledTrack bg="tomato" />
                            </SliderTrack>
                            <SliderThumb
                              fontSize="sm"
                              boxSize="32px"
                              children={parseFloat(props.values.entranceFees)}
                              bgColor={"#f6643c"}
                            />
                          </Slider>
                          <Text>10%</Text>
                        </Flex>
                      </Flex>
                    </Box>
                    <Box width={"40%"}>
                      <Flex direction={"column"}>
                        <Text fontWeight={"600"} marginBottom={"10px"}>
                          Exit Fees
                        </Text>
                        <Flex direction={"row"} gap="50px">
                          <Text>0%</Text>

                          <Slider
                            flex="1"
                            focusThumbOnChange={false}
                            value={parseFloat(props.values.exitFees)}
                            onChange={(v) => {
                              props.setFieldValue("exitFees", v);
                            }}
                            min={0}
                            max={10}
                            step={1}
                          >
                            <SliderTrack bg="red.100">
                              <SliderFilledTrack bg="tomato" />
                            </SliderTrack>
                            <SliderThumb
                              fontSize="sm"
                              boxSize="32px"
                              children={parseFloat(props.values.exitFees)}
                              bgColor={"#f6643c"}
                            />
                          </Slider>
                          <Text>10%</Text>
                        </Flex>
                      </Flex>
                    </Box>
                  </Flex>
                  <Flex
                    direction={"row"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    gap={"10%"}
                  >
                    <Box width={"40%"}>
                      <Flex direction={"column"}>
                        <Text fontWeight={"600"} marginBottom={"10px"}>
                          Management Fees
                        </Text>
                        <Flex direction={"row"} gap="50px">
                          <Text> 0%</Text>

                          <Slider
                            flex="1"
                            focusThumbOnChange={false}
                            value={parseFloat(props.values.managementFees)}
                            onChange={(v) => {
                              props.setFieldValue("managementFees", v);
                            }}
                            min={0}
                            max={20}
                            step={1}
                          >
                            <SliderTrack bg="red.100">
                              <SliderFilledTrack bg="tomato" />
                            </SliderTrack>
                            <SliderThumb
                              fontSize="sm"
                              boxSize="32px"
                              children={parseFloat(props.values.managementFees)}
                              bgColor={"#f6643c"}
                            />
                          </Slider>
                          <Text>20%</Text>
                        </Flex>
                      </Flex>
                    </Box>
                    <Box width={"40%"}>
                      <Flex direction={"column"}>
                        <Text fontWeight={"600"} marginBottom={"10px"}>
                          Perfomance Fees
                        </Text>
                        <Flex direction={"row"} gap="50px">
                          <Text>0%</Text>

                          <Slider
                            flex="1"
                            focusThumbOnChange={false}
                            value={parseFloat(props.values.performanceFees)}
                            onChange={(v) => {
                              props.setFieldValue("performanceFees", v);
                            }}
                            min={0}
                            max={20}
                            step={1}
                          >
                            <SliderTrack bg="red.100">
                              <SliderFilledTrack bg="tomato" />
                            </SliderTrack>
                            <SliderThumb
                              fontSize="sm"
                              boxSize="32px"
                              children={parseFloat(
                                props.values.performanceFees
                              )}
                              bgColor={"#f6643c"}
                            />
                          </Slider>
                          <Text>20%</Text>
                        </Flex>
                      </Flex>
                    </Box>
                  </Flex>
                </Flex>
              </div>
              <div
                className={` bg__dotted`}
                style={{ padding: "6%", borderRadius: "20px" }}
              >
                <Flex direction={"column"} gap={"20px"}>
                  <Text
                    fontWeight={"500"}
                    fontSize={"4xl"}
                    marginLeft={"20px"}
                    marginBottom={"20px"}
                  >
                    Feed your Fund 🍔
                  </Text>
                  <Flex direction={"row"} justifyContent={"space-evenly"} alignItems={"center"}>
                    <Flex direction={"column"} gap={"20px"} width={"40%"}>
                      <Field name="amount">
                        {({ field, form }) => (
                          <FormControl>
                            <FormLabel htmlFor="amount">
                              Initial Investment (
                              {Asset[denominationAsset].id.toString()}){" "}
                            </FormLabel>
                            <NumberInput
                              size={"lg"}
                              onChange={(v) => {
                                props.setFieldValue("amount", v);
                              }}
                              id="amount"
                              defaultValue={props.values.amount}
                              isRequired
                              step={0.01}
                              min={0.01}
                              max={100000000000}
                            >
                              <NumberInputField />
                              <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                              </NumberInputStepper>
                            </NumberInput>
                          </FormControl>
                        )}
                      </Field>

                      <Field name="shareAmount">
                        {({ field, form }) => (
                          <FormControl>
                            <FormLabel htmlFor="shareAmount">
                              Initial Mint (
                              {props.values.symbol})
                            </FormLabel>
                            <NumberInput
                              size={"lg"}
                              onChange={(v) => {
                                props.setFieldValue("shareAmount", v);
                              }}
                              id="shareAmount"
                              isRequired
                              defaultValue={props.values.shareAmount}
                              step={2}
                              min={1}
                              max={100}
                            >
                              <NumberInputField />
                              <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                              </NumberInputStepper>
                            </NumberInput>
                          </FormControl>
                        )}
                      </Field>
                    </Flex>
                    <Flex whiteSpace={"nowrap"} direction={"row"} gap={"10px"}>
                      <Text fontWeight={"bold"} fontSize={"5xl"}>
                        1 {props.values.symbol} = </Text><Text color={"#f6643c"} fontWeight={"bold"} fontSize={"5xl"}>{(props.values.amount / props.values.shareAmount).toPrecision(4)}</Text><Text fontWeight={"bold"} fontSize={"5xl"}>{Asset[denominationAsset].id.toString()}{" "}</Text></Flex>

                  </Flex>
                </Flex>

              </div>
              <Flex width={"100%"} justifyContent={"center"}>


                {
                  deployedVaultAddress != "" ?
                    <Button
                      mt={4}
                      alignSelf={"center"}
                      backgroundColor="#f6643c"
                      // isLoading={props.isSubmitting}
                      type="submit"
                    >
                      Create my Fund
                    </Button>
                    :
                    <Text>
                      ⌛⌛
                    </Text>
                }
              </Flex>

            </Flex>

          </Form>
        )
        }
      </Formik >
    </div >
  );
};

export default Contract;

