import React, { useState } from "react";
import { Text, Flex, Button } from "@chakra-ui/react";
import { Amm, AmmAction } from "~/types";

type Props = {
  amm: Amm;
  action: AmmAction;
};

export default function AmmActionModal({ amm, action }: Props) {
  return (
    <Flex direction="column">
      <Text>{amm.title}:</Text>
      <Flex justifyContent="space-between"></Flex>
    </Flex>
  );
}
