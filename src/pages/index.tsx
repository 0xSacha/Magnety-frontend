import { useStarknetCall } from "@starknet-react/core";
import type { NextPage } from "next";
import Link from "next/link";
import { useMemo } from "react";
import { toBN, hexToDecimalString } from "starknet/dist/utils/number";
import { TransactionList } from "~/components/TransactionList";
import { useCounterContract } from "~/hooks/counter";
import { InitializeFund } from "~/components/InitializeFund";
import { useVaultContract } from "~/hooks/vault";
import { getSelectorFromName } from "../starknetWrapper";

const Home: NextPage = () => {
  const { contract: counter } = useCounterContract();
  const { contract: vaultLib } = useVaultContract();

  const { data: counterResult } = useStarknetCall({
    contract: counter,
    method: "counter",
    args: [],
  });

  const { data: fundName } = useStarknetCall({
    contract: vaultLib,
    method: "getName",
    args: [],
  });

  const fundNameVaue = useMemo(() => {
    if (fundName && fundName.length > 0) {
      const value = toBN(fundName[0]);
      return value.toString(10);
    }
  }, [fundName]);

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
      const value = toBN(counterResult[0]);
      return value.toString(10);
    }
  }, [counterResult]);

  return (
    <div>
      <h2>Wallet</h2>
      <h2>Counter Contract</h2>
      <p>Address: {counter?.address}</p>
      <p>Value: {counterValue}</p>
      {/* <IncrementCounter /> */}
      <InitializeFund />
      <h2>VaultLib Contract</h2>
      <p>Address: {vaultLib?.address}</p>
      <p>0x02fe94b72a6eee4b24da419ba898ca2b0d994b6d0408ce93f53129f6f9df3f25</p>
      <p>
        {hexToDecimalString(
          "0x02fe94b72a6eee4b24da419ba898ca2b0d994b6d0408ce93f53129f6f9df3f25"
        )}
      </p>
      <p>fund Name: {fundNameVaue}</p>
      <h2>selector of runPreLogic {getSelectorFromName("runPreLogic")}</h2>
      <h2>
        selector of removeLiquidity {getSelectorFromName("removeLiquidity")}
      </h2>
      <h2>
        selector of swapExactTokensForTokens{" "}
        {getSelectorFromName("swapExactTokensForTokens")}
      </h2>
      <h2>selector of swap {getSelectorFromName("swap")}</h2>
      <h2>selector of swap {getSelectorFromName("swap")}</h2>
      <h2>Recent Transactions</h2>
      <TransactionList />
      {/* <DeployFund /> */}
    </div>
  );
};

export default Home;
