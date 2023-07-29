import { pool } from '../databases'
import { paginationLimitQuery } from '../utils'

class NotificationHelper {
  getNotificationList(data) {
    const limitQuery = paginationLimitQuery(data.page, data.size)

    const findQuery = `
    SELECT
      n.id,
      n.title,
      n.content,
      n.project_id,
      nr.is_read
    FROM
      notifications as n
    LEFT JOIN
      notification_recipients as nr
    ON
      n.id = nr.notification_id
    WHERE
      nr.user_id = ?
      OR n.is_by_admin = 1
    ORDER BY
      n.created_at DESC
    ${limitQuery}`

    return pool.query(findQuery, [data.userId])
  }

  getNotificationCount(data) {
    const findQuery = `
    SELECT
      COUNT(1) as total
    FROM
      notifications as n
    LEFT JOIN
      notification_recipients as nr
    ON
      n.id = nr.notification_id
    WHERE
      nr.user_id = ?
      OR n.is_by_admin = 1
    `
    return pool.query(findQuery, [data.userId])
  }

  getNotificationUnreadCount(userId: number) {
    const findQuery = `
    SELECT
      COUNT(1) as count
    FROM
      notifications as n
    LEFT JOIN
      notification_recipients as nr
    ON
      n.id = nr.notification_id
    WHERE
      nr.user_id = ?
      AND nr.is_read = 0
      OR n.is_by_admin = 1
    `
    return pool.query(findQuery, [userId])
  }
}

export const notificationHelper = new NotificationHelper()
