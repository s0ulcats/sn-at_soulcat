import { ResCodeForCaptcha, ResCodesEnum } from "../api/api.ts";
import { authAPI } from "../api/authAPI.ts";
import { securityAPI } from "../api/securityAPI.ts";
import { BaseThunkType, InferActionsTypes } from "./reduxStore.ts";


let initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null,
}

const authReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SN/auth/SET_USER_DATA':
        case 'SN/auth/GET_CAPTCHA_URL_SUCCESS':
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
};

type SetAuthUserDataActionPayloadType = {
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean 
}

export const actions = {
    setAuthUserData: (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
        type: 'SN/auth/SET_USER_DATA', payload: { userId, email, login, isAuth }
    } as const),
    getCaptchaUrlSuccess: (capthaUrl: string) => ({
        type: 'SN/auth/GET_CAPTCHA_URL_SUCCESS', payload: { capthaUrl }
    } as const)
}



export const getAuthUserData = (): ThunkType => async (dispatch) => {
    let meData = await authAPI.me()

    if (meData.resultCode === ResCodesEnum.Success) {
        let { id, email, login } = meData.data;
        dispatch(actions.setAuthUserData(id, email, login, true));
    }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string| null): ThunkType => async (dispatch: any) => {
    let loginData = await authAPI.login(email, password, rememberMe, captcha)

    if (loginData.resultCode === ResCodesEnum.Success) {
        dispatch(getAuthUserData());
    } else {
        if ( loginData.resultCode === ResCodeForCaptcha.CaptchaIsRequired ) {
            dispatch(getCaptchaUrl())
        }
        
        let message = loginData.messages.length > 0 ? loginData.messages[0] : 'Some error';
        return Promise.reject(message);
    }
}

export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
    let data = await securityAPI.getCaptchaUrl();
    const capthaUrl = data.url;

    dispatch(actions.getCaptchaUrlSuccess(capthaUrl));
}

export const logout = (): ThunkType => async (dispatch) => {
    let response = await authAPI.logout()
    if (response.data.resultCode === 0) {
        dispatch(actions.setAuthUserData(null, null, null, false));
    }
}

export default authReducer;

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>