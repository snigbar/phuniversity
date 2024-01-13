import { UploadApiErrorResponse, v2 as cloudinary } from 'cloudinary'
import config from '../config/config'
import multer from 'multer'
import fs from 'fs'

cloudinary.config({
  cloud_name: config.cloudName,
  api_key: config.apiKey,
  api_secret: config.apiSecrets,
})

export const sendImageToColudinary = (
  imgName: string,
  path: string,
): Promise<Partial<UploadApiErrorResponse>> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      path,
      { public_id: imgName },
      function (error, result) {
        if (error) reject(error)

        resolve(result as Partial<UploadApiErrorResponse>)
        // delete a file asynchronously
        fs.unlink(path, (err) => {
          if (err) {
            console.log(err)
          } else {
            console.log('File is deleted.')
          }
        })
      },
    )
  })
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd() + '/uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  },
})

export const upload = multer({ storage: storage })
