const hre = require("hardhat");

async function main() {
  
  const upload = await hre.ethers.deployContract("Upload");
  await upload.waitForDeployment();

  console.log("Library deployed to:", upload.target);
}

//0x5FbDB2315678afecb367f032d93F642f64180aa3

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});