import React, { useEffect, useState} from "react";
import {useHistory} from "react-router-dom";

import Loading from "../../Loading";

export default ({ match,m }: any) => {
  const [country, setCountry] = useState({} as any);
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  console.log(m);
  useEffect(() => {
    setLoading(true);
  }, [match.params.name]);

  useEffect(() => {
    (async () => {
      const url = `https://restcountries.eu/rest/v2/name/${match.params.name}?fullText=true`;
      const filters = "&fields=name;capital;region;population;flag;nativeName;subregion;topLevelDomain;languages;currencies;borders";
      const res = await (await fetch(url + filters)).json();
      if (res.length < 0) return;
      if (res[0].borders.length > 0) {
        const bordersUrl = `https://restcountries.eu/rest/v2/alpha?codes=${res[0].borders.join(";")}&fields=name`;
        const borders = await (await fetch(bordersUrl)).json();
        res[0].borders = borders.map((x: { name: string }) => x.name);
      }
      setCountry(res[0]);
      setLoading(false);
    })()
  }, [match.params.name]);

  const goTo = (name: string) => {
    history.push(`/country/${name}`);
  }

  return (
    <div className="single">
      <button onClick={() => history.push("/")} className={m === "dark" ? "dark-button" : "light-button"}>
        <i className="fas fa-long-arrow-alt-left"></i>
        <span>Back</span>
      </button>
      {loading ?
        <Loading />
        :
        country.name ?
          <div className="single-country">
            <img src={country.flag} alt="flag" />
            <div className="info">
              <h2>{country.name}</h2>
              <div className="split">
                <div>
                  <p><b>Native Name:</b>{country.nativeName}</p>
                  <p><b>Population:</b>{country.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
                  <p><b>Region:</b>{country.region}</p>
                  <p><b>Sub Region:</b>{country.subregion}</p>
                  <p><b>Capital:</b>{country.capital}</p>
                </div>
                <div>
                  <p><b>Top Level Domain:</b>{country.topLevelDomain}</p>
                  <p><b>Currencies:</b>{country.currencies.map((x: any, i: number) =>x.name).join(", ")}</p>
                  <p><b>Languages:</b>{country.languages.map((x: any, i: number) => x.name).join(", ")}</p>
                </div>
              </div>
              <div className="borders">
                {country.borders.map((x: string, i: number) => <button className={m === "dark" ? "dark-button" : "light-button"} key={i} onClick={() => goTo(x)}>{x}</button>)}
              </div>
            </div>
          </div>
          :
          <h2>Country not found</h2>}
    </div>
  )
}