import { useStarknetCall } from '@starknet-react/core'
import type { NextPage } from 'next'
import { useMemo } from 'react'
import { toBN } from 'starknet/dist/utils/number'
import { ConnectWallet } from '~/components/ConnectWallet'
import { DeployFund } from '~/components/DeployFund'
import { IncrementCounter } from '~/components/IncrementCounter'
import { TransactionList } from '~/components/TransactionList'
import { useCounterContract } from '~/hooks/counter'
import { useVaultLibContract } from '~/hooks/vaultLib'




const Home: NextPage = () => {
  const { contract: counter } = useCounterContract()
  const { contract: vaultLib } = useVaultLibContract()

  const { data: counterResult } = useStarknetCall({
    contract: counter,
    method: 'counter',
    args: [],
  })

  const { data: fundName } = useStarknetCall({
    contract: vaultLib,
    method: 'getName',
    args: [],
  })

  const fundNameVaue = useMemo(() => {
    if (fundName && fundName.length > 0) {
      const value = toBN(fundName[0])
      return value.toString(10)
    }
  }, [fundName])

  // const { data: sharesTotalSupply } = useStarknetCall({
  //   contract: vaultLib,
  //   method: 'sharesTotalSupply',
  //   args: [],
  // })

  // const sharesTotalSupplyValue = useMemo(() => {
  //   if (sharesTotalSupply && sharesTotalSupply.length > 0) {
  //     const value = toBN(counterResult[0])
  //     return value.toString(10)
  //   }
  // }, [sharesTotalSupply])

  const counterValue = useMemo(() => {
    if (counterResult && counterResult.length > 0) {
      const value = toBN(counterResult[0])
      return value.toString(10)
    }
  }, [counterResult])

  return (
    <div>
      <h2>Wallet</h2>
      <ConnectWallet />
      <h2>Counter Contract</h2>
      <p>Address: {counter?.address}</p>
      <p>Value: {counterValue}</p>
      <IncrementCounter />
      <h2>VaultLib Contract</h2>
      <p>Address: {vaultLib?.address}</p>
      <p>fund Name: {fundNameVaue}</p>
      <h2>Recent Transactions</h2>
      <TransactionList />
      <DeployFund />

    </div>
  )
}

export default Home
