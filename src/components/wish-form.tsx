import { Dispatch, FormEvent, SetStateAction, useContext } from 'react';
import { Wish } from '../types/Wish';
import { LanguageContext } from '../context/language-context';

interface IWishForm {
  wish: Wish;
  setWish: Dispatch<SetStateAction<Wish>>
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export function WishForm ({wish, setWish, onSubmit}: IWishForm) {
  const {dictionary} = useContext(LanguageContext);

  return (
    <form onSubmit={onSubmit}>
      <div className='grid gap-5 mb-5 grid-cols-2 md:grid-cols-4'>
        <div className='col-span-2'>
            <input type='text'
            id='title'
            name='title'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            placeholder={dictionary.placeholderTitle}
            required
            onChange={(event)=> setWish((prev) => ({ ...prev, title: event.target.value}))}
            value={wish?.title}
            />
        </div>
        <div className='col-span-2 md:col-span-1'>
          <input type='number'
            id='value'
            name='value'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            placeholder='100,00'
            required
            min='0'
            max='1000000'
            onChange={(event)=>setWish((prev) =>({...prev, value: parseFloat(event.target.value)}))}
            value={wish?.value}
          />
        </div>
        <div className='col-span-2 md:col-span-1'>
          <button type='submit' className={`block w-full text-white font-bold py-2 px-4 rounded ${wish.id.length == 0 ? 'bg-blue-500 hover:bg-blue-700' : 'bg-lime-500 hover:bg-lime-700'}`}>{(wish.id.length == 0) ? `${dictionary.btnAdd}` : `${dictionary.btnUpdate}`}</button>
        </div>
        </div>
    </form>
  )
}