import { createTheme } from "@mui/material";
import { globalColors } from "./globalColors";
import { Components, Theme } from "@mui/material";

const commomComponent = (
  isDark: boolean
): Components<Omit<Theme, "components">> => {
  return {
    MuiButton: {
      defaultProps: {
        // 기본 props 들을 정의
        variant: "contained",
        color: "secondary",
        size: "small",
      },
      styleOverrides: {
        // 내가 주고 싶었던 스타일을 여기에 주면 된다.
      },
    },
    MuiGrid: {
      defaultProps: {
        alignItems: "center",
        textAlign: "center",
      },
    },
    // MuiDivider:{
    //     defaultProps:{
    //         color:globalColors.White
    //     }
    // },
    MuiLink: {
      defaultProps: {
        underline: "none",
      },
    },
    // MuiTypography:{
    //   defaultProps:{
    //     fontFamily:
    //   }
    // }
  };
};

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    background: {
      paper: globalColors.White,
    },
    text: {
      primary: globalColors.Black,
    },
    primary: {
      main: globalColors.blue,
      // light: '#ffa07a',
      // dark: '#cd5c5c',
      // contrastText: '#fff'
    },
    secondary: {
      main: globalColors.White,
      // light: '#ffa07a',
      // dark: '#cd5c5c',
      // contrastText: '#fff'
    },
  },
  components: commomComponent(false),
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: globalColors.Black,
      paper: globalColors.Black,
    },
    text: {
      primary: globalColors.White,
    },
    primary: {
      main: globalColors.blue,
      // light: '#ffa07a',
      // dark: '#cd5c5c',
      // contrastText: '#fff'
    },
    secondary: {
      main: globalColors.blue,
      contrastText: "#fff",
    },
  },
  components: commomComponent(true),
});

// export const theme = createTheme({
//     palette:{
//         primary: {
//             main: globalColors.White,
//             light: '#ffa07a',
//             dark: '#cd5c5c',
//             contrastText: '#fff'
//         },
//         secondary: {
//             main: '#f08080',
//             light: '#ffa07a',
//             dark: '#cd5c5c',
//             contrastText: '#fff'
//         }
//     },
//     components:{
//         MuiButton:{
//             defaultProps:{  // 기본 props 들을 정의
//                 variant:'contained',
//                 color:'primary',
//                 size:'small',
//             },
//             styleOverrides:{ // 내가 주고 싶었던 스타일을 여기에 주면 된다.

//             }
//         },
//         MuiGrid:{
//             defaultProps:{
//                 alignItems:'center',
//                 textAlign:'center',
//             }
//         },
//         MuiDivider:{
//             defaultProps:{
//                 color:globalColors.White
//             }
//         },
//         MuiLink:{
//             defaultProps:{
//                 underline:'none'
//             }
//         }
//     }
// })
