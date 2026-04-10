import { Router } from "express";
import { getHello, getPong, getAbc } from "../controllers/index.controllers.js";

const router = Router();

router.get("/", getHello);

router.get("/ping", getPong);

router.get("/a/b/c", getAbc);

export default router;