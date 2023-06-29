import { FormListContainer } from "@/components/FormListContainer";
import { LanguageTitleRenderer } from "@/components/LanguageTitleRenderer";
import { SortableWishList } from "@/components/SortableWishList";

export default function Home() {

  return (
    <main className='relative flex min-h-screen flex-col items-center justify-between p-6 md:p-24 md:pt-5 bg-wish'>
      <div className='absolute sm:w-[150px] sm:h-[150px] md:w-[250px] md:h-[250px] bottom-0 left-[20vw] bg-pet bg-contain bg-no-repeat'></div>
      <div className='relative w-full'>
        <div className='opacity-[0.75] absolute -top-4 -left-[40px] sm:-left-[5vw] sm:w-[250px] sm:h-[250px] md:-top-8 bg-food bg-contain bg-no-repeat'></div>
      </div>
      <LanguageTitleRenderer />
      <div className='w-full flex flex-col'>
        <div className='w-full sm:w-1/3 my-5 self-end'>
          <SortableWishList />
        </div>
        <FormListContainer/>
      </div>
    </main>
  )
}
