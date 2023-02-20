import type { TokenSupply } from "@prisma/client";

import { prisma } from "~/db.server";

export type { TokenSupply } from "@prisma/client";

export function getTokenSupply({
  date,
}: Pick<TokenSupply, "date">) {
  return prisma.tokenSupply.findFirst({
    select: {
      id: true,
      total: true,
      unlocked: true,
      locked: true,
      date: true,
    },
    where: {
      date: {
        gte: date,
      },
    }
  });
}

export function getTokenSupplyListItems({ date }: Pick<TokenSupply, "date">) {
  return prisma.tokenSupply.findMany({
    select: {
      id: true,
      total: true,
      unlocked: true,
      locked: true,
      date: true,
    },
    where: {
      date: {
        gte: date,
      },
    },
    orderBy: { date: "desc" },
  });
}