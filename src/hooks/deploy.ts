import {
    useStarknet,
    useStarknetTransactionManager,
} from "@starknet-react/core";
import { useCallback, useEffect, useState } from "react";
import {
    Abi,
    CompiledContract,
    Contract,
    ContractFactory,
    Provider,
    RawCalldata,
} from "starknet";
import { BigNumberish } from "starknet/dist/utils/number";

interface UseContractFactoryArgs {
    compiledContract?: CompiledContract;
    abi?: Abi;
}

interface DeployArgs {
    constructorCalldata: RawCalldata;
    addressSalt?: BigNumberish;
}

interface UseContractFactory {
    factory?: ContractFactory;
    deploy: ({
        constructorCalldata,
        addressSalt,
    }: DeployArgs) => Promise<Contract | undefined>;
    contract?: Contract;
}

export function useContractFactory({
    compiledContract,
    abi,
}: UseContractFactoryArgs): UseContractFactory {
    const { library } = useStarknet();
    const { addTransaction } = useStarknetTransactionManager();
    const [factory, setFactory] = useState<ContractFactory | undefined>();
    const [contract, setContract] = useState<Contract | undefined>();

    useEffect(() => {
        if (compiledContract) {
            setFactory(
                new ContractFactory(compiledContract, library, abi)
            );
        }
    }, [compiledContract, library, abi]);

    const deploy = useCallback(
        async ({ constructorCalldata, addressSalt }: DeployArgs) => {
            console.log(factory)
            console.log(constructorCalldata)
            console.log(addressSalt)
            if (factory) {
                console.log("facory is here")
                const contract = await factory.deploy(constructorCalldata, addressSalt);
                addTransaction({
                    status: "TRANSACTION_RECEIVED",
                    transactionHash: contract.deployTransactionHash ?? "",
                });
                setContract(contract);
                return contract;
            }
           
            return undefined;
        },
        [factory]
    );

    return { factory, contract, deploy };
}