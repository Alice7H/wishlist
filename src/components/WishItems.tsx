import Image from 'next/image';
import checkedIcon from '../../public/check_circle.svg';
import editIcon from '../../public/edit.svg';
import deleteIcon from '../../public/delete.svg';
import { useLanguageContext } from '@/hooks/useLanguageContext';
import { Wish } from "../types/Wish";

interface IProps {
  wish: Wish;
  onEdit: (id: string) => void;
  onRemove: (wish: Wish) => void;
  onCrossOutRow: (wish: Wish) => void;
}

export function WishItems ({wish, onEdit, onRemove, onCrossOutRow}: IProps) {
  const { dictionary } = useLanguageContext();
  const status = wish?.status === 'completed'? 'text-[#00C1D4] line-through decoration-4 decoration-[#2D46B9]': ''

  return (
    <li className='border-b mb-5 w-full flex justify-between items-center p-5 gap-5 md:gap-6'>
      <p className={`text-black ${status} `}>{wish?.title}</p>
      <p className={`text-black ${status} `}>
        {`${wish?.value == 0 ? '' : 'R$'+ wish?.value.toFixed(2)}`}
      </p>
      <div className='flex flex-wrap max-w-[60px] sm:max-w-full sm:flex-nowrap gap-6'>
        <button type="button" className="block w-full py-2 px-4 rounded" onClick={()=>onCrossOutRow(wish)} >
          <Image src={checkedIcon} alt='Checked icon' width={24} height={24} title={dictionary.titleCheck}/>
        </button>
        <button type="button" className="block w-full py-2 px-4 rounded" onClick={()=> onEdit(wish.id)}
        title={dictionary.titleEdit}>
          <Image src={editIcon} alt='Edit icon' width={24} height={24} />
        </button>
        <button type="button" className="block w-full py-2 px-4 rounded" onClick={()=>onRemove(wish)}
        title={dictionary.titleRemove}>
          <Image src={deleteIcon} alt='Trash icon' width={24} height={24} />
        </button>
      </div>
    </li>
  );
}
