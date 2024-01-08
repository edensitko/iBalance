import React from 'react';
import { useTranslation } from 'react-i18next';

const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (

    <footer className="footer text-white text-center p-5 bg-gray-800 ">
      <p>&copy; {new Date().getFullYear()} {t('footer')} </p>
    </footer>
    
  );
};

export default Footer;
