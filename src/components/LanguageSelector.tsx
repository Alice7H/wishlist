import { useLanguageContext } from '@/hooks/useLanguageContext';
import { FormEvent } from 'react';

export function LanguageSelector() {
  const { dictionary, language, changeLanguage } = useLanguageContext();

  const onChangeLanguage = (event: FormEvent<HTMLSelectElement>) => {
    event.preventDefault();
    const formElement = event.target as HTMLFormElement;
    changeLanguage(formElement.value);
  }

  return (
    <select id='languages' onChange={onChangeLanguage}
    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'>
      <option value={language}>{dictionary.selectLanguage}</option>
      <option value='en'>{dictionary.langEn }</option>
      <option value='pt'>{dictionary.langPt }</option>
      <option value='es'>{dictionary.langEs }</option>
    </select>
  );
}