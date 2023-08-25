import { useEffect } from "react";
import { ChartContainer, StatsContainer, Loading } from "../../components";
import { useAppContext } from "../../context/appContext";

const Stats = () => {
  const { showStats, isLoading, monthlyApplications } = useAppContext();

  useEffect(() => {
    showStats();
    // eslint-disable-next-line
  }, []);

  if (isLoading) return <Loading center />;

  return (
    <>
      <StatsContainer />
      {monthlyApplications?.length > 0 && <ChartContainer />}
    </>
  );
};
export default Stats;
