import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { FC } from 'react';
import messageFormSchema from "../FormValidation/MessageFormSchema.ts";
import classes from './Messages.module.scss';

type FormValuesType = {
    newMessageText: string;
  }
  

type PropsType = {
    onSubmit: (values: FormValuesType) => void;
}
  
const AddMessageForm: FC<PropsType> = ({ onSubmit }) => {
    return (
        <Formik<FormValuesType>
            initialValues={{ newMessageText: '' }}
            onSubmit={(values, { resetForm }) => {
                onSubmit(values);
                resetForm();
            }}
            validationSchema={messageFormSchema}
        >
            {({ errors, touched }) => (
                <Form>
                    <div>
                        <Field
                            name="newMessageText"
                            as="input"
                            placeholder="Enter text"
                            className={`${classes.input} ${errors.newMessageText && touched.newMessageText ? classes.errorTextarea : ''}`}
                        />
                        <ErrorMessage name="newMessageText" component="div" className={classes.error} />
                    </div>
                    <button className={classes.submit} type="submit">Send</button>
                </Form>
            )}
        </Formik>
    );
};

export default AddMessageForm;
