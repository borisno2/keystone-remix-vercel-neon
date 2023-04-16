import { getContext } from "@keystone-6/core/context";
import config from "../../keystone";
import * as PrismaModule from "@prisma/client";
import type { Context } from ".keystone/types";
import { requireUserId } from "./session.server";

// Making sure multiple prisma clients are not created during hot reloading
export const keystoneContext: Context =
  (globalThis as any).keystoneContext || getContext(config, PrismaModule);

if (process.env.NODE_ENV !== "production")
  (globalThis as any).keystoneContext = keystoneContext;

export async function getSessionContext(request: Request) {
  const userId = await requireUserId(request);
  return keystoneContext.withSession({ userId });
}
