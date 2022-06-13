import React, { Ref, useEffect, useRef, useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import styles from "~/styles/vault.module.scss";
import { useAppSelector } from "../../app/hooks";
import { selectCount } from "../../app/counterSlice";
import UDatabase from "./users.json";
import FakeImage from "~/components/FakeImage";
import { getStarknet } from "../../starknetWrapper";
import { UserInfo } from "../../utils/type";
import Image from "next/image";
import ImageUpload from "~/components/FileUpload";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Link,
  Text,
} from "@chakra-ui/react";
import { Field, Form, Formik, FormikProps } from "formik";
import { string } from "yup";
// import { userInfo } from "os";

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

interface UserPageProps {
  user: UserInfo;
}

function UserPage(props: UserPageProps) {
  const [userInfo, setUserInfo] = useState<UserInfo>(props.user);
  let count = useAppSelector(selectCount);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [acccountAddress, setAcccountAddress] =
    React.useState<string>("acccountAddress");
  const [accountUserPage, setAccountUserPage] = React.useState<
    string | string[]
  >();
  console.log(props);
  const router = useRouter();
  const userAddress = router.query.uad;

  let formRef =
    React.createRef<
      FormikProps<{
        name: string;
        description: string;
        twitter: string;
        linkedin: string;
        telegram: string;
        coverImage: string;
        profilePic: string;
      }>
    >();

  function validateName(value) {
    let error;
    if (!value) {
      error = "Name is required";
    } else if (value.length > 15) {
      error = "too long 😱";
    }
    return error;
  }

  function validateDescription(value) {
    let error;
    if (!value) {
      error = "Name is required";
    } else if (value.length > 70) {
      error = "too long 😱";
    }
    return error;
  }

  const handleSubmit = () => {
    if (formRef.current) {
      formRef.current.handleSubmit();
    }
  };

  useEffect(() => {
    const { account } = getStarknet();
    if (account.address != "") {
      setAcccountAddress(account.address);
    }
  }, [count]);

  return (
    <>
      <div className={`${styles.pageContainer}`}>
        <div
          className="bg__dotted"
          style={{
            borderRadius: "15px",
            padding: "4px 6px 40px 5px",
            position: "relative",
          }}
        >
          <Box
            style={{
              height: "160px",
              borderRadius: "15px 15px 0 0",
              backgroundColor: "black",
              backgroundSize: "cover",
              backgroundPosition: "center bottom",
            }}
          >
            <img src={props.user.coverImage} style={{ objectFit: "cover" }} />
          </Box>

          {acccountAddress == userInfo.userAddress && (
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
          )}
          <Box
            style={{
              height: "180px",
              width: "180px",
              marginLeft: `calc(50% - 90px)`,
              marginTop: "-90px",
              borderRadius: "50%",
              backgroundColor: "orange",
              backgroundSize: "cover",
              backgroundPosition: "center bottom",
            }}
          >
            <img src={props.user.profilePic} style={{ objectFit: "cover" }} />
          </Box>

          {!editMode ? (
            <>
              <div
                style={{
                  display: "table",
                  clear: "both",
                  width: "100%",
                  marginTop: "-70px",
                }}
              >
                <Flex
                  width={"calc(50% + 90px)"}
                  float={"left"}
                  direction={"column"}
                >
                  <Flex direction={"row"} gap={"12px"} alignItems={"center"}>
                    <p
                      className="fs-35"
                      style={{ fontWeight: "bold", marginLeft: "2vw" }}
                    >
                      {userInfo.name}
                    </p>
                    <Button
                      width={"100px"}
                      marginLeft={"2vw"}
                      background={"transparent"}
                    >
                      <Link
                        href={`https://goerli.voyager.online/contract/${userInfo.userAddress}`}
                      >
                        <p className="fs-20" style={{ fontWeight: "light" }}>
                          {userInfo.userAddress.slice(0, 4) +
                            "..." +
                            userInfo.userAddress.slice(-4)}
                        </p>
                      </Link>
                    </Button>
                  </Flex>

                  <span
                    className="fs-18"
                    style={{
                      fontWeight: "semi-bold",
                      marginLeft: "2vw",
                      marginTop: "1vw",
                    }}
                  >
                    {userInfo.description}
                  </span>
                </Flex>
                <div
                  style={{
                    width: `calc(50% - 90px)`,
                    float: "left",
                    paddingTop: "9px",
                    paddingLeft: "15px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  <div className="fw-500" style={{ display: "flex" }}>
                    <div style={{ marginLeft: "50px" }}>
                      --{" "}
                      <span style={{ color: "var(--color-secondary)" }}>
                        views
                      </span>
                    </div>
                    <div style={{ marginLeft: "18px" }}>
                      --{" "}
                      <span style={{ color: "var(--color-secondary)" }}>
                        followers
                      </span>
                    </div>
                  </div>
                  <div
                    style={{
                      marginLeft: "50px",
                      display: "flex",
                      gap: "20px",
                      alignItems: "center",
                    }}
                  >
                    <button className={styles.socialButton}>
                      <Link href={`${userInfo.twitter}`}>
                        <Image
                          src={"/twitter.svg"}
                          width="21px"
                          height="21px"
                        ></Image>
                      </Link>
                    </button>
                    <button className={styles.socialButton}>
                      <Link href={`${userInfo.linkedin}`}>
                        <Image
                          src={"/linkedin.svg"}
                          width="21px"
                          height="21px"
                        ></Image>
                      </Link>
                    </button>
                    <button className={styles.socialButton}>
                      <Link href={`${userInfo.telegram}`}>
                        <Image
                          src={"/telegram.svg"}
                          width="17px"
                          height="21px"
                        ></Image>
                      </Link>
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <Formik
                initialValues={{
                  name: userInfo.name ? userInfo.name : "George Soros",
                  description: userInfo.description
                    ? userInfo.description
                    : "currently president of Soros Fund Management, based in New York, I have $25 billion for myself, my family and my foundations",
                  linkedin: "",
                  telegram: "",
                  twitter: "",
                  profilePic: userInfo.profilePic ? userInfo.profilePic : "",
                  coverImage: userInfo.coverImage ? userInfo.coverImage : "",
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
                      <Field name="description" validate={validateDescription}>
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
                      <Field name="twitter">
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={
                              form.errors.twitter && form.touched.twitter
                            }
                          >
                            <FormLabel htmlFor="twitter">twitter</FormLabel>
                            <Input
                              {...field}
                              id="twitter"
                              placeholder="twitter"
                            />
                          </FormControl>
                        )}
                      </Field>
                      <Field name="linkedin">
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={
                              form.errors.linkedin && form.touched.linkedin
                            }
                          >
                            <FormLabel htmlFor="linkedin">linkedin</FormLabel>
                            <Input
                              {...field}
                              id="linkedin"
                              placeholder="linkedin"
                            />
                          </FormControl>
                        )}
                      </Field>
                      <Field name="telegram">
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={
                              form.errors.telegram && form.touched.telegram
                            }
                          >
                            <FormLabel htmlFor="telegram">telegram</FormLabel>
                            <Input
                              {...field}
                              id="telegram"
                              placeholder="telegram"
                            />
                          </FormControl>
                        )}
                      </Field>
                      <Text fontWeight={"bold"}>Profile Pic </Text>
                      <Flex direction={"row"} gap={"50px"}>
                        <div style={{ width: "120px", height: "120px" }}>
                          <ImageUpload
                            onUpload={(image) => {
                              props.setFieldValue("profilePic", image);
                            }}
                          />
                        </div>

                        <Box
                          style={{
                            width: "120px",
                            height: "120px",
                            borderRadius: "50%",
                            overflow: "hidden",
                            backgroundColor: "black",
                          }}
                        >
                          <img
                            src={props.values.profilePic}
                            style={{ objectFit: "cover" }}
                          />
                        </Box>
                      </Flex>
                      <Text fontWeight={"bold"}>Cover Image </Text>
                      <Flex direction={"row"} gap={"50px"}>
                        <div style={{ width: "120px", height: "120px" }}>
                          <ImageUpload
                            onUpload={(image) => {
                              props.setFieldValue("coverImage", image);
                            }}
                          />
                        </div>

                        <Box
                          style={{
                            width: "900px",
                            height: "150px",
                            borderRadius: "15px 15px 0 0",
                            overflow: "hidden",
                            backgroundColor: "black",
                          }}
                        >
                          <img
                            src={props.values.coverImage}
                            style={{ objectFit: "cover" }}
                          />
                        </Box>
                      </Flex>
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
                <div className="fs-32 fw-600">Funds under Management</div>
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
            </div>
            <div className={`${styles.vaultCard}`}>
              <div>
                <div className="fs-32 fw-600">Shares owned</div>
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
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default UserPage;

export async function getServerSideProps(context: any) {
  // fetch the todo, the param was received via context.query.id
  const res = await fetch(
    "http://localhost:3000/api/user/" + context.query.uad
  );
  const user = await res.json();

  //return the serverSideProps the todo and the url from out env variables for frontend api calls
  return { props: { user } };
}
