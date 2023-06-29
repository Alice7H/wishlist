import Image from 'next/image';
import checkedIcon from '../../public/check_circle.svg';
import editIcon from '../../public/edit.svg';
import deleteIcon from '../../public/delete.svg';
import menu from '../../public/menu.svg'
import { useLanguageContext } from '@/hooks/useLanguageContext';
import { Wish } from "../types/Wish";
import { useState } from 'react';

interface IProps {
  wish: Wish;
  onEdit: (id: string) => void;
  onRemove: (wish: Wish) => void;
  onCrossOutRow: (wish: Wish) => void;
}

export function WishItems ({wish, onEdit, onRemove, onCrossOutRow}: IProps) {
  const [menuDisplay, setMenuDisplay] = useState(false);
  const { dictionary } = useLanguageContext();
  const status = wish?.status === 'completed'? 'text-[#00C1D4] line-through decoration-4 decoration-[#2D46B9]': ''

  const showMenu = menuDisplay
  ? 'flex flex-col absolute gap-2 max-w-none right-[15%] bg-gray-50 border border-gray-300 rounded sm:border-none sm:flex-row sm:static sm:max-w-full sm:bg-transparent sm:gap-0 md:gap-6'
  : 'hidden';

  return (
    <li className='border-b mb-5 w-full flex justify-between items-center p-5 gap-5 md:gap-6 relative '>
      <p className={`text-black ${status} `}>{wish?.title}</p>
      <p className={`text-black ${status} `}>
        {`${wish?.value == 0 ? '' : 'R$'+ wish?.value.toFixed(2)}`}
      </p>
      <button onClick={() => setMenuDisplay(!menuDisplay)} type="button" className="flex flex-shrink-0 items-center p-2 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200" aria-expanded="false">
        <span className="sr-only">Open item options</span>
        <Image src={menu} alt='More in vertical' width={24} height={24} title="Menu"/>
      </button>
      <div className={showMenu + ` sm:flex sm:max-w-full flex-row flex-nowrap md:gap-6`}>
        <button type="button" className="block w-full py-2 px-4 rounded" onClick={()=>onCrossOutRow(wish)} >
          <Image src={checkedIcon} alt='Checked icon' width={24} height={24} title={dictionary.titleCheck}/>
        </button>
        <button type="button" className="block w-full py-2 px-4 rounded" onClick={()=> onEdit(wish.id)}>
          <Image src={editIcon} alt='Edit icon' width={24} height={24} title={dictionary.titleEdit}/>
        </button>
        <button type="button" className="block w-full py-2 px-4 rounded" onClick={()=>onRemove(wish)}>
          <Image src={deleteIcon} alt='Trash icon' width={24} height={24} title={dictionary.titleRemove} />
        </button>
      </div>
    </li>
  );
}
