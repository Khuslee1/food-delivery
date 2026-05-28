import 'dotenv/config'
import express from "express";
import { connectToDatabase } from "./database";
import { FoodRouter } from "./routes/food.routes";
import { CategoryRouter } from "./routes/category.routes";
import { AuthRouter } from "./routes/auth.routes";
import { OrderRouter } from "./routes/order.routes";
import cors from "cors";

await connectToDatabase();

const app = express();

const port = process.env.PORT ? Number(process.env.PORT) : 4000;
app.use(express.json());
app.use(cors());

app.use("/foods", FoodRouter);
app.use("/categories", CategoryRouter);
app.use("/auth", AuthRouter);
app.use("/order", OrderRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
