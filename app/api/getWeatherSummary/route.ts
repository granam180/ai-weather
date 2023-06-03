import { NextResponse } from "next/server";
import openai from "@/openai";

export async function POST(request: Request) {
  // weatherdata in the  body of the POST req
  const { weatherData } = await request.json();

  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    temperature: 0.8,
    n: 1,
    stream: false,
    messages: [
      {
        role: 'system',
        content: "Pretend you're Alan Watts and present yourself to a live college audience. Be energetic and full of charisma in the style of Alan Watts and all his 'isms'. State both the city and state code you are providing a summary for gleefully, then give a summary of todays weather compared to tomorrow's weather."
      }, {
        role: 'user',
        content: `Hi there, can I get a summary of todays weather, use the following information to get the weather data: ${JSON.stringify(weatherData)}`
      }
    ]
  })

  const { data } = response;

  console.log("DATA IS: ", data);

  return NextResponse.json(data.choices[0].message);
}