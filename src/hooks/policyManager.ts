import { useContract } from "@starknet-react/core";
import { Abi } from "starknet";

import PolicyManager from "~/abi/PolicyManager.json";

export function usePolicyManagerContract() {
  return useContract({
    abi: PolicyManager as Abi,
    address:
      "0x066350da54aee782cdeda3853e6c4688bf2d9453a0c858471abdf0d6fc142b04",
  });
}
