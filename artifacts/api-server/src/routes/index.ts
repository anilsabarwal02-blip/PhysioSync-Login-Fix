import { Router, type IRouter } from "express";
import healthRouter from "./health.js";

const router: IRouter = Router();

router.get("/", (_req, res) => {
  res.json({ status: "ok", message: "PhysioSync API Server is running" });
});

router.use(healthRouter);

export default router;
