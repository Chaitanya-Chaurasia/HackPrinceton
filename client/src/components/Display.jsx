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
  
      if (dataArray && Object.keys(dataArray).length !== 0) {
        const str = dataArray.toString();
        const str_array = str.split(",");
        const images = str_array.map((item, i) => (
          <a href={item} key={i} target="_blank">
            <img
              src={`https://gateway.pinata.cloud/ipfs/${item.substring(6)}`}
              alt="new"
              className="image-list"
            />
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