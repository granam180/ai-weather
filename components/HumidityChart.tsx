"use client";

import { Card, AreaChart, Title } from "@tremor/react";

type Props = {
  results: Root;
};

function HumidityChart({ results }: Props) {
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
    "Humidity (%)": results.hourly.relativehumidity_2m[currentHour + i],
    "Tomorrow's Humidity (%)": results.hourly.relativehumidity_2m[i + 1],
  }));

  const dataFormatter = (number: number) => `${number} %`;

  return (
    <div>
      <Card>
        <Title>Tomorrow&apos;s Levels</Title>
        <AreaChart
          className="mt-6"
          data={data}
          showLegend
          index="time"
          categories={["Tomorrow's Humidity (%)"]}
          colors={["yellow"]}
          minValue={0}
          maxValue={100}
          valueFormatter={dataFormatter}
          yAxisWidth={40}
        />
      </Card>
      <Card>
        <Title>Humidity Levels</Title>
        <AreaChart
          className="mt-6"
          data={data}
          showLegend
          index="time"
          categories={["Humidity (%)"]}
          colors={["teal"]}
          minValue={0}
          maxValue={100}
          valueFormatter={dataFormatter}
          yAxisWidth={40}
        />
      </Card>
    </div>
  );
}

export default HumidityChart;
