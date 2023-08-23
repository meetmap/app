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

interface ILoginFormData {
    name: string,
    username: string,
    email: string,
    birthDate: Date | null,
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
        birthDate: null,
        password: '',
        repeatPassword: ''
    })

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

    const [errors, setErrors] = useState<Record<keyof ILoginFormData, string | null>>({
        name: null,
        username: null,
        email: null,
        birthDate: null,
        password: null,
        repeatPassword: null,
    });


    const validate = (valueKey: keyof ILoginFormData) => {
        const value = values[valueKey];

        switch (valueKey) {
            case "name":
                if (value?.length < 3) {
                    setErrors(prevErrors => ({
                        ...prevErrors,
                        name: "Name must be at least 3 characters long",
                    }));
                    return true
                } else {
                    setErrors(prevErrors => ({
                        ...prevErrors,
                        name: null,
                    }));
                }
                break
            case "username":
                // Ваша валидация для username
                break
            case "email":
                if (!/^\S+@\S+\.\S+$/.test(value as string)) {
                    setErrors(prevErrors => ({
                        ...prevErrors,
                        email: "Invalid email format",
                    }));
                    return true
                } else {
                    setErrors(prevErrors => ({
                        ...prevErrors,
                        email: null,
                    }));
                }
                break
            case "birthDate":
                // Ваша валидация для birthDate
                break;
            case "password":
                // Ваша валидация для password
                break;
            case "repeatPassword":
                if (value === values.password) {
                    setErrors(prevErrors => ({
                        ...prevErrors,
                        repeatPassword: null,
                    }));
                } else {
                    setErrors(prevErrors => ({
                        ...prevErrors,
                        repeatPassword: "Passwords do not match",
                    }));
                    return true
                }
                break;
        }
    };


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
                birthDate: new Date(date.nativeEvent.timestamp)
            })
    }

    const RegisterFunc = async () => {
        // await dispatch(RegisterUserThunk({
        //     name: values.name,
        //     username: values.username,
        //     email: values.email,
        //     birthDate: values.birthDate,
        //     password: values.password,
        // }))
    }

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
    const handleFillForm = () => {
        if (currentStage >= 6) {
            return
        }
        const error = validate(headerValues[currentStage - 1].valueKey as keyof ILoginFormData)
        if (!error) {
            setCurrentStage(stage => stage + 1)
        }
    }

    return (
        <StyledLoginViewContainer>
            <StyledInputsContent>
                <StyledAuthHeadContent>
                    <TouchableOpacity style={{ position: "absolute", left: 0, top: -24 }} onPress={() => navigation.goBack()}>
                        <GoBackArrowIcon />
                    </TouchableOpacity>
                    {headerValues[currentStage - 1].headerTitle}
                </StyledAuthHeadContent>
                <StyledFormContent>
                    <StyledAnimatedInputContainer style={[useAnimatedInputStyles(1)]}>
                        <RegisterPrimaryFormInput label={errors.name || 'Your name'} name='name' isError={!!errors.name} value={values.name} onChangeText={(text) => handleChange("name", text)} placeholder={t("name")} />
                    </StyledAnimatedInputContainer>
                    <StyledAnimatedInputContainer style={[useAnimatedInputStyles(2)]}>
                        <RegisterPrimaryFormInput label='Your username' name='username' isError={!!errors.username} value={values.username} onChangeText={(text) => handleChange("username", text)} placeholder={t("username")} />
                    </StyledAnimatedInputContainer>
                    <StyledAnimatedInputContainer style={[useAnimatedInputStyles(3)]}>
                        <RegisterPrimaryFormInput label={errors.email || 'Your e-mail'} name='email' isError={!!errors.email} value={values.email} onChangeText={(text) => handleChange("email", text)} placeholder='E-mail' />
                    </StyledAnimatedInputContainer>
                    <StyledAnimatedInputContainer style={[useAnimatedInputStyles(4)]}>
                        <PrimaryDatePicker
                            inputStyle="White"
                            label="Your birth date"
                            value={values.birthDate || new Date}
                            initialValue={new Date}
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
                        <RegisterSercuredFormInput label='Password' name='password' isError={!!errors.password} value={values.password} onChangeText={(text) => handleChange("password", text)} placeholder={t("password")} />
                    </StyledAnimatedInputContainer>
                    <StyledAnimatedInputContainer style={[useAnimatedInputStyles(6)]}>
                        <RegisterSercuredFormInput label='Repeat password' name='repeatPassword' isError={!!errors.repeatPassword} value={values.repeatPassword} onChangeText={(text) => handleChange("repeatPassword", text)} placeholder={t("repeatPassword")} />
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
`
const StyledInputsContent = styled(View)`
    display: flex;
    flex-direction: column;
    gap: 36px;
    margin-top: 50px;
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