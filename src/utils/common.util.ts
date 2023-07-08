import { FieldPacket, RowDataPacket } from 'mysql2'
import { S3_CONFIG } from '../config'
import { searchHelper } from '../helpers'

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

export const getSkillList = async (
  record: any,
  key: string,
  isOnlyName = false,
) => {
  const [skillList] = (await searchHelper.getSkillListByIds(record[key])) as [
    RowDataPacket[][],
    FieldPacket[],
  ]

  return isOnlyName ? skillList.map(s => s['name']).toString() : skillList
}

export const getServiceList = async (
  record: any,
  key: string,
  isOnlyName = false,
) => {
  const [serviceList] = (await searchHelper.getServiceListByIds(
    record[key],
  )) as [RowDataPacket[][], FieldPacket[]]

  return isOnlyName ? serviceList.map(s => s['name']).toString() : serviceList
}
