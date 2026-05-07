import express from "express";
import morgan from "morgan";
import {
  default as noteRoutes,
  default as tagRoutes,
} from "./routes/noteRoutes";

const app = express();
const PORT = 3000;

//middlewares
app.use(express.json());
app.use(morgan("dev"));

//Routes
app.use("api/v1/notes", noteRoutes);
app.use("api/v1/tags", tagRoutes);

//server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;
