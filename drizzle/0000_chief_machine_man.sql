CREATE TABLE `inventory` (
	`product_id` text PRIMARY KEY NOT NULL,
	`status` text DEFAULT 'in_stock' NOT NULL,
	`available_quantity` integer,
	`note_en` text DEFAULT '' NOT NULL,
	`note_ta` text DEFAULT '' NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_by` text DEFAULT '' NOT NULL
);
