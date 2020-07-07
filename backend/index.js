const express = require('express');

const app = express();

app.get('/', (req, res) => {
    return res.json({
        evento: 'Semana Omnistack 11.0',
        aluno: 'Michael Vinicius'
    });
});

app.listen(3333);