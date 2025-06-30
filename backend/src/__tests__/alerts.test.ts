import request from "supertest";
import { app } from "../app";
import prisma from "../lib/prisma";
import { subMinutes } from "date-fns";

describe("GET /alerts", () => {
  beforeAll(async () => {
    await prisma.activity.deleteMany();
    await prisma.profile.deleteMany();

    await prisma.profile.create({
      data: {
        handle: "inactiveUser",
        activities: {
          create: [
            {
              type: "TWEET",
              timestamp: subMinutes(new Date(), 31),
            },
          ],
        },
      },
    });
  });

  afterAll(async () => {
    await prisma.activity.deleteMany();
    await prisma.profile.deleteMany();
    await prisma.$disconnect();
  });

  it("should return inactive profiles", async () => {
    const res = await request(app).get("/alerts");

    expect(res.status).toBe(200);
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ handle: "inactiveUser" }),
      ])
    );
  });
});
