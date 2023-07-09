import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";

export const listingsRouter = createTRPCRouter({

    // List
    list: publicProcedure.query(({ ctx }) => {
        return ctx.prisma.listing.findMany();
    }),

    // Get
    get: publicProcedure.input(z.object({ id: z.string() })).query(({ input, ctx }) => {
        return ctx.prisma.listing.findUnique({
            where: {
                id: input.id
            }
        })
    }),

    // Create
    create: protectedProcedure.input(z.object({ name: z.string(), description: z.string(), price: z.number() })).mutation(async ({ input, ctx }) => {
        return await ctx.prisma.listing.create({
            data: {
                ...input,
                userId: ctx.auth.userId
            }
        });
    })
});
