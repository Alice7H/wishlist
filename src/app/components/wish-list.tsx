import Image from 'next/image';
import checkedIcon from '../../../public/check_circle.svg';
import editIcon from '../../../public/edit.svg';
import deleteIcon from '../../../public/delete.svg';
import { Wish } from '../page';

interface IWishList {
  wish: Wish;
  checkedRow: (id: string) => void;
  onRemove: (id: string) => void;
  onEdit: (id: string) => void;
}

export function WishList ({wish, checkedRow, onRemove, onEdit}: IWishList) {

  return (
    <li key={wish.id} className='bg-[#524A4E] mb-5 w-full flex justify-between items-center p-5 gap-5 md:gap-6'>
    <p className={`text-gray-200 ${wish.status === 'completed' && 'text-[#00C1D4] line-through decoration-4 decoration-[#2D46B9]'} `}>{wish.title}</p>
    <p className={`text-gray-200 ${wish.status === 'completed' && 'text-[#00C1D4] line-through decoration-4 decoration-[#2D46B9]'} `}>R$ {wish.value.toFixed(2)}</p>
    <div className='flex flex-wrap max-w-[60px] sm:max-w-full sm:flex-nowrap gap-6'>
      <button type="button" className="block w-full py-2 px-4 rounded" onClick={()=>checkedRow(wish.id)}>
       <Image src={checkedIcon} alt='Completo' width={24} height={24}/>
      </button>
      <button type="button" className="block w-full py-2 px-4 rounded" onClick={()=> onEdit(wish.id)}>
       <Image src={editIcon} alt='Editar' width={24} height={24} />
      </button>
      <button  type="button" className="block w-full py-2 px-4 rounded" onClick={()=> onRemove(wish.id)}>
       <Image src={deleteIcon} alt='Remover' width={24} height={24} />
      </button>
    </div>
   </li>
  );
}
