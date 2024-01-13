import React, {useState} from 'react';
import {useAppDispatch} from '@src/store/hooks';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import {RegisterUserThunk} from '@src/store/slices/userSlice';
import styled from 'styled-components/native';
import PrimaryFormInput from '@src/shared/Input/PrimaryFormInput';
import {Title} from '@src/shared/Text';
import {SafeAreaView} from 'react-native-safe-area-context';
import SercuredFormInput from '@src/shared/Input/SercuredFormInput';
import GoBackArrowIcon from '@src/shared/Icons/GoBackArrowIcon';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps} from '@src/types/NavigationProps';
import {DateTimePickerEvent} from '@react-native-community/datetimepicker';
import PrimaryDatePicker from '@src/shared/Input/PrimaryDatePicker';
import {useTranslation} from 'react-i18next';
import {z} from 'zod';
import {PrimaryButton} from '@src/shared/Buttons';
import {AxiosError} from 'axios';
import {Line} from '@src/shared/Line';

interface IRegisterFormData {
  name: string;
  username: string;
  email: string;
  birthDate: Date | null;
  password: string;
  repeatPassword: string;
  gender: string
}
interface IRegisterFormDataErrors {
  name?: string;
  username?: string;
  email?: string;
  birthDate?: string;
  password?: string;
  repeatPassword?: string;
  gender?: string
}
const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])[A-Za-z0-9]{6,}$/;

export const RegisterViewV2 = () => {
  const navigation = useNavigation<NavigationProps>();
  const {t} = useTranslation();
  const userFormSchema = z.object({
    name: z.string().nonempty({message: t('registerNameError')}),
    username: z.string().nonempty({message: t('registerUsernameError')}),
    email: z.string().email({message: t('registerEmailError')}),
    birthDate: z.date(),
    password: z
      .string()
      .min(6, t('registerPasswordLengthError'))
      .refine(value => PASSWORD_REGEX.test(value), {
        message: t('registerPasswordError'),
      }),
    repeatPassword: z.string(),
  });
  const dispatch = useAppDispatch();

  const [formValues, setFormValues] = useState<IRegisterFormData>({
    name: '',
    username: '',
    email: '',
    birthDate: null,
    password: '',
    repeatPassword: '',
    gender: ''
  });
  const [formValuesErrors, setFormValuesErrors] =
    useState<IRegisterFormDataErrors | null>(null);

  const handleChange = (name: keyof IRegisterFormData, data: string) => {
    setFormValues(state => ({...state, [name]: data}));
  };

  const handleDateChange = (date: DateTimePickerEvent) => {
    if (date.nativeEvent.timestamp) {
      const birthDate = new Date(date.nativeEvent.timestamp);
      setFormValues(state => ({...state, birthDate}));
    }
  };

  const handleSubmit = async () => {
    try {
      userFormSchema.parse(formValues);

      await dispatch(
        RegisterUserThunk({
          name: formValues.name,
          username: formValues.username,
          email: formValues.email,
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          birthDate: formValues.birthDate!,
          password: formValues.password,
        }),
      );
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.errors.reduce((acc, currentError) => {
          const fieldName = currentError
            .path[0] as keyof IRegisterFormDataErrors;
          acc[fieldName] = currentError.message;
          return acc;
        }, {} as IRegisterFormDataErrors);
        setFormValuesErrors({...fieldErrors});
      }
      if (error instanceof AxiosError) {
        console.log(error.message);
      }
    }
  };

  return (
    <StyledLoginViewContainer>
      {/* <SafeAreaView> */}
      <StyledAuthHeadContent>
        <TouchableOpacity
          style={{position: 'absolute', left: 0, top: -24}}
          onPress={() => navigation.goBack()}>
          <GoBackArrowIcon />
        </TouchableOpacity>
        <Title>Hey! What’s your name?</Title>
      </StyledAuthHeadContent>
      <ScrollView contentContainerStyle={{paddingBottom: 20}}>
        <StyledInputsContent>
          <StyledFormContent>
            <PrimaryFormInput
              label={formValuesErrors?.name || t('registerNameLabel')}
              name="name"
              autoComplete="name"
              isError={!!formValuesErrors?.name}
              onChangeText={value => handleChange('name', value)}
              value={formValues.name}
              placeholder={t('name')}
            />
            <PrimaryFormInput
              label={formValuesErrors?.username || t('registerUsernameLabel')}
              name="username"
              autoComplete="username"
              isError={!!formValuesErrors?.username}
              onChangeText={value => handleChange('username', value)}
              value={formValues.username}
              placeholder={t('username')}
            />
            <PrimaryFormInput
              label={formValuesErrors?.email || t('registerEmailLabel')}
              name="email"
              autoComplete="email"
              isError={!!formValuesErrors?.email}
              onChangeText={value => handleChange('email', value)}
              value={formValues.email}
              placeholder={'E-mail'}
              inputMode="email"
              keyboardType="email-address"
            />
            <PrimaryFormInput
              label={formValuesErrors?.gender || t('registerEmailLabel')}
              name="gender"
              autoComplete="gender"
              isError={!!formValuesErrors?.gender}
              onChangeText={value => handleChange('gender', value)}
              value={formValues.gender}
              placeholder={t("gender")}
            //   inputMode="gender"
            //   keyboardType="email-address"
            />
            <PrimaryDatePicker
              inputStyle="White"
              label={formValuesErrors?.birthDate || t('registerBirthDateLabel')}
              value={formValues.birthDate}
              inputSize={'Lg'}
              placeholder={t('birthDate')}
              onChange={handleDateChange}
              maximumDate={new Date()}
              display="inline"
              mode='date'
              momentLocaleFormat={{
                en: 'y - MMMM D',
                ru: 'D MMMM - y',
              }}
            />
            <Line />
            <SercuredFormInput
              label={formValuesErrors?.password || t('registerPasswordLabel')}
              name="password"
              autoComplete="password-new"
              isError={!!formValuesErrors?.password}
              onChangeText={value => handleChange('password', value)}
              value={formValues.password}
              placeholder={t('password')}
            />
            <SercuredFormInput
              label={
                formValuesErrors?.repeatPassword ||
                t('registerRepeatPasswordLabel')
              }
              name="repeatPassword"
              autoComplete="password-new"
              isError={!!formValuesErrors?.repeatPassword}
              onChangeText={value => handleChange('repeatPassword', value)}
              value={formValues.repeatPassword}
              placeholder={t('repeatPassword')}
            />
          </StyledFormContent>
        </StyledInputsContent>
      </ScrollView>
      <StyledButtonContent>
        <PrimaryButton
          style={{flex: 1}}
          onPress={handleSubmit}
          btnType="Primary"
          title={t('goNext')}
        />
      </StyledButtonContent>
      {/* </>
                )}
            </Formik> */}
    </StyledLoginViewContainer>
  );
};

const StyledLoginViewContainer = styled(SafeAreaView)`
  background-color: #f2f5fa;
  flex: 1;
  justify-content: space-between;
`;
const StyledAuthHeadContent = styled(View)`
  align-items: center;
  position: relative;
  z-index: 1;
  height: 100px;
  margin-top: 36px;
`;
const StyledInputsContent = styled(View)`
  display: flex;
  flex-direction: column;
  gap: 36px;
  padding: 0 16px;
  flex: 1;
`;

const StyledFormContent = styled(View)`
  flex-direction: column;
  flex-grow: 1;
  gap: 16px;
  flex: 1;
`;
const StyledButtonContent = styled(View)`
  display: flex;
  flex-direction: row;
  gap: 8px;
  padding: 0 16px;
`;
