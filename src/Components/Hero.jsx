import "./Hero.css";
import logo from "../assets/logo.png";

const Hero = () => {
  return (
    <div className="heroContainer">
      <div className="heroContainer-text">
        <h1>DocChain</h1>
        <h2>Web3 secured document sharing</h2>
      </div>
      <div className="heroContainer-img">
        <img src={logo} />
      </div>
    </div>
  );
};
export default Hero;
