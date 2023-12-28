import { extendTheme } from '@chakra-ui/react'

const fonts = {
  heading: 'Rubik, sans-serif',
  body: 'Rubik, sans-serif',
}

const colors = {
  brand: {
    primary: {
      50: 'rgb(224, 242, 241)',
      100: 'rgb(178, 223, 219)',
      200: 'rgb(128, 203, 196)',
      300: 'rgb(77, 182, 172)',
      400: 'rgb(38, 166, 154)',
      500: 'rgb(0, 121, 137)',
      600: 'rgb(0, 96, 100)',
      700: 'rgb(0, 77, 64)',
      800: 'rgb(0, 51, 45)',
      900: 'rgb(0, 31, 27)',
    },
    secondary: {
      50: 'rgb(242, 237, 224)',
      100: 'rgb(225, 217, 196)',
      200: 'rgb(207, 197, 168)',
      300: 'rgb(189, 177, 140)',
      400: 'rgb(171, 157, 112)',
      500: 'rgb(124, 111, 81)',
      600: 'rgb(99, 88, 65)',
      700: 'rgb(74, 65, 49)',
      800: 'rgb(49, 42, 33)',
      900: 'rgb(24, 19, 17)',
    },
    danger: {
      50: 'rgb(254, 227, 228)',
      100: 'rgb(253, 204, 206)',
      200: 'rgb(252, 181, 183)',
      300: 'rgb(251, 158, 160)',
      400: 'rgb(250, 135, 138)',
      500: 'rgb(250, 87, 90)',
      600: 'rgb(200, 70, 72)',
      700: 'rgb(150, 53, 55)',
      800: 'rgb(100, 36, 38)',
      900: 'rgb(50, 19, 20)',
    },
  },
}
const components = {
  Text: {
    variants: {
      navLink: {
        cursor: 'pointer',
        fontWeight: 'bold',
        _hover: {
          color: colors.brand.primary[500],
        },
      },
      createEventNavLink: {
        cursor: 'pointer',
        fontWeight: 'bold',
        color: colors.brand.primary[500],
      },
    },
  },
}

const theme = extendTheme({ fonts, colors, components })

export default theme
