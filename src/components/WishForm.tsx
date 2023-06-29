
import { FormEvent, useMemo, useState } from 'react';
import { useLanguageContext } from '@/hooks/useLanguageContext';
import { useWishDispatch } from '@/hooks/useWishContext';
import { Wish } from '../types/Wish';

interface IProps {
  wish: Wish;
}

export function WishForm ({ wish }: IProps) {
  const [ wishForm, setWishForm] = useState<Wish>({id: '', title: '', value: 0, status: 'none' });
  const { dictionary } = useLanguageContext();
  const { onCreate, onUpdate } = useWishDispatch();

  useMemo(() => setWishForm(wish),[wish])

  const isFormValid = () => {
    if(wishForm.title.length > 0 && wishForm.value >= 0 && wishForm.value <= 1000000) return true;
    return false;
  }

  const resetForm = (event: FormEvent<HTMLFormElement>) => {
    const formElement = event.target as HTMLFormElement;
    formElement.reset();
    setWishForm({id: '', title: '', value: 0, status: 'none' });
  }

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if(isFormValid()){
      wishForm.id.length > 0
      ? onUpdate(wishForm)
      : onCreate(wishForm)
      resetForm(event);
    }else {
      alert(dictionary.errorFormMessage);
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <div className='grid gap-5 mb-5 grid-cols-2 md:grid-cols-4'>
        <div className='col-span-2'>
            <input type='text'
            id='title'
            name='title'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
            focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
            placeholder={dictionary.placeholderTitle}
            required
            onChange={(event)=> setWishForm((prev) => ({ ...prev, title: event.target.value}))}
            value={wishForm?.title}
            />
        </div>
        <div className='col-span-2 md:col-span-1'>
          <input type='number'
            id='value'
            name='value'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
            focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
            placeholder='100,00'
            required
            min='0'
            max='1000000'
            onChange={(event)=>setWishForm((prev) =>({...prev, value: parseFloat(event.target.value)}))}
            value={wishForm?.value}
          />
        </div>
        <div className='col-span-2 md:col-span-1'>
          <button type='submit' className={`
            block w-full text-white font-bold py-2 px-4 rounded ${wishForm.id.length == 0
            ? 'bg-blue-500 hover:bg-blue-700'
            : 'bg-lime-500 hover:bg-lime-700'}`}
          >
            {(wishForm.id.length == 0)
              ? `${dictionary.btnAdd}`
              : `${dictionary.btnUpdate}`}
          </button>
        </div>
        </div>
    </form>
  )
}