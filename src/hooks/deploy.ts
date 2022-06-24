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
        async ({ constructorCalldata }: DeployArgs) => {
            console.log(compiledContract)

            if (compiledContract) {

                const factory2: ContractFactory = new ContractFactory(compiledContract, library, abi)


                console.log(factory2)

                if (factory) {
                    console.log("facory is here")
                    const contract = await factory.deploy(constructorCalldata);
                    addTransaction({
                        status: "TRANSACTION_RECEIVED",
                        transactionHash: contract.deployTransactionHash ?? "",
                    });
                    setContract(contract);
                    return contract;
                }
            }
            return undefined;
        },
        [factory]
    );

    return { factory, contract, deploy };
}