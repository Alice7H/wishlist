import { Wish } from "../types/Wish";
import { useWishContext } from '@/hooks/useWishContext';
import { useLanguageContext } from '@/hooks/useLanguageContext';
import { WishItems } from "./wish-items";
import { Gloria_Hallelujah } from "next/font/google";


interface IWishList {
  onEdit: (id: string) => void;
}

const gloriaHallelujahFont = Gloria_Hallelujah({
  weight: '400',
  subsets: ['latin'],
})

export function WishList ({onEdit}: IWishList) {
  const { dictionary } = useLanguageContext();
  const { state, wishesIsLoading } = useWishContext();

  if ( wishesIsLoading) {
    return <li className='mb-5 w-full flex justify-between items-center p-5 gap-5 md:gap-6'>
      <p className='text-black text-bold'>{dictionary.wishesLoading}</p>
    </li>
  }

  return (
    <ul className={gloriaHallelujahFont.className + ' w-full min-h-[30vh]'} >
      { state.length > 0
        ? [...state].sort().map(item => item.status != 'removed' &&
        <WishItems key={item.id} wish={item} onEdit={onEdit}/>)
        : <li className='mb-5 w-full flex justify-between items-center p-5 gap-5 md:gap-6'>
            <p className='text-black text-bold'>{dictionary.emptyWishList}</p>
          </li>
      }
    </ul>
  );
}
