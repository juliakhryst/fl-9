
const express = require('express');
const app = express();
const port = 3000;

const bodyParser = require('body-parser');
const routes = require('./routes');
const auth = require('./middlewares/delete-authorization')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(auth.deleteAuth());

app.get('/', (req, res) => {
    res.send('Welcome to our Car API!');
});

app.use(routes);
app.listen(port, () => {
    console.log(`Car API listening on port ${port}`)
});


