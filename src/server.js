require("dotenv/config");
require("express-async-errors");
const AppError = require("./utils/AppError");
const uploadConfig = require("./config/upload");
const migrationsRun = require("./database/sqlite/migrations");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");


const app = express();

app.use(cookieParser());
app.use(cors({
    origin: ["http://localhost:5173", "http:127.0.0.1:5173", "https://rocketmovies-alpha.vercel.app"],
    credentials: true,
}));

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => console.log(`🚀Server is running on Port ${PORT}`));

const routes = require("./Routes");

app.use(express.json());

app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER));
app.use(routes);

migrationsRun();

app.use((error, request, response, next) => {
    if(error instanceof AppError) {
        return response.status(error.statusCode).json({
            status: "error",
            message: error.message
        })
    }

    console.error(error);

    return response.status(500).json({
        status: "error",
        message: "Internal server error"
    })
})
