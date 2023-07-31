import { TFunction } from 'i18next';
import React, { Dispatch, SetStateAction, useState } from 'react'
import { ActionSheetIOS } from 'react-native';
import { trigger } from 'react-native-haptic-feedback';

const ChooseFrendsListType = (setFriendListType: Dispatch<SetStateAction<string>>, t: TFunction<"translation", undefined>) => {
    trigger("impactLight");
    ActionSheetIOS.showActionSheetWithOptions(
        {
            options: [t("cancel"), t("outcomingRequests"), t("incomingRequests"), t("friends")],
            cancelButtonIndex: 0,
        },
        buttonIndex => {
            if (buttonIndex === 0) {
                // cancel action
            } else if (buttonIndex === 1) {
                setFriendListType('outcomingRequests')
            } else if (buttonIndex === 2) {
                setFriendListType('incomingRequests')
            } else if (buttonIndex === 3) {
                setFriendListType('friends')
            }
        },
    );
}

export default ChooseFrendsListType