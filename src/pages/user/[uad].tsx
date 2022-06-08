import React, { useEffect } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router'
import styles from '~/styles/vault.module.scss';
import { useAppSelector } from '../../app/hooks'
import {
  selectCount,
} from '../../app/counterSlice'
import UDatabase from "./users.json"



const vault: NextPage = () => {
  let count = useAppSelector(selectCount)

  const router = useRouter()
  var { uad } = router.query
  var addressdata = UDatabase["default"];
  if (uad !== undefined) {
    /* uad = AssetManager ... to find */
    addressdata = UDatabase[String(uad)];
  }
  else{
    uad = "0xABCDEDFGHIJKLM"
  }


  

  return (<>
    <div className={`${styles.pageContainer}`}>
      <span className='fs-35' style={{ fontWeight: "bold" }}>Profile of {addressdata.name}</span>
      <div className='bg__dotted' style={{ borderRadius: "15px", padding: "4px 6px" }}>
        <div style={{ height: "160px", borderRadius: "15px 15px 0 0", backgroundColor: "black", backgroundImage: `url(${addressdata.banner})`, backgroundSize: "cover", backgroundPosition: "center bottom" }} />
        <div style={{ height: "180px", width: "180px", marginLeft: `calc(50% - 90px)`, marginTop: "-90px", borderRadius: "50%", backgroundColor: "orange", backgroundImage: `url(${addressdata.photo_link})`, backgroundSize: "cover", backgroundPosition: "center bottom" }}/>
        <div style={{ display: "table", clear: "both", width: "100%", marginTop: "-90px" }}>
          <div style={{ width: `calc(50% + 90px)`, float: "left" }}>
            <p className='fs-35' style={{ fontWeight: "bold" }}>{addressdata.name}</p>
            <p className='fs-15' style={{ fontWeight: "semi-bold" }}>{uad.slice(0, 4) + "..." + uad.slice(-4)}</p>
            <p className='fs-16'>Last active : TODO </p>
          </div>
          <div style={{ width: `calc(50% - 90px)`, float: "left", paddingTop: "9px", paddingLeft: "15px" }}>
            <p className='fs-13' style={{ fontWeight: "semi-bold" }}>Views</p>
            <p className='fs-13' style={{ fontWeight: "semi-bold" }}>Followers</p>
          </div>
        </div>
        <span className='fs-18' style={{ fontWeight: "semi-bold" }}>{addressdata.description}</span>
        <p className='fs-35' style={{ fontWeight: "bold" }}>Statistics</p>
        <p className='fs-13' style={{ fontWeight: "semi-bold" }}>todo</p>
        <p className='fs-35' style={{ fontWeight: "bold" }}>Benefit/Loss Curve</p>
        <p className='fs-13' style={{ fontWeight: "semi-bold" }}>todo</p>
        <p className='fs-35' style={{ fontWeight: "bold" }}>His/Her Vaults</p>
        <p className='fs-13' style={{ fontWeight: "semi-bold" }}>todo</p>
        <p className='fs-35' style={{ fontWeight: "bold" }}>Feedbacks</p>
        <p className='fs-13' style={{ fontWeight: "semi-bold" }}>todo</p>
      </div>
    </div>
  </>)
}

export default vault