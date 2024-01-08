import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'antd';
import useTheme from '../hooks/useTheme';
import { useTranslation } from 'react-i18next';

interface MyModalProps {
  visible: boolean;
  onCancel: () => void;
  onEdit: (name: string, createdAt: string, option: string, amount: number) => Promise<void>;
  initialName: string;
  initialDate: string; 
  initialAmount: number;
  initialOption:string
}

const MyModal: React.FC<MyModalProps> = ({ visible, onCancel, onEdit, initialName,
   initialDate , initialAmount, initialOption }) => {
    const [name, setName] = useState<string>(initialName);
    const [amount, setAmount] = useState<number>(typeof initialAmount === 'number' ? initialAmount : 0); 
    const [createdAt, setCreatedAt] = useState<string>(initialDate)
    const { mode } = useTheme();
    const { t } = useTranslation();
    const [option, setOption] = useState<string>(initialOption);

// set form by initials
    useEffect(() => {
        if (visible) {
            setName(initialName);
            setAmount(typeof initialAmount === 'number' ? initialAmount : 0);
            setOption(initialOption);
            setCreatedAt(initialDate);
        }
    }, [visible, initialName, initialDate, initialAmount, initialOption]);

//handling data from form 
    const handleOk = async () => {
        const adjustedAmount = option === 'expense' ? -Math.abs(amount) : Math.abs(amount);
        await onEdit(name, createdAt, option, adjustedAmount);
        onCancel();
    };
    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCreatedAt(e.target.value);
      };
    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value);
        setAmount(isNaN(value) ? 0 : value); 
    };
    const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setOption(e.target.value);
    };
  
    return (
       
         <Modal 
         title={t('edit')} 
         okText={t('saveChanges')}
         cancelText={t('cancel')}
         cancelButtonProps={{ style: { backgroundColor: 'red',color:'white' } }}
         okButtonProps={{ style: { backgroundColor: 'green' , borderColor: 'green' } }}
         visible={visible} onOk={handleOk} onCancel={onCancel}  >
        <div className=" "> 

      {/*set name  */}
        <label className={`block  mb-2`}>
         <div className={`block text-gray-700 ${mode === 'dark' ? 'text-white' : 'text-black'}`}> 
         </div>
         <p>{t('transactionName')}:</p>
       <input 
            type="text"
            className={`input p-2 w-full border border-gray-300 rounded-lg bg-gray-200 ${
              mode === 'dark' ? 'text-white bg-gray-600' : 'text-black'
            }`}
            required
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </label>
  
      {/*set options  */}
        <p>{t('transaction')} :</p>
        <select
          onChange={handleOptionChange}
          value={option}
          className={` text-black p-2 w-full  rounded-lg col-span-4
            ${option === 'income' ? 'bg-green-300 ' : 'bg-red-500 text-white'}
            ${option === 'expense' ? 'bg-red-300' : 'bg-green-300' }
            ${mode === 'dark' ? 'bg-gray-600' : ''} rounded-l`}
        >
          <option value="expense">{t('expense')}</option>
          <option value="income">{t('income')}</option>
        </select>
  

      {/* set date */}
        <label className="block ">
                <span className={`block mb-2 text-gray-700 ${mode === 'dark' ? 'text-white' : 'text-black'}`}> </span>
                <p>{t('date')} :</p>
                <input 
                    type="date"
                    className={`input p-1 w-full border border-gray-300 rounded-lg bg-gray-200 ${
                        mode === 'dark' ? 'text-white bg-gray-600' : 'text-black'
                    }`}
                    onChange={handleDateChange} value={createdAt}
                />
            </label>
         

      {/* set amount */}
        <label className="block "> 
          <span className={`block mb-2 text-gray-700 ${mode === 'dark' ? 'text-white' : 'text-black'}`}></span>
          <p>{t('amount')} (₪):</p>
          <input
            type="number"
            className={`input p-1 w-full border border-gray-300 rounded-lg bg-gray-200 ${
              mode === 'dark' ? 'text-white bg-gray-600' : 'text-black'
            }`}
            onChange={handleAmountChange}  value={option === 'expense' ? amount : Math.abs((amount)).toString()}
          />
        </label> 
         </div>
         
      </Modal>
    
    );
  };
  
  export default MyModal;
  