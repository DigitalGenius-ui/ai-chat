import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createDiscussion = mutation({
  args: {
    coachingOption: v.string(),
    topic: v.string(),
    expertName: v.string(),
    conversation: v.optional(v.any()),
  },
  handler: async (ctx, args) => {
    const data = {
      coachingOption: args.coachingOption,
      topic: args.topic,
      expertName: args.expertName,
      conversation: args.conversation || null,
    };

    const createDiscussion = await ctx.db.insert("discussionRoom", data);
    console.log(createDiscussion);

    return { ...data, discussionId: createDiscussion };
  },
});

export const getDiscussion = query({
  args: {
    id: v.id("discussionRoom"),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.get(args.id);
    console.log(result);
    return result;
  },
});
