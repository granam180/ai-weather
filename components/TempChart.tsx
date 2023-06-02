"use client";

import { Card, AreaChart, Title } from "@tremor/react";

type Props = {
  results: Root;
};

function TempChart({ results }: Props) {
  const hourly = results?.hourly.time.map((time) =>
      new Date(time).toLocaleString("en-US", {
        hour: "numeric",
        hour12: false,
      })
    )
    .slice(0, 24);

  const data = hourly.map((hour, i) => ({
    time: Number(hour),
    "Temperature (F)": results.hourly.temperature_2m[i],
    "Feels like": results.hourly.apparent_temperature[i],
    "UV Index": results.hourly.uv_index[i]  ,
    "Temperature (F) Tomorrow": results.hourly.temperature_2m[i + 24],
    "Feels like Tomorrow": results.hourly.apparent_temperature[i + 24],
    "UV Index Tomorrow": results.hourly.uv_index[i + 24]
  }));


  const dataFormatter = (number: number) => `${number}`;

  // const dataFormatter = (number: number) => {
  //   const hours = Math.floor(number);
  //   const minutes = Math.round((number - hours) * 60);
  //   return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  // };

  return (
    <Card>
      <Title>Temperature &amp; UV Index</Title>
      <AreaChart
        className="mt-6"
        data={data}
        showLegend
        index="time" // related in data variable
        categories={["Feels like", "Temperature (F)", "UV Index"]}
        colors={["orange", "amber", "yellow"]}
        minValue={1}
        valueFormatter={dataFormatter}
        yAxisWidth={40}
      />
      <hr className="mt-6 mb-6" />
      <Title>Tomorrow&apos;s Temp</Title>
      <AreaChart
        className="mt-6"
        data={data}
        index="time"
        categories={["Feels like Tomorrow", "Temperature (F) Tomorrow", "UV Index Tomorrow"]}
        colors={["teal", "cyan", "sky"]}
        minValue={1}
        valueFormatter={dataFormatter}
        yAxisWidth={40}
      />    
    </Card>
  );
}

export default TempChart;
