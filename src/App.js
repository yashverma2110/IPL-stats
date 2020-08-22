import React, { useEffect, useState, Suspense } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./App.css";
import { data } from "./data/file";
import { Dropdown } from "./Components/Dropdown";
const Chart = React.lazy(() => import("./Components/Chart"));

function App() {
  const [val, setVal] = useState(window.innerWidth <= 600 ? "2008" : "ALL");
  const [stats, setStats] = useState([]);

  useEffect(() => {
    AOS.init({
      duration: 2000,
    });
    AOS.refresh();

    if (val === "ALL") {
      setStats([...data]);
    } else {
      let list = data.filter((e) => e.season === parseInt(val));
      setStats([...list]);
    }
  }, [val]);

  return (
    <div className="App">
      <header>
        <span className="logo">iStats</span>
      </header>
      <div className="desc txt">
        <span>Let's explore your interests</span>
        <span>View stats in an interactive way!</span>
      </div>
      <div className="filter">
        <span className="txt">Choose a year: </span>
        <Dropdown data={data} field="season" setVal={setVal} curr={val} />
      </div>
      <div className="charts">
        <div className="chart-wrapper" data-aos="fade-right">
          <Suspense fallback={<div>Loading..</div>}>
            <Chart
              data={stats}
              tag="winner"
              chartType={"Doughnut"}
              title="Winning Team Streak"
              mixed={{ type: "line", tag: "win_by_runs" }}
            />
          </Suspense>
        </div>
        <div className="chart-wrapper" data-aos="fade-left">
          <Suspense fallback={<div>Loading..</div>}>
            <Chart
              data={stats}
              tag="result"
              chartType={"Doughnut"}
              title="Match status"
              mixed={{ type: "line", tag: "win_by_runs" }}
            />
          </Suspense>
        </div>
        <div className="chart-wrapper" data-aos="fade-right">
          <Suspense fallback={<div>Loading..</div>}>
            <Chart
              data={stats}
              tag="player_of_match"
              chartType={"Bar"}
              title="Frequency v Player of the match"
            />
          </Suspense>
        </div>
        <div className="chart-wrapper" data-aos="fade-left">
          <Suspense fallback={<div>Loading..</div>}>
            <Chart
              data={stats}
              tag="toss_decision"
              chartType={"Doughnut"}
              title="Toss Decisions"
            />
          </Suspense>
        </div>
        <div className="chart-wrapper" data-aos="fade-right">
          <Suspense fallback={<div>Loading..</div>}>
            <Chart
              data={stats}
              tag="city"
              chartType={"Line"}
              title="Venue City"
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default App;
