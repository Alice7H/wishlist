'use client'

import {FormEvent, useContext, useEffect, useState} from 'react';
import { WishForm } from '../components/wish-form';
import { WishList } from '../components/wish-list';
import { WishTranslation } from '../components/wish-translation';
import { WishSort } from '../components/wish-sort';
import { LanguageContext } from '../context/language-context';
import TranslateIcon from '../../public/translate.svg';
import Image from 'next/image';
import { Wish } from '../types/Wish';
import { useWishContext } from '@/hooks/useWishContext';
import { ActionTypes } from '@/reducers/wishReducer';

export default function Home() {
  const {dictionary} = useContext(LanguageContext);
  const { state, dispatch, wishesIsLoading } = useWishContext();
  const [wish, setWish] = useState<Wish>({id: '', title: '', value: 0, status: 'none' });
  const total = state.reduce((acc: number, task: Wish) => task.status == 'none' ? acc + task.value : acc + 0, 0);

  const handleRemoveAllWishes = () => {
    dispatch({type: ActionTypes.REMOVE_ALL_WISHES})
}
  const checkedRow = (wish: Wish) => dispatch({type: ActionTypes.CROSS_OUT_WISHES, payload: wish.id})
  const onRemove = (wish: Wish) => dispatch({type: ActionTypes.REMOVE_WISHES, payload: wish.id})
  const onSortWishes = (value: string) => dispatch({type: ActionTypes.FILTER_WISHES, payload: value })

  const onEdit = (wish: Wish) => {
    const currentWish = state.find(t => t.id === wish.id) as Wish;
    setWish(currentWish);
  }

  const isFormValid = () => {
    if(wish.title.length > 0 && wish.value >= 0 && wish.value <= 1000000) return true;
    return false;
  }

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if(isFormValid()){
      wish.id.length > 0
      ? dispatch({type: ActionTypes.UPDATE_WISHES, payload: wish })
      : dispatch({type: ActionTypes.ADD_WISHES, payload: wish});
      resetForm(event);
    }else {
      alert(dictionary.errorFormMessage);
    }
  }

  const resetForm = (event: FormEvent<HTMLFormElement>) => {
    const formElement = event.target as HTMLFormElement;
    formElement.reset();
    setWish({id: '', title: '', value: 0, status: 'none' });
  }

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-6 md:p-24 md:pt-5 bg-[#393E46]'>
      <div className='w-full sm:w-1/3 self-end mb-10 flex gap-2'>
       <Image src={TranslateIcon} alt='Translation icon' width={32} height={32} />
       <WishTranslation/>
      </div>

      <div className='items-center justify-between lg:flex'>
        <h1 className='text-gray-300 text-xl mb-5 font-bold'>{dictionary.title}</h1>
      </div>

      <div className='w-full flex flex-col'>
        <div className='w-full sm:w-1/3 my-5 self-end'>
          <WishSort onSortWishes={onSortWishes} />
        </div>
        <WishForm wish={wish} setWish={setWish} onSubmit={onSubmit} />
      </div>

      <div className='w-full flex-col items-start justify-between flex'>
        <ul className='w-full min-h-[30vh]'>
         { wishesIsLoading && <li className='bg-[#524A4E] mb-5 w-full flex justify-between items-center p-5 gap-5 md:gap-6'>
            <p className='text-white text-bold'>{dictionary.wishesLoading}</p>
          </li>}
         { state.length > 0 && [...state].sort().map(item => item.status != 'removed' &&
          <WishList key={item.id} wish={item} checkedRow={checkedRow} onRemove={onRemove} onEdit={onEdit}/>
        )}
        { !wishesIsLoading && state.length == 0 && <li className='bg-[#524A4E] mb-5 w-full flex justify-between items-center p-5 gap-5 md:gap-6'>
            <p className='text-white text-bold'>{dictionary.emptyWishList}</p>
          </li>
        }
        </ul>
        <div className='bg-gray-200 w-full sm:w-1/3 p-2 self-end'>
          <p>Total: <span>R${total.toFixed(2)}</span></p>
        </div>
      </div>

      <div className='w-full sm:w-1/3 self-end'>
        <button type='button' className=' mt-5 bg-blue-500 hover:bg-blue-700 block w-full text-white font-bold py-2 px-4 rounded' onClick={handleRemoveAllWishes}>{dictionary.btnDeleteAll}</button>
      </div>
    </main>
  )
}
