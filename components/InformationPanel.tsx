import { MoonIcon, SunIcon, CloudIcon } from "@heroicons/react/solid";
import Image from "next/image";
import CityPicker from "./CityPicker";
import weatherCodeToString from "@/lib/weatherCodeToString";
import Link from "next/link";

type Props = {
  city: string;
  results: Root;
  lat: string;
  long: string;
};

function InformationPanel({ city, lat, long, results }: Props) {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const tomorrowFormatted = tomorrow.toLocaleDateString("en-US", {
    hour12: true,
  });

  const dayThree = new Date();
  dayThree.setDate(dayThree.getDate() + 2);

  const dayThreeFormatted = dayThree.toLocaleDateString("en-US", {
    hour12: true,
  });

  const dayFour = new Date();
  dayFour.setDate(dayFour.getDate() + 3);

  const dayFourFormatted = dayFour.toLocaleDateString("en-US", {
    hour12: true,
  });

  const dayFive = new Date();
  dayFive.setDate(dayFive.getDate() + 4);

  const dayFiveFormatted = dayFive.toLocaleDateString("en-US", {
    hour12: true,
  });

  const daySix = new Date();
  daySix.setDate(daySix.getDate() + 5);

  const daySixFormatted = daySix.toLocaleDateString("en-US", {
    hour12: true,
  });

  const daySeven = new Date();
  daySeven.setDate(daySeven.getDate() + 6);

  const daySevenFormatted = daySeven.toLocaleDateString("en-US", {
    hour12: true,
  });

  return (
    <div className="bg-gradient-to-br from-[#394F68] to-[#183B7E] text-white p-10">
      <div className="pb-5">
        <Link href={"/"}>
          <h1 className="text-6xl font-bold">{decodeURI(city)}</h1>
        </Link>
        <p className="text-xs text-gray-400">
          Long/Lat: {long}, {lat}
        </p>
      </div>

      <CityPicker />

      <hr className="my-10" />

      <div className="mt-5 flex items-center justify-between space-x-10 mb-5">
        <div>
          <p className="text-xl">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>

          <p className="font-extralight">
            Timezone: {Intl.DateTimeFormat().resolvedOptions().timeZone}
          </p>
        </div>

        <p className="text-xl font-bold uppercase">
          {new Date().toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          })}
        </p>
      </div>

      <hr className="mt-10 mb-5" />

      <div className="flex items-center justify-between">
        <div>
          <Image
            src={`https://www.weatherbit.io/static/img/icons/${
              weatherCodeToString[results.current_weather.weathercode].icon
            }.png`}
            alt={weatherCodeToString[results.current_weather.weathercode].label}
            width={75}
            height={75}
          />
          <div className="flex items-center justify-between space-x-10">
            <p className="text-6xl font-semibold">
              {results.current_weather.temperature.toFixed(1)}°F
            </p>

            <p className="text-right font-extralight text-lg">
              {weatherCodeToString[results.current_weather.weathercode].label}
            </p>
            <p className="text-xs">
              {" "}
              Feels like: {results.hourly.apparent_temperature[0].toFixed(1)}°F
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-2 py-5">
        <div className="flex items-center space-x-2 px-4 py-3 border border-[#6F90CD] rounded-md bg-[#405885]">
          <SunIcon className="h-10 w-10 text-gray-400" />

          <div className="flex-1 flex justify-between items-center">
            <p className="font-extralight">Sunrise</p>
            <p className="uppercase text-2xl">
              {new Date(results.daily.sunrise[0]).toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              })}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 px-4 py-3 border border-[#6F90CD] rounded-md bg-[#405885]">
          <MoonIcon className="h-10 w-10 text-gray-400" />

          <div className="flex-1 flex justify-between items-center">
            <p className="font-extralight">Sunset</p>
            <p className="uppercase text-2xl">
              {new Date(results.daily.sunset[0]).toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              })}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 px-4 py-3 border border-[#6F90CD] rounded-md bg-[#405885]">
          <CloudIcon className="h-10 w-10 text-gray-400" />
          <div className="flex-1 flex justify-between items-center">
            <p className="font-extralight">Chance of rain</p>
            <p className="text-2xl">
              {results.daily.precipitation_probability_max[1].toFixed(1)}%
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 px-4 py-3 border border-[#6F90CD] rounded-md bg-[#405885]">
          <CloudIcon className="h-10 w-10 text-gray-400" />
          <div className="flex-1 flex justify-between items-center">
            <p className="font-extralight">Gusty</p>
            <p className="text-2xl">
              {results.current_weather.windspeed.toFixed(1)} Mph
            </p>
          </div>
          <hr className="mt-10 mb-5" />
        </div>

        <div className="text-sm pt-8">
          <h1 className="font-medium text-3xl py-3 text-amber-300">Forecast</h1>
        </div>
        <div className="flex items-center space-x-2 px-4 py-3 border border-[#6F90CD] rounded-md bg-[#405885]">
          <div className="flex-1 flex justify-between items-center text-xs">
            <h2 className="text-base">{tomorrowFormatted}</h2>
            <p className="font-extralight">Max:</p>
            <p className="uppercase font-semibold">
              {results.daily.temperature_2m_max[1].toFixed(1)}°F
            </p>
            <p className="font-extralight">Min:</p>
            <p className="uppercase font-semibold">
              {results.daily.temperature_2m_min[1].toFixed(1)}°F
            </p>
            <p className="font-extralight">Rain:</p>
            <p className="uppercase font-semibold">
              {results.daily.precipitation_probability_max[1].toFixed(1)}%
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 px-4 py-3 border border-[#6F90CD] rounded-md bg-[#405885]">
          <div className="flex-1 flex justify-between items-center text-xs">
            <h2 className="text-base">{dayThreeFormatted}</h2>
            <p className="font-extralight">Max:</p>
            <p className="uppercase font-semibold">
              {results.daily.temperature_2m_max[2].toFixed(1)}°F
            </p>
            <p className="font-extralight">Min:</p>
            <p className="uppercase font-semibold">
              {results.daily.temperature_2m_min[2].toFixed(1)}°F
            </p>
            <p className="font-extralight">Rain:</p>
            <p className="uppercase font-semibold">
              {results.daily.precipitation_probability_max[2].toFixed(1)}%
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 px-4 py-3 border border-[#6F90CD] rounded-md bg-[#405885]">
          <div className="flex-1 flex justify-between items-center text-xs">
            <h2 className="text-base">{dayFourFormatted}</h2>
            <p className="font-extralight">Max:</p>
            <p className="uppercase font-semibold">
              {results.daily.temperature_2m_max[3].toFixed(1)}°F
            </p>
            <p className="font-extralight">Min:</p>
            <p className="uppercase font-semibold">
              {results.daily.temperature_2m_min[3].toFixed(1)}°F
            </p>
            <p className="font-extralight">Rain:</p>
            <p className="uppercase font-semibold">
              {results.daily.precipitation_probability_max[3].toFixed(1)}%
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 px-4 py-3 border border-[#6F90CD] rounded-md bg-[#405885]">
          <div className="flex-1 flex justify-between items-center text-xs">
            <h2 className="text-base">{dayFiveFormatted}</h2>
            <p className="font-extralight">Max:</p>
            <p className="uppercase font-semibold">
              {results.daily.temperature_2m_max[4].toFixed(1)}°F
            </p>
            <p className="font-extralight">Min:</p>
            <p className="uppercase font-semibold">
              {results.daily.temperature_2m_min[4].toFixed(1)}°F
            </p>
            <p className="font-extralight">Rain:</p>
            <p className="uppercase font-semibold">
              {results.daily.precipitation_probability_max[4].toFixed(1)}%
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 px-4 py-3 border border-[#6F90CD] rounded-md bg-[#405885]">
          <div className="flex-1 flex justify-between items-center text-xs">
            <h2 className="text-base">{daySixFormatted}</h2>
            <p className="font-extralight">Max:</p>
            <p className="uppercase font-semibold">
              {results.daily.temperature_2m_max[5].toFixed(1)}°F
            </p>
            <p className="font-extralight">Min:</p>
            <p className="uppercase font-semibold">
              {results.daily.temperature_2m_min[5].toFixed(1)}°F
            </p>
            <p className="font-extralight">Rain:</p>
            <p className="uppercaseg">
              {results.daily.precipitation_probability_max[5].toFixed(1)}%
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 px-4 py-3 border border-[#6F90CD] rounded-md bg-[#405885]">
          <div className="flex-1 flex justify-between items-center text-xs">
            <h2 className="text-base">{daySevenFormatted}</h2>
            <p className="font-extralight">Max:</p>
            <p className="uppercase font-semibold">
              {results.daily.temperature_2m_max[6].toFixed(1)}°F
            </p>
            <p className="font-extralight">Min:</p>
            <p className="uppercase font-semibold">
              {results.daily.temperature_2m_min[6].toFixed(1)}°F
            </p>
            <p className="font-extralight">Rain:</p>
            <p className="uppercase font-semibold">
              {results.daily.precipitation_probability_max[6].toFixed(1)}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InformationPanel;
