import { sql } from 'drizzle-orm'
import { text, integer, sqliteTable, index } from 'drizzle-orm/sqlite-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'

export const tasks = sqliteTable(
    'tasks',
    {
        id: integer('id').primaryKey(),
        userId: text('user_id').notNull(),
        title: text('title').notNull(),
        description: text('description').notNull(),
        completed: integer('completed', { mode: 'boolean' }).default(false),
        createdAt: text('created_at').notNull().default(sql`(current_timestamp)`)
    },
    (tasks) => [
        index('name_idx').on(tasks.userId)
    ]
)

export const insertTaskSchema = createInsertSchema(tasks, {
    title: z
        .string()
        .min(3, { message: 'Title must be at least 3 characters.' }),
    description: z
        .string()
        .min(3, { message: 'Description must be at least 3 characters.' })
})

export const selectTaskSchema = createSelectSchema(tasks)
