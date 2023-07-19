import { View } from "react-native";
import styled from "styled-components/native";

export const Line = styled(View)`
    height: 1px;
    width: 100%;
    background-color: ${props => props.theme.colors.BUTTON.Secondary.BorderDefault};
    border-radius: 1px;
`