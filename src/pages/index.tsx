import { useStarknetCall } from "@starknet-react/core";
import type { NextPage } from "next";
import { useMemo } from "react";
import { toBN, hexToDecimalString } from "starknet/dist/utils/number";
import { TransactionList } from "~/components/TransactionList";
import { InitializeFund } from "~/components/InitializeFund";
import { useVaultContract } from "~/hooks/vault";
import { getSelectorFromName } from "../starknetWrapper";
import clientPromise from "../lib/mongodb";
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

import VDatabase from "./vault/vaults.json";

const Home: NextPage = () => {

  return (
    <Box margin={"auto"} paddingTop={"5%"}>
      <Flex
        direction={"row"}
        flexWrap={"wrap"}
        width={"100%"}
        justifyContent={"space-evenly"}

      >
        <Flex direction={"column"} gap={"8vh"} width={"45%"}>
          <Text fontWeight={"bold"} fontSize={"35px"} textAlign={"center"}>Discover and Create Extraordinary DeFi strategies</Text>

          <Flex direction={"row"} justifyContent={"space-evenly"} alignItems={"center"}>
            <Flex gap={"1vh"} direction={"column"} width={"42%"} alignItems={"center"}>
              <Text fontSize={"25px"} fontWeight={"semibold"}>
                You Busy?<br></br>
              </Text>
              <Text fontSize={"13px"} textAlign={"center"}>
                get connected with qualificated asset managers, save both time and money {getSelectorFromName("addLiquidity")}
              </Text>
              <Button backgroundColor={"#f6643c"} width={"120px"}>
                <Link href={`/marketplace`} padding={"10px"}>


                  <Text fontWeight={"bold"}>Explore</Text>

                </Link>
              </Button>
            </Flex>
            <Flex gap={"1vh"} direction={"column"} width={"42%"} alignItems={"center"}>
              <Text fontSize={"25px"} fontWeight={"semibold"}>
                You Pro?<br></br>
              </Text>
              <Text fontSize={"13px"} textAlign={"center"}>
                Deploy a new Fund and monetize your investment strategy
              </Text>
              <Button backgroundColor={"#f6643c"} width={"120px"}>
                <Link href={`/contract`} padding={"10px"}>

                  <Text fontWeight={"bold"}>Create</Text>

                </Link>
              </Button>

            </Flex>
          </Flex>

        </Flex>
        <Link href={"/vault/"}>
          <Box
            className={` bg__dotted`}
            padding={"10px"}
            style={{ borderRadius: "10px" }}
          >
            <Box
              backgroundColor={"#0f0b1f"}
              style={{ borderRadius: "10px" }}
              borderTop={"solid 2px #f6643c"}
              borderBottom={"solid 2px #f6643c"}
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
                  <Text fontSize={"2xl"} fontWeight={"bold"}>
                    FlexFund
                  </Text>
                  <Flex gap={"3px"}>
                    {[
                      ...Array(
                        Object.keys(VDatabase["0x738bb79798127c6d026013b4067a20694a091ddde9b69e36b0a384c9b94610f"].tags).length
                      ),
                    ].map((e, i) => {
                      return (
                        <Text
                          fontSize={"0.8rem"}
                          fontWeight={"light"}
                        >
                          {"#" + VDatabase["0x738bb79798127c6d026013b4067a20694a091ddde9b69e36b0a384c9b94610f"].tags[i]}
                        </Text>
                      );
                    })}
                  </Flex>
                </div>
                <div style={{ width: "35%", float: "left" }}></div>
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
            </Box>
          </Box>
        </Link>
      </Flex>
    </Box>
  );
};

export default Home;
