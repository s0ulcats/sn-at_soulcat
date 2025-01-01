import * as Yup from "yup";

interface PostFormValues {
    newPostText: string;
}

const postFormSchema: Yup.Schema<PostFormValues> = Yup.object({
    newPostText: Yup.string()
        .min(2, "Must be longer than 2 characters")
        .max(100, "Must be shorter than 100 characters")
        .required("Required"),
});

export default postFormSchema;
