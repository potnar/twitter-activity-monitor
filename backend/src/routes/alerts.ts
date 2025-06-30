import { Router, Request, Response } from "express";
import prisma from "../lib/prisma";
import { subMinutes } from "date-fns";
import { ProfileWithActivities } from "../types/profile";

const router = Router();

router.get("/alerts", async (req: Request, res: Response) => {
  const threshold = subMinutes(new Date(), 1);

  const profiles = await prisma.profile.findMany({
    include: {
      activities: {
        select: { timestamp: true },
        orderBy: { timestamp: "desc" },
        take: 1,
      },
    },
  });

  const inactive = profiles.filter((profile: ProfileWithActivities) => {
    const last = profile.activities[0]?.timestamp;
    return !last || last < threshold;
  });

  const result = inactive.map((profile: ProfileWithActivities) => ({
    handle: profile.handle,
    lastActivity: profile.activities[0]?.timestamp ?? null,
  }));

  res.json(result);
});

export default router;
