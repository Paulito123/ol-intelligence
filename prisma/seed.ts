import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const getDaysArray = function (s: Date, e: Date) { for (var a = [], d = new Date(s); d <= new Date(e); d.setDate(d.getDate() + 1)) { a.push(new Date(d)); } return a; };

async function seed() {
  const email = "rachel@remix.run";

  // cleanup the existing database
  await prisma.user.delete({ where: { email } }).catch(() => {
    // no worries if it doesn't exist yet
  });

  const hashedPassword = await bcrypt.hash("racheliscool", 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  });

  const dates = getDaysArray(new Date("2023-01-01"), new Date());

  await Promise.all(dates.map(async (date, i) => {
    await prisma.tokenSupply.create({
      data: {
        total: 1000000 + (i * 100000), // 100,000 daily unlock
        unlocked: 0 + (i * 10000), // 10% unlocked
        locked: 1000000 + (i * 90000), // 90% locked
        date,
      },
    });
  }))

  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
