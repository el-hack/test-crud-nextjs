import * as z from "zod";


export const UserTypeSchema = z.object({
    "id": z.number(),
    "email": z.string(),
    "name": z.string(),
    "role": z.string().optional(),
    "password": z.string().optional(),
    "createdAt": z.coerce.date(),
    "updatedAt": z.coerce.date(),
    "deleteAt": z.null(),
    "delete": z.boolean().default(false),
});

export const UserResponseSchema = z.object({
    "status": z.boolean(),
    "message": z.string(),
    "data": z.array(UserTypeSchema),
});

export type UserType = z.infer<typeof UserTypeSchema>;
export type UserResponse = z.infer<typeof UserResponseSchema>;
