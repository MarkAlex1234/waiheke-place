import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";

export const listingsRouter = createTRPCRouter({
    create: protectedProcedure.input(z.object({ name: z.string(), description: z.string(), price: z.number() })).mutation(({ input, ctx }) => {
        //TODO save to database
        ctx.prisma.listing.create({
            data: {
                ...input,
                userId: ctx.auth.userId
            }
        })
    })
});