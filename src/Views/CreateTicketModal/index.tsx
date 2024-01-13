import React, {useState} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  TouchableOpacity,
  View,
} from 'react-native';
import {styled} from 'styled-components/native';
import {Span} from '@src/shared/Text';
import PrimaryFormInput from '@src/shared/Input/PrimaryFormInput';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps, RootStackParamList} from '@src/types/NavigationProps';
import {useAppDispatch, useAppSelector} from '@src/store/hooks';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {setTicketsState} from '@src/store/slices/createEventFormSlice';
import ConfirmAlert from '@src/shared/Alerts/ConfirmAlert';
import {ITicket} from '@src/types/event';
import {useTranslation} from 'react-i18next';
import {z} from 'zod';
import {PrimaryButton} from '@src/shared/Buttons';

interface ICreateTicketModal {
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    'CreateTicketModal'
  >;
  route: {
    params: {
      ticketIndex?: number;
    };
  };
}

interface ICreateTicketErrors {
  description: string | null;
  name: string | null;
  amount: string | null;
  price: string | null;
}
export const CreateTicketModal = ({route}: ICreateTicketModal) => {
  const createTicketSchema = z.object({
    name: z.string().nonempty(),
    description: z.string().optional(),
    amount: z.number().refine(value => value === -1 || value > 0, {
      message: 'Amount must be either -1 or greater than 0',
    }),
    price: z.number().min(0),
  });

  const ticketIndex = route.params.ticketIndex;
  const navigation = useNavigation<NavigationProps>();
  const {tickets} = useAppSelector(
    state => state.createEventFormSlice.eventFormValues,
  );
  const [localTicketValue, setLocalTicketValue] = useState<ITicket>(
    ticketIndex !== undefined
      ? tickets[ticketIndex]
      : {
          description: '',
          name: '',
          amount: 0,
          price: 0,
        },
  );
  const [createTicketErrors, setCreateTicketErrors] =
    useState<ICreateTicketErrors>({
      description: '',
      name: '',
      amount: '',
      price: '',
    });

  const dispatch = useAppDispatch();
  const handleChangeTicketsValue = () => {
    const validationResult = createTicketSchema.safeParse(localTicketValue);

    if (!validationResult.success) {
      const errors = validationResult.error.issues;
      const fieldErrors: ICreateTicketErrors = {
        description: null,
        name: null,
        amount: null,
        price: null,
      };

      errors.forEach(error => {
        const fieldName = error.path[0] as keyof ICreateTicketErrors;
        const errorMessage = error.message;

        fieldErrors[fieldName] = errorMessage;
      });
      setCreateTicketErrors(fieldErrors);

      return;
    }
    if (ticketIndex === undefined) {
      dispatch(setTicketsState([...tickets, localTicketValue]));
    } else {
      const updatedTickets = tickets.map((ticket, index) =>
        index === ticketIndex ? localTicketValue : ticket,
      );
      dispatch(setTicketsState(updatedTickets));
    }
    navigation.goBack();
  };

  const handleDeleteTicket = () => {
    if (ticketIndex === undefined) {
      return;
    }
    const updatedTickets = tickets.filter((_, index: number) => index !== ticketIndex);
    dispatch(setTicketsState(updatedTickets));
    navigation.goBack();
  };

  const handleChangeLocalTicketValue = (key: keyof ITicket, value: string) => {
    setLocalTicketValue(state => ({...state, [key]: value}));
  };
  const setFiltersStringValues = (valueKey: keyof ITicket, value: string) => {
    setLocalTicketValue(state => ({
      ...state,
      [valueKey]: +value.replace(/[^0-9]/g, ''),
    }));
  };
  const changeAmountValue = () => {
    if (localTicketValue.amount === -1) {
      setLocalTicketValue(state => ({...state, amount: 100}));
      return;
    }
    setLocalTicketValue(state => ({...state, amount: -1}));
  };
  const changePriceValue = () => {
    if (localTicketValue.price > 0) {
      setLocalTicketValue(state => ({...state, price: 0}));
      return;
    }
    setLocalTicketValue(state => ({...state, price: 1}));
  };
  const {t} = useTranslation();
  return (
    <KeyboardAvoidingView behavior="padding" style={{flex: 1}}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        activeOpacity={1}
        style={{
          flex: 1,
          backgroundColor: '#00000067',
          alignItems: 'stretch',
          justifyContent: 'center',
          paddingHorizontal: 16,
        }}>
        <StyledTicketForm onPress={() => Keyboard.dismiss()} activeOpacity={1}>
          {/* <H5>Create ticket</H5> */}
          <StyledInputsContent>
            <PrimaryFormInput
              value={localTicketValue.name}
              onChangeText={value =>
                handleChangeLocalTicketValue('name', value)
              }
              label={createTicketErrors.name || 'Ticket name'}
              placeholder="Awesome ticket"
              inputStyle="Primary"
            />
            <PrimaryFormInput
              style={{minHeight: 80}}
              multiline
              value={localTicketValue.description}
              onChangeText={value =>
                handleChangeLocalTicketValue('description', value)
              }
              label={createTicketErrors.description || 'Ticket description'}
              placeholder="Something about ticket"
              inputStyle="Primary"
            />
            <View style={{gap: 8}}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Span>{createTicketErrors.amount || 'Ticket amount'}</Span>
                <TouchableOpacity onPress={changeAmountValue}>
                  <Span textcolor="Primary">
                    {localTicketValue.amount === -1
                      ? 'Enter limit'
                      : 'Make unlimited'}
                  </Span>
                </TouchableOpacity>
              </View>
              <PrimaryFormInput
                value={
                  localTicketValue.amount === -1
                    ? 'Unlimited'
                    : localTicketValue.amount.toString()
                }
                onChangeText={value => setFiltersStringValues('amount', value)}
                keyboardType="numeric"
                placeholder="Ex. 10"
                inputStyle="Primary"
              />
            </View>
            <View style={{gap: 8}}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Span>{createTicketErrors.price || 'Ticket price'}</Span>
                <TouchableOpacity onPress={changePriceValue}>
                  <Span textcolor="Primary">
                    {localTicketValue.price ? 'Make free' : 'Enter price'}
                  </Span>
                </TouchableOpacity>
              </View>
              <PrimaryFormInput
                value={
                  localTicketValue.price
                    ? localTicketValue.price.toString()
                    : 'Free'
                }
                onChangeText={value => setFiltersStringValues('price', value)}
                keyboardType="numeric"
                placeholder="Price in $"
                inputStyle="Primary"
              />
            </View>
          </StyledInputsContent>
          {ticketIndex === undefined ? (
            <PrimaryButton
              onPress={handleChangeTicketsValue}
              title={t('createTicket')}
            />
          ) : (
            <View style={{flexDirection: 'row', gap: 8}}>
              <PrimaryButton
                style={{flex: 1}}
                onPress={handleChangeTicketsValue}
                title={t('changeTicket')}
              />
              <PrimaryButton
                btnType="Error"
                onPress={() =>
                  ConfirmAlert(
                    handleDeleteTicket,
                    'Do you really want to delete this ticket?',
                  )
                }
                title={t('deleteTicket')}
              />
            </View>
          )}
        </StyledTicketForm>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const StyledTicketForm = styled.TouchableOpacity`
  background-color: white;
  padding: 16px;
  border-radius: 18px;
  gap: 12px;
`;
const StyledInputsContent = styled.View`
  gap: 8px;
`;
