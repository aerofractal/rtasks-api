import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { getUser } from '../kinde'

import { db } from '../db'
import { tasks as tasksTable, insertTaskSchema, selectTaskSchema } from '../db/schema/tasks'
import { desc, eq, and } from 'drizzle-orm'

import { createTaskSchema } from '../shared-types'

export const tasksRoute = new Hono()
    .get('/', getUser, async (c) => {
        const user = c.var.user
        const task = await db
            .select()
            .from(tasksTable)
            .where(eq(tasksTable.userId, user.id))
            .orderBy(desc(tasksTable.createdAt))
            .limit(100)

        return c.json({ tasks: task })
    })
    .post('/', getUser, zValidator('json', createTaskSchema), async (c) => {
        const user = c.var.user
        const task = await c.req.valid('json')

        const validatedTask = insertTaskSchema.parse({
            ...task,
            userId: user.id
        })

        const result = await db
            .insert(tasksTable)
            .values(validatedTask)
            .returning()

        c.status(201)
        return c.json({ task: result[0] })
    })
    .get('/total-tasks', getUser, async (c) => {
        const user = c.var.user
        const tasks = await db
            .select()
            .from(tasksTable)
            .where(eq(tasksTable.userId, user.id))
        const total = tasks.length
        return c.json({ total })
    })
    .get('/:id{[0-9]+}', getUser, async (c) => {
        const id = Number.parseInt(c.req.param('id'))
        const user = c.var.user

        const task = await db
            .select()
            .from(tasksTable)
            .where(and(eq(tasksTable.userId, user.id), eq(tasksTable.id, id)))
            .then(res => res[0])

        if (!task) {
            return c.notFound()
        }
        return c.json(task)
    })
    .delete('/:id{[0-9]+}', getUser, async (c) => {
        const id = Number.parseInt(c.req.param('id'))
        const user = c.var.user

        const task = await db
            .delete(tasksTable)
            .where(and(eq(tasksTable.userId, user.id), eq(tasksTable.id, id)))
            .returning()
            .then((res) => res[0])

        if (!task) {
            return c.notFound()
        }

        return c.json({ task: task })
    })
// .put