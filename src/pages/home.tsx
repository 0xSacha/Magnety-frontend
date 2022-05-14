import { NextPage } from "next";
import Navbar from "../components/Navbar";
import styles from "../styles/home.module.scss";

type FakeImageProp = {
  width?: string;
  height?: string;
  fillColor?: string;
  maxWidth?: string;
  maxHeight?: string;
  borderRadius?: string;
};

const FakeImage = (props: FakeImageProp) => {
  return (
    <div
      style={{
        width: props.width ?? "auto",
        height: props.height ?? "auto",
        backgroundColor: props.fillColor ?? "transparent",
        maxWidth: props.maxWidth ?? "100%",
        maxHeight: props.maxHeight ?? "100%",
        borderRadius: props.borderRadius ?? "0",
      }}
    ></div>
  );
};

type OurSelectionCardProp = {
  vaultName: string;
  pricePerShare: number;
  increase?: number;
  decrease?: number;
  time: string;
};
const OurSelectionCard = (props: OurSelectionCardProp) => {
  return (
    <>
      <div
        style={{
          padding: "5px",
          backgroundColor: "#f6643c",
          width: "fit-content",
        }}
      >
        <div
          style={{
            display: "flex",
            padding: "24px",
            gap: "10px",
            borderRadius: "15px",
          }}
          className="bgDotted"
        >
          <div>
            <FakeImage
              width="98px"
              height="98px"
              fillColor="black"
              borderRadius="50%"
            />
          </div>
          <div>
            <div className="fs-22">{props.vaultName}</div>
            <div style={{ marginTop: "5px" }} className="fs-18">
              <span className="fs-36">${props.pricePerShare}</span> per share
            </div>
            <div style={{ marginTop: "5px" }}>
              <span className="fs-20">
                {props.increase && !props.decrease && `+${props.increase}%`}
                {props.decrease && !props.increase && `-${props.decrease}%`}
              </span>
              <span className="fs-18" style={{ marginLeft: "10px" }}>
                {props.time}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const Home: NextPage = () => {
  return (
    <div className={`page`}>
      <Navbar />
      <div className={`pageContent ${styles.pageContent}`}>
        Content of page 1
        <OurSelectionCard
          pricePerShare={0.58}
          vaultName={"A vault name"}
          increase={1.34}
          time={"24Hrs"}
        />
      </div>
    </div>
  );
};

export default Home;
