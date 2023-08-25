import AreaChart from "./AreaChart";
import BarChart from "./BarChart";
import Wrapper from "../assets/wrappers/ChartsContainer";
import React, { useState } from "react";
import { useAppContext } from "../context/appContext";

const ChartContainer = () => {
  const [showBarChart, setShowBarChart] = useState(true);
  const { monthlyApplications: data } = useAppContext();

  const handleClick = () => {
    setShowBarChart(!showBarChart);
  };
  return (
    <Wrapper>
      <h4>Monthly Applications</h4>
      <button type="button" onClick={handleClick}>
        {showBarChart ? "Area Chart" : "Bar Chart"}
      </button>
      {showBarChart ? <BarChart data={data} /> : <AreaChart data={data} />}
    </Wrapper>
  );
};
export default ChartContainer;
