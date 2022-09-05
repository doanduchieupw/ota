const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello World!');
});

// router.post('/api/firmware', upload.single('firmware'), (req, res, next) => {
//     console.log(req.file);
//     let fileUrl = '';
//     if (req.file) {
//         fileUrl = 'firmwares/' + req.file.filename;
//     }

//     res.status(200);
//     res.json({ file_url: fileUrl });
// });

io.on('connection', (socket) => {
    socket.emit('firmware', { ver: Math.random() });
});

app.use(router);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
});
