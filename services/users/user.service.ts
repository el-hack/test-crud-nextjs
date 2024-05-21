import { client } from "@/lib/client";
import { UserResponse, UserType } from "./types/response.type";
import { configApp } from "@/utils/config-app";
import { CreateUserDto } from "./dto/create-user.dto";
import { BaseResponseType } from "../base-response.type";


export default class UserService {

    static async getAll(): Promise<UserResponse> {
        return await client<UserResponse>(`${configApp.api.baseUrl}/users/all`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            }
        }).then((res) => res).catch((err) => err)
    }


    static async create(data: CreateUserDto): Promise<BaseResponseType<UserType>> {
        return await client<BaseResponseType<UserType>>(`${configApp.api.baseUrl}/users/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            data
        }).then((res) => res).catch((err) => err)
    }

    // delete user 
   static async delete(id: number): Promise<BaseResponseType<UserType>> {
        return await client<BaseResponseType<UserType>>(`${configApp.api.baseUrl}/users/delete/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
        }).then((res) => res).catch((err) => err)
    }
}