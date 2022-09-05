const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
app.use(cors());
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server, {
  cors:{
    origin:'*',
  }
});
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

io.on('connection', socket => {
  console.log('Conection to socket.io');
  socket.on('message', ({ name, message }) => {
    io.emit('message', { name, message })
  })
});

app.use(router);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
});
