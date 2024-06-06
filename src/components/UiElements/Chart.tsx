import React from "react";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import ChartOne from "../../components/Charts/ChartOne";
import ChartThree from "../Charts/DayLineChart";
import ChartTwo from "../../components/Charts/ChartTwo";
import DefaultLayout from "../../layout/DefaultLayout";
import ChartJS from "../../components/Charts/ChartJS";
import CanvasChart from "../../components/Charts/CanvasChart";

const Chart: React.FC = () => {

  const barData = [100, 200, 150, 250, 300]; // Sample data
  const barLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May']; // Sample labels

  const pieData = [300, 150, 100, 200]; // Sample data for pie chart
  const pieColors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']; // Sample colors for pie chart
  const pieLabels = ['Category A', 'Category B', 'Category C', 'Category D']; 
  return (
    <DefaultLayout>
      <Breadcrumb title="Chart" />

      <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
        <ChartOne />
        <ChartTwo />
        <ChartThree />
        <ChartJS />
        <div className="chart">
                <CanvasChart data={barData} labels={barLabels} />
            </div>
      </div>
    </DefaultLayout>
  );
};

export default Chart;
