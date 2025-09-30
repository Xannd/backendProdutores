const express = require('express');
const router = require('./router');
const cors = require('cors');

const app = express();

// habilitando o cors na api
app.use(cors());
// para que a api consiga trabalhar com json
app.use(express.json())
// usa o router para pegar as rotas
app.use(router);

module.exports = app;