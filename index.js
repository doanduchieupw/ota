const express = require('express');

const app = express();
const router = express.Router();
const port = 3000;

router.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/.netlify/functions/api',router);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

module.exports.handler = serverless(app);
