import React, { useState } from 'react'
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { H1, H6, P } from '../../shared/Text'
import { useTranslation } from 'react-i18next'
import PrimaryFormInput from '../../shared/Input/PrimaryFormInput'
import styled from 'styled-components/native'
import PrimaryButton from '../../shared/Buttons/PrimaryButton'
import { RootStackParamList } from '../../types/NavigationProps'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import PrimaryMediumButton from '../../shared/Buttons/PrimaryMediumButton'
import { Line } from '../../shared/Line'
import ReportAProblemActions from '../../shared/Actions/ReportAProblem'

export interface IReportAProblemViewProps {
    navigation: NativeStackNavigationProp<RootStackParamList, 'ReportAProblemView'>;
}


const ReportAProblemView = ({ navigation }: IReportAProblemViewProps) => {
    const { t } = useTranslation()

    const [reportFormData, setReportFormData] = useState<{
        choosedProblem: null | string,
        problemDescription: null | string
    }>({
        choosedProblem: null,
        problemDescription: null
    })

    const handleReport = async () => {
        navigation.goBack()
        Alert.alert(t("reportGratitudeTitle"), `${t("reportGratitudeDescription")} ${JSON.stringify(reportFormData)}`)
    }

    return (
        <TouchableOpacity
            activeOpacity={1}
            onPress={() => navigation.goBack()}
            style={{ flex: 1, paddingHorizontal: 16, alignItems: 'stretch', justifyContent: 'center', backgroundColor: "#00000067" }}
        >
            <ReportAProblemContainer>
                <ReportAProblemTitle>
                    <H1>{t("reportAProblem")}</H1>
                    <P>{t("reportAProblemDescription")}</P>
                </ReportAProblemTitle>
                <Line />
                <StyledReportForm>
                    <PrimaryPickProblemButton
                        onPress={() => ReportAProblemActions(setReportFormData, reportFormData)}
                    >
                        <Text>{reportFormData.choosedProblem || t("problemInputTitle")}</Text>
                    </PrimaryPickProblemButton>
                    <PrimaryFormInput
                        onChangeText={(text) => setReportFormData({ ...reportFormData, problemDescription: text })}
                        label={t("problemInputDescription")}
                        multiline={true}
                        style={{ minHeight: 90 }}
                        numberOfLines={4}
                        inputStyle="Primary"
                    />
                </StyledReportForm>
                <PrimaryButton title={t("submit")} onPress={handleReport}/>
            </ReportAProblemContainer>
        </TouchableOpacity>
    )
}

export default ReportAProblemView


const StyledReportForm = styled.View`
    gap: 16px;
`
const ReportAProblemContainer = styled.View`
    background-color: white;
    padding: 16px;
    border-radius: 12px;
    gap: 18px;
`
const ReportAProblemTitle = styled.View`
    gap: 6px;
`

const PrimaryPickProblemButton = styled.TouchableOpacity`
    width: 100%;
    padding: 18px 50px 18px 24px;
    border: none;

    background: ${props => props.theme.colors.INPUT.Primary.BGColor};
    border-radius: 20px;

    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    color: black;
`