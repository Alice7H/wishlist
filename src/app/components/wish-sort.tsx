import { useContext } from "react";
import { LanguageContext } from "../context/language-context";

interface IWishSort {
  onSortWishes: (value: string) => void;
};

export function WishSort({ onSortWishes }: IWishSort){
  const {dictionary} = useContext(LanguageContext);

  const  defaultFilterValue = 'none';
  const filterOptions = [
    {value: 'title', description: `${dictionary.filterOptionTitle}`},
    {value: 'value', description: `${dictionary.filterOptionValue}`}
  ]

  return(
    <select id="sortWishes" onChange={(event) =>onSortWishes(event.target.value)}
    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
      <option value={defaultFilterValue}>{dictionary.defaultFilterTitle}</option>
      {
        filterOptions.map((opt)=> <option key={opt.value} value={opt.value}>{opt.description}</option>)
      }
    </select>
  );
}