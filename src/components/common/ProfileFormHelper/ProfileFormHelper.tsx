import { Field } from "formik";
import React, { FC } from "react";

type PropsType = {
    placeholder: string;
    name: string;
    validators: string;
    component: React.ElementType; 
    props?: Record<string, any>;
    text?: string; 
};

export const createProfileField: FC<PropsType> = ({ placeholder, name, validators, component, props = {}, text = "" }) => {
    return (
        <div>
            <Field
                placeholder={placeholder}
                name={name}
                validators={validators}
                component={component}
                {...props}
            />
            {text}
        </div>
    );
};
