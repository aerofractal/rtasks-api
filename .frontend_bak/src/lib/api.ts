import { type ApiRoutes } from '$server/types/api-routes'
import { hc } from 'hono/client'

const client = hc<ApiRoutes>('/')

export const api = client.api