import express from 'express';
import { mongoConnect } from "../src/config/MongoConnection";
import userRoutes from './routes/Routes';

const port = process.env.PORT || 3000;


const app = express();
app.use(express.json());

app.use('/v1/users', userRoutes);

async function startServer() {
  try {
    await mongoConnect();
    console.log("✅ Database connected!");
    app.listen(port, () => {
      console.log(`Server is running on ${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}
startServer();




