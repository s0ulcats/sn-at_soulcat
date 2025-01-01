import { Form as AntdForm, Button, Checkbox, Input } from "antd";
import { Formik } from "formik";
import React, { FC } from "react";
import * as Yup from "yup";
import { ProfileType } from "../../../types/types";
import classes from "./ProfileInfo.module.scss";

type PropsType = {
    profile: ProfileType;
    handleReset: () => void;
    saveProfile: (profile: ProfileType) => void;
    setEditMode: (editMode: boolean) => void;
};

const ProfileDataForm: FC<PropsType> = ({ profile, handleReset, saveProfile, setEditMode }) => {
    const ProfileDataSchema = Yup.object().shape({
        fullName: Yup.string().required("Full name is required"),
        aboutMe: Yup.string(),
        lookingForAJob: Yup.boolean(),
        lookingForAJobDescription: Yup.string(),
        ...Object.keys(profile.contacts).reduce(
            (acc, key) => ({
                ...acc,
                [key]: Yup.string().matches(/^https:\/\/.+/, "URL must start with https://"),
            }),
            {}
        ),
    });

    const onSubmit = (formData: ProfileType) => {
        saveProfile(formData);  // Передаем обновленный профиль в saveProfile
        setEditMode(false);     // Закрываем режим редактирования
    };

    return (
        <Formik
            initialValues={{
                fullName: profile.fullName || "",
                aboutMe: profile.aboutMe || "",
                lookingForAJob: profile.lookingForAJob || false,
                lookingForAJobDescription: profile.lookingForAJobDescription || "",
                contacts: {
                    github: profile.contacts.github || "",
                    vk: profile.contacts.vk || "",
                    facebook: profile.contacts.facebook || "",
                    instagram: profile.contacts.instagram || "",
                    twitter: profile.contacts.twitter || "",
                    website: profile.contacts.website || "",
                    youtube: profile.contacts.youtube || "",
                    mainLink: profile.contacts.mainLink || "",
                },
                userId: profile.userId,
                photos: profile.photos || { small: null, large: null },
            }}
            onSubmit={onSubmit}
            validationSchema={ProfileDataSchema}
        >
            {({ values, handleChange, handleBlur, handleSubmit }) => (
                <AntdForm layout="vertical" onFinish={handleSubmit}>
                    <AntdForm.Item label="Full name" name="fullName">
                        <Input
                            name="fullName"
                            value={values.fullName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Enter your full name"
                        />
                    </AntdForm.Item>
                    <AntdForm.Item label="About Me" name="aboutMe">
                        <Input.TextArea
                            name="aboutMe"
                            value={values.aboutMe}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Tell us about yourself"
                        />
                    </AntdForm.Item>
                    <AntdForm.Item name="lookingForAJob" valuePropName="checked">
                        <Checkbox
                            name="lookingForAJob"
                            checked={values.lookingForAJob}
                            onChange={handleChange}
                        >
                            Looking for a job
                        </Checkbox>
                    </AntdForm.Item>
                    <AntdForm.Item label="Professional skills" name="lookingForAJobDescription">
                        <Input.TextArea
                            name="lookingForAJobDescription"
                            value={values.lookingForAJobDescription}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Describe your professional skills"
                        />
                    </AntdForm.Item>
                    <b>Contacts:</b>
                    {Object.keys(profile.contacts).map((key) => (
                        <AntdForm.Item label={key} name={`contacts.${key}`} key={key}>
                            <Input
                                name={`contacts.${key}`}
                                value={values.contacts[key]}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder={`Enter ${key}`}
                            />
                        </AntdForm.Item>
                    ))}
                    <div className={classes.buttonGroup}>
                        <Button type="primary" htmlType="submit" style={{ marginRight: "10px" }}>
                            Save
                        </Button>
                        <Button onClick={handleReset}>Cancel</Button>
                    </div>
                </AntdForm>
            )}
        </Formik>
    );
};

export default ProfileDataForm;
