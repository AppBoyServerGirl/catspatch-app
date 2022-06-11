import {extendTheme} from "native-base";

export const config = {
  useSystemColorMode: true,
}

export const theme = extendTheme({
  config,
  components: {
    Text: {
      baseStyle: ({colorMode}) => ({
        color: colorMode === "dark" ? "white" : "black",
      })
    },
    Input: {
      baseStyle: ({colorMode}) => ({
        color: colorMode === "dark" ? "white" : "black",
      })
    }
  }
})