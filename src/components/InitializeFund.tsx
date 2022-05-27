import { useStarknet, useStarknetInvoke } from '@starknet-react/core'
import React from 'react'
import { useVaultFactoryContract } from '~/hooks/vaultFactory'

export function InitializeFund() {
    const { account } = useStarknet()
    const { contract: vaultFactory } = useVaultFactoryContract()
    const { invoke } = useStarknetInvoke({ contract: vaultFactory, method: 'initializeFund' })

    if (!account) {
        return null
    }

    return (
        // <div>
        //     <button onClick={() => invoke({ args: ['0x1', '0x1651', '0x150,', '0x5515', ['15', '0'], ['10', '10', '10', '10'], ['0x5515', '0x511'], [['65', '55', '55'], ['6999', '55', '55']], ['0', '10000000000000000000000000000000'], '3600', '1'] })}>InitializeFund</button>
        // </div>
        <div>
            <button onClick={() => invoke({ args: ['1', '1', '1', '1', ['1', '1'], ['1', '1', '1', '1'], ['1', '2'], [["0", "1", "2"], ["0", "1", "2"]], ['1', '1'], ['1', '1'], '1', '1'] })}>InitializeFund</button>
        </div>
        // <div>
        //     <button onClick={() => invoke({ args: [ [["0", "1", "2"], ["0", "1", "2"]] ], })}>addGlobalAllowedIntegration</button>
        // </div>
    )
}

// "inputs": [
//     {
//         "name": "_vault",
//         "type": "felt"
//     },
//     {
//         "name": "_fundName",
//         "type": "felt"
//     },
//     {
//         "name": "_fundSymbol",
//         "type": "felt"
//     },
//     {
//         "name": "_denominationAsset",
//         "type": "felt"
//     },
//     {
//         "name": "_positionLimitAmount",
//         "type": "Uint256"
//     },
//     {
//         "name": "_feeConfig_len",
//         "type": "felt"
//     },
//     {
//         "name": "_feeConfig",
//         "type": "felt*"
//     },
//     {
//         "name": "_assetList_len",
//         "type": "felt"
//     },
//     {
//         "name": "_assetList",
//         "type": "felt*"
//     },
//     {
//         "name": "_integration_len",
//         "type": "felt"
//     },
//     {
//         "name": "_integration",
//         "type": "integration*"
//     },
//     {
//         "name": "_minAmount",
//         "type": "Uint256"
//     },
//     {
//         "name": "_maxAmount",
//         "type": "Uint256"
//     },
//     {
//         "name": "_timelock",
//         "type": "felt"
//     },
//     {
//         "name": "_isPublic",
//         "type": "felt"
//     }
// ],
// "name": "initializeFund",
// "outputs": [],
// "type": "function"
// },