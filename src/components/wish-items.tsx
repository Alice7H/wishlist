import Image from 'next/image';
import checkedIcon from '../../public/check_circle.svg';
import editIcon from '../../public/edit.svg';
import deleteIcon from '../../public/delete.svg';
import { Wish } from "../types/Wish";
import { useWishContext } from '@/hooks/useWishContext';
import { useLanguageContext } from '@/hooks/useLanguageContext';
import { ActionTypes } from '@/reducers/wishReducer';

interface IWishItems {
  wish: Wish;
  onEdit: (id: string) => void;
}

export function WishItems ({wish, onEdit}: IWishItems) {
  const { dictionary } = useLanguageContext();
  const { dispatch } = useWishContext();

  const onRemove = () => dispatch({type: ActionTypes.REMOVE_WISHES, payload: wish.id})
  const onCrossOutRow = () => dispatch({type: ActionTypes.CROSS_OUT_WISHES, payload: wish.id})
  const status = wish?.status === 'completed'? 'text-[#00C1D4] line-through decoration-4 decoration-[#2D46B9]': ''

  return (
    <li className='border-b mb-5 w-full flex justify-between items-center p-5 gap-5 md:gap-6'>
      <p className={`text-black ${status} `}>{wish?.title}</p>
      <p className={`text-black ${status} `}>
        {`${wish?.value == 0 ? '' : 'R$'+ wish?.value.toFixed(2)}`}
      </p>
      <div className='flex flex-wrap max-w-[60px] sm:max-w-full sm:flex-nowrap gap-6'>
        <button type="button" className="block w-full py-2 px-4 rounded" onClick={onCrossOutRow} >
        <Image src={checkedIcon} alt='Checked icon' width={24} height={24} title={dictionary.titleCheck}/>
        </button>
        <button type="button" className="block w-full py-2 px-4 rounded" onClick={()=> onEdit(wish.id)}
        title={dictionary.titleEdit}>
        <Image src={editIcon} alt='Edit icon' width={24} height={24} />
        </button>
        <button type="button" className="block w-full py-2 px-4 rounded" onClick={onRemove}
        title={dictionary.titleRemove}>
        <Image src={deleteIcon} alt='Trash icon' width={24} height={24} />
        </button>
      </div>
    </li>
  );
}
