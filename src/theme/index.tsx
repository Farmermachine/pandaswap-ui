import { transparentize } from 'polished'
import React, { useMemo } from 'react'
import styled, {
	ThemeProvider as StyledComponentsThemeProvider,
	createGlobalStyle,
	css,
	DefaultTheme
} from 'styled-components'
import { useIsDarkMode } from '../state/user/hooks'
import { Text, TextProps } from 'rebass'
import { Colors } from './styled'
import lightBG from '../assets/images/background-light.jpg'
import darkBG from '../assets/images/background-dark.jpg'

export * from './components'

const MEDIA_WIDTHS = {
	upToExtraSmall: 500,
	upToSmall: 600,
	upToMedium: 960,
	upToLarge: 1280
}

const mediaWidthTemplates: { [width in keyof typeof MEDIA_WIDTHS]: typeof css } = Object.keys(MEDIA_WIDTHS).reduce(
	(accumulator, size) => {
		;(accumulator as any)[size] = (a: any, b: any, c: any) => css`
			@media (max-width: ${(MEDIA_WIDTHS as any)[size]}px) {
				${css(a, b, c)}
			}
		`
		return accumulator
	},
	{}
) as any

const white = '#FFFFFF'
const black = '#000000'

export function colors(darkMode: boolean): Colors {
	return {
		// base
		white,
		black,

		// gradient colors
		grd1: darkMode ? '#FFC3AB' : '#FED8B1',
		grd2: darkMode ? '#FFC3AB' : '#FFC3AB',
		grd3: darkMode ? '#FFC3AB' : '#FDD9B5',

		// text
		text1: darkMode ? '#FFFFFF' : '#000000',
		text2: darkMode ? '#C3C5CB' : '#565A69',
		text3: darkMode ? '#6C7284' : '#888D9B',
		text4: darkMode ? '#565A69' : '#C3C5CB',
		text5: darkMode ? '#2C2F36' : '#EDEEF2',
		text6: darkMode ? '#FBFDF7' : '#1B3629',

		// backgrounds / greys
		bg1: darkMode ? '#212429' : '#FFFFFF',
		bg2: darkMode ? '#2C2F36' : '#F7F8FA',
		bg3: darkMode ? '#40444F' : '#EDEEF2',
		bg4: darkMode ? '#565A69' : '#CED0D9',
		bg5: darkMode ? '#6C7284' : '#888D9B',

		// background image
		bgi: darkMode ? darkBG : lightBG,

		//specialty colors
		modalBG: darkMode ? 'rgba(0,0,0,.425)' : 'rgba(0,0,0,0.3)',
		advancedBG: darkMode ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.6)',

		//primary colors
		primary1: darkMode ? '#76867f' : '#ffd200',
		primary2: darkMode ? '#45d3c5' : '#ffd200',
		primary3: darkMode ? '#97e7de' : '#ffd200',
		primary4: darkMode ? '#76867f' : '#ffd200',
		primary5: darkMode ? '#76867f' : '#ffd200',

		// color text
		primaryText1: darkMode ? 'rgba(44, 52, 55, 0.8)' : '#ffff',

		// secondary colors
		secondary1: darkMode ? '#30cfbf' : '#ffd200',
		secondary2: darkMode ? '#17000b26' : '#ffd200',
		secondary3: darkMode ? '#17000b26' : '#ffd200',

		// other
		red1: '#FF6871',
		red2: '#F82D3A',
		green1: '#27AE60',
		yellow1: '#FFE270',
		yellow2: '#ffd200'

		// dont wanna forget these blue yet
		// blue4: darkMode ? '#153d6f70' : '#C4D9F8',
		// blue5: darkMode ? '#153d6f70' : '#EBF4FF',
	}
}

export function theme(darkMode: boolean): DefaultTheme {
	return {
		...colors(darkMode),

		grids: {
			sm: 8,
			md: 12,
			lg: 24
		},

		//shadows
		shadow1: darkMode ? '#000' : '#2F80ED',

		// media queries
		mediaWidth: mediaWidthTemplates,

		// css snippets
		flexColumnNoWrap: css`
			display: flex;
			flex-flow: column nowrap;
		`,
		flexRowNoWrap: css`
			display: flex;
			flex-flow: row nowrap;
		`
	}
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
	const darkMode = useIsDarkMode()

	const themeObject = useMemo(() => theme(darkMode), [darkMode])

	return <StyledComponentsThemeProvider theme={themeObject}>{children}</StyledComponentsThemeProvider>
}

const TextWrapper = styled(Text)<{ color: keyof Colors }>`
	color: ${({ color, theme }) => (theme as any)[color]};
`

export const TYPE = {
	main(props: TextProps) {
		return <TextWrapper fontWeight={500} color={'text2'} {...props} />
	},
	link(props: TextProps) {
		return <TextWrapper fontWeight={500} color={'primary1'} {...props} />
	},
	black(props: TextProps) {
		return <TextWrapper fontWeight={500} color={'text1'} {...props} />
	},
	body(props: TextProps) {
		return <TextWrapper fontWeight={400} fontSize={16} color={'text1'} {...props} />
	},
	largeHeader(props: TextProps) {
		return <TextWrapper fontWeight={600} fontSize={24} {...props} />
	},
	mediumHeader(props: TextProps) {
		return <TextWrapper fontWeight={500} fontSize={20} {...props} />
	},
	subHeader(props: TextProps) {
		return <TextWrapper fontWeight={400} fontSize={14} {...props} />
	},
	blue(props: TextProps) {
		return <TextWrapper fontWeight={500} color={'primary1'} {...props} />
	},
	yellow(props: TextProps) {
		return <TextWrapper fontWeight={500} color={'yellow1'} {...props} />
	},
	darkGray(props: TextProps) {
		return <TextWrapper fontWeight={500} color={'text3'} {...props} />
	},
	gray(props: TextProps) {
		return <TextWrapper fontWeight={500} color={'bg3'} {...props} />
	},
	italic(props: TextProps) {
		return <TextWrapper fontWeight={500} fontSize={12} fontStyle={'italic'} color={'text2'} {...props} />
	},
	error({ error, ...props }: { error: boolean } & TextProps) {
		return <TextWrapper fontWeight={500} color={error ? 'red1' : 'text2'} {...props} />
	}
}

export const FixedGlobalStyle = createGlobalStyle`
html, input, textarea, button {
  font-family: 'Noto Sans', sans-serif;
  letter-spacing: -0.018em;
  font-display: fallback;
}
@supports (font-variation-settings: normal) {
  html, input, textarea, button {
    font-family: 'Noto Sans', sans-serif;
  }
}

html,
body {
  margin: 0;
  padding: 0;
}

* {
  box-sizing: border-box;
}

button {
  user-select: none;
}

html {
  font-size: 16px;
  font-variant: none;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
`

export const ThemedGlobalStyle = createGlobalStyle`
html {
  color: ${({ theme }) => theme.text1};
  background-color: ${({ theme }) => theme.grd1};
  background: linear-gradient(
    to top, transparent, ${({ theme }) => theme.bg1}
  ), url(${({ theme }) => theme.bgi}) no-repeat;
  background-size: cover;
  background-attachment: fixed;
  background-position: center center
  
}

body {
  min-height: 100vh;
  background-position: 0 -30vh;
  background-repeat: no-repeat;
  background-image: ${({ theme }) =>
		`radial-gradient(50% 50% at 50% 50%, ${transparentize(0.9, theme.primary1)} 0%, ${transparentize(
			1,
			theme.bg1
		)} 100%)`};
}
`
