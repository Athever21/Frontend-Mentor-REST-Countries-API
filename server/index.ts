import express, {Request, Response} from "express";
import path from "path";
import template from "../template";

const app = express();

if(process.env.NODE_ENV === "development") {
  require("./hotLoader").default(app);
}

app.use("/public",express.static(path.join(process.cwd(),"public")));
app.get("*",(req: Request, res: Response) => {
  return res.send(template());
});

const port = process.env.PORT || "3000";
app.listen(port, () => console.log(`Server running at ${port} port`));