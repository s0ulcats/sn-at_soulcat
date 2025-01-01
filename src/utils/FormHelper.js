import { Field, ErrorMessage } from "formik";

export const createField = (type, name, placeholder) => (
    <div>
        <Field type={type} name={name} placeholder={placeholder} />
    </div>
)

export const errorInField = (name, component) => (
    <div>
        <ErrorMessage name={name} component={component} />
    </div>
)