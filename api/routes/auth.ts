import { Hono } from 'hono';
import { kindeClient, sessionManager } from '../kinde';
import { getUser } from '../kinde';

export const authRoute = new Hono()

    .get("/login", async (c) => {
        const loginUrl = await kindeClient.login(sessionManager(c));
        return c.redirect(loginUrl.toString());
    })
    .get("/register", async (c) => {
        const registerUrl = await kindeClient.register(sessionManager(c));
        return c.redirect(registerUrl.toString());
    })
    .get("/callback", async (c) => {
        const url = new URL(c.req.url);
        await kindeClient.handleRedirectToApp(sessionManager(c), url);
        return c.redirect("/");
    })
    .get("/logout", async (c) => {
        const logoutUrl = await kindeClient.logout(sessionManager(c));
        // Manually append redirectTo if needed
        if (process.env.KINDE_LOGOUT_REDIRECT_URI) {
            logoutUrl.searchParams.set('redirectTo', process.env.KINDE_LOGOUT_REDIRECT_URI);
        }
        return c.redirect(logoutUrl.toString());
    })
    .get("/me", getUser, async (c) => {
        const user = c.var.user
        return c.json({ user });
    })