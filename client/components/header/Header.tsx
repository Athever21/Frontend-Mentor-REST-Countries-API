import React, { useState, useEffect } from "react";
import "./Header.scss";

export default ({m}: {m: {mode: string,setMode: Function}}) => {

  const changeTheme = () => m.setMode((a: string) => a === "dark" ? "light" : "dark"); 

  useEffect(() => {
    const remove = m.mode === "dark" ? "light" : "dark";
    const root = document.getElementById("root");
    const header = document.querySelector("header");
    root.classList.add(`${m.mode}-background`);
    header.classList.add(`${m.mode}-element`);
    root.classList.remove(`${remove}-background`);
    header.classList.remove(`${remove}-element`);
  },[m.mode])

  return (
    <header>
      <h1>Where in the world?</h1>
      <button onClick={changeTheme} className={m.mode === "dark" ? "dark-button" : "light-button"}>
        {m.mode === "dark"
          ?
          <><i className="fas fa-sun"></i><p>Light mode</p></>
          :
          <><i className="far fa-moon"></i><p>Dark mode</p></>}
      </button>
    </header>
  )
}