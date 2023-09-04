import React, { useState } from "react";
import { useAppDispatch } from "@src/store/hooks";
import { TouchableOpacity, View } from "react-native";
import { RegisterUserThunk } from "@src/store/slices/userSlice";
import styled from "styled-components/native";
import PrimaryFormInput from "@src/shared/Input/PrimaryFormInput";
import { Title } from "@src/shared/Text";
import { SafeAreaView } from "react-native-safe-area-context";
import SercuredFormInput from "@src/shared/Input/SercuredFormInput";
import GoBackArrowIcon from "@src/shared/Icons/GoBackArrowIcon";
import { useNavigation } from "@react-navigation/native";
import { NavigationProps } from "@src/types/NavigationProps";
import { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import PrimaryDatePicker from "@src/shared/Input/PrimaryDatePicker";
import { useTranslation } from "react-i18next";
import Animated, { useAnimatedStyle, withSpring } from "react-native-reanimated";
import { ZodError, z } from "zod";
import { PrimaryButton } from "@src/shared/Buttons";

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


const RegisterView = () => {
    const navigation = useNavigation<NavigationProps>()
    const { t } = useTranslation()
    const userFormSchema = z.object({
        name: z.string().nonempty({ message: t("registerNameError") }),
        username: z.string().nonempty({ message: t("registerUsernameError") }),
        email: z.string().email({ message: t("registerEmailError") }),
        birthDate: z.date(),
        password: z.string().min(6, t("registerPasswordLengthError")).refine(value => PASSWORD_REGEX.test(value), {
            message: t("registerPasswordError")
        }),
        repeatPassword: z.string(),
    })
    const dispatch = useAppDispatch()

    const headerValues = [
        {
            valueKey: "name",
            headerTitle: <Title textcolor='Black'>What’s your name?</Title>
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
            // const pointerEvents = stageDiff === 0 ? "auto" : "none"
            return {
                transform: [{ translateY }, { scale }],
                opacity,
                // pointerEvents
            };
        });
    };

    const goBackForm = () => {
        if (currentStage <= 1) {
            return
        }
        setCurrentStage(stage => stage - 1)
    }

    const handleFillForm = async (setStageValue?: number) => {
        const key: keyof IRegisterFormData = headerValues[currentStage - 1].valueKey
        if (currentStage < 6) {
            try {
                if(setStageValue && setStageValue < currentStage){
                    setCurrentStage(setStageValue)
                    return
                }
                const fieldSchema = userFormSchema.shape[key];
                fieldSchema.parse(formValues[key]);
                if (setStageValue) {
                    setCurrentStage(setStageValue)
                } else {
                    setCurrentStage(stage => stage + 1)
                }
                if (formValuesErrors[key]) {
                    setFormValuesErrors((state => ({ ...state, [key]: null })))
                }
            } catch (error) {
                if (error instanceof ZodError) {
                    setFormValuesErrors((state => ({ ...state, [key]: JSON.parse(error.message)[0].message })))
                }
            }
        }
        if (currentStage === 6) {
            try {
                userFormSchema.refine(data => data.password === data.repeatPassword, {
                    message: t("registerPasswordsNotMatchError")
                }).parse(formValues);
                await dispatch(RegisterUserThunk({
                    name: formValues.name,
                    username: formValues.username,
                    email: formValues.email,
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    birthDate: formValues.birthDate!,
                    password: formValues.password,
                }))
            } catch (error) {
                if (error instanceof ZodError) {
                    console.log(JSON.parse(error.message))
                    setFormValuesErrors((state => ({ ...state, [key]: JSON.parse(error.message)[0].message })))
                }
            }
        }
    }

    return (
        <StyledLoginViewContainer>
            {/* <SafeAreaView> */}
            <StyledAuthHeadContent>
                <TouchableOpacity style={{ position: "absolute", left: 0, top: -24 }} onPress={() => navigation.goBack()}>
                    <GoBackArrowIcon />
                </TouchableOpacity>
                {headerValues[currentStage - 1].headerTitle}
            </StyledAuthHeadContent>
            <StyledInputsContent>
                <StyledFormContent>
                    <StyledAnimatedInputContainer style={[useAnimatedInputStyles(1)]}>
                        <RegisterPrimaryFormInput
                            label={formValuesErrors.name || t("registerNameLabel")}
                            name='name'
                            autoComplete="name"
                            isError={!!formValuesErrors.name}
                            onChangeText={(value) => handleChange('name', value)}
                            value={formValues.name}
                            placeholder={t("name")}
                            onFocus={() => handleFillForm(1)}
                        />
                    </StyledAnimatedInputContainer>
                    <StyledAnimatedInputContainer style={[useAnimatedInputStyles(2)]}>
                        <RegisterPrimaryFormInput
                            label={formValuesErrors.username || t("registerUsernameLabel")}
                            name='username'
                            autoComplete="username"
                            isError={!!formValuesErrors.username}
                            onChangeText={(value) => handleChange('username', value)}
                            value={formValues.username}
                            placeholder={t("username")}
                            onFocus={() => handleFillForm(2)}
                        />
                    </StyledAnimatedInputContainer>
                    <StyledAnimatedInputContainer style={[useAnimatedInputStyles(3)]}>
                        <RegisterPrimaryFormInput
                            label={formValuesErrors.email || t("registerEmailLabel")}
                            name='email'
                            autoComplete="email"
                            isError={!!formValuesErrors.email}
                            onChangeText={(value) => handleChange('email', value)}
                            value={formValues.email}
                            placeholder={"E-mail"}
                            inputMode="email"
                            keyboardType="email-address"
                            onFocus={() => handleFillForm(3)}
                        />
                    </StyledAnimatedInputContainer>
                    <StyledAnimatedInputContainer style={[useAnimatedInputStyles(4)]}>
                        <PrimaryDatePicker
                            inputStyle="White"
                            label={formValuesErrors.birthDate || t("registerBirthDateLabel")}
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
                        <RegisterSercuredFormInput
                            label={formValuesErrors.password || t("registerPasswordLabel")}
                            name='password'
                            autoComplete="password-new"
                            isError={!!formValuesErrors.password}
                            onChangeText={(value) => handleChange('password', value)}
                            value={formValues.password}
                            placeholder={t("password")}
                            onFocus={() => handleFillForm(5)}
                        />
                    </StyledAnimatedInputContainer>
                    <StyledAnimatedInputContainer style={[useAnimatedInputStyles(6)]}>
                        <RegisterSercuredFormInput
                            label={formValuesErrors.repeatPassword || t("registerRepeatPasswordLabel")}
                            name='repeatPassword'
                            autoComplete="password-new"
                            isError={!!formValuesErrors.repeatPassword}
                            onChangeText={(value) => handleChange('repeatPassword', value)}
                            value={formValues.repeatPassword}
                            placeholder={t("repeatPassword")}
                            onFocus={() => handleFillForm(6)}
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
                <PrimaryButton style={{ flex: 1 }} onPress={() => handleFillForm(undefined)} btnType='Primary' title={t("goNext")} />
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
