import React, {useState} from 'react';
import {getContract, getProvider} from "./ChainUtils";
import {boolean} from "hardhat/internal/core/params/argumentTypes";

function useWriteHash(hashValue: any, writeComplete: any) {
    const [written, setWritten] = useState<null | boolean>(null);

    async function write() {
        setWritten(null);
        let contract = getContract();
        console.log(hashValue);
        let data = new String(hashValue);
        try {
            let tx = await contract.storeProof(data.valueOf());
            let txResponse = await tx.wait();
            if (txResponse.status !== 1) {
                alert(txResponse.message)
                setWritten(false);
            } else {
                setWritten(true);
                writeComplete();
            }
        } catch(e: any){
            alert(e.data.message)
            setWritten(false);
        }
    }

    return {
        write: write,
        render: (
            <div className="WriteHash container mx-auto px-20 ">
                <div className="lg:card-side bg-secondary shadow-xl rounded-2xl">
                    <div className="flex ...">
                        <div className="shrink">
                            <figure>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-40 w-40" fill="none" viewBox="0 0 25 25"
                                     stroke={
                                         (written === true && "green") ||
                                         (written === false && "yellow") ||
                                         "currentColor"
                                     } stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                                </svg>
                            </figure>
                        </div>
                        <div className="card-body">
                            {written !== true &&
                                <div>
                                    <h2 className="card-title font-roboto">Writing Hash to Smart Contract</h2>
                                    <p>Please follow the prompts in your browser wallet.</p>
                                </div>
                            }
                            {written === true &&
                            <div>
                                <h2 className="card-title font-roboto">Hash has been written to the Smart Contract!</h2>
                                <p>Please review the search results above.</p>
                            </div>
                            }
                        </div>
                    </div>
                    {!written &&
                        <progress className="progress"></progress>
                    }
                </div>
            </div>

        )};
}

export default useWriteHash;
