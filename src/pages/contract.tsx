import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import styles from "~/styles/contract.module.scss";
import { useContractFactory } from "~/hooks/deploy";
import TargetSource from "../abi/Vault.json";
import { hexToDecimalString } from 'starknet/dist/utils/number'
import { getStarknet } from '../starknetWrapper'
import { contractAddress } from "~/registry/address";

import Image from "next/image";
import {
  Abi,
  CompiledContract,
  json,
} from "starknet";
import {
  useStarknet,
} from "@starknet-react/core";

import { Asset } from "../registry/tokenSupported"
import { Integration } from "../registry/protocolSupported"

import btc from '../image/BTC.png';
import eth from '../image/ETH.png';
import zkp from '../image/ZKP.png';
import tst from '../image/TST.svg';
import alphaRoad from '../image/alphaRoad.jpg'
import ethzkp from '../image/ETH-ZKP.png';
import btctst from '../image/BTC-TST.png';
import ethtst from '../image/ETH-TST.png';
import ethbtc from '../image/ETH-BTC.png';
import { compileString } from "sass";


type FieldType = {
  name: string;
  label: string;
  type: "text" | "number";
  customInputClass?: string;
  required?: boolean;
  toggle?: boolean;
  toggleMessage?: string;
};

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

  const onToggle = (key: string, nextValue: boolean) => {
    if (nextValue === false) props.onChange(key, undefined);
    setEnabled(nextValue);
  };

  return (
    <div className={`${styles.formGroup} ${props.formGroupClass}`}>
      {/* Toggler */}

      {props.fiels[0].toggle && (
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
      <div style={{ display: "flex", gap: "50px" }}>
        <div className="w-50">
          {(!props.fiels[0].toggle || enabled) && (
            <>
              {!props.fiels[0].toggle && (
                <label htmlFor={props.fiels[0].name}>
                  {props.fiels[0].label}
                </label>
              )}
              <input
                type={props.fiels[0].type}
                {...(props.fiels[0].type == "number" ? { step: "any" } : {})}
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
          {props.fiels[1] && (
            <>
              <label htmlFor={props.fiels[1].name}>
                {props.fiels[1].label}
              </label>
              <input
                type={props.fiels[1].type}
                {...(props.fiels[0].type == "number" ? { step: "any" } : {})}
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

      {/* Info Message if not toggle */}
      {!props.fiels[0].toggle &&
        props.infoMessages.map((m, index) => <span key={index}>{m}</span>)}
    </div>
  );
};

const comptroller = "0x04432fc00432c1025c8b03775fc64180948d5a2725cc50882f4dec0b526459f5";


const Contract: NextPage = () => {
  const [formData, setFormData] = React.useState<any>({});
  const [denominationAsset, setDenominationAsset] = React.useState<number>(0);
  const [trackedAsset, setTrackedAsset] = React.useState<string[]>([]);
  const [allowedProtocol, setAllowedProtocol] = React.useState<Array<string[]>>([]);
  const { library } = useStarknet()
  const { account } = getStarknet()

  // const { contract: comptroller } = useComptrollerContract()
  // const { invoked } = useStarknetInvoke({ contract: comptroller, method: 'activateVault' })



  function addNewAsset(id: number) {
    const addressAsset = hexToDecimalString(Asset[id].address)
    let tab: string[] = trackedAsset
    if (tab.includes(addressAsset)) {
      return
    }
    else {
      tab.push(addressAsset)
      setTrackedAsset(tab)
      return
    }
  }
  function addNewProtocolMult(idTab: number[]) {
    for (let pas = 0; pas < idTab.length; pas++) {
      addNewProtocol(idTab[pas])
    }

  }

  function addNewProtocol(id: number) {
    let integrationArgs = Integration[id].integration
    let toDeci = hexToDecimalString(integrationArgs[0])
    let toDeci2 = hexToDecimalString(integrationArgs[1])
    integrationArgs[0] = toDeci
    integrationArgs[1] = toDeci2
    let tab = allowedProtocol

    if (tab.includes(integrationArgs)) {
      return
    }
    else {
      tab.push(integrationArgs)
      setAllowedProtocol(tab)
      return
    }
  }

  function removeAsset(id: number) {
    const addressAsset = Asset[id].address
    let tab: string[] = trackedAsset
    if (tab.includes(addressAsset)) {
      //tab.remove the value of address
      setTrackedAsset(tab)
      return
    }
    else {
      return
    }
  }

  function removeProtocol(id: number) {
    const integrationArgs = Integration[id].integration
    let tab = allowedProtocol
    if (tab.includes(integrationArgs)) {
      //tab.remove the value of address
      setAllowedProtocol(tab)
      return
    }
    else {
      return
    }
  }


  function strToShortStringFelt(str: string): bigint {
    const strB = Buffer.from(str)
    return BigInt(
      strB.reduce((memo, byte) => {
        memo += byte.toString(16)
        return memo
      }, '0x'),
    )
  }

  const multicall = async (_tab: any[], _tabA: any[], _tabB: any[]) => {
    console.log("invoke")
    let tx1 = await account.execute(
      [
        {
          contractAddress: '0x031ed52f5b1ea0dc84172a99fad44d202beaa528e8629d0a1f0d4a8b163a71b1',
          entrypoint: 'initializeFund',
          calldata: _tab,
        },
        {
          contractAddress: Asset[denominationAsset].address.toString(),
          entrypoint: 'approve',
          calldata: _tabA,
        },
        {
          contractAddress: comptroller,
          entrypoint: 'activateVault',
          calldata: _tabB,
        }
      ]
    );
    console.log(tx1)
    // return (tx1)
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    let tab: any[] = []
    console.log(formData);
    // tab.push(hexToDecimalString(deployedVaultAddress))
    // tab.push(strToShortStringFelt(formData.name).toString())
    // tab.push(strToShortStringFelt(formData.symbol).toString())
    // tab.push(hexToDecimalString(Asset[denominationAsset].address))
    // tabUint.push(formData.maximum_position.toString())
    // tabUint.push('0')
    // tab.push(tabUint)
    // tabUint = []
    // if (typeof formData.entrance_fees == "undefined") {
    //   tabFee.push('0')
    // }
    // else {
    //   tabFee.push(formData.entrance_fees)
    // }
    // if (typeof formData.exit_fees == "undefined") {
    //   tabFee.push('0')
    // }
    // else {
    //   tabFee.push(formData.exit_fees)
    // }
    // if (typeof formData.yearly_management_fees == "undefined") {
    //   tabFee.push('0')
    // }
    // else {
    //   tabFee.push(formData.yearly_management_fees)
    // }
    // if (typeof formData.performance_fees == "undefined") {
    //   tabFee.push('0')
    // }
    // else {
    //   tabFee.push(formData.performance_fees)
    // }
    // tab.push(tabFee)
    // tab.push(trackedAsset)
    // tab.push(allowedProtocol)


    // var min = parseFloat(formData.minimum);
    // min = min * 1000000000000000000
    // tabUint.push(min.toString())
    // tabUint.push('0')
    // tab.push(tabUint)
    // tabUint = []

    // var max = parseFloat(formData.maximum);
    // max = max * 1000000000000000000
    // tabUint.push(max.toString())
    // tabUint.push('0')
    // tab.push(tabUint)
    // tabUint = []

    // if (typeof formData.harvest_lockup_time == "undefined") {
    //   tab.push('0')
    // }
    // else {
    //   tab.push(formData.harvest_lockup_time)
    // }

    // if (typeof formData.fund_type == "undefined") {
    //   tab.push('1')
    // }
    // else {
    //   tab.push('0')
    // }

    tab.push(hexToDecimalString(deployedVaultAddress))
    tab.push(strToShortStringFelt(formData.name).toString())
    tab.push(strToShortStringFelt(formData.symbol).toString())
    tab.push(hexToDecimalString(Asset[denominationAsset].address))
    tab.push(formData.maximum_position.toString())
    tab.push('0')
    tab.push('4')

    if (typeof formData.entrance_fees == "undefined") {
      tab.push('0')
    }
    else {
      tab.push(formData.entrance_fees)
    }
    if (typeof formData.exit_fees == "undefined") {
      tab.push('0')
    }
    else {
      tab.push(formData.exit_fees)
    }
    if (typeof formData.yearly_management_fees == "undefined") {
      tab.push('0')
    }
    else {
      tab.push(formData.yearly_management_fees)
    }
    if (typeof formData.performance_fees == "undefined") {
      tab.push('0')
    }
    else {
      tab.push(formData.performance_fees)
    }

    tab.push(trackedAsset.length.toString())
    for (let pas = 0; pas < trackedAsset.length; pas++) {
      tab.push(trackedAsset[pas])
    }
    tab.push(allowedProtocol.length.toString())
    for (let pas = 0; pas < allowedProtocol.length; pas++) {
      tab.push(allowedProtocol[pas][0])
      tab.push(allowedProtocol[pas][1])
      tab.push('0')
    }

    var min = parseFloat(formData.minimum);
    min = min * 1000000000000000000
    tab.push(min.toString())
    tab.push('0')

    var max = parseFloat(formData.maximum);
    max = max * 1000000000000000000
    tab.push(max.toString())
    tab.push('0')

    if (typeof formData.harvest_lockup_time == "undefined") {
      tab.push('0')
    }
    else {
      tab.push(formData.harvest_lockup_time)
    }

    if (typeof formData.fund_type == "undefined") {
      tab.push('1')
    }
    else {
      tab.push('0')
    }

    console.log(tab)

    const _tabA = []


    _tabA.push(hexToDecimalString(comptroller))


    const _tabB = []
    _tabB.push(hexToDecimalString(deployedVaultAddress))
    _tabB.push(hexToDecimalString(Asset[denominationAsset].address))
    var amountToInvest = parseFloat(formData.amount_to_invest);
    amountToInvest = amountToInvest * 1000000000000000000
    _tabA.push(amountToInvest.toString())
    _tabA.push("0")

    _tabB.push(amountToInvest.toString())
    _tabB.push("0")

    console.log(_tabB)
    if (!account.address) {
      console.log("no account detected")
    }
    else {
      console.log("connected")
      multicall(tab, _tabA, _tabB)
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

  const [deployedVaultAddress, setDeployedVaultAddress] =
    useState<string>("");

  const [deployedVaultHash, setDeployedVaultHash] =
    useState<string | undefined>("");

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
    const _deployTarget = async () => {
      const deployment = await deployTarget({
        constructorCalldata: [hexToDecimalString("0x031ed52f5b1ea0dc84172a99fad44d202beaa528e8629d0a1f0d4a8b163a71b1"), hexToDecimalString(comptroller)],
      });
      if (deployment) {
        setDeployedVaultAddress(deployment.address);
        setDeployedVaultHash(deployment.deployTransactionHash)
        await library.waitForTransaction(deployment.deployTransactionHash).then(() => settxAccepted(1));
      }
    };
    console.log("deploying")

    await _deployTarget();
  };


  const targetLink =
    "https://goerli.voyager.online/contract/" + deployedVaultAddress;

  const targetLink2 =
    "https://goerli.voyager.online/tx/" + deployedVaultHash;

  const getCompiledVault = async () => {
    // Can't import the JSON directly due to a bug in StarkNet: https://github.com/0xs34n/starknet.js/issues/104
    // (even if the issue is closed, the underlying Starknet issue remains)
    const raw = await fetch("/Vault.json");
    const compiled = json.parse(await raw.text());
    return compiled;
  };

  const FIELDS0 =
    <div>
      <button type="button" onClick={onDeploy}>Deploy Vault</button>
      <div>
        {deployedVaultAddress && (
          <div>
            Vault contract:{" "}
            <a href={targetLink} target="_blank">
              {deployedVaultAddress}
            </a>
          </div>

        )}
        {deployedVaultHash && (
          <div>
            TX:{" "}
            <a href={targetLink2} target="_blank">
              {deployedVaultHash}
            </a>
            <div>
              {txAccepted ? (<div>
                Accepted on L2 </div>) : <div>Waiting for Tx to be Accepted on Starknet</div>}
            </div>
          </div>

        )}
      </div>
    </div>

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
          type: "text",
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
      fiels: [{ type: "number", label: "Amount to Invest", name: "amount_to_invest", required: true }],
      infoMessages: ["You will receive 1000 shares, the inital price of your share will be this amount/1000"],
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
          toggleMessage:
            "Do you want to enable Entrance  fees for your fund? ",
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
          toggleMessage:
            "Do you want to enable Exit  fees for your fund? ",
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
      infoMessages: [
        "This is the limit of assets you can track.",
      ],
      onChange: handleForm,
    },
  ];

  return (
    <div className={`${styles.pageContent}`}>
      <div className="fs-35"> Create</div>
      <form
        onSubmit={(e) => {
          onSubmit(e);
        }}
        method="post"
      >
        <div className={`${styles.formContainer} bg__dotted`}>
          <div className={styles.header}>Deploy your fund contract</div>
          {FIELDS0}
        </div>
        <div className={`${styles.formContainer} bg__dotted`}>
          <div className={styles.header}>Fund information</div>

          {FIELDS1.map((item, index) => (
            <FormInputTextField
              key={index}
              fiels={item.fiels}
              infoMessages={item.infoMessages}
              formGroupClass={item.formGroupClass}
              onChange={item.onChange}
            />
          ))}
          <div>
            <div>Choose your denomination Asset f{hexToDecimalString("0x72df4dc5b6c4df72e4288857317caf2ce9da166ab8719ab8306516a2fddfff7")}</div>
            <div>
              <button type="button" onClick={() => setDenominationAsset(1)}>
                <Image src={btc} alt="btc" />
              </button>
              <button type="button" onClick={() => setDenominationAsset(0)}>
                <Image src={eth} alt="eth" />
              </button>
            </div>
          </div>
        </div>
        <div className={`${styles.formContainer} bg__dotted`}>
          <div className={styles.header}>Depositor policies</div>

          {FIELDS2.map((item, index) => (
            <FormInputTextField
              key={index}
              fiels={item.fiels}
              infoMessages={item.infoMessages}
              formGroupClass={item.formGroupClass}
              onChange={item.onChange}
            />
          ))}
        </div>
        <div className={`${styles.formContainer} bg__dotted`}>
          <div className={styles.header}>Asset manager policies</div>
          <div>
            <div>Select Protocol  you want to use</div>
            <div>
              <button type="button" onClick={() => addNewProtocol(0)} style={{ width: "100px" }}>
                <Image src={alphaRoad} alt="btc" />
                <div>Swap</div>
              </button>
              <button type="button" onClick={() => addNewProtocolMult([1, 2])} style={{ width: "100px" }}>
                <Image src={alphaRoad} alt="eth" />
                <div>Liquidity</div>
              </button>
            </div>
          </div>
          {FIELDS5.map((item, index) => (
            <FormInputTextField
              key={index}
              fiels={item.fiels}
              infoMessages={item.infoMessages}
              formGroupClass={item.formGroupClass}
              onChange={item.onChange}
            />
          ))}
          <div>
            <div>Select the Assets you want to use</div>
            <div>
              <button type="button" onClick={() => addNewAsset(0)} style={{ width: "100px" }}>
                <Image src={btc} alt="btc" />
              </button>
              <button type="button" onClick={() => addNewAsset(1)} style={{ width: "100px" }}>
                <Image src={eth} alt="eth" />
              </button>
              <button type="button" onClick={() => addNewAsset(2)} style={{ width: "100px" }}>
                <Image src={zkp} alt="eth" />
              </button>
              <button type="button" onClick={() => addNewAsset(3)} style={{ width: "100px" }}>
                <Image src={tst} alt="eth" />
              </button>
              <button type="button" onClick={() => addNewAsset(4)} style={{ width: "100px" }}>
                <Image src={ethzkp} alt="eth" />
              </button>
              <button type="button" onClick={() => addNewAsset(5)} style={{ width: "100px" }}>
                <Image src={btctst} alt="eth" />
              </button>
              <button type="button" onClick={() => addNewAsset(6)} style={{ width: "100px" }}>
                <Image src={ethtst} alt="eth" />
              </button>
              <button type="button" onClick={() => addNewAsset(7)} style={{ width: "100px" }}>
                <Image src={ethbtc} alt="eth" />
              </button>;
            </div>
          </div>
        </div>
        <div className={`${styles.formContainer} bg__dotted`}>
          <div className={styles.header}>Fees</div>

          {FIELDS4.map((item, index) => (
            <FormInputTextField
              key={index}
              fiels={item.fiels}
              infoMessages={item.infoMessages}
              formGroupClass={item.formGroupClass}
              onChange={item.onChange}
            />
          ))}
        </div>
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
        </div>
        <button
          data-color="secondary"
          type="submit"
          style={{ display: "block", marginLeft: "auto" }}
        >
          Go!
        </button>
      </form>
    </div>
  );
};

export default Contract;
