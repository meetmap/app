import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../../store/hooks";
import PrimaryButton from "../../shared/Buttons/PrimaryButton";
import { Button, Modal, Pressable, TouchableOpacity, View, Text } from "react-native";
import { LoginUserThunk, RegisterUserThunk } from "../../store/slices/userSlice";
import styled from "styled-components/native";
import PrimaryFormInput from "../../shared/Input/PrimaryFormInput";
import { H1, H2, H6, Span, Title } from "../../shared/Text";
import { SafeAreaView } from "react-native-safe-area-context";
import SercuredFormInput from "../../shared/Input/SercuredFormInput";
import GoBackArrowIcon from "../../shared/Icons/GoBackArrowIcon";
import { useNavigation } from "@react-navigation/native";
import { NavigationProps } from "../../types/NavigationProps";
import RNDateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import PrimaryDatePicker from "../../shared/Input/PrimaryDatePicker";
import { useTranslation } from "react-i18next";

interface ILoginFormData {
    name: string,
    username: string,
    email: string,
    birthDate: number,
    password: string,
    repeatPassword: string
}
interface IErrors {
    name?: string;
    username?: string;
    email?: string;
    birthDate?: string;
    password?: string;
    repeatPassword?: string;
}

const RegisterView = () => {

    const dispatch = useAppDispatch()
    const navigation = useNavigation<NavigationProps>()


    const [values, setValues] = useState<ILoginFormData>({
        name: '',
        username: '',
        email: '',
        birthDate: Date.now(),
        password: '',
        repeatPassword: ''
    })

    const [errors, setErrors] = useState<IErrors>({})
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleChange = (name: string, data: string) => {
        setValues({
            ...values,
            [name]: data
        })
    }

    const handleDateChange = (date: DateTimePickerEvent) => {
        if (date.nativeEvent.timestamp)
            setValues({
                ...values,
                birthDate: date.nativeEvent.timestamp
            })
    }

    const validate = (values: ILoginFormData) => {
        const errors: IErrors = {}

        if (!values.name?.trim()) {
            errors.username = 'Name is required'
        }

        if (!values.username?.trim()) {
            errors.username = 'Username is required'
        }

        // Email Errors
        if (!values.email) {
            errors.email = 'Email is required'
        } else if (!/\S+@\S+\.\S+/.test(values.email)) {
            errors.email = 'Email is invalid'
        }

        if (!values.birthDate) {
            errors.birthDate = 'Date is required'
        }

        // Password Errors
        if (!values.password) {
            errors.password = 'Password is required'
        } else if (values.password.length < 6) {
            errors.password = 'Password needs to be 6 characters or more'
        }

        if (!values.repeatPassword) {
            errors.repeatPassword = 'Please repeat your password'
        } else if (values.repeatPassword !== values.password) {
            errors.repeatPassword = 'Passwords do not match'
        }

        return errors
    }

    const handleSubmit = () => {
        setErrors(validate(values))
        setIsSubmitting(true)
    }

    const RegisterFunc = async () => {
        await dispatch(RegisterUserThunk({
            name: values.name,
            username: values.username,
            email: values.email,
            birthDate: new Date(values.birthDate),
            password: values.password,
        }))
    }

    useEffect(() => {
        if (Object.keys(errors).length === 0 && isSubmitting) {
            RegisterFunc()
        }
    }, [errors])

    const { t } = useTranslation()

    return (
        <StyledLoginViewContainer>
            <StyledInputsContent>
                <StyledAuthHeadContent>
                    <TouchableOpacity style={{ position: "absolute", left: 0, top: 0 }} onPress={() => navigation.goBack()}>
                        <GoBackArrowIcon />
                    </TouchableOpacity>
                    <Title textcolor='Black'>Hey!</Title>
                    <Title textcolor='Black'>What’s your name?</Title>
                </StyledAuthHeadContent>
                <StyledFormContent>
                    <PrimaryFormInput label='Your name' name='name' isError={errors.name} value={values.name} onChangeText={(text) => handleChange("name", text)} placeholder='Name' />
                    <PrimaryFormInput label='Your username' name='username' isError={errors.username} value={values.username} onChangeText={(text) => handleChange("username", text)} placeholder={t("username")}/>
                    <PrimaryFormInput label='Your e-mail' name='email' isError={errors.email} value={values.email} onChangeText={(text) => handleChange("username", text)} placeholder='E-mail' />
                    <PrimaryDatePicker
                        label="Your birth date"
                        value={new Date(values.birthDate)}
                        onChange={handleDateChange}
                    />
                    <SercuredFormInput label='Password' name='password' isError={errors.password} value={values.password} onChangeText={(text) => handleChange("password", text)} placeholder={t("password")} />
                    <SercuredFormInput label='Repeat password' name='repeatPassword' isError={errors.repeatPassword} value={values.repeatPassword} onChangeText={(text) => handleChange("repeatPassword", text)} placeholder={t("repeatPassword")} />
                </StyledFormContent>
            </StyledInputsContent>
            <StyledButtonContent>
                <PrimaryButton onPress={handleSubmit} btnType='Primary' title={t("submit")}/>
            </StyledButtonContent>
        </StyledLoginViewContainer>
    )
}

export default RegisterView


const StyledLoginViewContainer = styled(SafeAreaView)`
    background-color: #F2F5FA;
    flex: 1;
    justify-content: space-between;
`
const StyledAuthHeadContent = styled(View)`
    align-items: center;
    position: relative;
`
const StyledInputsContent = styled(View)`
    display: flex;
    flex-direction: column;
    gap: 36px;
    margin-top: 40px;
    padding: 0 16px;
    flex: 1;
`

const StyledFormContent = styled(View)`
  flex-direction: column;
  flex-grow: 1;
  gap: 16px;
  flex: 1;
`
const StyledButtonContent = styled(View)`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0 16px;
`