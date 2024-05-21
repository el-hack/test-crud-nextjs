import { client } from "@/lib/client";
import { AuthResponseType } from "../auth/types/auth.type";
import { configApp } from "@/utils/config-app";

export default class AccountService {
    static async getProfile(): Promise<AuthResponseType> {
        return await client<AuthResponseType>(`${configApp.api.baseUrl}/account/profile`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            }
        }).then((res) => res).catch((err) => err)
    }
}