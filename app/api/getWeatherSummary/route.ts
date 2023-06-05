import { NextResponse } from "next/server";
import openai from "@/openai";

export async function POST(request: Request) {
  // weatherdata in the  body of the POST req
  const { weatherData } = await request.json();

  const currentTime = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    timeZone: "America/New_York", // Set the timezone to EST
  });

  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    temperature: 0.6,
    n: 1,
    stream: false,
    messages: [
      {
        role: 'system',
        content: "Pretend you're rock star joeyB while presenting the weather. Then give a summary of todays weather compared to tomorrow's weather, and state both the city and state code you are providing a summary for. Conclude with an Alan Watts method on Eastern philosophy."
      }, {
        role: 'user',
        content: `Hello Chris, can I get a summary of todays weather, use the following information to get the weather data: ${JSON.stringify(weatherData)}`
      }, {
        role: 'system',
        content: `Current date and time: ${currentTime}`
      }
    ]
  })

  const { data } = response;

  console.log("AI DATA IS: ", data);

  return NextResponse.json(data.choices[0].message);
}