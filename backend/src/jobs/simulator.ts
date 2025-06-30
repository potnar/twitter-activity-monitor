import prisma from "../lib/prisma";

export async function simulateActivity() {
  const profiles = await prisma.profile.findMany();

  if (profiles.length === 0) return;

  const randomProfiles = profiles.sort(() => 0.5 - Math.random()).slice(0, 2);

  for (const profile of randomProfiles) {
    await prisma.activity.create({
      data: {
        type: "RETWEET",
        profileId: profile.id,
      },
    });
    console.log(`[SIMULATION] RETWEET by ${profile.handle}`);
  }
}
