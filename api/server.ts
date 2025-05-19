import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { tasksRoute } from './routes/tasks'
import { authRoute } from './routes/auth'
import { serveStatic } from 'hono/bun'

const app = new Hono()

app.use('*', logger())

const apiRoutes = app.basePath('/api').route('/tasks', tasksRoute).route('/', authRoute)

app.get('*', serveStatic({ root: './frontend/dist' }))
app.get('*', serveStatic({ path: './frontend/dist/index.html' }))
app.get('/favicon.ico', serveStatic({ path: './frontend/dist/favicon.svg' }))

export default app
export type ApiRoutes = typeof apiRoutes