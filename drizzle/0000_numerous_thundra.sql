CREATE TABLE `tasks` (
	`id` integer PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`title` text NOT NULL,
	`description` text NOT NULL,
	`completed` integer DEFAULT false
);
--> statement-breakpoint
CREATE INDEX `name_idx` ON `tasks` (`user_id`);