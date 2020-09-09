const unggah = require('unggah');

const storage = unggah.gcs({
    keyFilename: "./src/keys/ecartoimgpath-d0d048cb203e.json",
    bucketName: "bucket-test-ecarto",
    rename: (req, file) => {

        console.log('FILE')
        console.log(file, req)
        console.log('FILE')

        return `${Date.now()}-${file.originalname}`;
    }
});

const upload = unggah({
    limits: {
        fileSize: 1e15
    },
    storage: storage
});

module.exports = upload;