'use client';

import { createContext, useContext, useEffect } from "react"
import { setThemeServerFn } from "./actions"
import { useRouter } from "@tanstack/react-router"
import { SetThemeArg, ThemeProviderProps, ThemeProviderState } from "./interface";
import { COLOR_SCHEME_QUERY } from "./constants";
import { ThemeIdentifier } from "./schema";
import { useMediaQuery } from "../hooks/useMediaQuery";

const initialState: ThemeProviderState = {
    theme: 'dark',
    definedBy: 'system',
    setTheme: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
    children,
    value,
    defaultValue = { definedBy: 'system', theme: 'dark' },
    ...props
}: ThemeProviderProps) {
    const router = useRouter();
    const matches = useMediaQuery(COLOR_SCHEME_QUERY);
    const matchedMode = matches ? 'dark' : 'light'

    const themeCookieSetter = async (identifier: ThemeIdentifier) => {
        await setThemeServerFn({ data: { identifier } })
        router.invalidate()
    }

    useEffect(() => {
        const root = window.document.documentElement
        root.classList.remove("light", "dark")

        if (!value) {
            root.classList.add(matchedMode)
            themeCookieSetter(`s${matchedMode[0]}` as ThemeIdentifier)
            return
        }

        if (value?.definedBy === 'system' && matchedMode !== value.theme) {
            root.classList.add(matchedMode)

            const identifier = `s${matchedMode[0]}` as ThemeIdentifier
            themeCookieSetter(identifier)
            return
        }

        root.classList.add(value.theme)
    }, [value, matches])

    const _value = {
        theme: value?.theme || defaultValue.theme,
        definedBy: value?.definedBy || defaultValue.definedBy,
        setTheme: (args: SetThemeArg) => {
            let identifier: ThemeIdentifier
            if (args === 'system') {
                const systemTheme = matches ? 'dark' : 'light'
                identifier = `${args[0]}${systemTheme[0]}` as ThemeIdentifier
            } else {
                identifier = `u${args[0]}` as ThemeIdentifier
            }
            themeCookieSetter(identifier)
        },
    }

    return (
        <ThemeProviderContext.Provider {...props} value={_value}>
            {children}
        </ThemeProviderContext.Provider>
    )
}

export const useTheme = () => {
    const context = useContext(ThemeProviderContext)

    if (context === undefined)
        throw new Error("useTheme must be used within a ThemeProvider")

    return context
}
