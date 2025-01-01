import { instance, ResCodeForCaptcha, ResCodesEnum, ResType } from "./api.ts";

type MeResDataType = {
        id: number
        email: string 
        login: string
}

type LoginResDataType = {
        userId: number
}

export const authAPI = {
    me() {
        return instance.get<ResType<MeResDataType>>(`auth/me`).then(res => res.data);
    },
    login(email: string, password: string, rememberMe = false, captcha: string | null = null) {
        return instance.post<ResType<LoginResDataType, ResCodesEnum | ResCodeForCaptcha>>(`auth/login`, { email, password, rememberMe, captcha })
            .then(res => res.data);
    },
    logout() {
        return instance.delete(`auth/login`);
    }
};
