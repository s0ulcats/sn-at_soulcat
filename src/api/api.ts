import axios from "axios";
import { UsersType } from "../types/types";

export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers:     {
        "API-KEY": "dce1ab00-e5a0-4ae3-b12b-0b9d8e7c9e2b"
    }
});

export enum ResCodesEnum {
    Success = 0,
    Error = 1
}

export enum ResCodeForCaptcha {
    CaptchaIsRequired = 10
}

export type ResType<D = {}, RC = ResCodesEnum> = {
    data: D
    messages: Array<string>
    resultCode: RC
    status: string
}

export type GetItemsType = {
    items: Array<UsersType>
    totalCount: number
    error: string | null
}
