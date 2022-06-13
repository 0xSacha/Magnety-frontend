import React, { useState } from "react";
import {
  Modal,
  ModalBody,
  ModalHeader,
  ModalOverlay,
  ModalCloseButton,
  ModalContent,
} from "@chakra-ui/react";
import AmmActionList from "./AmmActionList";
import { amms } from "~/registry/amm";
import { Amm, AmmAction } from "~/types";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function SwapActionSelectModal({ isOpen, onClose }: Props) {
  const [amm, setAmm] = useState<Amm | undefined>(undefined);
  const [action, setAction] = useState<AmmAction | undefined>(undefined);

  const selectAmmAction = (_amm: Amm, _action: AmmAction) => {
    setAmm(_amm);
    setAction(_action);
  };

  const handleClose = () => {
    setAmm(undefined);
    setAction(undefined);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      closeOnOverlayClick={false}
      isCentered
    >
      <ModalOverlay />
      <ModalContent>
        {amm && action ? (
          <>
            <ModalHeader>
              {action} on {amm.title}
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody></ModalBody>
          </>
        ) : (
          <>
            <ModalHeader>Choose AMM and Action</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {amms.map((_amm: Amm) => (
                <AmmActionList
                  amm={_amm}
                  onChoose={(_action) => selectAmmAction(_amm, _action)}
                />
              ))}
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
