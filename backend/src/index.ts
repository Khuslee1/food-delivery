import  express from 'express'
import { connectToDatabase } from './database';
import { FoodRouter } from './routes/food.routes';
import { CategoryRouter } from './routes/category.routes';
import cors from 'cors'


await connectToDatabase();

const app = express();

const port = 4000
app.use(express.json());
app.use(cors())
// let arr : string[] = []

// app.get('/', (req, res) => {
//   res.send(arr) 
// })

// app.post('/', (req, res) => {
//     const data = req.body;
//     arr.push(data.value)
//     res.send("success")
// })

// app.put('/', (req,res)=> {
//     const dataPut = req.body;
//     arr=arr.filter((ele)=> dataPut.value==ele)
//     res.send("success")
// })

app.use('/foods', FoodRouter) ;
app.use('/categories', CategoryRouter) ;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

