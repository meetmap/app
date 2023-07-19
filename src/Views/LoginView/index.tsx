import { useEffect, useState } from "react";
import { useAppDispatch } from "../../store/hooks";
import { CustomSafeAreaView } from "../../shared/CustomSafeAreaView";
import PrimaryButton from "../../shared/Buttons/PrimaryButton";
import { Text } from "react-native-svg";
import { TouchableOpacity, View } from "react-native";
import { LoginUserThunk } from "../../store/slices/userSlice";
import styled from "styled-components/native";
import PrimaryFormInput from "../../shared/Input/PrimaryFormInput";
import { H1, H2, Span, Title } from "../../shared/Text";

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


    return (
        <StyledLoginViewContainer>
            <StyledInputsContent>
                <StyledAuthHeadContent>
                    {/* <GoBackButton url='/welcome' /> */}
                    <Title textcolor='Black'>Hey!</Title>
                    <Title textcolor='Black'>What’s your name?</Title>
                </StyledAuthHeadContent>
                <StyledFormContent>
                    <PrimaryFormInput autoComplete="username" label='Your username or e-mail' name='username' isError={errors.username} value={values.username} onChangeText={(text) => handleChange("username", text)} placeholder='Username' />
                    <PrimaryFormInput autoComplete="current-password" label='Password' name='password' isError={errors.password} value={values.password} onChangeText={(text) => handleChange("password", text)} placeholder='Password' />
                    <TouchableOpacity>
                        <Span textcolor="Primary">
                            Forgot password
                        </Span>
                    </TouchableOpacity>
                </StyledFormContent>
            </StyledInputsContent>
            <StyledButtonContent>
                <PrimaryButton onPress={handleSubmit} btnType='Primary'>Submit</PrimaryButton>
                {/* <LoginFacebook /> */}
            </StyledButtonContent>
        </StyledLoginViewContainer>
    )
}

export default LoginView


const StyledLoginViewContainer = styled(CustomSafeAreaView)`
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