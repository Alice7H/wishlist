'use client'
import Image from 'next/image';
import TranslateIcon from '../../public/translate.svg';
import { LanguageSelector } from '@/components/LanguageSelector';
import { WishTitle } from '@/components/WishTitle';

export function LanguageTitleRenderer() {

  return (
    <>
      <div className='w-full sm:w-1/3 self-end mb-10 flex gap-2'>
       <Image src={TranslateIcon} alt='Translation icon' width={32} height={32}/>
       <LanguageSelector />
      </div>

      <WishTitle />
    </>
  )
}