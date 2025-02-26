import { atom } from 'jotai';

// Create a global atom to store the user ID
export const userIdAtom = atom<string | null>(null);
