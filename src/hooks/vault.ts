import { useContract } from "@starknet-react/core";
import { Abi } from "starknet";

import vaultLibAbi from "~/abi/Vault.json";

export function useVaultContract() {
  return useContract({
    abi: vaultLibAbi as Abi,
    address:
      "0x02fe94b72a6eee4b24da419ba898ca2b0d994b6d0408ce93f53129f6f9df3f25",
  });
}
