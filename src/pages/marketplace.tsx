import React, { useEffect } from 'react';
import { NextPage } from 'next';
import Link from 'next/link'
import styles from '~/styles/vault.module.scss';
import { useAppSelector } from '../app/hooks'
import {
  selectCount,
} from '../app/counterSlice'
import { Select, Button, ButtonGroup, SimpleGrid , Box, Flex, Text } from '@chakra-ui/react'

import { _DeepPartialObject } from 'chart.js/types/utils';


import VDatabase from "./vault/vaults.json";

const vault: NextPage = () => {
  let count = useAppSelector(selectCount)

  
  return (<>
    <Box padding={"4vw"}>
      <Flex direction={"column"} gap={"5vh"}>
      <Text fontSize={"4xl"} fontWeight={"bold"}> Marketplace</Text>

      
      <SimpleGrid columns={3} spacing={10}>
        {
          Object.keys(VDatabase).map((key, index) => (
            <>
              {(key !== "default") &&
                <Box className='bg__dotted' style={{borderRadius:"10px"}} key={index}>
                  <div style={{width:"100%", display:"flex", alignItems:"center"}}>
                    <div style={{width:"25%", float: "left"}}>
                      <div style={{width:"60px", height:"60px", margin:"10px", borderRadius:"50%", background:"black"}}></div>
                    </div>
                    <div style={{width:"40%", float: "left"}}>
                      <p>Name</p>
                      <p>User</p>
                    </div>
                    <div  style={{width:"35%", float: "left"}}>
                    <Link href={"/vault/"+key}><button  className='fs-20' style={{ fontWeight: "600", background: "#F6643C", borderRadius: "10px", padding: "6px 10px" }}>open</button></Link>
                    </div>
                  </div>
                  <div style={{width:"100%", display:"flex", alignItems:"center"}}>
                    <div style={{width:"60%", float: "left", paddingLeft: "10px"}}>
                      <p>Value Managed :</p>
                      <p>Risk Factor :</p>
                    </div>
                    <div style={{width:"40%", float: "left"}}>
                      <p>APR :</p>
                      <p>REWARDS :</p>
                    </div>
                  </div>
                  <div style={{width:"100%", display:"flex", alignItems:"center"}}>
                    {[...Array(Object.keys(VDatabase[key].tags).length)].map((e, i) => {
                      return (
                        <span className='fs-12' style={{ fontWeight: "600", background: "#F6643C", borderRadius: "10px", padding: "6px 10px" , margin: "10px" }}>{"#" + VDatabase[key].tags[i]}</span>
                      )
                    })}
                  </div>
                </Box>
              }
            </>
          ))
        }
      </SimpleGrid >
      </Flex>
    </Box>
  </>)
}

export default vault