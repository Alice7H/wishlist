import { useWishContext, useWishDispatch } from '@/hooks/useWishContext';
import { useLanguageContext } from '@/hooks/useLanguageContext';
import { Gloria_Hallelujah } from "next/font/google";
import { Wish } from '@/types/Wish';
import { WishItems } from '@/components/WishItems';

interface IProps {
  setWish: (wish: Wish) => void;
}

const gloriaHallelujahFont = Gloria_Hallelujah({
  weight: '400',
  subsets: ['latin'],
})

export function WishList ({setWish}: IProps) {
  const { dictionary } = useLanguageContext();
  const { state } = useWishContext();
  const { onRemove, onCrossOutTheRowWish } = useWishDispatch();
  const total = state.reduce((acc: number, task: Wish) => task.status == 'none' ? acc + task.value : acc + 0, 0);

  const onEdit = (id: string) => {
    const currentWish = state.find(t => t.id === id) as Wish;
    setWish(currentWish);
  }

  return (
    <>
      <ul className={gloriaHallelujahFont.className + ' w-full min-h-[30vh]'} >
        { state.length > 0
          ? [...state].sort().map(item => item.status != 'removed' &&
          <WishItems key={item.id} wish={item}
            onEdit={onEdit}
            onRemove={()=> onRemove(item)}
            onCrossOutRow={()=>onCrossOutTheRowWish(item)}
          />)
          : <li className='mb-5 w-full flex justify-between items-center p-5 gap-5 md:gap-6'>
              <p className='text-black text-bold'>{dictionary.emptyWishList}</p>
            </li>
        }
      </ul>
      <div className='w-full flex-col items-start justify-between flex'>
        <div className='bg-gray-200 w-full sm:w-1/3 p-2 self-end'>
          <p>Total: <span>R${total?.toFixed(2)}</span></p>
        </div>
      </div>
    </>

  );
}
