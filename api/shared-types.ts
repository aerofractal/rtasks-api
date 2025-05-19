import { insertTaskSchema } from './db/schema/tasks'

export const createTaskSchema = insertTaskSchema.omit({
    userId: true,
    createdAt: true,
    completed: true,
})