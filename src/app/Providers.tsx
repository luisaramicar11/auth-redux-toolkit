"use client";
import React from "react";
import store from "./redux/store";
import { Provider } from "react-redux";

// export function Providers({children}: { children:React.ReactNode }) {
//     return <Provider store={store}>{children}</Provider>;
// }

export function Providers({ children }: { children: React.ReactNode }) {
    return <Provider store={store}>{children}</Provider>;
}
