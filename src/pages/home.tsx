import { NextPage } from "next";
import FakeImage from "~/components/FakeImage"


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
          className="bg__dotted"
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
    <OurSelectionCard
      pricePerShare={0.58}
      vaultName={"A vault name"}
      increase={1.34}
      time={"24Hrs"}
    />
  );
};

export default Home;
