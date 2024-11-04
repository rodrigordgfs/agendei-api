import 'dotenv/config';
import express from "express";
import cors from "cors";
import router from "./routes.js";

const app = express();

const allowedOrigins = [`http://localhost:5173`, 'https://agendei-api-zaiu.onrender.com'];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(router);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
