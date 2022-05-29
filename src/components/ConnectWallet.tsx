import { getStarknet, connect } from '../starknetWrapper'
import React, { useState } from "react";


export function ConnectWallet() {
    let [address, setAddress] = useState("connect wallet");
    const onClick = () => {
        const starkNet = getStarknet()
        starkNet.enable({ showModal: true }).then(value => {
            setAddress(JSON.stringify(value))
            console.log(starkNet.account)
        })
    }

    return (
        <div className="App">
            <button data-color="secondary" style={{ display: 'flex', margin: '12px auto' }} onClick={onClick}> {address}</button>
        </div>
    );
}