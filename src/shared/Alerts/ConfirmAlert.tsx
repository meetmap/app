import React, { SetStateAction } from 'react'
import { Alert } from 'react-native'

const ConfirmAlert = (
    submitFunc: () => void,
    alertTitle: string,
    alertMessage?: string
) => {
    Alert.alert(alertTitle, alertMessage, [
        {
            text: 'Cancel',
            // onPress: () => console.log('Cancel Pressed'),
            style: "cancel"
        },
        {
            text: 'Yes',
            onPress: () => submitFunc(),
        },
    ]);
}

export default ConfirmAlert