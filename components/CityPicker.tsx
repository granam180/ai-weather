"use client";

import { Country, City } from "country-state-city";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Select from "react-select";
import { GlobeIcon } from "@heroicons/react/solid";
import { AsyncPaginate } from "react-select-async-paginate";
import type { GroupBase, OptionsOrGroups } from "react-select";

type option = {
  value: {
    latitude: string;
    longitude: string;
    isoCode: string;
  };
  label: string;
} | null;

type cityOption = {
  value: {
    latitude: string;
    longitude: string;
    countryCode: string;
    name: string;
    stateCode: string;
  };
  label: string;
} | null;

function CityPicker() {
  const [selectedCountry, setSelectedCountry] = useState<option>(null);
  const [selectedCity, setSelectedCity] = useState<cityOption>(null);
  const router = useRouter();

  const options = Country.getAllCountries().map((country) => ({
    value: {
      latitude: country.latitude,
      longitude: country.longitude,
      isoCode: country.isoCode,
    },
    label: country.name,
  }));

  let cityOptions = City.getCitiesOfCountry(selectedCountry?.value.isoCode!)?.map((city) => {
    const state = city.stateCode ? `, ${city.stateCode}` : ''; // Get the state abbreviation if available
  
    return {
      value: {
        latitude: city.latitude!,
        longitude: city.longitude!,
        countryCode: city.countryCode,
        name: city.name,
        stateCode: city.stateCode,
      },
      label: `${city.name}${state}`, // Include the state abbreviation in the label
    };
  });
  

  const sleep = (ms: number) =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(undefined);
      }, ms);
  });

  const loadOptions = async (
    search: string,
    prevOptions: OptionsOrGroups<cityOption, GroupBase<cityOption>>
  ) => {
    await sleep(1000);

    let filteredOptions;
    
    if (!search) {
      filteredOptions = cityOptions;
    } else {
      const searchLower = search.toLowerCase();

      filteredOptions = cityOptions?.filter(({ label }) =>
        label.toLowerCase().includes(searchLower)
      );
    }

    const hasMore = filteredOptions.length > prevOptions.length + 10;
    const slicedOptions = filteredOptions.slice(
      prevOptions.length,
      prevOptions.length + 10
    );

    return {
      options: slicedOptions,
      hasMore
    };
  };

  const handleSelectedCountry = (option: option) => {
    setSelectedCountry(option);
    setSelectedCity(null);
  };

  const handleSelectedCity = (option: cityOption) => {
    setSelectedCity(option);
    router.push(`/location/${option?.value.name}/${option?.value.latitude}/${option?.value.longitude}`)
  };

  const handleMenuClose = () => {
    setSelectedCountry(null);
    setSelectedCity(null);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex items-center space-x-2 text-white/80">
          <GlobeIcon className="h-5 w-5 text-white"/>
          <label htmlFor="country">Country</label>
        </div>
        <Select
          className="text-black"
          value={selectedCountry}
          onChange={handleSelectedCountry}
          options={options}
        />
      </div>

      {selectedCountry && (
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-white/80">
            <GlobeIcon className="h-5 w-5 text-white"/>
            <label htmlFor="country">City</label>
          </div>
          <AsyncPaginate
            className="text-black"
            value={selectedCity}
            loadOptions={loadOptions}
            onChange={handleSelectedCity}
            // onMenuClose={handleMenuClose}
          />
        </div>
      )}
    </div>
  );
}

export default CityPicker;
