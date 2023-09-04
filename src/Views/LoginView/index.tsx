import { useEffect, useState } from "react";
import { useAppDispatch } from "@src/store/hooks";
import { TouchableOpacity, View } from "react-native";
import { LoginUserThunk } from "@src/store/slices/userSlice";
import styled from "styled-components/native";
import PrimaryFormInput from "@src/shared/Input/PrimaryFormInput";
import { Span, Title } from "@src/shared/Text";
import { SafeAreaView } from "react-native-safe-area-context";
import SercuredFormInput from "@src/shared/Input/SercuredFormInput";
import GoBackArrowIcon from "@src/shared/Icons/GoBackArrowIcon";
import { useNavigation } from "@react-navigation/native";
import { NavigationProps } from "@src/types/NavigationProps";
import { useTranslation } from "react-i18next";
import { PrimaryButton } from "@src/shared/Buttons";

interface ILoginFormData {
    username: string,
    password: string,
}
interface IErrors {
    username?: string;
    password?: string;
}


const LoginView = () => {


    const dispatch = useAppDispatch()
    const navigation = useNavigation<NavigationProps>()


    const [values, setValues] = useState<ILoginFormData>({
        username: '',
        password: '',
    })

    const [errors, setErrors] = useState<IErrors>({})
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleChange = (name: string, text: string) => {
        setValues({
            ...values,
            [name]: text
        })
    }

    const validate = (values: ILoginFormData) => {
        const errors: IErrors = {}

        if (!values.username.trim()) {
            errors.username = 'Username is required'
        }

        // Password Errors
        if (!values.password) {
            errors.password = 'Password is required'
        } else if (values.password.length < 6) {
            errors.password = 'Password needs to be 6 characters or more'
        }

        return errors
    }

    const handleSubmit = () => {
        setIsSubmitting(true)
        setErrors(validate(values))
    }

    const LoginFunc = async () => {
        await dispatch(
            LoginUserThunk({
                username: values.username,
                password: values.password,
            })
        )
    }

    useEffect(() => {
        if (Object.keys(errors).length === 0 && isSubmitting) {
            LoginFunc()
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
                    <Title textcolor='Black'>{t("hey")}</Title>
                    <Title style={{textAlign: "center"}} textcolor='Black'>{t("greetings")}</Title>
                </StyledAuthHeadContent>
                <StyledFormContent>
                    <PrimaryFormInput autoComplete="username" label={t("username")} name='username' isError={errors.username} value={values.username} onChangeText={(text) => handleChange("username", text)} placeholder={t("username")} />
                    <SercuredFormInput autoComplete="current-password" label={t("password")} name='password' isError={errors.password} value={values.password} onChangeText={(text) => handleChange("password", text)} placeholder={t("password")} />
                    <TouchableOpacity>
                        <Span textcolor="Primary">{t("forgotPassword")}</Span>
                    </TouchableOpacity>
                </StyledFormContent>
            </StyledInputsContent>
            <StyledButtonContent>
                <PrimaryButton onPress={handleSubmit} btnType='Primary' title={t("submit")} />
            </StyledButtonContent>
        </StyledLoginViewContainer>
    )
}

export default LoginView


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
`

const StyledFormContent = styled(View)`
  display: flex;
  flex-direction: column;
  gap: 16px;
  a{
    position: absolute;
    left: 0;
    top: 0;
  }
`


const StyledButtonContent = styled(View)`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0 16px;
`