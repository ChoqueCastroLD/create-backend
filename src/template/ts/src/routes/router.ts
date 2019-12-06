import express from "express";

const router = express.Router();

<% if(rest) { %>
// Users routes
<% if(aliases === true) { %>
import user from "@routes/user";
<% } else { %>
import user from "./user";
<% } %>
router.use(user);
<% } else { %>
// You can require and use your routes here ;)
<% } %>

export default router;