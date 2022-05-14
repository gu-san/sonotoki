const { expect } = require("chai");
const { ethers } = require("hardhat");
const {getSigners} = require("@nomiclabs/hardhat-ethers/internal/helpers");

describe("Sonotoki", function () {
  let sonotoki;

  before(async function () {
    const Sonotoki = await ethers.getContractFactory("Sonotoki");
    sonotoki = await Sonotoki.deploy();
    await sonotoki.deployed();
  });

  it("It should store a proof and allow retrieval", async function () {
    let data = ethers.utils.formatBytes32String("SOMEHASH1")
    const storeProofTx = await sonotoki.storeProof(data);
    await storeProofTx.wait();

    let proof = await sonotoki.proofs(data)
    expect(proof.blockNumber).to.equal(storeProofTx.blockNumber);
    expect(proof.owner).to.equal(storeProofTx.from);
  });

  it("It should emit an event on StoreProof", async function () {
    const [owner] = await ethers.getSigners();
    let data = ethers.utils.formatBytes32String("SOMEHASH2")
    await expect(sonotoki.storeProof(data)).to.emit(sonotoki, "StoreProof").withArgs(owner.address, data)
  });

  it("It should allow deletion by owner", async function () {
    let data = ethers.utils.formatBytes32String("SOMEHASH3")
    const storeProofTx = await sonotoki.storeProof(data);
    await storeProofTx.wait();

    const deleteProofTx = await sonotoki.deleteProof(data);
    await deleteProofTx.wait();

    let proof = await sonotoki.proofs(data)
    expect(proof.blockNumber).to.equal(0);
  });

  it("It should emit an event of DeleteProof", async function () {
    const [owner] = await ethers.getSigners();
    let data = ethers.utils.formatBytes32String("SOMEHASH4")
    const storeProofTx = await sonotoki.storeProof(data);
    await storeProofTx.wait();

    await expect(sonotoki.deleteProof(data)).to.emit(sonotoki, 'DeleteProof').withArgs(owner.address, data)
  });

  it("It should prevent deletion by sender other than owner", async function () {
    const [owner, other] = await ethers.getSigners();

    let data = ethers.utils.formatBytes32String("SOMEHASH5")
    const storeProofTx = await sonotoki.connect(owner).storeProof(data);
    await storeProofTx.wait();

    await expect(sonotoki.connect(other).deleteProof(data)).to.be.revertedWith("Only the owner can delete a proof")
  });

  it("It should prevent overwriting a proof", async function () {
    let data = ethers.utils.formatBytes32String("SOMEHASH6")
    let storeProofTx = await sonotoki.storeProof(data);
    await storeProofTx.wait();

    await expect(sonotoki.storeProof(data)).to.be.revertedWith("Can't overwrite an existing proof")
  });

});
