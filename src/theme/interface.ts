import { ThemeType } from "./schema"

export type SetThemeArg = ThemeType['theme'] | Extract<ThemeType['definedBy'], 'system'>

export type ThemeProviderProps = {
    children: React.ReactNode
    value: ThemeType | null
    defaultValue?: ThemeType
}

export type ThemeProviderState = {
    theme: ThemeType['theme']
    definedBy: ThemeType['definedBy']
    setTheme: (themeIdentifier: SetThemeArg) => void
}
