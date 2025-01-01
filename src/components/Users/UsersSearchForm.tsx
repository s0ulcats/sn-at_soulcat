import { SearchOutlined } from "@ant-design/icons";
import { Form as AntdForm, Button, Input, Select } from "antd";
import { Formik } from "formik";
import React, { FC } from "react";
import { useSelector } from "react-redux";
import { getUsersFilter } from "../../redux/users-selectors.ts";
import { FilterType } from "../../redux/usersReducer";
import s from "./Users.module.scss";

const { Option } = Select;

const UsersSearchFormValidate = (values: any) => {
    const errors: Record<string, string> = {};
    return errors;
};

type FriendFormType = "true" | "false" | "null";

type FormType = {
    term: string;
    friend: FriendFormType;
};

type PropsType = {
    onFilterChanged: (filter: FilterType) => void;
};

const UsersSearchForm: FC<PropsType> = React.memo((props) => {
    const filter = useSelector(getUsersFilter);

    const submit = (
        values: FormType,
        { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
    ) => {
        const filter: FilterType = {
            term: values.term,
            friend:
                values.friend === "null"
                    ? null
                    : values.friend === "true"
                    ? true
                    : false,
        };

        props.onFilterChanged(filter);
        setSubmitting(false);
    };

    return (
        <div className={s.searchFormWrapper}>
            <Formik
                enableReinitialize={true}
                initialValues={{
                    term: filter.term,
                    friend: String(filter.friend) as FriendFormType,
                }}
                validate={UsersSearchFormValidate}
                onSubmit={submit}
            >
                {({ isSubmitting, setFieldValue, values }) => (
                    <AntdForm layout="vertical" className={s.formWrapper}>
                        <AntdForm.Item label="Search Term" name="term">
                            <Input
                                placeholder="Enter search term"
                                value={values.term}
                                onChange={(e) => setFieldValue("term", e.target.value)}
                            />
                        </AntdForm.Item>

                        <AntdForm.Item label="Friend Status" name="friend">
                            <Select
                                value={values.friend}
                                onChange={(value) => setFieldValue("friend", value)}
                            >
                                <Option value="null">All</Option>
                                <Option value="true">Only followed</Option>
                                <Option value="false">Only unfollowed</Option>
                            </Select>
                        </AntdForm.Item>

                        <AntdForm.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                icon={<SearchOutlined />}
                                loading={isSubmitting}
                                onClick={() => submit(values, { setSubmitting: () => {} })}
                            >
                                Find
                            </Button>
                        </AntdForm.Item>
                    </AntdForm>
                )}
            </Formik>
        </div>
    );
});

export default UsersSearchForm;
