import React, {lazy, Suspense, useState} from "react";
import {hot} from "react-hot-loader";
import "./App.scss";

import Loading from "./Loading";
const Header = lazy(() => import("./components/header/Header"));
const Main = lazy(() => import("./components/main/Main"));

const App = () => {
  const [mode,setMode] = useState("dark");

  return(
    <div>
      <Suspense fallback={<Loading />}>
        <Header m={{mode,setMode}}/>
        <Main m={mode}/>
      </Suspense>
    </div>
  )
}

export default hot(module)(App);