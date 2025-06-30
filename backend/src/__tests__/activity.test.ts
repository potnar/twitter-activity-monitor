import request from "supertest";
import { app } from "../app"; // 👈 musisz wyeksportować `app` z `app.ts`
import prisma from "../lib/prisma";

beforeEach(async () => {
  await prisma.activity.deleteMany();
  await prisma.profile.deleteMany();
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe("POST /activity", () => {
  it("creates a new profile and activity", async () => {
    const res = await request(app)
      .post("/activity")
      .send({ handle: "testuser", type: "TWEET" });

    expect(res.status).toBe(201);

    const profile = await prisma.profile.findUnique({
      where: { handle: "testuser" },
    });
    expect(profile).not.toBeNull();

    const activities = await prisma.activity.findMany({
      where: { profileId: profile!.id },
    });
    expect(activities.length).toBe(1);
  });
});
