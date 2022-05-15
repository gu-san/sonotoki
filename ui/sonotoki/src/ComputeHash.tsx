import React from 'react';

import {useState} from 'react'
import {ethers} from "ethers";
import {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'

function useComputeHash(searchHandler: any, invalidatedHash: any) {
    const [hashValue, setHashValue] = useState<string>("");
    const [calculated, setCalculated] = useState<boolean | null>(null);

    async function calculateHashFromFile(file: File): Promise<string> {
        const content = await file.arrayBuffer();
        let hash = ethers.utils.keccak256(new Uint8Array(content));
        return hash;
    }

    const onDrop = useCallback((acceptedFiles: any) => {
        if (acceptedFiles.length != 1 ) {
            alert('only support one file')
            setCalculated(false);
        }

        calculateHashFromFile(acceptedFiles[0]).then((hash)=>{
            console.log(hash);
            //check length
            //check starts with 0x
            setCalculated(true);
            setHashValue(hash);
        })
    }, [])

    async function hashChanged(event: any) {
        if (hashValue !== event.target.value) {
            setHashValue(event.target.value);
            invalidatedHash();
        }
    }


    const {getRootProps, getInputProps} = useDropzone({onDrop})

    return {
        hashValue: hashValue,
        render: (
        <div className="ComputeHash container mx-auto px-20 ">
            <div className="lg:card-side bg-secondary shadow-xl rounded-2xl">
                <div className="flex ..."  {...getRootProps()}>
                    <div className="shrink">
                        <input {...getInputProps()} />
                        <figure>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-40 w-40" fill="none" viewBox="0 0 25 25"
                                 stroke={
                                     (calculated === true && "green") ||
                                    ( calculated == false && "yellow") ||
                                     "currentColor"
                                 }
                                 stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/>
                            </svg>
                        </figure>
                    </div>
                    <div className="card-body">
                        <h2 className="card-title font-roboto">Drag and drop a file to compute hash or click button to
                            select file</h2>
                        <p>The hash is computed in your browser, the file is not uploaded.</p>
                        <div className="card-actions justify-end font-roboto">
                            <button className="btn btn-primary">Select file</button>
                        </div>
                    </div>
                </div>
                <div className="form-control">
                    <div className="input-group">
                        <input type="text"
                               value={hashValue}
                               onChange={hashChanged}
                               placeholder="Paste a locally calculated SHA-3/keccak256 Hash"
                               className="input input-bordered input-lg w-full font-roboto"/>
                        <button className="btn btn-square btn-lg" onClick={searchHandler}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                                 stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
};
}

export default useComputeHash;
