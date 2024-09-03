"use client"
import React from 'react';
import { atom, RecoilRoot } from 'recoil';

export const updateTheVal = atom({
    key: 'updateMyVal',
    default: 1,
});

export default function RecoilContextProvider({ children }) {
    return (
        <RecoilRoot>
            {children}
        </RecoilRoot>
    );
}
