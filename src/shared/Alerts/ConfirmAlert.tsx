import React, { SetStateAction } from 'react'
import { Alert } from 'react-native'

const ConfirmAlert = (
    submitFunc: () => void,
    alertTitle: string,
    alertMessage: string | undefined
) => {
    Alert.alert(alertTitle, alertMessage, [
        {
            text: 'Cancel',
            // onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
        },
        { text: 'OK', onPress: () => submitFunc() },
    ]);
}

export default ConfirmAlert