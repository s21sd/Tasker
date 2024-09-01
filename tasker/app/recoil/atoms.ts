"use client"
import { atom } from 'recoil';
export const updateTheVal = atom({
    key: 'updateMyVal',
    default: 0,
});
