import { useState } from "react";
import axios from "axios";
import spinnerGif from "./../images/spinner.gif";

const FileUpload = ({ contract, account, provider }) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("No image selected");

  const [uploadStatus, setUploadStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploadStatus(null); // Reset upload status on new submission

    setErrorMessage(""); // Reset error message on new submission

    if (file) {
      setIsLoading(true);
      try {
        const formData = new FormData();
        formData.append("file", file);

        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: `49b8955e2befbb797015`,
            pinata_secret_api_key: `d39865dfcb254ba4452ee66580be9a8b61a3a2787d8953a3b196e31c3752f030`,
            "Content-Type": "multipart/form-data",
          },
        });

        const ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
        console.log(ImgHash);
        console.log(account);
        contract.add(account, ImgHash);
        setIsLoading(false);
        setUploadStatus("Successfully Uploaded : " + fileName); // Update status message
        setFileName("No image selected");
      } catch (e) {
        console.error(e);
        setIsLoading(false);
        alert("Unable to upload image to Pinata");
      }
    }
  };

  const Overlay = () => (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-40 flex justify-center items-center">
      <div className="p-6 space-y-4">
        {isLoading && <Overlay />}
        <div className="bg-white p-4 rounded-lg flex items-center">
          <img src={spinnerGif} alt="Loading..." className="h-10 w-10 mr-2" />
          <span>Uploading to blockchain network...</span>
        </div>
      </div>
    </div>
  );

  const retrieveFile = (e) => {
    const data = e.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);
    reader.onloadend = () => {
      setFile(e.target.files[0]);
    };
    setFileName(e.target.files[0].name);
    e.preventDefault();
  };

  return (
    <div className="p-6 space-y-4">
      {uploadStatus && (
        <div
          className="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800"
          role="alert"
        >
          {uploadStatus}
        </div>
      )}
      {errorMessage && (
        <div
          className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
          role="alert"
        >
          {errorMessage}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <label htmlFor="file-upload" className="block text-gray-700 font-bold">
          Choose Image
        </label>
        <input
          disabled={!account}
          type="file"
          id="file-upload"
          name="data"
          onChange={retrieveFile}
          className="file:mr-4 file:py-2 file:px-4
                 file:rounded-full file:border-0
                 file:text-sm file:font-semibold
                 file:bg-blue-50 file:text-blue-700
                 hover:file:bg-blue-100
                 cursor-pointer"
        />
        <span className="block text-gray-700"></span>
        <button
          type="submit"
          className="inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!file || isLoading}
        >
          {isLoading ? (
            <img src={spinnerGif} alt="Loading..." className="h-10 w-10" />
          ) : (
            "Upload File"
          )}
        </button>
      </form>
    </div>
  );
};

export default FileUpload;
