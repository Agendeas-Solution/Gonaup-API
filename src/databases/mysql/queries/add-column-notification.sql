ALTER TABLE 
    `notifications` 
ADD `is_admin_read` INT(1) NOT NULL DEFAULT '0' AFTER `is_by_admin`;