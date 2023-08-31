const multer = require("multer");
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        const pathStorage = `${__dirname}/../storage`;
        console.log(`${__dirname}/../storage`)

        cb(null, pathStorage);
    },
    filename: function(req, file, cb) {
        const ext = file.originalname.split(".").pop();
        const filename = `file-${Date.now()}.${ext}`;
        cb(null, filename)
    },
});
const uploadMiddleware = multer({ storage: storage });


module.exports = uploadMiddleware;