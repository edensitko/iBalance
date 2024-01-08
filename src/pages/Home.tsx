
import React, {useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { useFirestore } from '../hooks/useFirestore';
import TransactionList from './transactionList';
import useTheme from '../hooks/useTheme';
import main from '../components/layout/assets/images/MainHome.png';
import { useCollection } from '../hooks/useCollection';
import { useTranslation } from 'react-i18next';
import maindes from '../components/layout/assets/images/maindes.jpg';

const Home: React.FC = () => {
  
  const [name, setName] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const { user } = useAuthContext();
  const { addDocument } = useFirestore('transactions');
  const { t } = useTranslation();
  const [option, setOption] = useState('expense'); 
  const {mode}=useTheme();
  const [totalAmount, setTotalAmount] = useState<number>(0);


  //fetch collection to user by uid 
  const { documents, error: collectionError } = useCollection(
    'transactions',
    [{ field: 'uid', operator: '==', value: user?.uid }],
    [{ field: 'createdAt', direction: 'asc' }]
  );

 const handleTotalAmountChange = (amount: number) => {
    setTotalAmount(amount);
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() !== '' && amount.trim() !== '') {
      let parsedAmount = parseFloat(amount);
    if (!isNaN(parsedAmount)) {
    if (option === 'expense') {
        parsedAmount = -Math.abs(parsedAmount);
     }

  //form function to add transaction
        addDocument(
          {
            uid: user ? user.uid : '',
            name: name || 'DefaultName',
            amount: parsedAmount || 0,
            option: option || 'defaultOption'
          },
          user 
        );
        setName('');
        setAmount('');
        setOption(option);
      } else {
        console.error('Invalid amount input');
      }
    }
  };
  // option type of transaction func to handle selected 
  const setSelectedOption = (event: { target: { value: string } }) => {
    const selectedValue = event.target.value;
    setOption(selectedValue);
  };

  return (
    <> 

<div className={`total`}>
      </div>
      {/* header balance amount and name  */}
      <div className={`container m-auto flex grid  ${mode === `dark`? `text-white`:`text-black`} lg:grid-cols-4 `}>
        <div className={`text-6xl col-span-4 m-auto mt-36 `}>
          <div className="text-3xl text-center text-blue-600"> {user && <p>{t('info')} {user.displayName}!</p>}</div>
          <div className="space-between  m-5">
           {t('balance')} :
          </div>
           <div className={` mb-10 text-5xl m-10 ${
      mode === 'dark'
    ? totalAmount < 0
      ? 'text-red-400'
      : totalAmount === 0
      ? 'text-blue-400'
      : 'text-green-400'
    : totalAmount < 0
    ? 'text-red-400'
    : totalAmount === 0
    ? 'text-blue-700'
    : 'text-green-700'
}`}>
  {totalAmount >= 0 ? (
    <>
      ₪{totalAmount}
      <img src={main}  alt="MainHome" width={300} />
    </>
  ) : (
    <>
      - ₪{Math.abs(totalAmount)}
      <img src={maindes} alt="maindes" width={300} />
    </>
  )}
</div>

        </div>
        <div className='m-10'>
        </div>
        <div className=''>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-1">   
     
          {user ? (
        //form to add transactions 
            <form
              className="p-5 m-6 border border-white-300 rounded-lg shadow-md bg-blue-800 bg-opacity-30"
              onSubmit={handleSubmit}
            >
              <label className="block mb-4">
                <span className={`block text-xl text-gray-700 ${mode === "dark" ? `text-white` : `text-black` } `}>   {t('transaction')} :</span><br/>
                <select onChange={setSelectedOption} value={option} 
               className={`text-black p-2 w-full p-1.5 rounded-lg col-span-4
                ${option === "income" ? "bg-green-300 " : "bg-red-500 text-white" } 
                ${option === "expense" ? "bg-red-300" : "bg-green-300" } 
                ${mode === "dark" ? "bg-gray-600" : ""} rounded-l`}
            >
                  <option value="expense" >{t('expense')}</option>
                  <option value="income" >{t('income')}</option>
                </select>
              </label>
              <label className={`block mb-4  `}>
                <span className={`block text-gray-700 ${mode === "dark" ? `text-white` : `text-black` }`}>{t('transactionName')}: </span>
                <input
                  type="text"
                  className={`input p-2 w-full border border-gray-300 rounded-lg bg-gray-200 ${mode === "dark" ? `text-white bg-gray-600` : `text-black` }`}
                  required
                  onChange={e => setName(e.target.value)}
                  value={name}
                />
              </label>
              <label className="block mb-4">
                <span className={`block text-gray-700 ${mode === "dark" ? `text-white` : `text-black` }`}>{t('amount')} (₪):</span>
                <input
                  type="number"
                  className={`input p-1 w-full border border-gray-300 rounded-lg bg-gray-200 ${mode === "dark" ? `text-white bg-gray-600` : `text-black` }`}
                  onChange={e => setAmount(e.target.value)}
                  value={amount}
                />
              </label>
              <button className={`btn text-white bg-blue-600 hover:bg-blue-400 font-bold py-2 px-4 rounded-full w-full `}>
              {t('addtransaction')}
              </button>
            </form>
          ) : (
            <p>Please log in to add transactions.</p>
          )}
        </div>
        <div className="lg:col-span-2">
          {documents && <TransactionList transactions={documents} onTotalAmountChange={handleTotalAmountChange} />} 
                    {collectionError && <p className="text-red-500">{collectionError}</p>}
        </div>
      </div>
    </>
  );
};

export default Home ;
