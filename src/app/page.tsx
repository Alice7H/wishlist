'use client'

import {FormEvent, useEffect, useState} from 'react';
import { WishForm } from './components/wish-form';
import { WishList } from './components/wish-list';

export interface Wish {
  id: string;
  title: string;
  value: number;
  status: 'completed'|'removed'|'none',
}

export default function Home() {

  const [wishes, setWishes] = useState<Wish[]>([]);
  const [wish, setWish] = useState<Wish>({id: '', title: '', value: 0, status: 'none' });
  const total = wishes.reduce((acc, task) => task.status == 'none' ? acc + task.value : acc + 0, 0);

  useEffect(()=> {
    const localWishes = JSON.parse(localStorage.getItem('wishes') || '{}') as Wish[];
    setWishes(localWishes)
  },[])

  useEffect(()=> {
    localStorage.setItem('wishes', JSON.stringify(wishes));
  },[wishes])

  const handleRemoveAllWishes = () => {
    localStorage.removeItem('wishes');
    setWishes([]);
  }

  const checkedRow = (id: string) => {
    setWishes(wishes.map(
      wish => {
      if(wish.id === id && wish.status == 'none')
        return({...wish, status: 'completed' })
      else if(wish.id === id && wish.status == 'completed')
        return({...wish, status: 'none' })
      else
        return(wish)
      }
    ));
  }

  const onRemove = (id: string) => {
    setWishes(wishes.map(
      wish => wish.id === id ? ({ ...wish, status: 'removed' }) : (wish)
    ));
  }

  const isFormValid = () => {
    if(wish.title.length > 0 && wish.value > 0) return true;
    return false;
  }

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if(isFormValid()){
      wish.id.length > 0 ? onUpdate() : onCreate();
    }else {
      alert('Please fill the fields correctly');
    }
    resetForm(event);
  }

  const onEdit = (id: string) => {
    const currentWish = wishes.find(t => t.id === id);
    if(currentWish) setWish(currentWish);
  }

  const onCreate = () => {
    setWishes(prev => ([...prev, {
      id: 'aX'+ prev.length.toString()+1 ,
      title: wish.title,
      value: wish.value,
      status: 'none'
    }]));
  }

  const onUpdate = () => {
    setWishes(wishes.map( w => w.id == wish.id
      ? ({ ...w,
        id: wish.id,
        title: wish.title,
        value: wish.value,
        status: 'none' })
      : (w)
    ))
  }

  const resetForm = (event: FormEvent<HTMLFormElement>) => {
    const resetForm = event.target as HTMLFormElement;
    resetForm.reset();
    setWish({id: '', title: '', value: 0, status: 'none' });
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-6 md:p-24 bg-[#393E46]">
      <div className="items-center justify-between lg:flex">
        <h2 className="text-gray-300 text-xl mb-5 font-bold">Wish list (ReactJS)</h2>
      </div>

      <div className='w-full'>
        <WishForm wish={wish} setWish={setWish} onSubmit={onSubmit} />
      </div>

      <div className="w-full flex-col items-start justify-between flex">
        <ul className='w-full min-h-[30vh]'>
         { wishes.length > 0 && [...wishes].sort().map(item => item.status != 'removed' &&
          <WishList key={item.id} wish={item} checkedRow={checkedRow} onRemove={onRemove} onEdit={onEdit}/>
        )}
        </ul>
        <div className='bg-gray-200 w-full sm:w-1/3 p-2 self-end'>
          <p>Total: <span>R${total.toFixed(2)}</span></p>
        </div>
      </div>

      <div className='w-full sm:w-1/3 self-end'>
        <button type='button' className=' mt-5 bg-blue-500 hover:bg-blue-700 block w-full text-white font-bold py-2 px-4 rounded' onClick={handleRemoveAllWishes}>Delete all</button>
      </div>
    </main>
  )
}
