import { FormEvent, useContext } from "react";
import { LanguageContext } from "../context/language-context";

export function WishTranslation() {

  const {language, dictionary, changeLanguage} = useContext(LanguageContext);

  const onChangeLanguage = (event: FormEvent<HTMLSelectElement>) => {
    event.preventDefault();
    const formElement = event.target as HTMLFormElement;
    changeLanguage(formElement.value);
  }

  return (
    <select id="languages" onChange={onChangeLanguage} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
      <option value={language}>{dictionary.selectLanguage}</option>
      <option value="en">{dictionary.langEn }</option>
      <option value="pt">{dictionary.langPt }</option>
    </select>
  );
}