import { ErrorMessage, Field, Form, Formik } from "formik";
import postFormSchema from "../../../FormValidation/PostFormSchema.ts";
import classes from '../MyPosts.module.scss';

import { Button } from "antd";
import React, { FC } from "react";

export type AddNewPostFormValuesType = {
    newPostText: string;
}

type PropsType = {
    onSubmit: (values: AddNewPostFormValuesType) => void
}

const AddNewPostForm: FC<PropsType> = (props) => {
    return (
        <Formik<AddNewPostFormValuesType>
            initialValues={{ newPostText: '' }}
            onSubmit={(values, { resetForm }) => {
                props.onSubmit(values);
                resetForm();
            }}
            validationSchema={postFormSchema}>
            {({ errors, touched }) => (
                <Form>
                    <div>
                        <Field
                            name="newPostText"
                            as="input"
                            placeholder="Enter text"
                            className={`${classes.input} ${errors.newPostText && touched.newPostText ? classes.errorTextarea : ''}`}
                        />
                        <ErrorMessage name="newPostText" component="div" className={classes.error} />
                    </div>
                    <div>
                        <Button type="primary" className={classes.submit} htmlType="submit">Add post</Button>
                    </div>
                </Form>
            )}
        </Formik>
    );
}

export default AddNewPostForm