import express from 'express'
import multer from 'multer'
import admin from 'firebase-admin'
import serviceAccount from '../../coffeenodejs-firebase-adminsdk-v51jx-2836224408.json' assert { type: "json" }
import fs from 'fs'
import path from 'path'

const router = express.Router()
// Cấu jình Firebase SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'gs://coffeenodejs.appspot.com'
});

const bucket = admin.storage().bucket()
// Cấu hình Multer để xử lý tệp ảnh
const upload = multer({ dest: path.join('uploads/') })

// Định nghĩa route API để tải lên ảnh và lưu đường dẫn vào MongoDB
router.post('/image', upload.single('image'), (req, res) => {
  const file = req.file
  if (!file) {
    res.status(400).send('No file uploaded.')
    return
  }

  const fileName = `${Date.now()}-${file.originalname}`
  const filePath = file.path

  const fileUpload = bucket.file(fileName)
  const readStream = fs.createReadStream(filePath)
  const writeStream = fileUpload.createWriteStream({
    metadata: {
      contentType: file.mimetype
    }
});

const options = {
    action: 'read',
    expires: '06-30-2025'
};

writeStream.on('finish', async () => {
    const imageUrl = await fileUpload.getSignedUrl(options)
    if(imageUrl){
        res.status(200).send(imageUrl[0]);
    }
});

writeStream.on('error', (err) => {
  res.status(500).send('Error uploading image to Firebase Storage')
});

  readStream.pipe(writeStream)
});

export default router
