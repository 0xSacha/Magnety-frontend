import { Amm, AmmAction } from "~/types";

export const amms: Amm[] = [
  {
    title: "Jediswap",
    actions: [
      AmmAction.Swap,
      AmmAction.AddLiquidity,
      AmmAction.RemoveLiquidity,
    ],
  },
  {
    title: "MySwap",
    actions: [
      AmmAction.Swap,
      AmmAction.AddLiquidity,
      AmmAction.RemoveLiquidity,
    ],
  },
  {
    title: "AlphaRoad Finance",
    actions: [
      AmmAction.Swap,
      AmmAction.AddLiquidity,
      AmmAction.RemoveLiquidity,
    ],
  },
];
