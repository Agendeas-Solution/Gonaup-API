import { S3_CONFIG } from '../config'

export const paginationLimitQuery = (pageNumber = 1, pageSize = 10) => {
  const pageOffset = (pageNumber - 1) * pageSize
  return ` limit ${pageSize} offset ${pageOffset} `
}

export const getMultiImgArray = (imagePath: string, s3Path: string) => {
  const imageArray = imagePath.split(',')
  return imageArray
    .map(img => (img ? S3_CONFIG.S3_URL + s3Path + '/' + img : ''))
    .filter(img => img)
}
