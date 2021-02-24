import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import Loading from "../../Loading";

export default ({m}: {m:string}) => {
  const [filter, setFilter] = useState("default");
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  const changeFilter = ({ target }: { target: HTMLSelectElement }) => setFilter(target.value);
  const changeSearch = ({ target }: { target: HTMLInputElement }) => setSearch(target.value);

  useEffect(() => {
    setLoading(true);
  }, [search, filter]);

  useEffect(() => {
    (async () => {
      if (search) return;
      const url = (filter === "default") ? "https://restcountries.eu/rest/v2/all" : `https://restcountries.eu/rest/v2/region/${filter}`;
      const filters = "?fields=name;capital;region;population;flag";
      const res = await (await fetch(url + filters)).json();
      setCountries(res);
      setLoading(false);
    })()
  }, [filter, search]);

  useEffect(() => {
    (async () => {
      if (!search) return;
      const url = `https://restcountries.eu/rest/v2/name/${search}`;
      const filters = "?fields=name;capital;region;population;flag";
      const res = await (await fetch(url + filters)).json();
      setCountries(res.length > 0 ? res : []);
      setLoading(false);
    })()
  }, [search]);

  const goTo = (name: string) => {
    history.push(`/country/${name}`);
  }

  return (
    <>
      <div className="controls">
        <div className={`search ${m === "dark" ? "dark-element" : "light-element"}`}>
          <i className="fas fa-search"></i>
          <input type="text" placeholder="Search for a country..." value={search} onChange={changeSearch} className={m === "dark" ? "dark-input" : "light-input "}/>
        </div>
        <select onChange={changeFilter} value={filter} className={m === "dark" ? "dark-input" : "light-input "}>
          <option value="default" hidden>Filter By Region</option>
          <option value="asia">Asia</option>
          <option value="americas">Americas</option>
          <option value="europe">Europe</option>
          <option value="oceania">Oceania</option>
          <option value="africa">Africa</option>
        </select>
      </div>
      <div className="countries">
        {loading ?
          <Loading />
          :
          countries.map((x, i) => {
            return (
              <div className={`country ${m === "dark" ? "dark-element" : "light-element "}`} key={i} onClick={() => goTo(x.name)}>
                <div className={`hover-effect hover-effect-${m === "dark" ? "dark" : "light"}`}></div>
                <img src={x.flag} alt="flag" />
                <div className="info">
                  <h2>{x.name}</h2>
                  <p><b>Population: </b> {x.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
                  <p><b>Region: </b> {x.region}</p>
                  <p><b>Capital: </b> {x.capital}</p>
                </div>
              </div>
            )
          })}
      </div>
    </>
  )
}