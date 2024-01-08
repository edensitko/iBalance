
import React, { useEffect, useState } from 'react';
import { useFirestore } from '../hooks/useFirestore';
import useTheme from '../hooks/useTheme';
import { useAuthContext } from '../hooks/useAuthContext';
import useUserData from '../hooks/useUserData';
import { t } from 'i18next';
import MyModal from './modalEdit';
import dayjs from 'dayjs';

interface Transaction {
  id: string;
  name: string;
  amount: number;
  option: string;
  createdAt: { seconds: number; nanoseconds: number }; 
  uid: string;
}
interface TransactionListProps {
  transactions: Transaction[];
  onTotalAmountChange: (totalAmount: number) => void;
}

const TransactionList: React.FC<TransactionListProps> = ({transactions,onTotalAmountChange,}) => {
  const { deleteDocument , updateDocument} = useFirestore('transactions');
  const { mode } = useTheme();
  const { user } = useAuthContext();
  const { userData, loading, error } = useUserData(user?.uid, 'transactions');
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  // handle edit 
  const handleEditClick = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setModalVisible(true);
  };

  //handle cancel 
  const handleModalCancel = () => {
    setModalVisible(false);
  };

//handle the edit form 
  const handleModalEdit = async (name: string, date: string, option: string, amount: number) => {
    try {
      if (!selectedTransaction) {
        console.error('Selected transaction is null or undefined.');
        return;
      }

  //update the data transactions 
      const updatedTransaction: Partial<Transaction> = {
        name,
        option,
        amount,
      };
  
      // Check if date is not an empty string before updating createdAt
      if (date !== '') {

        // format the date string
        const formattedDate = dayjs(date, 'YYYY/MM/DD').format('YYYY-MM-DD');
  
        // Convert the formatted date to a Firestore Timestamp 
        const timestamp = new Date(formattedDate);
        updatedTransaction.createdAt = {
          seconds: timestamp.getTime() / 1000,
          nanoseconds: 0,
        };
      }
      await updateDocument(selectedTransaction.id, updatedTransaction);
      handleModalCancel();
      console.log('Transaction updated successfully!');
    } catch (error) {
      console.error('Error updating transaction:', error);
    }
  };
  
  //sort the transactions
    const sortedTransactions: Transaction[] = transactions
    .filter((transaction) => transaction.uid === user?.uid)
    .slice()
    .sort((b, a) => a.createdAt.seconds - b.createdAt.seconds || a.createdAt.nanoseconds - b.createdAt.nanoseconds);

  useEffect(() => {
    const newTotalAmount = sortedTransactions.reduce((total, transaction) => total + transaction.amount, 0);
    setTotalAmount(newTotalAmount);
    onTotalAmountChange(newTotalAmount);
  }, [transactions, user, onTotalAmountChange]);

 // handle delete id 
  const handleDelete = (id: string) => {
    deleteDocument(id)
      .then(() => {
        console.log(`Transaction with ID ${id} deleted successfully.`);
      })
      .catch((error) => {
        console.error(`Error deleting transaction with ID ${id}:`, error);
      });
  };

  //format date 
  const formatDate = (timestamp: { seconds: number; nanoseconds: number }) => {
   const date = timestamp ? new Date(timestamp.seconds * 1000) : null;
  
    if (date) {
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear().toString();
  
      return `${year}-${month}-${day}`;
    }
    return '';
  };

  //loading func 
  useEffect(() => {
    if (loading) {
      console.log('Loading user data...');
    }
    if (error) {
      console.error('Error fetching user data:', error);
    }
    if (userData) {
      console.log('User data:', userData);
    }
  }, [loading, error, userData]);

  return (
    <div className={`transactions w-full`}>
      {sortedTransactions.map((transaction: Transaction) => (
        <div key={transaction.id} className={`m-2 rounded-xl shadow-md`}>
          <div
            className={`text-xl ${
              transaction.option === 'expense'
                ? 'border-l-8 border-red-500'
                : 'border-green-500'
            } ${
              transaction.option === 'income'
                ? 'border-l-8 border-green-500'
                : 'border-red-500'
            } rounded-xl p-5 ${mode}`}
          >
            <div className="flex  p-2 m-3">
              <p
                className={`lg:col-span-1 mr-2 m-auto font-normal text-black ${
                  mode === 'dark' ? 'text-white' : 'text-black'
                } text-xl`}
              >
                {transaction.name} 
              </p>
              <div className="flex items-center">
                <p
                  className={`m-auto mr-5  ${
                    transaction.option === 'expense' ? 'text-red-400' : 'text-green-600'
                  } ${
                    transaction.option === 'income' ? 'text-green-600' : 'text-red-400'
                  }`}
                >
                  {transaction.amount}₪    
       <div className="text-sm text-gray-400">
       {new Date(transaction.createdAt.seconds * 1000).toLocaleDateString('en-GB')}
        </div> </p>
 
 {/* modal edit button  */}
       <MyModal
        visible={modalVisible}
        onCancel={handleModalCancel}
        onEdit={handleModalEdit}
        initialName={selectedTransaction?.name || ''}
        initialDate={selectedTransaction?.createdAt?.seconds
          ? formatDate(selectedTransaction.createdAt) // Format the date as needed
          : ''}
        initialAmount={selectedTransaction?.amount || 0}
        initialOption={selectedTransaction?.option || 'expense'}
      />


        <button
  onClick={() => handleEditClick(transaction)}
  className={`text-black bg-blue-300 focus:ring-4 p-3 m-3 focus:outline-none focus:ring-gray-300
   font-medium rounded-xl text-sm py-2.5 bg-gray-300`}>
  {t('edit')}
  </button>


      <button
      onClick={() => handleDelete(transaction.id)}
       className={`text-black bg-red-300 focus:ring-4 p-3 m-3 focus:outline-none
        focus:ring-gray-300 font-medium rounded-xl text-sm py-2.5 bg-gray-300`}  >
        {t('delete')}
        </button>
        </div>
       </div>
       </div>
      </div>
      ))}
      <div className={`total m-2 p-3 text-xl text-blue-600`}>
        {t('total')}: {totalAmount}₪
      </div>
    </div>
  );
};

export default TransactionList;
