import { Router, Request, Response } from "express";
import prisma from "../lib/prisma";

const router = Router();

router.post("/activity", async (req: Request, res: Response) => {
  const { handle, type, timestamp } = req.body;

  if (!handle || !type || !["TWEET", "RETWEET", "REPLY"].includes(type)) {
    return res.status(400).json({ error: "Invalid input" });
  }

  const time = timestamp ? new Date(timestamp) : new Date();

  const profile = await prisma.profile.upsert({
    where: { handle },
    update: {},
    create: { handle },
  });

  await prisma.activity.create({
    data: {
      type,
      timestamp: time,
      profileId: profile.id,
    },
  });

  return res.status(201).json({ message: "Activity recorded" });
});

export default router;
