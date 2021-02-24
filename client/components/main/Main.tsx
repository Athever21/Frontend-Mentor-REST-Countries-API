import React, { lazy } from "react";
import { Switch, Route } from "react-router-dom";
import "./Main.scss"

const Home = lazy(() => import("./Home"));
const Single = lazy(() => import("./Single"));

export default ({m}: {m: string}) => {
  return (
    <main>
      <Switch>
        <Route path="/country/:name" render={(props: any) => <Single {...props} m={m}/>} />
        <Route path="/" render={() => <Home m={m}/>} />
      </Switch>
    </main>
  )
}