import express from "express";
import cors from "cors";
import UserRoutes from "./routes/userRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', UserRoutes);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
}); 