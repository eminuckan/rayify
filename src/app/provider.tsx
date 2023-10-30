'use client'
import {CacheProvider} from '@chakra-ui/next-js'
import {ChakraProvider,extendTheme} from '@chakra-ui/react'
export const theme = extendTheme({})
import {ReactNode} from "react";

export function Providers({
                              children
                          }: {
    children: ReactNode
}) {
    return (
        <CacheProvider>
            <ChakraProvider theme={theme}>
                {children}
            </ChakraProvider>
        </CacheProvider>
    )
}