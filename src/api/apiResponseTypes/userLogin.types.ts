import { z } from "zod";

export const userLoginSchema = z.object({
  accessToken: z.string(),
  profileId: z.number(),
  profilePic: z.null(),
  refreshToken: z.string(),
  userEmail: z.string(),
  userName: z.string(),
  userType: z.string(),
  uuid: z.number(),
});

export type userLoginType = z.infer<typeof userLoginSchema>
