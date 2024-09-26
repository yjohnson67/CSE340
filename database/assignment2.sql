--What are we inserting?--
INSERT INTO account --What columns are we adding to...
    (
        account_firstname,
        account_lastname,
        account_email,
        account_password
    );
--What values should we put in these columns...
VALUES (
        'Tony',
        'Stark',
        'tony@starkent.com',
        'Iam1ronM@n'
    );
-----
--What are we doing...
UPDATE account --What info are we changing...
SET account_type = 'Admin' --Where do we make the change?..
WHERE account_firstname = 'Tony'
    AND account_lastname = 'Stark';
----
--We are deleting the client/admin from the list.
DELETE FROM account --Where.. (who)...
WHERE account_firstname = 'Tony'
    AND account_lastname = 'Stark';
---
--what are we doing? 
UPDATE inventory --How are we doing it? (You can replace a few words in a statement without using the whole desc.)
SET inv_description = REPLACE(
        inv_description,
        'small interiors',
        'a huge interior'
    ) --Where are we changing it?
WHERE inv_model = 'Hummer';
--
--Use an inner join to select the make and model fields from the inventory table and the classification name field from the classification table for inventory items that belong to the "Sport" category.
---
--What are we looking for? (Find)..
SELECT
	inventory.inv_make,
	inventory.inv_model,
	classification.classification_name
--Where are all of these things located?--
From
	inventory
--What resources are we going to be adjusting?
INNER JOIN
	classification ON inventory.classification_id = classification.classification_id
--Where are we making these changes?
WHERE
	classification. classification_name = 'Sport';
--
--Update all records in the inventory table to add "/vehicles" to the middle of the file path in the inv_image and inv_thumbnail columns using a single query.
--What?
UPDATE inventory
--How?
SET
	inv_image = REPLACE(inv_image, '/images/', 'images/vehicles'),
	inv_thumbnail = REPLACE(inv_thumbnail, '/images/', 'images/vehicles');
---
---
