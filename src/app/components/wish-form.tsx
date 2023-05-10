import { Dispatch, FormEvent, SetStateAction } from "react";
import { Wish } from "../page";

interface IWishForm {
  wish: Wish;
  setWish: Dispatch<SetStateAction<Wish>>
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export function WishForm ({wish, setWish, onSubmit}: IWishForm) {

  return (
    <form onSubmit={onSubmit}>
      <div className="grid gap-5 mb-5 grid-cols-2 md:grid-cols-4">
        <div className="col-span-2">
            <input type="text"
            id="title"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Write some wish here..."
            required
            onChange={(event)=> setWish((prev) => ({ ...prev, title: event.target.value}))}
            value={wish?.title || ''}
            />
        </div>
        <div className="col-span-2 md:col-span-1">
          <input type="number"
            id="value"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="100.00"
            required
            onChange={(event)=>setWish((prev) =>({...prev, value: parseFloat(event.target.value)}))}
            value={wish?.value || ''}
          />
        </div>
        <div className="col-span-2 md:col-span-1">
          <button className={`block w-full text-white font-bold py-2 px-4 rounded ${wish.id.length == 0 ? 'bg-blue-500 hover:bg-blue-700' : 'bg-lime-500 hover:bg-lime-700'}`}>{(wish.id.length == 0) ? 'Add wish' : 'Update wish'}</button>
        </div>
        </div>
    </form>
  )
}