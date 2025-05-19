# rTasks

This is a small tasks app with a SvelteKit frontend, and a Hono/TS backend.

## Running for Development
Both the backend server, AND the frontend Vite server must be running at the same time.
```bash
$ bun run dev

and

./frontend $ bun run dev
```
This is required as you cannot make unauthenticated requests directly to the backend server on :3000, so you need to use the frontend to log in first.

## Endpoints
### Tasks Routes
```ts
| GET | app.get('/api/tasks')
// returns all tasks
```
```ts
| POST | app.post('/api/tasks')
// creates a new task
```
```ts
| GET | app.get('/api/total-tasks')
// returns the number of total tasks with your user id
```
```ts
| GET | app.get('/api/tasks/:id{[0-9]+}')
// returns a specific task by task id
```
```ts
| DELETE | app.delete('/api/tasks/:id{[0-9]+}')
// deletes a specific task by task id
```
```ts
// TO DO

| PUT | app.put('/api/tasks/:id{[0-9]+}')
// edit/update a speicifc task by task id
```

### Auth Routes
```ts
| GET | app.get('/api/login')
// Kinde Login
```
```ts
| GET | app.get('/api/register')
// Kinde Register
```
```ts
| GET | app.get('/api/callback')
// Kinde Callback
```
```ts
| GET | app.get('/api/logout')
// Kinde Logout
```
```ts
| GET | app.get('/api/me')
// Return the user's information
```

## Deployment
This project is configured to deploy either to fly.io, or you can build a bare docker image with the Dockerfile provided.

initial deployment:
```bash
$ fly launch
```
then
```bash
$ fly deploy
```
afterwards.

To deploy locally (substitute variables for your real values):
```bash
$ docker build -t $YOUR_IMAGE_TAG .

$ docker run -d -p 3000:3000 -e KINDE_ISSUER_URL='$KINDE_ISSUER_URL' \
-e KINDE_CLIENT_ID='$KINDE_CLIENT_ID' \
-e KINDE_CLIENT_SECRET='$KINDE_CLIENT_SECRET' \
-e KINDE_SITE_URL='$KINDE_SITE_URL' \
-e KINDE_LOGOUT_REDIRECT_URI='$KINDE_LOGOUT_REDIRECT_URI' \
-e KINDE_DOMAIN='$KINDE_DOMAIN' \
-e KINDE_REDIRECT_URI='$KINDE_REDIRECT_URI' \
--name rtasks \
$YOUR_IMAGE_TAG
```
