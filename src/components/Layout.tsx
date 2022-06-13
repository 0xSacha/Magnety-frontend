import React, { PropsWithChildren, useEffect, useState } from "react";
import Navbar from "./Navbar";
import { getStarknet } from '../starknetWrapper'
import { useAppSelector, useAppDispatch } from '../app/hooks'
import {
  setAccount,
  selectCount,
  increment,
} from '../app/counterSlice'
import { IncrementCounter } from "./IncrementCounter";
import Profile from "./Profile";
import Image from "next/image";
import {
  Button,
  ButtonGroup,
  Flex,
  Text,
  Input,
  Select,
  Box,
} from "@chakra-ui/react";
import { starknetKeccak } from "starknet/dist/utils/hash";
import Link from "next/link";

import Twitter from "../image/twitter.svg"
import Discord from "../image/discord.svg"
import Linkedin from "../image/linkedin.svg"
import Medium from "../image/medium.svg"
import Notion from "../image/notion.svg"


const Layout = (props: PropsWithChildren<unknown>) => {
  const dispatch = useAppDispatch()
  let count = useAppSelector(selectCount)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  let [address, setAddress] = useState("connect wallet");


  useEffect(() => {
    const connectWalletOnPageLoad = async () => {
      if (localStorage?.getItem('isWalletConnected') === 'true') {
        onClick()
      }
    }
    // localStorage.setItem('isWalletConnected', "false")
    connectWalletOnPageLoad()
  }, [])

  const onClick = () => {
    const starkNet = getStarknet()
    let mod = true
    if (localStorage?.getItem('isWalletConnected') === 'true') {
      mod = false
    }
    starkNet.enable({ showModal: mod }).then(value => {

      if (value.length == 0) {
        console.log("no address detected")
      }
      else {
        setAddress(value[0])
        localStorage.setItem('isWalletConnected', "true")
        dispatch(increment())
        setIsConnected(true)
      }
    })
  }

  function ConnectWallet() {

    return (
      <div className="App">
        <button data-color="secondary" style={{ display: 'flex', margin: '12px auto' }} onClick={onClick}> connect</button>
      </div>
    );
  }


  return (
    <>
      <div className="page">
        <Navbar />
        <div className="page__wrapper">
          <div className="page__backdrop" />
          <div className="page__content">{props.children}</div>
        </div>
        <div
          className={`page__sidebar_wrapper ${isSidebarOpen ? "page__sidebar_open" : ""
            }`}
        >
          <div className="page__sidebar">
            {!isSidebarOpen && !isConnected && 
              <Flex direction={"column"} gap={"2vh"} >
                <Flex direction={"column"} textAlign="center" gap={"2vh"}>
                <Text fontWeight={"bold"} fontSize={"1xl"}>
                  Welcome to Magnety
                </Text>
                <Text fontWeight={"light"} fontSize={"0.75rem"}>
                please connect you wallet to access the full fonctionnalities
                </Text>
                </Flex>
                <ConnectWallet />
              </Flex>
            }
            {!isSidebarOpen && isConnected && <>

              <Flex direction={"column"} gap={"2vh"} alignItems={"center"}>
                <Flex direction={"column"} textAlign="center" gap={"2vh"}>
                <Text fontWeight={"bold"} fontSize={"1xl"}>
                  Welcome to Magnety
                </Text>
                <Text fontWeight={"light"} fontSize={"0.75rem"}>
                This is your first connection, customize your profile now! </Text>
            
                </Flex>
                <Button>
                <Link href={`/user/${address}`}><Box backgroundColor={"#f6643c"} padding={"0.8vh"} borderRadius={"10px"} alignItems={"center"}><Text fontWeight={"bold"}>My profile</Text>

                </Box>
                </Link>
                </Button>
                
              </Flex>

          

            </>}
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: "10px",
                right: "10px",
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                margin: '20px 0'
              }}>
                <Flex direction={"row"} justifyContent={"space-between"}>
                  <button className="social_button">
                    <Image src={Twitter} width='21px' height='21px'></Image>
                  </button>
                  <button className="social_button">
                    <Image src={Linkedin} width='21px' height='21px'></Image>
                  </button>
                  <button className="social_button">
                    <Image src={Notion} width='17px' height='21px'></Image>
                  </button>
                  <button className="social_button">
                    <Image src={Discord} width='21px' height='21px'></Image>
                  </button>
                  <button className="social_button">
                    <Image src={Medium} width='21px' height='21px'></Image>
                  </button>
                </Flex>
                <div className="fs-12 text-center">© 2022 - Magnety - All Rights Reserved</div>
                <div className="fs-12 text-center">Terms & conditions</div>
              </div>

            {/* {
              isSidebarOpen && <>
                  <Profile></Profile>
              </>
            } */}
          </div>
          
          {/* <div className="page__sidebar_toggler">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
            </button>
            {!isSidebarOpen && <>Expand to edit and see all your personnal informations</>}
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Layout;
