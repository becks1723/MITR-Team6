import { extendTheme } from "@chakra-ui/react";

const colors = {
  primary: {
    100: "#E5FCF1",
    200: "#E5C3D1",
    300: "#8C61A5",
    400: "#78508F",
    500: "#791E94"
  }
};

const customTheme = extendTheme({ colors });

export default customTheme;