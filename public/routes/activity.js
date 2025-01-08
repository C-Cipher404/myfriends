import { Router, express } from "express";

const router = Router();
router.get("/", (req, res) => {
  res.send("Activity");
});
