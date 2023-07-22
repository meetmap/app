import { Text } from "react-native";
import styled from "styled-components/native";

export type TextcolorsType = "Black" | "White" | "Grey"  | "Error" | "Success" | "Primary"


export const Title = styled(Text) <{ textcolor?: TextcolorsType }>`
    font-size: 32px;
    font-style: normal;
    font-style: normal;
    font-weight: 900;
    line-height: 38.4px;
    letter-spacing: -0.64px;
    flex-wrap: wrap;

    color: ${props => props.textcolor ? props.theme.colors.TEXT[props.textcolor] : props.theme.colors.TEXT.Black};
`
export const H1 = styled(Text) <{ textcolor?: TextcolorsType }>`
    font-size: 24px;
    font-style: normal;
    font-weight: 900;
    flex-wrap: wrap;

    color: ${props => props.textcolor ? props.theme.colors.TEXT[props.textcolor] : props.theme.colors.TEXT.Black};
`
export const H2 = styled(Text) <{ textcolor?: TextcolorsType }>`
    font-size: 20px;
    font-style: normal;
    font-weight: bold;

    color: ${props => props.textcolor ? props.theme.colors.TEXT[props.textcolor] : props.theme.colors.TEXT.Black};
`
export const H3 = styled(Text) <{ textcolor?: TextcolorsType }>`
    font-size: 18px;
    font-style: normal;
    font-weight: bold;

    color: ${props => props.textcolor ? props.theme.colors.TEXT[props.textcolor] : props.theme.colors.TEXT.Black};
`
export const H4 = styled(Text) <{ textcolor?: TextcolorsType }>`
    font-style: normal;
    font-weight: 600;
    font-size: 18px;

    color: ${props => props.textcolor ? props.theme.colors.TEXT[props.textcolor] : props.theme.colors.TEXT.Black};
`
export const H5 = styled(Text) <{ textcolor?: TextcolorsType }>`
    font-style: normal;
    font-weight: 600;
    font-size: 16px;

    color: ${props => props.textcolor ? props.theme.colors.TEXT[props.textcolor] : props.theme.colors.TEXT.Black};
`
export const H6 = styled(Text) <{ textcolor?: TextcolorsType }>`
    font-size: 14px;
    font-style: normal;
    font-weight: 500;

    color: ${props => props.textcolor ? props.theme.colors.TEXT[props.textcolor] : props.theme.colors.TEXT.Black};
`

export const P = styled(Text) <{ textcolor?: TextcolorsType }>`
    font-size: 14px;
    font-style: normal;
    font-weight: normal;
    line-height: 19.6px; 
    letter-spacing: -0.28px;

    color: ${props => props.textcolor ? props.theme.colors.TEXT[props.textcolor] : props.theme.colors.TEXT.Black};
`
export const Span = styled(Text) <{ textcolor?: TextcolorsType }>`
    font-size: 12px;
    font-style: normal;
    font-weight: normal;

    color: ${props => props.textcolor ? props.theme.colors.TEXT[props.textcolor] : props.theme.colors.TEXT.Black};
`
export const P2 = styled(Text) <{ textcolor?: TextcolorsType }>`
    font-style: normal;
    font-weight: 400;
    font-size: 14px;

    color: ${props => props.textcolor ? props.theme.colors.TEXT[props.textcolor] : props.theme.colors.TEXT.Black};
`