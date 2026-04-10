import { Router } from "express";
import { getUsers, getUser, createUser, putUser, delUser } from "../controllers/users.controllers.js";

const router = Router();

router.get("/users", getUsers);
router.get("/users/:id", getUser);
router.post("/users", createUser);
router.put("/users/:id", putUser);
router.delete("/users/:id", delUser);

export default router;