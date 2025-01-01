import * as Yup from "yup";

interface MessageFormValues {
    newMessageText: string;
}

const messageFormSchema: Yup.Schema<MessageFormValues> = Yup.object().shape({
    newMessageText: Yup.string()
        .min(2, "Must be longer than 2 characters")
        .max(100, "Must be shorter than 100 characters")
        .required("Required")
});

export default messageFormSchema;
