# SonoToki  

Proof of when (or before)

* "When" is a period of time between two points in time.  `t_from` and `t_to`.  Where `t_from < t_to`.
* `t_to` can be proven as follows - 
  * compute the SHA-3 hash of a document/image or any type `data`
  * execute a transaction on the block chain to invoke the `store` method, if successful this will result in the SHA-3 hash being stored in a particular block mined on the chain.
  * we can refer to the timestamp of the mined block as `t_to` which has an accuracy of around 15 seconds. (https://consensys.github.io/smart-contract-best-practices/development-recommendations/solidity-specific/timestamp-dependence/)
* `t_from` is more challenging to prove and varies depending on the type of `data` being proven.
  * In the case of photographs.  One possible mechanism is to print out the Block Header Hash of a recently mined block and include this piece of paper in the photograph.
  * Videos would use a similar mechanism to photographs.
  * Videos and photographs could still be forged.
  * For documents it may be impossible as the document could have been produced at any point prior before or after `to_from` and the Hash incorporated.

* SonoToki only aims to prove the `data` was produced before `t_to`

### Frequently Asked Questions

* Have the Smart Contracts been audited?
** No, auditing costs money.  The contracts are available in Source Control and the verified contracts have been uploaded to https://optimistic.etherscan.io/address/0x6d93556339ada77b5d1814b84101b8bb1572578c

* Will this actually be useful as evidence?
** This hasn't been tested in court.



### Running locally

####Compiling the contract
```shell script
npx hardhat compile
```

####Running solidity tests

```shell script
npx hardhat test
```

####Running the project locally

```shell script
# Start the hardhat node
npx hardhat node    

# Deploy the contract to the local node
npx hardhat run --network localhost  scripts/deploy.js

# Extract the contract address and update the address in ./ui/sonotoki/src/ChainUtils.ts

# Under ./ui/sonotoko run
npm start
```

###Deploying

#### Deploying the contract

```shell script
npx hardhat run --network optimism  scripts/deploy.js
```


#### Hosting the static website

At the moment the static website is hosted on AWS S3 fronted by Cloudfront.  The domain name is hosted on Route53.
Ideally this would be decentralised at some point using IPFS and ENS.

[static-site/README.md](static-site/README.md)

#### Copying the static files to S3

This is automated by Github actions.

