import multer from 'multer'
import { S3Client } from '@aws-sdk/client-s3'
import multerS3 from 'multer-s3'
import { S3_CONFIG } from '../config'
import { resolveS3KeyPath } from '../utils'

const s3 = new S3Client({
  region: S3_CONFIG.REGION,
  credentials: {
    accessKeyId: S3_CONFIG.ACCESS_KEY_ID,
    secretAccessKey: S3_CONFIG.SECRET_ACCESS_KEY,
  },
})

export const uploadFileToS3 = multer({
  limits: { fileSize: 3 * 1024 * 1024 },
  storage: multerS3({
    s3: s3,
    bucket: S3_CONFIG.BUCKET_NAME,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname })
    },
    key: resolveS3KeyPath,
  }),
})
