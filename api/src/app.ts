import express from "express";
import morgan from "morgan";
import cors from "cors";
import config from "./config";
import { createRoles } from "./libs/initialSetup";

//Importing routes
import authRoutes from "./routes/auth.routes";
import productsRoutes from "./routes/product.routes";
import userRoutes from "./routes/user.routes";

/**
 * app is the backend main application. We use:
 *     morgan: to get info about the requests,
 *     cors: to specify what servers are allowed to request stuff. We set all
 *     express.json: so that the app can understand json request.
 *     express.urlencoded: so that the app can understand forms queries.
 */
const app = express();
createRoles();

app.set("port", config.PORT);

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes
app.use(authRoutes);
app.use(productsRoutes);
app.use(userRoutes);

export default app;
