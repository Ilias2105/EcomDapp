import { ethers } from "hardhat";

async function main() {
  const Watch = await ethers.getContractFactory("Watch");
  const watch = await Watch.deploy();

  await watch.deployed();

  console.log(
    `Watch.sol deployed to ${watch.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
