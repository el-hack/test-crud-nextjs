
import * as z from "zod";


export const TokenSchema = z.object({
    "access_token": z.string(),
    "refresh_token": z.string(),
});
export type Token = z.infer<typeof TokenSchema>;

export const AuthTypeSchema = z.object({
    "id": z.number(),
    "email": z.string(),
    "name": z.string(),
    "role": z.string(),
    "password": z.string(),
    "createdAt": z.coerce.date(),
    "updatedAt": z.coerce.date(),
    "deleteAt": z.null(),
    "delete": z.boolean(),
    "token": TokenSchema,
});

export const AuthResponseTypeShema = z.object({
    "status": z.boolean(), 
    "message": z.string(), 
    "data": AuthTypeSchema
})
export type AuthType = z.infer<typeof AuthTypeSchema>;
export type AuthResponseType = z.infer<typeof AuthResponseTypeShema>
