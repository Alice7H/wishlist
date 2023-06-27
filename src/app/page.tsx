'use client'

import {FormEvent, useState} from 'react';
import { WishForm } from '../components/wish-form';
import { WishTranslation } from '../components/wish-translation';
import { WishList } from '../components/wish-list';
import { WishSort } from '../components/wish-sort';
import TranslateIcon from '../../public/translate.svg';
import Image from 'next/image';
import { Wish } from '../types/Wish';
import { ActionTypes } from '@/reducers/wishReducer';
import { useWishContext } from '@/hooks/useWishContext';
import { useLanguageContext } from '@/hooks/useLanguageContext';
import { Dancing_Script } from 'next/font/google';

const dancingScriptFont = Dancing_Script({
  weight: '700',
  subsets: ['latin'],
})

export default function Home() {
  const {dictionary} = useLanguageContext();
  const { state, dispatch } = useWishContext();
  const [wish, setWish] = useState<Wish>({id: '', title: '', value: 0, status: 'none' });
  const total = state.reduce((acc: number, task: Wish) => task.status == 'none' ? acc + task.value : acc + 0, 0);

  const handleRemoveAllWishes = () => {
    dispatch({type: ActionTypes.REMOVE_ALL_WISHES})
}
  const onSortWishes = (value: string) => dispatch({type: ActionTypes.FILTER_WISHES, payload: value })

  const onEdit = (id: string) => {
    const currentWish = state.find(t => t.id === id) as Wish;
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
    <main className='relative flex min-h-screen flex-col items-center justify-between p-6 md:p-24 md:pt-5 bg-wish'>
      <div className='absolute sm:w-[150px] sm:h-[150px] md:w-[250px] md:h-[250px] bottom-0 left-[20vw] bg-pet bg-contain bg-no-repeat'></div>
      <div className='relative w-full'>
        <div className='opacity-[0.75] absolute -top-4 -left-[40px] sm:-left-[5vw] sm:w-[250px] sm:h-[250px] md:-top-8 bg-food bg-contain bg-no-repeat'></div>
      </div>

      <div className='w-full sm:w-1/3 self-end mb-10 flex gap-2'>
       <Image src={TranslateIcon} alt='Translation icon' width={32} height={32}/>
       <WishTranslation/>
      </div>

      <div className='items-center justify-between lg:flex'>
        <h1 className={dancingScriptFont.className + ' text-4xl mb-5 font-bold'}>{dictionary.title}</h1>
      </div>

      <div className='w-full flex flex-col'>
        <div className='w-full sm:w-1/3 my-5 self-end'>
          <WishSort onSortWishes={onSortWishes} />
        </div>
        <WishForm wish={wish} setWish={setWish} onSubmit={onSubmit} />
      </div>

      <div className='w-full flex-col items-start justify-between flex'>
        <WishList onEdit={onEdit} />
        <div className='bg-gray-200 w-full sm:w-1/3 p-2 self-end'>
          <p>Total: <span>R${total?.toFixed(2)}</span></p>
        </div>
      </div>

      <div className='w-full sm:w-1/3 self-end'>
        <button type='button' className=' mt-5 bg-blue-500 hover:bg-blue-700 block w-full text-white font-bold py-2 px-4 rounded' onClick={handleRemoveAllWishes}>{dictionary.btnDeleteAll}</button>
      </div>
    </main>
  )
}
