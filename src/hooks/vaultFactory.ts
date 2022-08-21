import { useContract } from '@starknet-react/core'
import { Abi } from 'starknet'

import vaultFactoryAbi from '~/abi/VaultFactory.json'

export function useVaultFactoryContract() {
    return useContract({
        abi: vaultFactoryAbi as Abi,
        address: '0x07e16969f27d6d968043d3a7e5dd4739f4895f5be397fac0fc204504efb203b0',
    })
}
