import { createMuiTheme } from '@material-ui/core/styles';
import { TypographyOptions } from '@material-ui/core/styles/createTypography';
import { PaletteOptions } from '@material-ui/core/styles/createPalette';

const typography: TypographyOptions = {
  h1: {
    fontSize: "2.2rem",
    lineHeight: 1.5,
    padding: 10,
    marginLeft: '10px',
    marginRight: '10px',
    fontFamily: '"Mulish", sans-serif',
    fontWeight: 800,
    textAlign: 'center',
  
  },
  h2: {
    fontSize: "1.8rem",
    lineHeight: 1.5,
    fontFamily: '"Mulish", sans-serif',
    fontWeight: 900,
  },
  h3: {
    fontSize: "1.5rem",
    lineHeight: 1.5,
    fontFamily: '"Mulish", sans-serif',
    fontWeight: 900,
  },
  h4: {
    fontSize: "1.2rem",
    lineHeight: 1,
    fontFamily: '"Mulish", sans-serif',
    fontWeight: 700
  },
  h5: {
    fontSize: "1.2rem",
    fontFamily: '"Mulish", sans-serif',
    fontWeight: 700
  },
  h6: {
    fontFamily: '"Mulish", sans-serif',
    fontWeight: 700
  },
  body1: {
    fontFamily: '"Mulish", sans-serif',
    fontWeight: 400,
    fontSize: '1rem',
  },
  body2: {
    fontFamily: '"Mulish", sans-serif',
    fontWeight: 400,
    fontSize: '1rem',
    paddingBottom: 20,
  }
}

const palette: PaletteOptions = {
  type: 'light',
  primary: {
    main: '#26173a',
  },
  secondary: {
    main: '#ff8600',
  },
  text: {
    primary: 'rgba(9,9,59,0.87)',
    secondary: 'rgba(44,75,148,0.75)',
  },
}

const PrimaryTheme = createMuiTheme({
  typography: typography,
  palette: palette,

  props: { 

  },
  overrides: {
    MuiToolbar: {
      root: {
        backgroundColor: "blue"
      }
    }
  }
})

const SecondaryTheme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#334411',
    },
    secondary: {
      main: '#ff8600',
    },
    text: {
      primary: '#F2F1EF',
      secondary: '#EEEEEE',
    }
  },
  overrides: {

    MuiPaper: {
      root: {
        backgroundColor: 'darkred', // #4d2f75 dialob purple
      }
    },

    MuiDivider: {
      root: {
        backgroundColor: 'rgb(174,168,211, .3)',
      }
    },
  }
})

const DefaultTheme = {
  primary: PrimaryTheme,
  secondary: SecondaryTheme
};;
export default DefaultTheme;