import { useState } from "react";
import "./Display.css"; // Make sure to define the necessary styles in this CSS file.

import spinnerGif from "../images/spinner.gif";

const Display = ({ contract, account }) => {
  const [data, setData] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getdata = async () => {
    setIsLoading(true); // Start loading

    let dataArray;
    const Otheraddress = document.querySelector(".relative").value;
    console.log(Otheraddress);
    try {
      dataArray = Otheraddress
        ? await contract.display(Otheraddress)
        : await contract.display(account);

      console.log(dataArray);

      if (dataArray?.length) {
        const fetchImage = async (url) => {
          const response = await fetch(url);
          const blob = await response.blob();
          return URL.createObjectURL(blob);
        };

        const imagePromises = dataArray.map(fetchImage);
        const imageUrls = await Promise.all(imagePromises);

        const images = imageUrls.map((url, i) => (
          <div key={i} className="image-container">
            <a href={dataArray[i]} target="_blank" rel="noopener noreferrer">
              <img src={url} alt={`Image ${i}`} className="image-list" />
            </a>
            <span className="image-label">Image {i + 1}</span>{" "}
            {/* Label for each image */}
          </div>
        ));
        setData(images);
      } else {
        alert("No image to display");
      }
      setIsLoading(false);
    } catch (e) {
      console.error(e);
      alert("Error occurred: " + e.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="relative">
      {/* Overlay and Spinner */}
      {isLoading && (
        <div className="absolute inset-0  bg-white bg-opacity-90 flex justify-center items-center z-10"></div>
      )}

      <div className="image-grid">
        {data || (isLoading ? null : "No images to display.")}{" "}
        {/* Display no images message when not loading and data is empty */}
      </div>
      <input
        type="text"
        placeholder="Enter Address"
        className="address-input mt-4 mb-2" // Added margin for spacing
      />
      <button
        className="fetch-button"
        onClick={getdata}
        disabled={isLoading} // Disable button while loading
      >
        {isLoading ? "Loading..." : "Get Data"}{" "}
        {/* Change button text based on loading status */}
      </button>
    </div>
  );
};

export default Display;
