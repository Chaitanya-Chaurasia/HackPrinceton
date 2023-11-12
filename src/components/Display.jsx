import { useState } from "react";
import "./Display.css";

const Display = ({ contract, account }) => {
  const [data, setData] = useState("");
  const getdata = async () => {
    let dataArray;
    const Otheraddress = document.querySelector(".address").value;
    try {
      if (Otheraddress) {
        dataArray = await contract.display(Otheraddress);
      } else {
        dataArray = await contract.display(account);
      }
      console.log(dataArray);

      if (dataArray && dataArray.length !== 0) {
        const fetchImage = async (url) => {
          const response = await fetch(url);
          const blob = await response.blob();
          return URL.createObjectURL(blob);
        };

        const imagePromises = dataArray.map(fetchImage);
        const imageUrls = await Promise.all(imagePromises);

        const images = imageUrls.map((url, i) => (
          <a href={dataArray[i]} key={i} target="_blank">
            <img src={url} alt={`Image ${i}`} className="image-list" />
          </a>
        ));
        setData(images);
      } else {
        alert("No image to display");
      }
    } catch (e) {
      console.error(e);
      alert("Error occurred: " + e.message);
    }
  };

  return (
    <>
      <div className="image-list">{data}</div>
      <input
        type="text"
        placeholder="Enter Address"
        className="address"
      ></input>
      <button className="center button" onClick={getdata}>
        Get Data
      </button>
    </>
  );
};
export default Display;
