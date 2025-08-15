import { createServerFn } from "@tanstack/react-start";
import { getCookie, setCookie } from "@tanstack/react-start/server";
import { ThemedefinedByMap, schema } from "./schema";
import { storageKey } from "./constant";
import type { ThemeIdentifier } from "./schema";

export const getThemeServerFn = createServerFn().handler(() => {
    const themeCookie = getCookie(storageKey);

    if (!themeCookie) return null;

    const { success, data } = schema.safeParse(ThemedefinedByMap[themeCookie as ThemeIdentifier]);
    if (!success) throw new Error("Invalid theme exists");

    return data;
});

export const setThemeServerFn = createServerFn({ method: "POST" })
    .validator((data: { identifier: keyof typeof ThemedefinedByMap }) => {

        const { success } = schema.safeParse(ThemedefinedByMap[data.identifier]);
        if (!success) throw new Error("Invalid theme provided");

        return data.identifier;
    })
    .handler(({ data }) => {
        setCookie(storageKey, data);
    });
