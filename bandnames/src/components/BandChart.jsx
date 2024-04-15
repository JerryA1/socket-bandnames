import React, { useContext, useEffect, useMemo, useState } from "react";
import Chart from "chart.js/auto";
import { SocketContext } from "../context/SocketContext";

const BandChart = () => {
  const [bands, setBands] = useState([]);
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    socket.on("current-bands", (bands) => {
      setBands(bands);
    });

    return () => socket.off("current-bands");
  }, [socket]);

  const getConfig = useMemo(() => {
    const data = {
      labels: bands.map((band) => band.name),
      datasets: [
        {
          label: "# of Votes",
          data: bands.map((band) => band.votes),
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(255, 159, 64, 0.2)",
            "rgba(255, 205, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(201, 203, 207, 0.2)",
          ],
          borderColor: [
            "rgb(255, 99, 132)",
            "rgb(255, 159, 64)",
            "rgb(255, 205, 86)",
            "rgb(75, 192, 192)",
            "rgb(54, 162, 235)",
            "rgb(153, 102, 255)",
            "rgb(201, 203, 207)",
          ],
          borderWidth: 1,
        },
      ],
    };

    return {
      type: "bar",
      data: data,
      options: {
        animation: false,
        indexAxis: "y",
        scales: {
          // y: {
          //   beginAtZero: true,
          // },
          x: {
            stacked: true,
          },
        },
        beginAtZero: true,
        events: ["click"], // <=== Solo habilita el evento de click
      },
    };
  }, [bands]);

  useEffect(() => {
    const myChart = new Chart(document.getElementById("myChart"), getConfig);

    return () => {
      myChart.destroy();
    };
  }, [getConfig]);

  return <canvas id="myChart"></canvas>;
};

export default BandChart;
