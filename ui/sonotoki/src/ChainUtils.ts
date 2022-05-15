import {ethers} from "ethers";
import SonoToki_abi from './contracts/Sonotoki.json'

const contractAddress = "0x6d93556339AdA77b5d1814b84101B8bb1572578C";

export function getProvider() {
    return new ethers.providers.Web3Provider(window.ethereum);
}

export function getContract() {
    let provider = getProvider();
    let signer = provider.getSigner();
    return new ethers.Contract(contractAddress, SonoToki_abi, signer);
}

