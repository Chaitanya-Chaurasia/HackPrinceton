import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import Upload from "../../client/src/artifacts/contracts/Upload.sol/Upload.json";
import FileUpload from "../components/FileUpload";
import Display from "../components/Display";
import Modal from "../components/Modal";
import Banner from "./Banner";

function App() {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const loadProvider = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      if (provider) {
        window.ethereum.on("chainChanged", () => window.location.reload());
        window.ethereum.on("accountsChanged", () => window.location.reload());

        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();

        setAccount(address);
        const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
        const contract = new ethers.Contract(
          contractAddress,
          Upload.abi,
          signer
        );

        setContract(contract);
        setProvider(provider);
      } else {
        console.error("Metamask is not installed");
      }
    };

    loadProvider();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Banner />
      <div className="flex-grow text-center p-4 bg-beige-100">
        {modalOpen && <Modal setModalOpen={setModalOpen} contract={contract} />}
        <h1 className="text-4xl font-bold mb-2">
          Test <span className="text-indigo-500"> Doc</span>
          <span className="text-purple-600">Chain</span>{" "}
          <span className="text-green-500"> Beta</span>
        </h1>

        <p className="mb-4">
          Account: {account ? `....${account.slice(-4)}` : "Not connected"}
          {account === "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC"
            ? " (IDENTIFIED as a USER)"
            : " (IDENTIFIED as a BlockChain ADMIN)"}
        </p>

        <FileUpload account={account} provider={provider} contract={contract} />
        <Display contract={contract} account={account} />
        {!modalOpen && (
          <button
            onClick={() => setModalOpen(true)}
            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
          >
            Share
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
