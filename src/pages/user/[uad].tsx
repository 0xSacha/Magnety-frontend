import React, { Ref, useEffect, useRef, useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import styles from "~/styles/vault.module.scss";
import { useAppSelector } from "../../app/hooks";
import { selectCount } from "../../app/counterSlice";
import UDatabase from "./users.json";
import FakeImage from "~/components/FakeImage";
import Image from "next/image";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { Field, Form, Formik, FormikProps } from "formik";

const VAULT_UNDER_MANAGEMENT = [
  {
    name: "A vault name",
    percentage: "+1.34%",
  },
  {
    name: "A vault name",
    percentage: "+1.34%",
  },
];
const VAULT_EXPOSED = [
  {
    name: "A vault name",
    percentage: "+1.34%",
  },
];

const vault: NextPage = () => {
  let count = useAppSelector(selectCount);
  const [editMode, setEditMode] = useState<boolean>(false);
  let formRef =
    React.createRef<FormikProps<{ name: string; description: string }>>();

  const router = useRouter();
  var { uad } = router.query;
  var addressdata = UDatabase["default"];
  if (uad !== undefined) {
    /* uad = AssetManager ... to find */
    addressdata = UDatabase[String(uad)];
  } else {
    uad = "0xABCDEDFGHIJKLM";
  }

  function validateName(value) {
    let error;
    if (!value) {
      error = "Name is required";
    }
    return error;
  }

  const handleSubmit = () => {
    if (formRef.current) {
      formRef.current.handleSubmit();
    }
  };

  return (
    <>
      <div className={`${styles.pageContainer}`}>
        <span className="fs-35" style={{ fontWeight: "bold" }}>
          Profile of {addressdata.name}
        </span>
        <div
          className="bg__dotted"
          style={{
            borderRadius: "15px",
            padding: "4px 6px",
            position: "relative",
          }}
        >
          <div
            style={{
              height: "160px",
              borderRadius: "15px 15px 0 0",
              backgroundColor: "black",
              backgroundImage: `url(${addressdata.banner})`,
              backgroundSize: "cover",
              backgroundPosition: "center bottom",
            }}
          ></div>
          <div
            style={{
              position: "absolute",
              right: "25px",
              top: "20px",
              borderRadius: "50%",
              backgroundColor: "var(--color-primary)",
              display: "grid",
              placeItems: "center",
              width: "50px",
              height: "50px",
              cursor: "pointer",
            }}
            onClick={() => {
              editMode ? handleSubmit() : setEditMode(true);
            }}
          >
            {editMode ? (
              <Image
                width={"60px"}
                height={"60px"}
                src="/checkmark-circle-outline.svg"
              />
            ) : (
              <Image width={"25px"} height={"25px"} src="/edit.svg" />
            )}
          </div>
          
          <div
            style={{
              height: "180px",
              width: "180px",
              marginLeft: `calc(50% - 90px)`,
              marginTop: "-90px",
              borderRadius: "50%",
              backgroundColor: "orange",
              backgroundImage: `url(${addressdata.photo_link})`,
              backgroundSize: "cover",
              backgroundPosition: "center bottom",
            }}
          />

          {!editMode ? (
            <>
              <div
                style={{
                  display: "table",
                  clear: "both",
                  width: "100%",
                  marginTop: "-90px",
                }}
              >
                <div style={{ width: `calc(50% + 90px)`, float: "left" }}>
                  <p className="fs-35" style={{ fontWeight: "bold" }}>
                    {addressdata.name}
                  </p>
                  <p className="fs-15" style={{ fontWeight: "semi-bold" }}>
                    {uad.slice(0, 4) + "..." + uad.slice(-4)}
                  </p>
                  <p className="fs-16">Last active : TODO </p>
                </div>
                <div
                  style={{
                    width: `calc(50% - 90px)`,
                    float: "left",
                    paddingTop: "9px",
                    paddingLeft: "15px",
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px'
                  }}
                >
                  {/* <p className="fs-13" style={{ fontWeight: "semi-bold" }}>
                    Views
                  </p>
                  <p className="fs-13" style={{ fontWeight: "semi-bold" }}>
                    Followers
                  </p> */}

                  <div className='fw-500' style={{display: 'flex'}}>
                    <div style={{marginLeft: '50px'}}>105 <span style={{color:'var(--color-secondary)'}}>views</span></div>
                    <div style={{marginLeft: '18px'}}>25 <span style={{color:'var(--color-secondary)'}}>followers</span></div>
                  </div>
                  <div style={{marginLeft: '50px', display:'flex', gap:'20px', alignItems: 'center'}}>
                    <button className={styles.socialButton}>
                      <Image src={'/twitter.svg'} width='21px' height='21px'></Image>
                    </button>
                    <button className={styles.socialButton}>
                      <Image src={'/linkedin.svg'} width='21px' height='21px'></Image>
                    </button>
                    <button className={styles.socialButton}>
                      <Image src={'/telegram.svg'} width='17px' height='21px'></Image>
                    </button>
                  </div>
                </div>
              </div>
              <span className="fs-18" style={{ fontWeight: "semi-bold" }}>
                {addressdata.description}
              </span>
              <p className="fs-35" style={{ fontWeight: "bold" }}>
                Statistics
              </p>
              <p className="fs-13" style={{ fontWeight: "semi-bold" }}>
                todo
              </p>
              <p className="fs-35" style={{ fontWeight: "bold" }}>
                Benefit/Loss Curve
              </p>
              <p className="fs-13" style={{ fontWeight: "semi-bold" }}>
                todo
              </p>
              <p className="fs-35" style={{ fontWeight: "bold" }}>
                His/Her Vaults
              </p>
              <p className="fs-13" style={{ fontWeight: "semi-bold" }}>
                todo
              </p>
              <p className="fs-35" style={{ fontWeight: "bold" }}>
                Feedbacks
              </p>
              <p className="fs-13" style={{ fontWeight: "semi-bold" }}>
                todo
              </p>
            </>
          ) : (
            <>
              <Formik
                initialValues={{
                  name: addressdata.name,
                  description: addressdata.description,
                }}
                innerRef={formRef}
                onSubmit={(values, actions) => {
                  // on submit form
                  setTimeout(() => {
                    console.log(actions);
                    alert(JSON.stringify(values, null, 8));
                    actions.setSubmitting(false);
                    setEditMode(false);
                  }, 100);
                }}
              >
                {(props) => (
                  <Form>
                    <Flex direction={"column"} gap={"20px"}>
                      <Field name="name" validate={validateName}>
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={form.errors.name && form.touched.name}
                            isRequired
                          >
                            <FormLabel htmlFor="name">Name</FormLabel>
                            <Input {...field} id="name" placeholder="name" />
                            <FormErrorMessage>
                              {form.errors.name}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <Field name="description">
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={
                              form.errors.description &&
                              form.touched.description
                            }
                            isRequired
                          >
                            <FormLabel htmlFor="description">
                              Description
                            </FormLabel>
                            <Input
                              {...field}
                              id="description"
                              placeholder="description"
                            />
                          </FormControl>
                        )}
                      </Field>
                    </Flex>
                    {/* <Button
                mt={4}
                colorScheme="teal"
                isLoading={props.isSubmitting}
                type="submit"
              >
                Submit
              </Button> */}
                  </Form>
                )}
              </Formik>
            </>
          )}
        </div>

        {!editMode && (
          <div className={`${styles.vaultContainer}`}>
            <div className={`${styles.vaultCard}`}>
              <div>
                <div className="fs-32 fw-600">Vault Under Management</div>
                {VAULT_UNDER_MANAGEMENT.slice(0, 2).map((vault, index) => (
                  <div className={`${styles.vaultCardDetail}`}>
                    <FakeImage
                      width="60px"
                      height="60px"
                      fillColor="#0D0C1D"
                      borderRadius="50%"
                    ></FakeImage>
                    <div>{vault.name}</div>
                    <div style={{ marginLeft: "auto" }}>{vault.percentage}</div>
                  </div>
                ))}
              </div>
              <button
                data-color="secondary"
                style={{ width: "130px", alignSelf: "flex-end" }}
              >
                See All
              </button>
            </div>
            <div className={`${styles.vaultCard}`}>
              <div>
                <div className="fs-32 fw-600">Vault Exposed</div>
                {VAULT_EXPOSED.slice(0, 2).map((vault, index) => (
                  <div className={`${styles.vaultCardDetail}`}>
                    <FakeImage
                      width="60px"
                      height="60px"
                      fillColor="#0D0C1D"
                      borderRadius="50%"
                    ></FakeImage>
                    <div>{vault.name}</div>
                    <div style={{ marginLeft: "auto" }}>{vault.percentage}</div>
                  </div>
                ))}
              </div>
              <button
                data-color="secondary"
                style={{ width: "130px", alignSelf: "flex-end" }}
              >
                See All
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default vault;
