import path from 'path'
import { v4 as uuid } from 'uuid'

import { S3 } from '../constants'

export const resolveS3KeyPath = (req, file, cb) => {
  let key = getNewFileName(file.originalname)
  if (file.fieldname === 'portfolio_image') {
    key = `${S3.PORTFOLIO_FILE.substring(1)}/portfolio-${key}`
  } else if (file.fieldname === 'profile_image') {
    key = `${S3.PROFILE.substring(1)}/user-${key}`
  }
  cb(null, key)
}

function getNewFileName(originalName: string) {
  return uuid() + path.extname(originalName)
}
