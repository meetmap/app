import styled from 'styled-components/native';

import React, {ReactNode, useState} from 'react';
import {
  View,
  Text,
  Modal,
  Button,
  TouchableOpacity
} from 'react-native';
import {Span} from '../Text';
import RNDateTimePicker, {
  DatePickerOptions,
} from '@react-native-community/datetimepicker';
import {useTranslation} from 'react-i18next';
import moment from 'moment';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
interface IPrimaryDatePicker extends DatePickerOptions {
  name?: string;
  label?: string;
  isSuccess?: boolean;
  isError?: boolean | string;
  icon?: ReactNode;
  inputStyle?: 'White' | 'Primary';
  inputSize?: 'Default' | 'Lg';
  placeholder?: string;
  locale?: string | undefined;
  mode?: 'countdown' | 'date' | 'datetime' | 'time';
  momentLocaleFormat?: {
    en: string;
    ru: string;
  };
  value: Date | null;
}

const initialMomentLocaleFormat = {
  en: 'MMM D',
  ru: 'D MMM',
};

const PrimaryDatePicker = ({
  inputStyle = 'Primary',
  inputSize = 'Default',
  placeholder = 'Pick date',
  mode = 'date',
  label,
  momentLocaleFormat = initialMomentLocaleFormat,
  ...rest
}: IPrimaryDatePicker) => {
  const [opened, setOpened] = useState(false);
  const {i18n, t} = useTranslation();
  const formattedStartTime = moment(rest.value)
    .locale(i18n.language)
    .format(
      momentLocaleFormat[i18n.language as keyof typeof momentLocaleFormat],
    );
  const {bottom} = useSafeAreaInsets();
  return (
    <>
      <StyledInputContent>
        {label && <Span>{label}</Span>}
        <StyledPrimaryDatePikerButton
          inputSize={inputSize}
          inputStyle={inputStyle}
          onPress={() => setOpened(data => !data)}>
          <StyledPrimaryDatePikerButtonText>
            {rest.value ? formattedStartTime : placeholder}
          </StyledPrimaryDatePikerButtonText>
        </StyledPrimaryDatePikerButton>
      </StyledInputContent>
      <Modal
        visible={opened}
        animationType="fade"
        onRequestClose={() => setOpened(false)}
        transparent={true}>
        <StyledModalBackground
          activeOpacity={1}
          onPress={() => setOpened(false)}>
          <StyledPickDateModal
            style={{paddingBottom: bottom}}
          >
            <RNDateTimePicker
              testID="dateTimePicker"
              locale={i18n.language}
              {...rest}
              value={rest.value || new Date()}
              mode={mode}
            />
            <Button title={t('submit')} onPress={() => setOpened(false)} />
          </StyledPickDateModal>
        </StyledModalBackground>
      </Modal>
    </>
  );
};

export default PrimaryDatePicker;

const StyledInputContent = styled(View)`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
`;

const StyledPrimaryDatePikerButton = styled(TouchableOpacity)<{
  inputStyle: 'Primary' | 'White';
  inputSize: 'Default' | 'Lg';
}>`
  width: 100%;
  padding: ${props => (props.inputSize === 'Lg' ? '24px' : '18px 24px')};
  border: none;
  background: ${props => props.theme.colors.INPUT[props.inputStyle].BGColor};
  border-radius: 20px;
`;

const StyledPrimaryDatePikerButtonText = styled(Text)`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  color: #898f99;
`;

const StyledModalBackground = styled(TouchableOpacity)`
  flex: 1;
  background-color: #00000067;
`;
const StyledPickDateModal = styled(View)`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  flex-direction: column;
  background-color: #ffffff;
  border-radius: 24px;
  padding: 16px;
  /* gap: 16px; */
  /* flex: 1; */
`;
