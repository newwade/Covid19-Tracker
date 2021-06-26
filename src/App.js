import "./App.css";

import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import {
  FormControl,
  Select,
  MenuItem,
  Card,
  CardContent,
} from "@material-ui/core";
import Infobox from "./InfoBox";
import Map1 from "./Map";
import Table from "./Table";
import { sortData, prettyStat } from "./utils";
import Linegraph from "./Linegraph";
import "leaflet/dist/leaflet.css";
import { set } from "numeral";
function App() {
  const [countries, setCountries] = useState([]);
  const [mapCountries, setMapCountries] = useState([]);
  const [color, setColor] = useState(true);

  const [country, setCountry] = useState("WorldWide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tabledata, setTabledata] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);
  const [caseType, setcaseType] = useState("cases");

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  useEffect(() => {
    const getData = async () => {
      await fetch(" https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          setMapCountries(data);
          const sortedData = sortData(data);
          setTabledata(sortedData);
          setCountries(countries);
        });
    };
    getData();
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    console.log("code", countryCode);
    const url =
      countryCode === "WorldWide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(countryCode);
        setCountryInfo(data);
        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(4);
      });
  };

  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>Covid Tracker</h1>
          <FormControl className="app__dropdown">
            <Select
              onChange={onCountryChange}
              variant="outlined"
              value={country}
              className="app__dropdown1"
            >
              <MenuItem value="WorldWide">WorldWide</MenuItem>

              {countries.map((data) => (
                <MenuItem value={data.value}>{data.name}</MenuItem>
              ))}
              {/* <MenuItem value="WorldWide">WorldWide</MenuItem>
            <MenuItem value="WorldWide">WorldWide</MenuItem>

            <MenuItem value="WorldWide">WorldWide</MenuItem>
            <MenuItem value="WorldWide">WorldWide</MenuItem> */}
            </Select>
          </FormControl>
        </div>
        <div className="app__stats">
          <Infobox
            isRed
            active={caseType === "cases"}
            onClick={(e) => (setcaseType("cases"), setColor(true))}
            total={countryInfo.cases}
            title="Coronavirus Cases"
            cases={prettyStat(countryInfo.todayCases)}
          />
          <Infobox
            isGreen
            active={caseType === "recovered"}
            onClick={(e) => (setcaseType("recovered"), setColor(false))}
            total={countryInfo.recovered}
            title="Recovered"
            cases={prettyStat(countryInfo.todayRecovered)}
          />

          <Infobox
            isRed
            active={caseType === "deaths"}
            onClick={(e) => (setcaseType("deaths"), setColor(true))}
            total={countryInfo.deaths}
            title="Deaths"
            cases={prettyStat(countryInfo.todayDeaths)}
          />
        </div>
        <div>
          <Map1
            countries={mapCountries}
            casesType={caseType}
            center={mapCenter}
            zoom={mapZoom}
            color={color}
          />
        </div>
      </div>
      <Card className="app__right">
        <CardContent>
          <div className="app__information">
            <h2>Live cases by country</h2>
            <Table countries={tabledata} />
            <h2 className="app__right__title">Worlwide new {caseType}</h2>
            <Linegraph
              className="app__graph"
              caseType={caseType}
              color={color}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
