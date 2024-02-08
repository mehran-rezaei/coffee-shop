import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import Head from "next/head";
// context
import SignUpIn from "@/context/signUpIn";
import MenuContext from "@/context/menuContext";
import CartContextrovider from "@/context/cartContextProvider";

const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

const theme = createTheme({
  direction: "rtl",

  typography: {
    allVariants: {
      fontFamily: "Vazir-Regular",
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <CacheProvider value={cacheRtl}>
        <ThemeProvider theme={theme}>
          <MenuContext>
            <SignUpIn>
              <CartContextrovider>
                <div className="" dir="rtl">
                  <Component {...pageProps} />
                </div>
              </CartContextrovider>
            </SignUpIn>
          </MenuContext>
        </ThemeProvider>
      </CacheProvider>
    </>
  );
}
