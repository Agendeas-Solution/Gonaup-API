import { FieldPacket, RowDataPacket } from 'mysql2'
import { EMAIL_CONFIG, S3_CONFIG } from '../config'
import { mailHelper, searchHelper } from '../helpers'
import { sendEmailInterface } from '../interfaces'

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

export async function sendEmail({
  to,
  subject = '',
  text = '',
  html = '',
}: sendEmailInterface) {
  try {
    await mailHelper.getTransport().sendMail({
      from: {
        name: EMAIL_CONFIG.SENDER_NAME,
        address: EMAIL_CONFIG.SENDER_EMAIL,
      },
      to,
      subject,
      text,
      html,
    })
  } catch (error) {
    console.log(error)
    return error
  }
}

export function emailSubjectAndContentFormatting(
  subject: string,
  content: string,
  data: any,
) {
  subject = subject.replace('[[EMAIL]]', data.email)

  content = content.replace('[[OTP]]', data.otp)
  content = content.replace(/\[\[PASSWORD_URL\]\]/g, data.password_url)

  return { subject, content }
}
