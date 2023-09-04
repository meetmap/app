import React from 'react'
import PrimaryFormInput from '@src/shared/Input/PrimaryFormInput'
import { trigger } from 'react-native-haptic-feedback';
import { ActionSheetIOS } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '@src/store/hooks';
import { IEventFormValues } from '.';

const ChooseAccessibilityTypeComponent = ({ handleChangeFormValue }: { handleChangeFormValue: (valueKey: keyof IEventFormValues, value: string | Date | undefined | number) => void }) => {
    const { t } = useTranslation()
    const { eventFormValues } = useAppSelector(state => state.createEventFormSlice)

    const chooseAccessibilityType = () => {
        trigger("impactLight");
        ActionSheetIOS.showActionSheetWithOptions(
            {
                options: [t("cancel"), t("public"), t("private")],
                cancelButtonIndex: 0,
            },
            async buttonIndex => {
                if (buttonIndex === 0) {
                    // cancel action
                } else if (buttonIndex === 1) {
                    handleChangeFormValue("accessibility", "public")
                } else if (buttonIndex === 2) {
                    handleChangeFormValue("accessibility", "private")
                }
            },
        );
    }

    return (
        <PrimaryFormInput value={t(eventFormValues.accessibility)} label={t("accessibility")} inputStyle='Primary' editable={false} onPressIn={chooseAccessibilityType} />
    )
}

export default ChooseAccessibilityTypeComponent