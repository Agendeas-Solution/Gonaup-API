ALTER TABLE 
  `notifications` 
ADD `sender_id` INT NULL AFTER `content`, 
ADD `is_by_admin` INT(1) NOT NULL DEFAULT '0' AFTER `sender_id`;

ALTER TABLE notifications
  ADD CONSTRAINT `fk_notification_user_id` FOREIGN KEY (`sender_id`) REFERENCES `user_master` (`id`)