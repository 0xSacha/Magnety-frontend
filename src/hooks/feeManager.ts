import { useContract } from "@starknet-react/core";
import { Abi } from "starknet";

import FeeManagerAbi from "~/abi/FeeManager.json";

export function useFeeManagerContract() {
  return useContract({
    abi: FeeManagerAbi as Abi,
    address:
      "0x066350da54aee782cdeda3853e6c4688bf2d9453a0c858471abdf0d6fc142b04",
  });
}
