// src/pages/Home.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSignUp } from '../hooks/useSignUp';
import useTheme from '../hooks/useTheme';
import { useTranslation } from 'react-i18next';

const SignUp : React.FC = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const {signUp , pending , error }= useSignUp()
    const { mode } = useTheme();
    const { t } = useTranslation();

    //handle submit
    const handleSubmit =  (e: { preventDefault: () => void }) => {
    e.preventDefault();
    signUp(email, password,name)
    console.log(email, password ,name );
    };

  return (
    <div className='p-2'>{
 <form onSubmit={handleSubmit } className='mt-36 text-center border-x-2 p-5 w-80 m-auto'>
   <div className=' p-3 text-2xl text-blue-500 mb-5'>{t('signup')} </div>

 {/* email */}
    <label className={`mb-2 text-m text-gray-900 ${mode === `dark`? `text-white`:`text-black`}`}> {t('email')}
      <input className={`input email border border-gray-300 text-black-900 text-sm rounded-lg 
      focus:ring-blue-500 focus:border-blue-500 block  p-2.5 
      ${mode === `dark`? `bg-gray-600 text-white` :`bg-white text-black`} w-full`}
      type='email'
      required
      onChange={(e) => setEmail(e.target.value)}
      value={email}>
     </input> 
   </label>

    {/* password  */}
    <label className={`mb-2 text-m text-gray-900 ${mode === `dark`? `text-white`:`text-black`}`}> {t('password')}
      <input className={` input pass border bg-gray-600border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5   w-full   ${mode === `dark`? `bg-gray-600 text-white` :`bg-white text-black`} `}
      type='password'
      required
      onChange={(e) => setName(e.target.value)}
      value={name} >
    </input> 
   </label>

    {/* name */}
 <label className={`mb-2 text-m text-gray-900 ${mode === `dark`? `text-white`:`text-black`}`}>
      {t('yourName')}
    <input className={`input name border ${mode === `dark`? `bg-gray-600 text-white` :`bg-white text-black`}border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-full  m-auto `}
    type='text'
    required
    onChange={(e) => setPassword(e.target.value)}
    value={password}>
   </input> 
 </label>

  {/* pendings */}
    {pending && <button className='btn text-white mt-5 focus:ring-4 focus:outline-none 
    focus:ring-blue-300 font-medium rounded-xl text-sm px-5 py-2.5 text-center dark:bg-blue-600 w-40
     dark:hover:bg-blue-700 dark:focus:ring-blue-800' disabled> 
     {t('loading')}</button>}

    {!pending && <button  className='btn text-white mt-5 focus:ring-4 
    focus:outline-none focus:ring-blue-300 font-medium rounded-xl text-sm px-5 py-2.5 text-center 
    dark:bg-blue-600 w-40 dark:hover:bg-blue-700 dark:focus:ring-blue-800'> 
    {t('signup')}</button>  }
    <br/>

  {/* navigation to login */}
    <div className="text-blue-500 m-5 ">{t('user')}<Link to= "/login"><span className='text-blue-700 underline underline-offset-4'> {t('login')}</span></Link>
    <br/><br/><hr/>

    {error && <p className='text-red-800'> {error}</p>}

    </div>
    </form>
  }
    </div>
    
  );
  
};

export default SignUp;



