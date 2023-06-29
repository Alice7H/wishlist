import { useLanguageContext } from "@/hooks/useLanguageContext";
import { Dancing_Script } from "next/font/google";

const dancingScriptFont = Dancing_Script({
  weight: '700',
  subsets: ['latin'],
})

export function WishTitle () {
  const { dictionary } =  useLanguageContext();

  return (
    <div className='items-center justify-between lg:flex'>
      <h1 className={dancingScriptFont.className + ' text-4xl mb-5 font-bold'}>
        {dictionary.title}
      </h1>
    </div>
  )
}