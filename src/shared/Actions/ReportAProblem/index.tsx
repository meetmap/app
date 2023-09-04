import { ActionSheetIOS } from "react-native";
import { trigger } from "react-native-haptic-feedback";
import { t } from "i18next";
import { Dispatch, SetStateAction } from "react";
const ReportAProblemActions = (setReportFormData: Dispatch<SetStateAction<{ choosedProblem: null | string, problemDescription: null | string }>>, reportFormData: { choosedProblem: null | string, problemDescription: null | string }) => {
    trigger("impactLight");
    const problemsList = t("problemsList", { returnObjects: true }) as string[]
    ActionSheetIOS.showActionSheetWithOptions(
        {
            options: problemsList,
            cancelButtonIndex: 0,
        },
        async buttonIndex => {
            if (buttonIndex !== 0) {
                setReportFormData({ ...reportFormData, choosedProblem: problemsList[buttonIndex], })
            }
        },
    );
}

export default ReportAProblemActions