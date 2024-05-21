import { z } from "zod";



export type BaseResponseType<T> = {
    message: string
    status: boolean
    data?: T
}