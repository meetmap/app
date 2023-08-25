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
import Animated, { Layout, useAnimatedStyle, withSpring } from "react-native-reanimated";
import { Formik, FormikErrors, FormikProps, useFormik, useFormikContext } from "formik";
import * as yup from 'yup'
import { z } from "zod";
import { t } from "i18next";

interface IRegisterFormData {
    name: string,
    username: string,
    email: string,
    birthDate: Date | null,
    password: string,
    repeatPassword: string
}
interface IRegisterFormDataErrors {
    name: string | null,
    username: string | null,
    email: string | null,
    birthDate: string | null,
    password: string | null,
    repeatPassword: string | null
}
const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])[A-Za-z0-9]{6,}$/;
const userFormSchema = z.object({
    name: z.string().nonempty({ message: t("registerNameError")}),
    username: z.string().nonempty({ message: t("registerUsernameError") }),
    email: z.string().email({ message: t("registerEmailError") }),
    birthDate: z.nullable(z.date()),
    password: z.string().refine(value => PASSWORD_REGEX.test(value), {
        message: t("registerPasswordError")
    }),
    repeatPassword: z.string(),
})
// .refine(data => data.password === data.repeatPassword, {
//     message: t("registerPasswordsNotMatchError")
// });


const RegisterView = () => {
    const navigation = useNavigation<NavigationProps>()


    const headerValues = [
        {
            valueKey: "name",
            headerTitle:
                <>
                    <Title textcolor='Black'>Hey!</Title>
                    <Title textcolor='Black'>What’s your name?</Title>
                </>,
        },
        {
            valueKey: "username",
            headerTitle: <Title style={{ textAlign: "center" }} textcolor='Black'>Сome up with a username</Title>
        },
        {
            valueKey: "email",
            headerTitle: <Title style={{ textAlign: "center" }} textcolor='Black'>Enter your email</Title>
        },
        {
            valueKey: "birthDate",
            headerTitle: <Title style={{ textAlign: "center" }} textcolor='Black'>Enter your birth date</Title>
        },
        {
            valueKey: "password",
            headerTitle: <Title textcolor='Black'>Create a password</Title>
        },
        {
            valueKey: "repeatPassword",
            headerTitle: <Title textcolor='Black'>Repeat password</Title>
        }
    ]

    const [formValues, setFormValues] = useState<IRegisterFormData>({
        name: '',
        username: '',
        email: '',
        birthDate: null,
        password: '',
        repeatPassword: ''
    })
    const [formValuesErrors, setFormValuesErrors] = useState<IRegisterFormDataErrors>({
        name: null,
        username: null,
        email: null,
        birthDate: null,
        password: null,
        repeatPassword: null
    })


    const handleChange = (name: keyof IRegisterFormData, data: string) => {
        setFormValues((state) => ({ ...state, [name]: data }))
    }

    const handleDateChange = (date: DateTimePickerEvent) => {
        if (date.nativeEvent.timestamp) {
            const birthDate = new Date(date.nativeEvent.timestamp)
            setFormValues(state => ({ ...state, birthDate }))
        }
    }

    // const RegisterFunc = async () => {
    //     // await dispatch(RegisterUserThunk({
    //     //     name: values.name,
    //     //     username: values.username,
    //     //     email: values.email,
    //     //     birthDate: values.birthDate,
    //     //     password: values.password,
    //     // }))
    // }

    const { t } = useTranslation()


    const [currentStage, setCurrentStage] = useState(1)

    const useAnimatedInputStyles = (stage: number) => {
        return useAnimatedStyle(() => {
            const stageDiff = stage - currentStage;
            const isPastStage = stageDiff < 0;
            const isCloseToStage = Math.abs(stageDiff) < 2;
            const config = {
                damping: 10, // Уменьшите этот параметр для более плавной анимации
                stiffness: 50, // Уменьшите этот параметр для более плавной анимации
            };
            const scale = withSpring(1 - stageDiff / (isPastStage ? -10 : 10), config);
            const translateY = withSpring(stageDiff * 120, config);
            const opacity = isCloseToStage
                ? withSpring(1 - stageDiff / (isPastStage ? -10 : 10), config)
                : withSpring(0);
            const pointerEvents = stageDiff === 0 ? "auto" : "none"
            return {
                transform: [{ translateY }, { scale }],
                opacity,
                pointerEvents
            };
        });
    };

    const goBackForm = () => {
        if (currentStage <= 1) {
            return
        }
        setCurrentStage(stage => stage - 1)
    }

    const handleFillForm = async () => {
        if (currentStage >= 6) {
            return
        }
        const key: keyof IRegisterFormData = headerValues[currentStage - 1].valueKey
        try {
            const fieldSchema = userFormSchema.shape[key];
            await fieldSchema.parse(formValues[key]);
            setCurrentStage(stage => stage + 1)
            if (formValuesErrors[key]) {
                setFormValuesErrors((state => ({ ...state, [key]: null })))
            }
        } catch (error) {
            console.log(JSON.parse(error.message))
            setFormValuesErrors((state => ({ ...state, [key]: JSON.parse(error.message)[0].message })))
        }
    }


    // const handleFillForm = (formikProps) => {
    //     // Получаем массив имен полей из initialValues
    //     const fieldNames = Object.keys(loginValidationSchema.fields);

    //     // Проверяем валидность текущего поля
    //     if (currentFieldIndex < fieldNames.length - 1) {
    //         const currentFieldName = fieldNames[currentFieldIndex];
    //         formikProps.validateField(currentFieldName).then((error) => {
    //             if (!error) {
    //                 setCurrentFieldIndex(currentFieldIndex + 1);
    //             }
    //         });
    //     } else {
    //         // Последний этап, отправляем форму
    //         formikProps.handleSubmit();
    //     }
    // };
    // const handleChangeValue = () => {
    //     handleChange('name')
    //     validateField('name')
    // }
    return (
        <StyledLoginViewContainer>
            {/* <SafeAreaView> */}
            <StyledAuthHeadContent>
                <TouchableOpacity style={{ position: "absolute", left: 0, top: -24 }} onPress={() => navigation.goBack()}>
                    <GoBackArrowIcon />
                </TouchableOpacity>
                {headerValues[currentStage - 1].headerTitle}
            </StyledAuthHeadContent>
            {/* <Formik
                initialValues={{
                    name: '',
                    username: '',
                    email: '',
                    birthDate: null,
                    password: '',
                    repeatPassword: ''
                }}
                validateOnChange={false}
                validateOnBlur={false}
                validationSchema={loginValidationSchema}
                onSubmit={values => console.log(values)}
            >
                {({
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    values,
                    errors,
                    isValid,
                    validateField,
                }) => (
                    <> */}
            {/* <Button onPress={handleSubmit} title="Submit" /> */}
            <StyledInputsContent>
                <StyledFormContent>
                    <StyledAnimatedInputContainer style={[useAnimatedInputStyles(1)]}>
                        <RegisterPrimaryFormInput
                            label={formValuesErrors.name || 'Your name'}
                            name='name'
                            isError={!!formValuesErrors.name}
                            onChangeText={(value) => handleChange('name', value)}
                            value={formValues.name}
                            placeholder={t("name")}
                        />
                    </StyledAnimatedInputContainer>
                    <StyledAnimatedInputContainer style={[useAnimatedInputStyles(2)]}>
                        <RegisterPrimaryFormInput
                            label={formValuesErrors.username || 'Your username'}
                            name='username'
                            isError={!!formValuesErrors.username}
                            onChangeText={(value) => handleChange('username', value)}
                            value={formValues.username}
                            placeholder={t("username")}
                        />
                    </StyledAnimatedInputContainer>
                    <StyledAnimatedInputContainer style={[useAnimatedInputStyles(3)]}>
                        <RegisterPrimaryFormInput
                            label={formValuesErrors.email || 'Your email'}
                            name='email'
                            isError={!!formValuesErrors.email}
                            onChangeText={(value) => handleChange('email', value)}
                            value={formValues.email}
                            placeholder={t("email")}
                            keyboardType="email-address"
                        />
                    </StyledAnimatedInputContainer>
                    <StyledAnimatedInputContainer style={[useAnimatedInputStyles(4)]}>
                        <PrimaryDatePicker
                            inputStyle="White"
                            label="Your birth date"
                            value={formValues.birthDate}
                            inputSize={"Lg"}
                            placeholder={t("birthDate")}
                            onChange={handleDateChange}
                            maximumDate={new Date}
                            display="spinner"
                            momentLocaleFormat={{
                                en: "y - MMMM D",
                                ru: "D MMMM - y"
                            }}
                        />
                    </StyledAnimatedInputContainer>
                    <StyledAnimatedInputContainer style={[useAnimatedInputStyles(5)]}>
                        <RegisterPrimaryFormInput
                            label={formValuesErrors.password || 'Your password'}
                            name='password'
                            isError={!!formValuesErrors.password}
                            onChangeText={(value) => handleChange('password', value)}
                            value={formValues.password}
                            placeholder={t("password")}
                        />
                    </StyledAnimatedInputContainer>
                    <StyledAnimatedInputContainer style={[useAnimatedInputStyles(6)]}>
                        <RegisterPrimaryFormInput
                            label={formValuesErrors.repeatPassword || 'Repeat password'}
                            name='repeatPassword'
                            isError={!!formValuesErrors.repeatPassword}
                            onChangeText={(value) => handleChange('repeatPassword', value)}
                            value={formValues.repeatPassword}
                            placeholder={t("repeatPassword")}
                        />
                    </StyledAnimatedInputContainer>
                </StyledFormContent>
            </StyledInputsContent>
            <StyledButtonContent>
                {currentStage > 1 &&
                    <Animated.View>
                        <PrimaryButton onPress={goBackForm} btnType='Secondary' title={"<"} />
                    </Animated.View>
                }
                <PrimaryButton style={{ flex: 1 }} onPress={handleFillForm} btnType='Primary' title={t("goNext")} />
            </StyledButtonContent>
            {/* </>
                )}
            </Formik> */}
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
    z-index: 1;
    height: 100px;
    margin-top: 36px;
`
const StyledInputsContent = styled(View)`
    display: flex;
    flex-direction: column;
    gap: 36px;
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
  flex-direction: row;
  gap: 8px;
  padding: 0 16px;
`
const StyledAnimatedInputContainer = styled(Animated.View)`
    position: absolute;
    top: 100px;
    align-items: center;
    justify-content: center;
    width: 100%;
`

const RegisterPrimaryFormInput = styled(PrimaryFormInput)`
    padding: 24px;
    border-radius: 20px;
`
const RegisterSercuredFormInput = styled(SercuredFormInput)`
    padding: 24px;
    border-radius: 20px;
`
const RegisterPrimaryDatePicker = styled(PrimaryDatePicker)`
    padding: 24px;
    border-radius: 20px;
`