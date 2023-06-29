'use client'
import { useLanguageContext } from "@/hooks/useLanguageContext"
import { useWishDispatch } from "@/hooks/useWishContext";

export function WishListClearer() {
  const { dictionary } = useLanguageContext();
  const { onRemoveAll } = useWishDispatch();

  const handleRemoveAllWishes = () => {
    onRemoveAll();
    localStorage.removeItem('wishes');
  }

  return (
    <div className='w-full sm:w-1/3 self-end'>
      <button type='button'
        className='mt-5 bg-blue-500 hover:bg-blue-700 block w-full text-white font-bold py-2 px-4 rounded'
        onClick={handleRemoveAllWishes}>
        {dictionary.btnDeleteAll}
      </button>
    </div>
  )
}