import { getStarknet } from '../starknetWrapper'
import React, {  useState } from "react";


export function ConnectWallet() {
    let [address, setAddress] = useState("connect wallet");
    const onClick = () => {
        const starkNet = getStarknet()
        starkNet.enable({showModal: true}).then(value => {
          setAddress(JSON.stringify(value))
        })
    }

    return (
        <div className="App">
            <button onClick={onClick}> {address}</button>
        </div>
    );
}