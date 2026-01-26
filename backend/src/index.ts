import express from "express";
import { connectToDatabase } from "./database";
import { FoodRouter } from "./routes/food.routes";
import { CategoryRouter } from "./routes/category.routes";
import cors from "cors";
import { AuthRouter, OrderRouter } from "./routes";

await connectToDatabase();

const app = express();

const port = 4000;
app.use(express.json());
app.use(cors());

app.use("/foods", FoodRouter);
app.use("/categories", CategoryRouter);
app.use("/auth", AuthRouter);
app.use("/order", OrderRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
