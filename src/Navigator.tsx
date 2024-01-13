import React from 'react';
import {useAppSelector} from './store/hooks';
import {
  NativeStackNavigationOptions,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import {TouchableOpacity} from 'react-native';
import SettingsIcon from '@src/shared/Icons/SettingsIcon';
import {useTranslation} from 'react-i18next';
import {
  ChatView,
  ChooseLanguageView,
  ChooseLocationView,
  CreateEventView,
  CreateTicketModal,
  EventLikesModalView,
  EventModalView,
  EventsListModalView,
  FavoriteTagsView,
  FilterModalView,
  FriendsModalView,
  InviteFriendsModalView,
  LoginView,
  MainView,
  ProfileView,
  PublishMessageView,
  ReportAProblemView,
  SearchModalView,
  SelfProfileView,
  SettingsView,
  UsersListModalView,
  WelcomeView,
  RegisterViewV2,
  WelcomeLoaderView,
} from '@src/Views';

const Stack = createNativeStackNavigator();
const AppBottomSheetOptions: NativeStackNavigationOptions = {
  contentStyle: {
    backgroundColor: 'transparent',
  },
  headerShown: false,
  animation: 'fade',
  presentation: 'containedTransparentModal',
};
const Navigator = () => {
  const {user, isLoading} = useAppSelector(state => state.userSlice);
  const {t} = useTranslation();
  return (
    <Stack.Navigator
      screenOptions={() => ({
        headerShadowVisible: false,
        cardStyle: {backgroundColor: '#fff'},
        // headerTransparent: true,
        contentStyle: {
          backgroundColor: '#FFFFFF',
        },
        headerTintColor: '#7A7B84',
      })}>
      {isLoading ? (
        <Stack.Screen
          name="WelcomeLoaderView"
          component={WelcomeLoaderView}
          options={{headerShown: false}}
        />
      ) : (
        user ? (
          <Stack.Group>
            <Stack.Screen
              name="MainView"
              component={MainView}
              options={{headerShown: false}}
            />
            <Stack.Screen
              options={{title: '', headerBackTitleVisible: false}}
              name="EventModalView"
              component={EventModalView}
            />
            <Stack.Screen
              options={{title: ''}}
              name="EventsListModalView"
              component={EventsListModalView}
            />
            <Stack.Screen
              options={AppBottomSheetOptions}
              name="FriendsModalView"
              component={FriendsModalView}
            />
            <Stack.Screen
              options={{presentation: 'modal', headerShown: false}}
              name="UsersListModalView"
              component={UsersListModalView}
            />
            <Stack.Screen
              options={{presentation: 'modal', headerShown: false}}
              name="InviteFriendsModalView"
              component={InviteFriendsModalView}
            />
            <Stack.Screen
              options={{presentation: 'modal', headerShown: false}}
              name="EventLikesModalView"
              component={EventLikesModalView}
            />
            <Stack.Screen
              options={{title: t('events')}}
              name="SearchModalView"
              component={SearchModalView}
            />
            <Stack.Screen
              options={AppBottomSheetOptions}
              name="FilterModalView"
              component={FilterModalView}
            />
            <Stack.Screen
              name="ProfileView"
              component={ProfileView}
              options={() => ({
                headerTitleStyle: {
                  fontSize: 18,
                  fontWeight: '900',
                },
                headerBackTitleVisible: false,
                headerTitle: '',
              })}
            />
            <Stack.Screen
              options={({navigation}) => ({
                title: '',
                headerRight: () => (
                  <TouchableOpacity
                    onPress={() => navigation.navigate('SettingsView')}>
                    <SettingsIcon />
                  </TouchableOpacity>
                ),
              })}
              name="SelfProfileView"
              component={SelfProfileView}
            />

            <Stack.Screen
              options={{title: 'Pick fav tags'}}
              name={'FavoriteTagsView'}
              component={FavoriteTagsView}
            />
            <Stack.Screen
              options={{title: t('createEvent')}}
              name={'CreateEventView'}
              component={CreateEventView}
            />
            <Stack.Screen
              options={{presentation: 'modal', title: t('chooseEventLocation')}}
              name={'ChooseLocationView'}
              component={ChooseLocationView}
            />
            <Stack.Screen
              name={'CreateTicketModal'}
              component={CreateTicketModal}
              options={{
                presentation: 'transparentModal',
                headerShown: false,
                contentStyle: {
                  backgroundColor: 'transparent',
                },
                animation: 'fade',
                title: t('chooseEventLocation'),
              }}
            />

            <Stack.Screen
              name={'SettingsView'}
              component={SettingsView}
              options={{title: t('settings')}}
            />
            <Stack.Screen
              name="ReportAProblemView"
              component={ReportAProblemView}
              options={{
                presentation: 'transparentModal',
                headerShown: false,
                contentStyle: {
                  backgroundColor: 'transparent',
                },
              }}
            />

            <Stack.Screen
              name={'PublishMessageView'}
              component={PublishMessageView}
              options={{title: t('chooseLanguage')}}
            />
            <Stack.Screen
              name={'ChatView'}
              component={ChatView}
              options={AppBottomSheetOptions}
            />

            <Stack.Screen
              name={'ChooseLanguageView'}
              component={ChooseLanguageView}
              options={{title: t('chooseLanguage')}}
            />
          </Stack.Group>
        ) : (
          <Stack.Group>
            <Stack.Screen
              name="WelcomeView"
              component={WelcomeView}
              options={{
                headerShown: false,
                contentStyle: {
                  backgroundColor: '#000000',
                },
              }}
            />
            <Stack.Screen
              name="LoginView"
              component={LoginView}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="RegisterView"
              component={RegisterViewV2}
              options={{headerShown: false}}
            />
          </Stack.Group>
        )
      )}
    </Stack.Navigator>
  );
};

export default Navigator;
