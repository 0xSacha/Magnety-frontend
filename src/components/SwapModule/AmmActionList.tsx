import React, { useState } from "react";
import { Text, Flex, Button } from "@chakra-ui/react";
import { Amm, AmmAction } from "~/types";

type Props = {
  amm: Amm;
  onChoose: (action: AmmAction) => void;
};

export default function AmmActionList({ amm, onChoose }: Props) {
  return (
    <Flex direction="column" mb="10px">
      <Text>{amm.title}:</Text>
      <Flex justifyContent="space-between">
        {amm.actions.map((ammAction) => (
          <Button
            mx="5px"
            onClick={() => {
              onChoose(ammAction);
            }}
          >
            {ammAction}
          </Button>
        ))}
      </Flex>
    </Flex>
  );
}
