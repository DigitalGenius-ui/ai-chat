import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const CreateUser = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    credits: v.number(),
    subscriptionId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const data = {
      email: args.email,
      name: args.name,
      credits: args.credits,
      subscriptionId: null,
    };

    //if user exists.
    const userData = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), data.email))
      .collect();

    if (userData.length === 0) {
      const createUser = await ctx.db.insert("users", data);
      console.log(createUser);

      return data;
    }

    return userData[0];
  },
});
