import { ActionSheetIOS, Alert } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { trigger } from "react-native-haptic-feedback";
import { ICoordinates } from "../../../types/location";
import { t } from "i18next";
import { Dispatch, SetStateAction } from "react";
const ReportAProblemActions = (setReportFormData: Dispatch<SetStateAction<{choosedProblem: null | string, problemDescription: null | string}>>, reportFormData: {choosedProblem: null | string, problemDescription: null | string}) => {
    trigger("impactLight");
    const problemsList = t("problemsList", { returnObjects: true }) as string[]
    ActionSheetIOS.showActionSheetWithOptions(
        {
            options: problemsList,
            cancelButtonIndex: 0,
        },
        async buttonIndex => {
            if (buttonIndex !== 0) {
                setReportFormData({...reportFormData, choosedProblem: problemsList[buttonIndex],})
            }
        },
    );
}

export default ReportAProblemActions