const express = require('express');

const app = express();
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use(router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
});
