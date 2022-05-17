import { NextPage } from "next";
import React from "react";
import styles from "~/styles/contract.module.scss";
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

const Contract: NextPage = () => {
  const [formData, setFormData] = React.useState<any>({});

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log(formData);
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

  const FIELDS1: FormInputTextFieldProps[] = [
    {
      fiels: [{ type: "text", label: "Name", name: "name", required: true }],
      infoMessages: ["The name of yout vault"],
      onChange: handleForm,
    },
    {
      fiels: [
        { type: "text", label: "Symbol", name: "symbol", required: true },
      ],
      infoMessages: [
        "The symbol is the token ticker associated with the tokenized shares of your vault.",
      ],
      onChange: handleForm,
    },
    {
      fiels: [
        {
          type: "text",
          label: "Denomination Asset",
          name: "denomination_asset",
          required: true,
        },
      ],
      infoMessages: [
        "The denomination asset is the asset in which depositors deposit into your vault and in which the vault's share price and the performance are measured.",
      ],
      onChange: handleForm,
    },
  ];
  const FIELDS2: FormInputTextFieldProps[] = [
    {
      fiels: [
        { type: "number", label: "Minimum", name: "minimum", required: true },
        { type: "number", label: "Maximum", name: "maximum", required: true },
      ],
      infoMessages: [
        "You have to provide a minimal and a maximal amount that can be invested in your vault and you can enable a limit of investors allowed to buy shares",
      ],
      onChange: handleForm,
    },
    {
      fiels: [
        {
          type: "text",
          label: "Whitelist",
          name: "whitelist",
          required: true,
          toggle: true,
          toggleMessage: "Do you want to enable a whitelist for your vault?",
        },
      ],
      infoMessages: [
        "Please add the wallet addresses that will be able to add fund in your vault:",
      ],
      onChange: handleForm,
    },
  ];
  const FIELDS3: FormInputTextFieldProps[] = [
    {
      fiels: [
        {
          type: "text",
          label: "Harvest lockup time",
          name: "harvest_lockup_time",
          required: true,
          toggle: true,
          toggleMessage:
            "You can set up a harvest lockup time, an investor will not be able to resell his shares after having invested if the time limit imposed by the vault manager in the lockup has not been reached. ",
        },
      ],
      infoMessages: ["Set your harvest lockup time"],
      onChange: handleForm,
    },
  ];
  const FIELDS4: FormInputTextFieldProps[] = [
    {
      fiels: [
        {
          type: "text",
          label: "Entrance / Exit fees",
          name: "entrance_or_exit_fees",
          required: true,
          toggle: true,
          toggleMessage:
            "Do you want to enable Entrance / Exit fees for your vault? ",
        },
      ],
      infoMessages: ["Set your Entrance / Exit fees"],
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
            "Do you want to enable yearly management fees for your vault? ",
        },
      ],
      infoMessages: ["Set your yearly management fees"],
      onChange: handleForm,
    },
    {
      fiels: [
        {
          type: "text",
          label: "Yearly performance fees",
          name: "yearly_performance_fees",
          required: true,
          toggle: true,
          toggleMessage:
            "Do you want to enable yearly performance fees for your vault? ",
        },
      ],
      infoMessages: ["Set your yearly performance fees"],
      onChange: handleForm,
    },
    {
      fiels: [
        {
          type: "text",
          label: "Loyalty fees",
          name: "loyalty_fees",
          required: true,
          toggle: true,
          toggleMessage: "Do you want to enable loyalty fees for your vault? ",
        },
      ],
      infoMessages: ["Set your loyalty fees"],
      onChange: handleForm,
    },
  ];
  const FIELDS5: FormInputTextFieldProps[] = [
    {
      fiels: [
        { type: "text", label: "Protocols", name: "protocols", required: true },
      ],
      infoMessages: [
        "You can choose between all the protocols integrated into Magnety which one will be usable for your fund management.",
      ],
      onChange: handleForm,
    },
    {
      fiels: [
        {
          type: "text",
          label: "Not desired Assets",
          name: "not_desired_assets",
          required: true,
        },
      ],
      infoMessages: [],
      onChange: handleForm,
    },
    {
      fiels: [
        {
          type: "text",
          label: '"Third-party" protocol',
          name: "third_party_protocol",
          required: true,
        },
      ],
      infoMessages: [],
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
          <div className={styles.header}>Let's Begin</div>

          {FIELDS1.map((item, index) => (
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
          <div className={styles.header}>Restrictions</div>

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
          <div className={styles.header}>Withdrawals preference</div>

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
          <div className={styles.header}>Policies</div>

          {FIELDS5.map((item, index) => (
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
