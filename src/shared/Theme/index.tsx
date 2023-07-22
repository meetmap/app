export const mainTheme = {
    colors: {
        MAIN: "#2671FF",
        BG: {
            White: "#FFFFFF",
            Disabled: "#F2F7FA"
        },
        TEXT: {
            Primary: "#2671FF",
            Black: "#1A1A1A",
            White: "#FFFFFF",
            Grey: "#5C5E66",
            Error: "#E84D4D",
            Success: "#41D9A6"
        },
        BUTTON: {
            Primary: {
                BGDefault: "#2671FF",
                TextDefault: "#FFFFFF",
                BorderDefault: "#2671FF"
            },
            Secondary: {
                BGDefault: "transparent",
                TextDefault: "#1A1A1A",
                BorderDefault: "#E6EAF2"
            },
            White: {
                BGDefault: "#ffffff",
                TextDefault: "#000000",
                BorderDefault: "#ffffff"
            },
            Black: {
                BGDefault: "#000000",
                TextDefault: "#ffffff",
                BorderDefault: "#000000"
            }
        },
        INPUT: {
            BGColor: "#F2F5FA",
            PlaceholderColor: "#898F99",
            TextColor: "#000000"
        },
    },
    // SECONDARY_BUTTON_COLOR: '#506680' NICE COLOR
};

// #474747 icon color

type CustomTheme = typeof mainTheme;

declare module "styled-components/native" {
    export interface DefaultTheme extends CustomTheme { }
}
