import express from "express";

const router = express.Router();

<% if(rest) { %>
// Users routes
<% if(aliases === true) { %>
import userRoutes from "@routes/userRoutes";
<% } else { %>
import userRoutes from "./userRoutes";
<% } %>
router.use('/users', userRoutes);
<% } else { %>
// You can require and use your routes here ;)
<% } %>

export default router;