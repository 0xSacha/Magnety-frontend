import { useContract } from '@starknet-react/core'
import { Abi } from 'starknet'

import ComptrollerAbi from '~/abi/Comptroller.json'

export function useComptrollerContract() {
    return useContract({
        abi: ComptrollerAbi as Abi,
        address: '0x008f8d553a5614491f00cf6161b57825a7cf5f3b5e908f4a22e3b0085ce27c36',
    })
}
