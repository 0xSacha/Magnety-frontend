import { NextPage } from "next";
import FakeImage from "~/components/FakeImage";
const OurSelectionCard = (props: OurSelectionCardProp) => {
  return (
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
  );
};

type OurSelectionCardProp = {
  vaultName: string;
  pricePerShare: number;
  increase?: number;
  decrease?: number;
  time: string;
};

const Home: NextPage = () => {
  return (
    <>
      <div className="d-flex">
        <div
          style={{
            margin: "57px 0 0 95px",
          }}
        >
          <div className="fs-96">Create, Manage and Use Vaults</div>
          <div className="fs-24">
            Magnety is an asset management protocol allowing anyone to create
            and manage a hedge fund through Starknet & L1 DeFi ecosystem.
          </div>
          <div style={{ display: "flex", gap: "24px", marginTop: "17px" }}>
            <button
              className="fs-22"
              data-color="secondary"
              style={{ height: "63px", width: "188px" }}
            >
              Create a vault
            </button>
            <button
              className="fs-22"
              data-color="white"
              style={{ height: "63px", width: "188px" }}
            >
              Explore vaults
            </button>
          </div>
        </div>
        <div>
          <div
            style={{
              padding: "0 25px 22px 18px",
              backgroundColor: "#f6643c",
              // width: "fit-content",
              // height: "fit-content",
              minWidth: "398px",
              borderRadius: "10px",
              margin: "60px 72px 0 0",
            }}
          >
            <div
              className="fs-40 fw-600 d-flex align-items-center"
              style={{ height: "69px" }}
            >
              Our selection
            </div>
            <OurSelectionCard
              pricePerShare={0.58}
              vaultName={"A vault name"}
              increase={1.34}
              time={"24Hrs"}
            />
          </div>
          <div
            style={{
              padding: "0 25px 22px 18px",
              backgroundColor: "#f6643c",
              // width: "fit-content",
              // height: "fit-content",
              minWidth: "398px",
              borderRadius: "10px",
              margin: "60px 72px 0 0",
            }}
          >
            <div
              className="fs-40 fw-600 d-flex align-items-center"
              style={{ height: "69px" }}
            >
              Last Airdrop
            </div>
            <div className="d-flex align-items-center" style={{ gap: "10px" }}>
              <FakeImage
                width="48px"
                height="48px"
                fillColor="black"
                borderRadius="50%"
              />
              <div className="fs-22">Jake21 won 500 $ MGTY</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
