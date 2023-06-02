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
        content: "Pretend you're W. C. Fields presenting live on television. Be energetic and full of charisma with everywhere sentence ending with him saying 'yea, you see?'. State both the city and state code you are providing a summary for, then give a summary of todays weather only. Provide a joke regarding the weather at the end of the report and a detailed quantum physics solution."
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