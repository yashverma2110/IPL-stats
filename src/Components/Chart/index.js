import React, { useState, useEffect } from "react";
import * as Charts from "react-chartjs-2";

const Chart = (props) => {
  const [data, setData] = useState({});

  useEffect(() => {
    let temp = {
      labels: [],
      datasets: [
        {
          label: props.tag,
          data: [],
          backgroundColor: [],
          fill: false,
        },
      ],
    };
    for (var i = 0; i < props.data.length; i++) {
      var val = props.data[i][props.tag];
      if (temp.labels.indexOf(val) === -1) {
        temp.labels.push(val);
        temp.datasets[0].data.push(0);
      }
      var randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
      var pos = temp.labels.indexOf(val);
      temp.datasets[0].data[pos]++;
      temp.datasets[0].backgroundColor.push(randomColor);
    }

    setData({ ...temp });
  }, [props.data, props.tag]);

  const Display = Charts[props.chartType];
  return (
    <Display
      data={data}
      options={{
        maintainAspectRatio: false,
        legend: { display: props.chartType === "Doughnut" },
        title: {
          display: true,
          text: props.title,
          fontSize: 20,
          fontColor: "black",
        },
      }}
      height={300}
      width={100}
    />
  );
};

export default Chart;
