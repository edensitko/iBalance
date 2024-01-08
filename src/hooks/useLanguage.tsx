import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import usa from '../components/layout/assets/images/usa.jpg';
import he from '../components/layout/assets/images/israel.jpg';
import { i18n } from './useI8nHook';

//image toggle for translation 
const ToggleImageButton = () => {
  const [currentImage, setCurrentImage] = useState('');

  const toggleImage = () => {
    setCurrentImage(currentImage === 'he' ? 'en': 'he');
  };

  return (
    <div>
      <button onClick={toggleImage}>
        {currentImage === 'he' ? (
            <img src={usa} alt="usa" width={40} />
            ) : (
            <img src={he} alt="he" width={40} />
            )}
      </button>
    </div>
  );
};

//functionality for language toggle 
const LanguageToggle = () => {
  const { t } = useTranslation();
  const toggleLanguage = () => {
  const newLanguage = i18n.language === 'en' ? 'he' : 'en';
    i18n.changeLanguage(newLanguage);
    document.documentElement.dir = newLanguage === 'he' ? 'rtl' : 'ltr';
  };

  return (
    <div>
      <button onClick={toggleLanguage}>
         <ToggleImageButton />
      </button>

    </div>
  );
};

export default LanguageToggle;
