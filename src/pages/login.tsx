import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useTheme from '../hooks/useTheme';
import { useTranslation } from 'react-i18next';
import useLogin from '../hooks/useLogin';
const Login : React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, error, isPending } = useLogin();
    const { t } = useTranslation();
    const { mode } = useTheme();

 // hande form submit 
const handleSubmit = async (e: { preventDefault: () => void; }) => {
e.preventDefault()
console.log(email,password)
login(email, password)

    }
  return (
    <div className={`p-2`}>
      <form onSubmit={handleSubmit} className={`text-center mb-16 mt-36 w-80 m-auto border-x-2 p-5 ${mode === `dark`? `text-white`:`text-black`}`}>
        <h2 className='p-3 text-2xl text-blue-500 mb-5'>{t('login')}</h2>
        <label className={`mb-2 text-m text-gray-900 ${mode === `dark`? `text-white`:`text-black`}`}>
        {t('email')}
          <input
            className={`email ${mode === `dark`? `bg-gray-600 text-white` :`bg-white text-black`} input border border-gray-300  text-sm rounded-lg focus:ring-blue-500  focus:border-blue-500 block w-full p-2.5`}
            type='email'
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label className={`mb-2 text-m  ${mode === `dark`? `text-white`:`text-black`}`}>
        {t('password')}
          <input
            className={`pass input name  ${mode === `dark`? `bg-gray-600 text-white` :`bg-white text-black`} border border-gray-300 text-black-900 text-sm rounded-lg  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
            type='password' 
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        {!isPending && <button
          className='btn text-white mt-5 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-xl text-sm px-5 py-2.5 text-center dark:bg-blue-600 w-40 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
          >  {t('login')}
        </button>}
        {isPending && <button disabled className='btn text-black mt-5 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-xl text-sm px-5 py-2.5 text-center dark:bg-blue-600 w-40 dark:hover:bg-blue-700 dark:focus:ring-blue-800'> {t('loading')}</button>}
        {error && <p className='text-red-800'> {"Email and/or Password not match "}</p>}
        <br />

         {/* navigation to signup */}
        <div className="text-blue-500 mt-3 m-auto">
        {t('user1')} <Link to="/signUp"><span className='text-blue-700 underline underline-offset-4'>{t('signup')}</span></Link>
        </div>
           <br/><br/><hr/>
      </form>
    </div>

  );
};

export default Login;
