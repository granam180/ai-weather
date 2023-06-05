"use client";

import { Card, AreaChart, Title } from "@tremor/react";

type Props = {
  results: Root;
};

function RainChart({ results }: Props) {
  // Add a variable to get the current hour:
  const currentHour = new Date().getHours();

  const hourly = results?.hourly.time
    .map((time) =>
      new Date(time).toLocaleString("en-US", {
        hour: "numeric",
        hour12: false,
        timeZone: "America/New_York", // Set the timezone to EST
      })
    )
    .slice(currentHour, currentHour + 24);

  const data = hourly.map((hour, i) => ({
    time: Number(hour),
    "Rain (%)": results.hourly.precipitation_probability[currentHour + i],
    "Tomorrow's Rain (%)": results.hourly.precipitation_probability[i + 1],
  }));

  const dataFormatter = (number: number) => `${number} %`;

  return (
    <div>
      <Card>
        <Title>Chances of Rain</Title>
        <AreaChart
          className="mt-6"
          data={data}
          showLegend
          index="time"
          categories={["Rain (%)"]}
          colors={["indigo"]}
          minValue={0}
          maxValue={100}
          valueFormatter={dataFormatter}
          yAxisWidth={50}
        />
      </Card>
      <Card>
        <Title>Tomorrow&apos;s Chances</Title>
        <AreaChart
          className="mt-6"
          data={data}
          showLegend
          index="time"
          categories={["Tomorrow's Rain (%)"]}
          colors={["blue"]}
          minValue={0}
          maxValue={100}
          valueFormatter={dataFormatter}
          yAxisWidth={50}
        />
      </Card>
    </div>
  );
}

export default RainChart;
