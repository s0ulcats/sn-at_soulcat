import { Form as AntForm, Button, Checkbox, Input } from "antd";
import { Formik, FormikHelpers } from "formik";
import React, { FC } from "react";
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
            {({ values, handleChange, handleBlur, handleSubmit, isSubmitting, errors, touched }) => (
                <AntForm layout="vertical" onFinish={handleSubmit}>
                    {/* Email */}
                    <AntForm.Item
                        label="E-mail"
                        validateStatus={errors.email && touched.email ? "error" : ""}
                        help={touched.email && errors.email}
                    >
                        <Input
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Enter your email"
                        />
                    </AntForm.Item>

                    {/* Password */}
                    <AntForm.Item
                        label="Password"
                        validateStatus={errors.password && touched.password ? "error" : ""}
                        help={touched.password && errors.password}
                    >
                        <Input.Password
                            name="password"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Enter your password"
                        />
                    </AntForm.Item>

                    {/* Remember Me */}
                    <AntForm.Item>
                        <Checkbox
                            name="rememberMe"
                            checked={values.rememberMe}
                            onChange={handleChange}
                        >
                            Remember me
                        </Checkbox>
                    </AntForm.Item>

                    {/* Captcha */}
                    {captchaUrl && (
                        <AntForm.Item>
                            <img src={captchaUrl} alt="captcha" />
                            <Input
                                name="captcha"
                                value={values.captcha}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="Enter captcha symbols"
                            />
                        </AntForm.Item>
                    )}

                    {/* Submit Button */}
                    <AntForm.Item>
                        <Button type="primary" htmlType="submit" loading={isSubmitting}>
                            Log in
                        </Button>
                    </AntForm.Item>
                </AntForm>
            )}
        </Formik>
    );
};

export default LoginReduxForm;
