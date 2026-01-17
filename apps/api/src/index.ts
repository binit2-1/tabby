import express, { Router } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import router from './routes/snippetRoutes';

const app:express.Application = express();
const PORT = process.env.PORT || 4000;

//Middleware
app.use(helmet());

//cors
app.use(cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use(express.json());

//Routes
app.use("/api", router)


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


export default app;