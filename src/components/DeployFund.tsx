

import React, { useEffect, useState } from "react";
import { useContractFactory } from "~/hooks/deploy";
import TargetSource from "../abi/Vault.json";
import {
    Abi,
    CompiledContract,
    json,
} from "starknet";
import {
    useStarknet,
} from "@starknet-react/core";


export function DeployFund() {
    const { library } = useStarknet();

    const [deployedVaultAddress, setDeployedVaultAddress] =
        useState<string>("");

    const [deployedVaultHash, setDeployedVaultHash] =
        useState<string | undefined>("");

    const [compiledTarget, setCompiledTarget] = useState<CompiledContract>();

    const [txAccepted, settxAccepted] = useState(0);


    const { deploy: deployTarget } = useContractFactory({
        compiledContract: compiledTarget,
        abi: TargetSource as Abi,
    });


    useEffect(() => {
        if (!compiledTarget) {
            getCompiledVault().then(setCompiledTarget);
        }
    }, []);

    const getCompiledVault = async () => {
        // Can't import the JSON directly due to a bug in StarkNet: https://github.com/0xs34n/starknet.js/issues/104
        // (even if the issue is closed, the underlying Starknet issue remains)
        const raw = await fetch("/Vault.json");
        const compiled = json.parse(await raw.text());
        return compiled;
    };

    const onDeploy = async () => {
        const _deployTarget = async () => {
            const deployment = await deployTarget({
                constructorCalldata: [2, 3],
            });
            if (deployment) {
                setDeployedVaultAddress(deployment.address);
                setDeployedVaultHash(deployment.deployTransactionHash)
                await library.waitForTransaction(deployment.deployTransactionHash).then(() => settxAccepted(1));
            }
        };
        console.log("deploying")

        await _deployTarget();
    };


    const targetLink =
        "https://goerli.voyager.online/contract/" + deployedVaultAddress;

    const targetLink2 =
        "https://goerli.voyager.online/tx/" + deployedVaultHash;

    return (
        <div>
            <div>
                <button onClick={onDeploy}>Deploy Vault</button>
                <div>
                    {deployedVaultAddress && (
                        <div>
                            Vault contract:{" "}
                            <a href={targetLink} target="_blank">
                                {deployedVaultAddress}
                            </a>
                        </div>

                    )}
                    {deployedVaultHash && (
                        <div>
                            TX:{" "}
                            <a href={targetLink2} target="_blank">
                                {deployedVaultHash}
                            </a>
                        </div>

                    )}
                    <div>
                        {txAccepted ? (<div>
                            Accepted on L2 </div>) : <div>Waiting for Tx to be Accepted on Starknet</div>}
                    </div>
                </div>
            </div>
        </div>
    );
}