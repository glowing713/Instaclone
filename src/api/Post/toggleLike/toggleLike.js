import { isAuthenticated } from "../../../middleware";
import { makePrismaClientClass } from "prisma-client-lib";
import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    toggleLike: async (_, args, { request }) => {
      isAuthenticated(request);
      const { postId } = args;
      const { user } = request;
      try {
        const existingLike = await prisma.$exists.like({
          AND: [
            {
              user: {
                id: user.id,
              },
            },
            {
              post: {
                id: postId,
              },
            },
          ],
        });
        if (existingLike) {
          // TO DO
        } else {
          const newLike = await prisma.createLike({
            user: {
              connect: {
                id: user.id,
              },
            },
            post: {
              connect: {
                id: postId,
              },
            },
          });
        }
        return true;
      } catch {
        return false;
      }
    },
  },
};
