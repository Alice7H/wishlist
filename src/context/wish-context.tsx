"use client"

import { ReactNode, createContext, useCallback, useEffect, useMemo, useReducer, useState } from 'react';
import { wishReducer } from '../reducers/wishReducer';
import { Wish } from '@/types/Wish';
import { ActionTypes } from '@/types/WishActions';

interface IWishContextProps { state: Wish[] }
interface IWishDispatchContextProps {
  onCreate: (wish: Wish) => void,
  onRemove: (wish: Wish) => void,
  onRemoveAll: () => void,
  onUpdate: (wish: Wish) => void,
  onFilterWishes: (value: string) => void,
  onCrossOutTheRowWish: (wish: Wish) => void
}
interface IWishProviderProps { children: ReactNode }

export const WishContext = createContext<IWishContextProps>({ state: []});
export const WishDispatchContext = createContext<IWishDispatchContextProps>({
  onCreate: () => null,
  onRemove: () => null,
  onRemoveAll: () => null,
  onUpdate: () => null,
  onFilterWishes: () => null,
  onCrossOutTheRowWish: () => null
})

export default function WishProvider ({children}: IWishProviderProps) {
  const [wishesIsLoading, setWishesIsLoading] = useState(true);
  const [state, dispatch] = useReducer(wishReducer, [], (): Wish[] => {
    if (typeof(Storage) !== "undefined"){
      const localData = localStorage.getItem('wishes');
      return localData ? JSON.parse(localData) : [];
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('wishes', JSON.stringify(state));
    setWishesIsLoading(false);
  }, [state]);

  const onCreate = (wish: Wish) => dispatch({type: ActionTypes.ADD_WISHES, payload: wish});
  const onRemove = (wish: Wish) => dispatch({type: ActionTypes.REMOVE_WISHES, payload: wish.id});
  const onUpdate = (wish: Wish)  => dispatch({type: ActionTypes.UPDATE_WISHES, payload: wish});
  const onCrossOutTheRowWish = (wish: Wish) => dispatch({type: ActionTypes.CROSS_OUT_WISHES, payload: wish.id});
  const onFilterWishes = (value: string) => dispatch({type: ActionTypes.FILTER_WISHES, payload: value});
  const onRemoveAll = () => dispatch({type: ActionTypes.REMOVE_ALL_WISHES});

  if(wishesIsLoading){
    return (
    <main className='min-h-screen flex flex-col items-center justify-between p-6 md:p-24 md:pt-5 bg-wish'>
      Carregando...
    </main>
    )
  }

  return (
    <WishContext.Provider value={{ state }}>
      <WishDispatchContext.Provider value={{
        onCreate,
        onRemove,
        onRemoveAll,
        onUpdate,
        onFilterWishes,
        onCrossOutTheRowWish
      }}>
        {children}
      </WishDispatchContext.Provider>
    </WishContext.Provider>
  )
}
