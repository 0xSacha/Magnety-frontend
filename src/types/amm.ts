export enum AmmAction {
  Swap = "Swap",
  AddLiquidity = "Add Liquidity",
  RemoveLiquidity = "Remove Liquidity",
}

export type Amm = {
  title: string;
  actions: AmmAction[];
};
