'use client'
import { useLanguageContext } from '@/hooks/useLanguageContext';
import { useWishDispatch } from '@/hooks/useWishContext';

export function SortableWishList(){
  const { dictionary } = useLanguageContext();
  const { onFilterWishes } = useWishDispatch();

  const  defaultFilterValue = 'none';
  const filterOptions = [
    {value: 'title', description: `${dictionary.filterOptionTitle}`},
    {value: 'value', description: `${dictionary.filterOptionValue}`}
  ]

  return(
    <select id='sortWishes' onChange={(event) =>onFilterWishes(event.target.value)}
    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'>
      <option value={defaultFilterValue}>{dictionary.defaultFilterTitle}</option>
      {
        filterOptions.map((opt)=> <option key={opt.value} value={opt.value}>{opt.description}</option>)
      }
    </select>
  );
}