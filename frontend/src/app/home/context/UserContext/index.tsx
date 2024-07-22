import { useState, createContext, ReactNode, FC } from 'react';
import { UserContextType } from './userTypes';

export const UserContext = createContext<UserContextType>({} as UserContextType);
