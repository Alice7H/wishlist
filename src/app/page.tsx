'use client'

import {FormEvent, useContext, useEffect, useState} from 'react';
import { WishForm } from './components/wish-form';
import { WishList } from './components/wish-list';
import { LanguageContext } from './context/language-context';
import { WishTranslation } from './components/wish-translation';
import { WishSort } from './components/wish-sort';

export interface Wish {
  id: string;
  title: string;
  value: number;
  status: 'completed'|'removed'|'none',
}

export default function Home() {
  const {dictionary} = useContext(LanguageContext);

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
      id: 'aX'+ prev.length.toString(),
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
    const formElement = event.target as HTMLFormElement;
    formElement.reset();
    setWish({id: '', title: '', value: 0, status: 'none' });
  }


  // sorting wishes
  const onSortWishes = (value: string) => {
    let sortSelected = _sortByDefault();
    if(value === 'value'){
      sortSelected = _sortByValue();
    }else if(value === 'title'){
      sortSelected = _sortByTitle();
    }
    setWishes(sortSelected);
  }

  const _sortByValue = () => {
    return [...wishes].sort((a,b)=> a.value - b.value);
  }

  const _sortByTitle = () => {
    return [...wishes].sort((a,b)=> {
      if (a.title < b.title) {return -1;}
      if (a.title > b.title) { return 1; }
      return 0;
    });
  }

  const _sortByDefault = () => {
    return [...wishes].sort((a,b)=> {
      if (a.id < b.id) {return -1;}
      if (a.id > b.id) { return 1; }
      return 0;
    });
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-6 md:p-24 md:pt-5 bg-[#393E46]">
      <div className='w-full sm:w-1/3 self-end mb-10'>
       <WishTranslation/>
      </div>

      <div className="items-center justify-between lg:flex">
        <h2 className="text-gray-300 text-xl mb-5 font-bold">{dictionary.title}</h2>
      </div>

      <div className='w-full flex flex-col'>
        <div className='w-full sm:w-1/3 my-5 self-end'>
          <WishSort onSortWishes={onSortWishes} />
        </div>
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
        <button type='button' className=' mt-5 bg-blue-500 hover:bg-blue-700 block w-full text-white font-bold py-2 px-4 rounded' onClick={handleRemoveAllWishes}>{dictionary.btnDeleteAll}</button>
      </div>
    </main>
  )
}
