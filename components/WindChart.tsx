"use client";

import { Card, AreaChart, Title } from "@tremor/react";
import CalloutCard from "./CalloutCard";

type Props = {
  results: Root;
};

function WindChart({ results }: Props) {
  const hourly = results?.hourly.time
    .map((time) =>
      new Date(time).toLocaleString("en-US", {
        hour: "numeric",
        hour12: false,
      })
    )
    .slice(0, 24);

  const data = hourly.map((hour, i) => ({
    time: Number(hour),
    "Wind (m/s)": results.hourly.windgusts_10m[i],
    "Tomorrow's Wind (m/s)": results.hourly.windgusts_10m[i + 24],
  }));

  const dataFormatter = (number: number) => `${number} m/s`;

  return (
    <Card>
      <Title>Wind Speeds</Title>
      <AreaChart
        className="mt-6"
        data={data}
        showLegend
        index="time"
        categories={["Wind (m/s)"]}
        colors={["sky"]}
        minValue={0}
        // maxValue={100}
        valueFormatter={dataFormatter}
        yAxisWidth={50}
      />    
      <Title>Tomorrow&apos;s Speeds</Title>
      <AreaChart
        className="mt-6"
        data={data}
        showLegend
        index="time"
        categories={["Tomorrow's Wind (m/s)"]}
        colors={["cyan"]}
        minValue={0}
        // maxValue={100}
        valueFormatter={dataFormatter}
        yAxisWidth={50}
      />         
    </Card>
  );
}

export default WindChart;
