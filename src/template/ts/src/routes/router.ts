import express from "express";

const router = express.Router();

<% if(rest) { %>
// Users routes
import userRoutes from "./userRoutes";
router.use('/users', userRoutes);
<% } else { %>
// You can require and use your routes here ;)
<% } %>

export default router;