import React, { Dispatch, SetStateAction, useState } from 'react'
import { ActionSheetIOS } from 'react-native';
import { trigger } from 'react-native-haptic-feedback';

const ChooseFrendsListType = (setFriendListType: Dispatch<SetStateAction<string>>) => {
    trigger("impactLight");
    ActionSheetIOS.showActionSheetWithOptions(
        {
            options: ['Cancel', 'Outcoming requests', 'Incoming requests', 'Friends'],
            cancelButtonIndex: 0,
        },
        buttonIndex => {
            if (buttonIndex === 0) {
                // cancel action
            } else if (buttonIndex === 1) {
                setFriendListType('Outcoming')
            } else if (buttonIndex === 2) {
                setFriendListType('Incoming')
            } else if (buttonIndex === 3) {
                setFriendListType('Friends')
            }
        },
    );
}

export default ChooseFrendsListType