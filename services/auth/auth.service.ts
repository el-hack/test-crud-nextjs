import { client } from "@/lib/client";
import { AuthResponseType, AuthType } from "@/services/auth/types/auth.type";
import { configApp } from "@/utils/config-app";
export default class AuthService {

    static async login(email: string, password: string): Promise<AuthResponseType> {
        return  client<AuthResponseType>(`${configApp.api.baseUrl}/auth/login`,
            {
                method: "POST",
                data: {
                    email,
                    password
                }
            }).then((res) => res).catch((err) => err)
    }
} 