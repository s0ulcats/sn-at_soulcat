import { Form, Formik, FormikHelpers } from "formik";
import React, { FC } from "react";
import { createField, errorInField } from "../../utils/FormHelper";
import loginFormSchema from "../FormValidation/LoginFormSchema.ts";

export type FormValuesType = {
    email: string;
    password: string;
    rememberMe: boolean;
    captcha?: string;
};

type PropsType = {
    onSubmit: (
        values: FormValuesType,
        formikHelpers: FormikHelpers<FormValuesType>
    ) => Promise<void> | void;
    captchaUrl: string | null;
};

const LoginReduxForm: FC<PropsType> = ({ onSubmit, captchaUrl }) => {
    const initialValues: FormValuesType = {
        email: "",
        password: "",
        rememberMe: false,
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={loginFormSchema}
            onSubmit={onSubmit}
        >
            {({ isSubmitting }) => (
                <Form>
                    {createField("text", "email", "e-mail")}
                    {errorInField("email", "div")}

                    {createField("password", "password", "password")}
                    {errorInField("password", "div")}

                    {createField("checkbox", "rememberMe", null)}
                    <label htmlFor="rememberMe"> Remember me </label>

                    {captchaUrl && <img src={captchaUrl} alt="captcha" />}
                    {captchaUrl && createField("captcha", "captcha", "Symbols")}

                    {errorInField("_error", "div")}

                    <button type="submit" disabled={isSubmitting}>
                        Log in
                    </button>
                </Form>
            )}
        </Formik>
    );
};

export default LoginReduxForm;
