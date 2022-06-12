import { ChartData, ScatterDataPoint, ChartOptions, CoreChartOptions, ElementChartOptions, PluginChartOptions, DatasetChartOptions, ScaleChartOptions, LineControllerChartOptions } from 'chart.js/auto';
import 'chart.js/auto';
import { NextPage } from "next";
import { Line } from "react-chartjs-2";
import FakeImage from "~/components/FakeImage";
import styles from '~/styles/home.module.scss';

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const times = (n: number, fn: (i: number) => any = (i: number) => i): any[] => Array.from({ length: n }, (_, x) => fn(x));

const random = (lower: number, upper: number, isIncludeUpper = false) => {
  const min = Math.min(lower, upper)
  const max = Math.max(lower, upper)
  return Math.round((Math.random() * (max - min) + min) * 100) / 100
}

const randomChartData = (n: number, startAt: number = 0, maxChanges: number = 10, minimumValue: number = 0, maximumValue: number = 100) => {
  return [...times(n, (i) => {
    if (current === undefined) {
      current = startAt;
    } else {
      const min = random(current, Math.max(current - maxChanges, minimumValue), true);
      const max = random(current, Math.min(current + maxChanges, maximumValue), true);
      current = random(min, max, true);
    }
    return current;
  })]
}

const numberOfData = 200;
const startAt = 20;
let current: number;
const chartLabels = [...times(numberOfData, (i) => MONTHS[i % MONTHS.length])];
const chartData = randomChartData(numberOfData, startAt);

const data: ChartData<"line", (number | ScatterDataPoint | null)[], unknown> = {
  labels: chartLabels,
  datasets: [
    {
      label: "Dataset",
      data: chartData,
      fill: false,
      backgroundColor: "rgba(75,192,192,0.2)",
      borderColor: "rgba(75,192,192,1)",
      tension: 0.1,
      borderWidth: 1,
      pointRadius: 0,
      pointHoverRadius: 2
    },
    {
      label: 'Initial',
      data: [...times(numberOfData, (i) => chartData[0])],
      borderDash: [5, 5],
      borderColor: "rgba(75,192,192,0.5)",
      pointRadius: 0,
      borderWidth: 1,
      pointHoverRadius: 0
    },
    {
      label: 'Current',
      data: [...times(numberOfData, (i) => chartData[chartData.length - 1])],
      borderDash: [5, 5],
      borderColor: chartData[chartData.length - 1] > chartData[0] ? "#17a54380" : "#ff000080",
      pointRadius: 0,
      borderWidth: 1,
      pointHoverRadius: 0
    }
  ]
};

const options = {
  responsive: true,
  scales: {
    x: {
      ticks: {
        display: false
      },
      grid: {
        display: false
      },
    },
    y: {
      ticks: {
        display: false
      },
      grid: {
        display: false
      }
    },
  },
  elements: {
    point: {
      radius: 1,

    },
  },
  plugins: {
    legend: {
      display: false,
    }
  }
}

const OurSelectionCard = (props: OurSelectionCardProp) => {
  return (<>
    <div
      style={{
        padding: "24px",
        borderRadius: "15px",
        minWidth: '460px'
      }}
      className="bg__dotted"
    >
      <div style={{display: 'flex', gap: "10px",}}>
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
      <div style={{display: 'flex', gap: "5px", justifyContent: 'space-between', flexGrow: 0}}>
        <div style={{width: '50%', backgroundColor:'#00000033', borderRadius: '10px', padding:'5px'}}>
          <div>AUM</div>
          <div>Depositors</div>
        </div>
        <div style={{width: '50%', backgroundColor:'#00000033', borderRadius: '10px', padding:'5px'}}>
          <Line data={data} options={options} ></Line>
        </div>
      </div>
    </div>
  </>);
};

const CARDS: OurSelectionCardProp[] = [{
  pricePerShare: 0.58,
  vaultName: 'A vault Name',
  time: '24hrs',
  increase: 1.34
},{
  pricePerShare: 0.58,
  vaultName: 'A vault Name',
  time: '24hrs',
  increase: 1.34
},{
  pricePerShare: 0.58,
  vaultName: 'A vault Name',
  time: '24hrs',
  increase: 1.34
}]

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
          <div style={{display: 'flex', gap: '24px', marginTop: '17px'}}>
            <button className="fs-22" data-color="secondary" style={{height: '63px', width:'188px'}}>Create a vault</button>
            <button className="fs-22" data-color="white" style={{height: '63px', width:'188px'}}>Explore vaults</button>
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
      <div  className={styles.topGainerContainer}>
        <div className='fs-35'>
          Weekly Top Gainers
        </div>
        <div className={styles.topGainerList}>
          {CARDS.map((card)=> (
            <OurSelectionCard
              pricePerShare={0.58}
              vaultName={"A vault name"}
              increase={1.34}
              time={"24Hrs"}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
