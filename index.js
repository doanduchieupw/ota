const express = require('express');
const app = express();
const http = require('http');
const multer = require('multer');
const cors = require('cors');
app.use(cors());
const server = http.createServer(app);
const { Server } = require('socket.io');
const path = require('path');
const io = new Server(server, {
    cors: {
        origin: '*',
    },
});
const router = express.Router();

// SAVE FILE
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/upload');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

let upload = multer({ storage: storage });

router.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

router.get('/upload/:time_file.bin', (req, res) => {
    let path = __dirname + '/public/upload/'
    console.log("🚀 ~ file: index.js ~ line 35 ~ router.get ~ path", path)
    let fileName = req.params.time_file + '.bin';
    console.log("🚀 ~ file: index.js ~ line 37 ~ router.get ~ fileName", fileName)
    res.download(path + fileName, fileName, (err) => {
        if (err) {
            console.log(err);
            res.send('Co loi');
        }
    });
});

router.post('/firmware/upload', upload.single('firmware'), (req, res, next) => {
    console.log(req.file);
    let fileUrl = '';
    if (req.file) {
        fileUrl = 'upload/' + req.file.filename;
    }

    res.status(200);
    res.json({ file_url: fileUrl });
});

io.on('connection', (socket) => {
    console.log('Conection to socket.io');

    socket.on('update_firmware', (data) => {
        console.log('url', data.firmware_url);
        io.to('devices').emit('update_firmware', data.firmware_url);
    });
});

app.use(router);
app.use('/upload/:time_file.bin',express.static('.'))

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
});
