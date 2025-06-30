import { Router, Request, Response } from "express";
import prisma from "../lib/prisma";
import { ProfileWithActivities } from "../types/profile";

const router = Router();

router.get("/profiles", async (req: Request, res: Response) => {
  try {
    const profiles = await prisma.profile.findMany({
      include: {
        activities: {
          select: {
            timestamp: true,
          },
          orderBy: {
            timestamp: "desc",
          },
        },
      },
    });

    const result = profiles.map((profile: ProfileWithActivities) => ({
      handle: profile.handle,
      activityCount: profile.activities.length,
      lastActivity:
        profile.activities.length > 0 ? profile.activities[0].timestamp : null,
    }));

    return res.json(result);
  } catch (err) {
    console.error("Error fetching profiles:", err);
    return res.status(500).json({ error: "Failed to fetch profiles" });
  }
});

export default router;
