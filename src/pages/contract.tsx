import { NextPage } from "next";
import React, { useEffect, useRef, useState } from "react";
import styles from "~/styles/contract.module.scss";
import { useContractFactory } from "~/hooks/deploy";
import TargetSource from "../abi/Vault.json";
import { hexToDecimalString } from "starknet/dist/utils/number";
import { getStarknet } from "../starknetWrapper";
import { contractAddress } from "~/registry/address";
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

type FieldType = {
  name: string;
  label: string;
  type: "text" | "number" | "boolean";
  customInputClass?: string;
  required?: boolean;
  toggle?: boolean;
  toggleMessage?: string;
};

function RemoveAtIndex(array: any[], index: number) {
  return [...array.slice(0, index), ...array.slice(index + 1)];
}

type FormInputTextFieldProps = {
  fiels: [FieldType, FieldType?];
  infoMessages: string[];
  formGroupClass?: string;
  onChange: (key: string, value: any) => void;
};

const FormInputTextField = (props: FormInputTextFieldProps) => {
  const [enabled, setEnabled] = React.useState<boolean>(false);
  const handleForm = (e: React.FormEvent<HTMLInputElement>): void => {
    props.onChange(e.currentTarget.name, e.currentTarget.value);
  };

  useEffect(() => {
    if (props.fiels[0].type == "boolean") onToggle(props.fiels[0].name, false);
  }, []);

  const onToggle = (key: string, nextValue: boolean) => {
    if (props.fiels[0].type == "boolean") {
      props.onChange(key, nextValue);
    } else {
      if (nextValue === false) props.onChange(key, undefined);
    }
    setEnabled(nextValue);
  };

  return (
    <div className={`${styles.formGroup} ${props.formGroupClass}`}>
      {/* Toggler */}

      {(props.fiels[0].toggle || props.fiels[0].type == "boolean") && (
        <>
          {props.fiels[0].toggle && (
            <label htmlFor={props.fiels[0].name}>{props.fiels[0].label}</label>
          )}
          <div
            style={{
              margin: "8px 0",
              display: "flex",
              alignItems: "center",
            }}
          >
            <span>
              {props.fiels[0].toggleMessage ??
                `Do you want to enable ${props.fiels[0].name} ?`}
            </span>

            <span className={`${styles.toggler}`}>
              <span
                data-color={enabled ? "secondary" : "primary"}
                onClick={() => onToggle(props.fiels[0].name, true)}
              >
                {" "}
                Yes{" "}
              </span>
              <span
                data-color={!enabled ? "secondary" : "primary"}
                onClick={() => onToggle(props.fiels[0].name, false)}
              >
                {" "}
                No{" "}
              </span>
            </span>
          </div>
        </>
      )}

      {/* Info Message if toggle and enabled */}
      {props.fiels[0].toggle &&
        enabled &&
        props.infoMessages.map((m, index) => <span key={index}>{m}</span>)}

      {/* Inputs */}
      {
        <div style={{ display: "flex", gap: "50px" }}>
          <div className="w-50">
            {(!props.fiels[0].toggle || enabled) &&
              ["number", "text"].includes(props.fiels[0].type) && (
                <>
                  {!props.fiels[0].toggle && (
                    <label htmlFor={props.fiels[0].name}>
                      {props.fiels[0].label}
                    </label>
                  )}
                  <input
                    type={props.fiels[0].type}
                    {...(props.fiels[0].type == "number"
                      ? { step: "any" }
                      : {})}
                    id={props.fiels[0].name}
                    name={props.fiels[0].name}
                    required={props.fiels[0].required}
                    onChange={handleForm}
                    className={`${props.fiels[0].customInputClass ?? ""}`}
                  />
                </>
              )}
          </div>
          <div className="w-50">
            {props.fiels[1] &&
              ["number", "text"].includes(props.fiels[1].type) && (
                <>
                  <label htmlFor={props.fiels[1].name}>
                    {props.fiels[1].label}
                  </label>
                  <input
                    type={props.fiels[1].type}
                    {...(props.fiels[0].type == "number"
                      ? { step: "any" }
                      : {})}
                    id={props.fiels[1].name}
                    name={props.fiels[1].name}
                    required={props.fiels[1].required}
                    onChange={handleForm}
                    className={`${props.fiels[1].customInputClass ?? ""}`}
                  />
                </>
              )}
          </div>
        </div>
      }

      {/* Info Message if not toggle */}
      {!props.fiels[0].toggle &&
        props.infoMessages.map((m, index) => <span key={index}>{m}</span>)}
    </div>
  );
};

const comptroller =
  "0x04432fc00432c1025c8b03775fc64180948d5a2725cc50882f4dec0b526459f5";

const Contract: NextPage = () => {
  const [formData, setFormData] = React.useState<any>({});
  const [denominationAsset, setDenominationAsset] = React.useState<number>(0);
  const [onPopUp, setonPopUp] = React.useState<boolean>(false);
  const [trackedAsset, setTrackedAsset] = React.useState<number[]>([]);
  const [allowedProtocol, setAllowedProtocol] = React.useState<number[]>([]);
  const { library } = useStarknet();
  const { account } = getStarknet();
  const router = useRouter();

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
    console.log(trackedAsset);
    setTrackedAsset((state) => {
      const index = state.findIndex((x) => x == id);
      console.log(state);
      state =
        index === -1
          ? [...state, id]
          : [...state.slice(0, index), ...state.slice(index + 1)];
      return state;
    });
  }

  function addNewProtocolMult(idTab: number[]) {
    console.log(allowedProtocol);
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

  const multicall = async (_tab: any[], _tabA: any[], _tabB: any[]) => {
    console.log("invoke");
    try {
      await account.execute([
        {
          contractAddress:
            "0x031ed52f5b1ea0dc84172a99fad44d202beaa528e8629d0a1f0d4a8b163a71b1",
          entrypoint: "initializeFund",
          calldata: _tab,
        },
        {
          contractAddress: Asset[denominationAsset].address.toString(),
          entrypoint: "approve",
          calldata: _tabA,
        },
        {
          contractAddress: comptroller,
          entrypoint: "activateVault",
          calldata: _tabB,
        },
      ]);
    } catch (error) {
      setonPopUp(true);
      console.error(error);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    let tab: any[] = [];
    console.log(formData);
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

    console.log(tab);

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

    console.log("args here");
    console.log(tab);
    console.log(_tabA);
    console.log(_tabB);
    if (!account.address) {
      console.log("no account detected");
    } else {
      console.log("connected");
      multicall(tab, _tabA, _tabB);
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

  const [deployedVaultAddress, setDeployedVaultAddress] = useState<string>("");

  const [deployedVaultHash, setDeployedVaultHash] = useState<
    string | undefined
  >("");

  const [compiledTarget, setCompiledTarget] = useState<CompiledContract>();

  const [txAccepted, settxAccepted] = useState(0);

  const { deploy: deployTarget } = useContractFactory({
    compiledContract: compiledTarget,
    abi: TargetSource as Abi,
  });

  useEffect(() => {
    if (!compiledTarget) {
      getCompiledVault().then(setCompiledTarget);
    }
  }, []);

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
        // console.log("redirect");
        setDeployedVaultHash(deployment.deployTransactionHash);
        await library
          .waitForTransaction(deployment.deployTransactionHash)
          .then(() => settxAccepted(1));
        router.push("/vault?address=" + deployment.address);
        setDeploying(false);
      }
    };
    await _deployTarget();
    console.log("deployed");
  };

  const targetLink =
    "https://goerli.voyager.online/contract/" + deployedVaultAddress;

  const targetLink2 = "https://goerli.voyager.online/tx/" + deployedVaultHash;

  const getCompiledVault = async () => {
    // Can't import the JSON directly due to a bug in StarkNet: https://github.com/0xs34n/starknet.js/issues/104
    // (even if the issue is closed, the underlying Starknet issue remains)
    const raw = await fetch("/Vault.json");
    const compiled = json.parse(await raw.text());
    return compiled;
  };

  const FIELDS1: FormInputTextFieldProps[] = [
    {
      fiels: [{ type: "text", label: "Name", name: "name", required: true }],
      infoMessages: ["The name of yout fund"],
      onChange: handleForm,
    },
    {
      fiels: [
        { type: "text", label: "Symbol", name: "symbol", required: true },
      ],
      infoMessages: [
        "The symbol is the token ticker associated with the tokenized shares of your fund.",
      ],
      onChange: handleForm,
    },
  ];
  const FIELDS2: FormInputTextFieldProps[] = [
    {
      fiels: [
        {
          type: "boolean",
          label: "Fund Type",
          name: "fund_type",
          required: true,
          toggle: true,
          toggleMessage: "Do you want to create a private fund ? ",
        },
      ],
      infoMessages: [
        "You'll be able to add depositors after your fund creation:",
      ],
      onChange: handleForm,
    },
    {
      fiels: [
        { type: "number", label: "Minimum", name: "minimum", required: true },
        { type: "number", label: "Maximum", name: "maximum", required: true },
      ],
      infoMessages: [
        "You have to provide a minimal and a maximal amount that can be invested in your fund, the amount are related to the denomination asset you provided",
      ],
      onChange: handleForm,
    },
    {
      fiels: [
        {
          type: "text",
          label: "Harvest lockup time",
          name: "harvest_lockup_time",
          required: true,
          toggle: true,
          toggleMessage:
            "You can set up a harvest lockup time, an investor will not be able to resell his shares after having invested if the time limit imposed by the fund manager in the lockup has not been reached. ",
        },
      ],
      infoMessages: ["Set your harvest lockup time"],
      onChange: handleForm,
    },
  ];
  const FIELDS3: FormInputTextFieldProps[] = [
    {
      fiels: [
        {
          type: "number",
          label: "Amount to Invest",
          name: "amount_to_invest",
          required: true,
        },
      ],
      infoMessages: [
        "You will receive 1000 shares, the inital price of your share will be this amount/1000",
      ],
      onChange: handleForm,
    },
  ];
  const FIELDS4: FormInputTextFieldProps[] = [
    {
      fiels: [
        {
          type: "text",
          label: "Entrance fees",
          name: "entrance_fees",
          required: true,
          toggle: true,
          toggleMessage: "Do you want to enable Entrance  fees for your fund? ",
        },
      ],
      infoMessages: ["Set your Entrance  fees"],
      onChange: handleForm,
    },
    {
      fiels: [
        {
          type: "text",
          label: "Exit fees",
          name: "exit_fees",
          required: true,
          toggle: true,
          toggleMessage: "Do you want to enable Exit  fees for your fund? ",
        },
      ],
      infoMessages: ["Set your Exit fees"],
      onChange: handleForm,
    },
    {
      fiels: [
        {
          type: "text",
          label: "Yearly management fees ",
          name: "yearly_management_fees",
          required: true,
          toggle: true,
          toggleMessage:
            "Do you want to enable yearly management fees for your fund? ",
        },
      ],
      infoMessages: ["Set your yearly management fees"],
      onChange: handleForm,
    },
    {
      fiels: [
        {
          type: "text",
          label: "Performance fees",
          name: "performance_fees",
          required: true,
          toggle: true,
          toggleMessage:
            "Do you want to enable yearly performance fees for your fund? ",
        },
      ],
      infoMessages: ["Set your yearly performance fees"],
      onChange: handleForm,
    },
  ];
  const FIELDS5: FormInputTextFieldProps[] = [
    {
      fiels: [
        {
          type: "text",
          label: "Maxium position",
          name: "maximum_position",
          required: true,
        },
      ],
      infoMessages: ["This is the limit of assets you can track."],
      onChange: handleForm,
    },
  ];

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
    } else if (value.toLowerCase() !== "naruto") {
      error = "Jeez! You're not a fan 😱";
    }
    return error;
  }

  function validateSymbol(value) {
    let error;
    if (!value) {
      error = "Symbol is required";
    } else if (value.length > 10) {
      error = "too long 😱";
    }
    return error;
  }

  return (
    <div className={`${styles.pageContent}`}>
      <div className={`${styles.formContainer} bg__dotted`}>
        <Flex direction={"column"} gap={"10px"}>
          {/* <Text fontWeight={"700"} fontSize={"35px"}>
            Deploy your fund
          </Text> */}

          {!deployedVaultAddress && (
            <Button
              type="button"
              onClick={onDeploy}
              backgroundColor={"#f6643c"}
              color={"white"}
              width={"150px"}
            >
              {deploying ? (
                <Text fontWeight={"300"} fontSize={"20px"}>
                  ⏳⌛
                </Text>
              ) : (
                <Text fontWeight={"300"} fontSize={"20px"}>
                  🧲 Deploy 🧲
                </Text>
              )}
            </Button>
          )}
        </Flex>
        <div>
          <div>
            {deployedVaultAddress && (
              <div>
                Fund Address:{" "}
                <a
                  href={targetLink}
                  target="_blank"
                  style={{ textDecoration: "underline orange" }}
                >
                  {deployedVaultAddress}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
      <div
        className={` bg__dotted`}
        style={{ padding: "6%", borderRadius: "20px" }}
      >
        <Text
          fontWeight={"500"}
          fontSize={"4xl"}
          marginLeft={"20px"}
          marginBottom={"20px"}
        >
          Identification 🧬
        </Text>
        <Formik
          initialValues={{
            name: "Sasuke",
            symbol: "dod",
            description: "This is not required, you can change it at anytime",
            type: "Public",
            min: 0.000001,
            max: 20,
            lockup: "3",
            limit: "10",
            entranceFees: "0%",
            exitFees: "0%",
            managementFees: "0%",
            performanceFees: "0%",
            tags: [],
            image: null
          }}
          onSubmit={(values, actions) => {
            // on submit form
            setTimeout(() => {
              alert(JSON.stringify(values, null, 8));
              postContract(values).then(res=>{
                console.log(res)
              }).catch(err=>{
                console.log(err)
              })
              actions.setSubmitting(false);
            }, 1000);
          }}
        >
          {(props) => (
            <Form>
              <Flex direction={"column"} gap={"20px"}>
                <Flex direction={"row"} gap={"20px"}>
                  <Field name="name" validate={validateName}>
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={form.errors.name && form.touched.name}
                        isRequired
                      >
                        <FormLabel htmlFor="name">Fund Name</FormLabel>
                        <Input {...field} id="name" placeholder="name" />
                        <FormErrorMessage>{form.errors.name}</FormErrorMessage>
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
                <Field name="description">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.symbol && form.touched.symbol}
                    >
                      <FormLabel htmlFor="description">
                        Fund Description
                      </FormLabel>
                      <Input
                        {...field}
                        id="description"
                        placeholder="description"
                      />
                      <FormErrorMessage>
                        {form.errors.description}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <div>
                  <Text fontWeight={"600"} marginBottom={"10px"}>
                    Denomination Asset
                  </Text>
                  <div className={styles.asset_container}>
                    {dominationAssetsList.map((item, index) => (
                      <Button
                        key={index}
                        type="button"
                        onClick={() => setDenominationAsset(item.value)}
                        className={`${styles.asset_button} ${
                          denominationAsset == item.value
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

                <div>
                  <Text
                    fontWeight={"500"}
                    fontSize={"4xl"}
                    marginTop={"40px"}
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
                            <FormLabel htmlFor="type">Type of Fund </FormLabel>
                            <Select {...field} id="type">
                              {/* <option>Public</option> */}
                              <option style={{ color: "black" }}>
                                Private
                              </option>
                              <option style={{ color: "black" }}>Public</option>
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
                              isRequired
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
                <Text
                  fontWeight={"500"}
                  fontSize={"4xl"}
                  marginTop={"40px"}
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
                          data-color="transparent"
                          onClick={() => addNewProtocolMult(item.values)}
                          className={`${styles.asset_button} ${
                            allowedProtocol.includes(item.values[0])
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
                          type="button"
                          data-color="transparent"
                          onClick={() => addNewAsset(item.value)}
                          className={`${styles.asset_button} ${
                            trackedAsset.includes(item.value)
                              ? styles.asset_selected
                              : ""
                          }`}
                        >
                          <Image src={item.path} alt={item.alt} />
                          {trackedAsset.includes(item.value) && (
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
                  </Box>
                </Flex>
                <div>
                  <Text fontWeight={"600"} marginBottom={"10px"}>
                    Maximum position/assets to track
                  </Text>
                  <Flex direction={"row"} gap="50px">
                    <Text>1 Min</Text>

                    <Slider
                      flex="1"
                      focusThumbOnChange={false}
                      value={parseFloat(props.values.limit)}
                      onChange={(v) => {
                        props.setFieldValue("limit", v);
                      }}
                      min={1}
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
                <Text
                  fontWeight={"500"}
                  fontSize={"4xl"}
                  marginTop={"40px"}
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
                            props.setFieldValue("entranceFees", `${v}%`);
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
                            props.setFieldValue("exitFees", `${v}%`);
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
                            props.setFieldValue("managementFees", `${v}%`);
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
                            props.setFieldValue("performanceFees", `${v}%`);
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
                            children={parseFloat(props.values.performanceFees)}
                            bgColor={"#f6643c"}
                          />
                        </Slider>
                        <Text>20%</Text>
                      </Flex>
                    </Flex>
                  </Box>
                </Flex>
                {/* {JSON.stringify(props.values)} */}
                <Flex gap={"20px"} direction={"column"}>
                  <Text
                    fontWeight={"500"}
                    fontSize={"4xl"}
                    marginTop={"40px"}
                    marginLeft={"20px"}
                    marginBottom={"20px"}
                  >
                    Tags
                  </Text>
                  <HStack spacing={4}>
                    {props.values.tags.map((tagValue, index) => (
                      <Tag
                        size={"lg"}
                        key={index}
                        borderRadius="full"
                        variant="solid"
                        colorScheme="green"
                        bg={'gray.100'}
                        color={'black'}
                      >
                        <TagLabel>{tagValue}</TagLabel>
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
                  </HStack>
                  <Flex direction={"row"} gap={"20px"}>
                    <Input
                      placeholder="Add new tag"
                      maxLength={6}
                      onKeyPress={(e) =>
                        handleInputTagEnterKeyPress(e, () => {
                          if (!props.values.tags.includes(e.currentTarget.value as never)) {
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
                </Flex>

                <Text
                  fontWeight={"500"}
                  fontSize={"4xl"}
                  marginTop={"40px"}
                  marginLeft={"20px"}
                  marginBottom={"20px"}
                >
                  Image
                </Text>
                <Flex height={'200px'} gap={'5%'}>
                  <div style={{width: '40%'}}>
                    <ImageUpload onUpload={(image)=> {
                      console.log(image);
                      props.setFieldValue("image", image);
                    }}/>
                  </div>
                  {props.values.image && (
                    <Flex direction={'column'} width={'55%'}>
                      <span>Preview</span>
                      <div style={{position:'relative', height: '100%'}}>
                        <Image width={'100%'} layout='fill' objectFit='contain' src={props.values.image}></Image>
                      </div>
                    </Flex>
                  )}
                </Flex>

                <Text
                  fontWeight={"500"}
                  fontSize={"4xl"}
                  marginTop={"40px"}
                  marginLeft={"20px"}
                  marginBottom={"20px"}
                >
                  Feed your Fund 🍔
                </Text>
              </Flex>
              <Button
                mt={4}
                colorScheme="teal"
                isLoading={props.isSubmitting}
                type="submit"
              >
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </div>

      {onPopUp ? (
        <div
          style={{
            position: "absolute",
            backgroundColor: "black",
            width: "50%",
            marginLeft: "25%",
            display: "flex",
            flexDirection: "column",
            padding: "30px",
          }}
        >
          <button onClick={() => setonPopUp(false)}>Close</button>
          <p className="fs-35">Edit Your Vault Description</p>
          <p className="fs-22">Description :</p>
          <input></input>
          <p className="fs-22">Tags :</p>
          <input></input>
          <p className="fs-22">Image :</p>
          <input></input>
          <button>Validate</button>
        </div>
      ) : (
        <></>
      )}
      <div className={`${styles.formContainer} bg__dotted`}>
        <div className={styles.header}>Feed your fund</div>
        {FIELDS3.map((item, index) => (
          <FormInputTextField
            key={index}
            fiels={item.fiels}
            infoMessages={item.infoMessages}
            formGroupClass={item.formGroupClass}
            onChange={item.onChange}
          />
        ))}
        <Button
          data-color="secondary"
          type="submit"
          style={{ display: "block", marginLeft: "auto" }}
          backgroundColor={"#f6643c"}
          color={"white"}
        >
          Create your fund
        </Button>
      </div>

      <div>
        

      </div>
      
    </div>
  );
};

export default Contract;