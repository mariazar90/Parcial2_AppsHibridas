import express from "express";
import apiRoute from './api/routes/api.routes.js'
import cors from 'cors'

const app = express();
app.use('/api', express.json());
app.use(cors())
app.use('/api', apiRoute)

app.listen(2023, function () {
  console.log("Servidor funcionando");
});