import React, {useState} from 'react';
import useComputeHash from "./ComputeHash";
import {getContract} from "./ChainUtils";
import {getProvider} from "./ChainUtils"

function useSearchResults(hashValue: any, writeHash: any) {
    const [blockNumber, setBlockNumber] = useState(-1);
    const [owner, setOwner] = useState("");
    const [blockTime, setBlockTime] = useState("");
    const [found, setFound] = useState<null | boolean>(null);

    async function search() {
        let contract = getContract();
        console.log(hashValue);
        var data = new String(hashValue);
        let proof = await contract.proofs(data.valueOf())
        let provider = getProvider();
        let block : any = await provider.getBlock(proof[1].toHexString())
        if (block.number > 0) {

            var date = new Date(block.timestamp * 1000);


            setBlockTime(date.getUTCFullYear() +
                '-' + date.getUTCMonth() +
                '-' + date.getUTCDay() +
                " " + date.getUTCHours() +
                ":" + date.getUTCMinutes() + " UTC");

            setBlockNumber(block.number)
            setOwner(proof[0])
            setFound(true);
        } else {
            setFound(false);
        }

    }

    return {
        search: search,
        render: (
            <div className="SearchResults container mx-auto px-20 ">
                <div className="lg:card-side bg-secondary shadow-xl rounded-2xl">
                    <div className="flex ...">
                        <div className="shrink">
                            <figure>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-40 w-40" fill="none" viewBox="0 0 25 25"
                                     stroke={
                                         (found === true && "green") ||
                                         (found == false && "yellow")
                                         || "currentColor"}
                                     stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                                </svg>
                            </figure>
                        </div>
                        <div className="card-body space-x-4">
                            {found === null  &&
                                <div>
                                    <h2 className="card-title font-roboto">Searching for Hash in Smart Contract</h2>
                                    <p>Checking if {hashValue} has already been saved.</p>
                                </div>
                            }
                            {found === true&&
                                <div>
                                    <h2 className="card-title font-roboto">The hash has been found in the Smart Contract</h2>
                                    <p>Hash {hashValue}</p>
                                    <p>Block Number {blockNumber}</p>
                                    <p>Block Time {blockTime}</p>
                                    <p>Owner {owner}</p>
                                </div>
                            }
                            {found === false &&
                                <div>
                                    <h2 className="card-title font-roboto">The hash has not been found in the Smart Contract</h2>
                                    <p>Hash {hashValue}</p>
                                    <p>Click the button to store the Hash on the Smart Contract with the next block's timestamp</p>
                                    <button onClick={writeHash} className="btn btn-primary">Write Hash</button>
                                </div>
                            }
                        </div>
                    </div>
                    {found === null &&
                        <progress className="progress"></progress>
                    }
                </div>
            </div>

        )};
}

export default useSearchResults;
