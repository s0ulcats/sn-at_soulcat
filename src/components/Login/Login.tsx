import React, { FC } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/hooks.ts";
import { login } from "../../redux/auth-reducer.ts";
import { AppStateType } from "../../redux/reduxStore";
import s from "./Login.module.scss"; // Импорт стилей
import LoginReduxForm, { FormValuesType } from "./LoginReduxForm.tsx";

export const Login: FC = () => {
    const captchaUrl = useSelector((state: AppStateType) => state.auth.captchaUrl);
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth);
    const dispatch = useAppDispatch();

    const handleSubmit = async (
        values: FormValuesType,
        { setErrors }: { setErrors: (errors: Record<string, string>) => void }
    ) => {
        try {
            await dispatch(
                login(
                    values.email,
                    values.password,
                    values.rememberMe,
                    values.captcha || null
                )
            );
        } catch (error) {
            setErrors({ _error: error });
        }
    };

    if (isAuth) {
        return <Navigate to="/profile" />;
    }

    return (
        <div className={s.loginPage}>
            <div className={s.loginContainer}>
                <h1>Login</h1>
                <LoginReduxForm onSubmit={handleSubmit} captchaUrl={captchaUrl} />
            </div>
        </div>
    );
};
