"use client"

import { Dispatch, ReactNode, createContext, useEffect, useReducer, useState } from 'react';
import { IAction, wishReducer } from '../reducers/wishReducer';
import { Wish } from '@/types/Wish';

interface InitialStateProps {
  state: Wish[],
  dispatch: Dispatch<IAction>;
  wishesIsLoading: boolean;
}

interface IWishProviderProps { children: ReactNode }

export const WishContext = createContext<InitialStateProps>({
  state: [],
  dispatch: () => null,
  wishesIsLoading: true,
});

export default function WishProvider ({children}: IWishProviderProps) {
  const [wishesIsLoading, setWishesIsLoading] = useState(true);
  const [state, dispatch] = useReducer(wishReducer, [], (): Wish[] => {
    if (typeof window !== 'undefined'){
      const localData = localStorage.getItem('wishes');
      return localData ? JSON.parse(localData) : [];
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('wishes', JSON.stringify(state));
    setWishesIsLoading(false)
  }, [state]);

  if(wishesIsLoading){
    return <></>
  }

  return (
    <WishContext.Provider value={{state, dispatch, wishesIsLoading}}>
      {children}
    </WishContext.Provider>
  )
}
