import { extendTheme } from "native-base";

const theme = extendTheme({

	fontConfig: {
	  Outfit: {
			300: {
				normal: "Outfit_300Light"
			},
			400: {
				normal: "Outfit_400Regular"
			},
			500: {
				normal: "Outfit_500Medium"
			},
			700: {
				normal: "Outfit_700Bold"
			},
			800: {
				normal: "Outfit_800ExtraBold"
			}
		}
	},
	fonts: {
	  heading: "Outfit",
	  body: "Outfit",
	  mono: "Outfit"
	}
});

export default theme;