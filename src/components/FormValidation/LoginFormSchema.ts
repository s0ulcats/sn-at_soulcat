import * as Yup from "yup";

interface LoginFormValues {
    email: string;
    password: string
    rememberMe?: boolean
}

const loginFormSchema: Yup.Schema<LoginFormValues> = Yup.object().shape({
    email: Yup.string()
        .email("Invalid email address")
        .required("Required"),
    password: Yup.string()
        .min(8, "Must be longer than 8 characters")
        .required("Required"),
    rememberMe: Yup.boolean()
});

export default loginFormSchema;
