
import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line } from 'recharts';
import useUserData from '../hooks/useUserData';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useTheme from '../hooks/useTheme';
import { Button, Input, Table, DatePicker, Select } from 'antd';
import dayjs from 'dayjs';
import { SortOrder } from 'antd/es/table/interface';

interface Transaction {
  createdAt: any;
  date: string;
  amount: number;
  name: string;
  option: string;
}


const Reports: React.FC = () => {
  const { user } = useAuthContext();
  const { userData, loading, error } = useUserData(user?.uid, 'transactions');
  const [chartData, setChartData] = useState<any[]>([]);
  const { t } = useTranslation();
  const { mode } = useTheme();
  const [selectedMonth, setSelectedMonth] = useState<Date | null>(new Date());
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [searchName, setSearchName] = useState<string | null>(null);
  const [filteredDatas, setFilteredData] = useState<Array<any>>([]);
  const [expenseData, setExpenseData] = useState<any[]>([]);
  const [incomeData, setIncomeData] = useState<any[]>([]);
  const formattedData: any[] = [];

  // sorting the transaction 
  const sortTransactions = (transactions: Transaction[]) => {
    return transactions.slice().sort((a, b) => a.createdAt.seconds - b.createdAt.seconds);
  };

  useEffect(() => {
    if (loading) {
      console.log('Loading user data...');
    }
    if (error) {
      console.error('Error fetching user data:', error);
    }
    if (userData) {
      const sortedTransactions = sortTransactions(userData);
  
      // Prepare chart data
      const newData = sortedTransactions.map((data: any) => ({
        date: new Date(data.createdAt.seconds * 1000),
        amount: data.amount,
        name: data.name,
        option: data.option,
      }));
    
      setChartData(newData);
      setFilteredData(newData);
  
      setIncomeData(filterIncomeData(newData));
      setExpenseData(filterExpenseData(newData));

    }
  }, [loading, error, userData]);
  
  //formatting the date 
  const formatTick = (date: Date) => {
    return dayjs(date).format('DD/MM/YYYY'); 
  };
  
  //handle date change format 
  const handleSearchByDate = (date: any) => {
    if (date) {
      const selectedDate = dayjs(date).format('DD/MM/YYYY');
      const filteredByDate = chartData.filter((data) => dayjs(data.date).format('DD/MM/YYYY') === selectedDate);
      setFilteredData(filteredByDate);
    } else {
      setFilteredData(chartData); 
    }
    setSelectedMonth(date);
  };

  // handle income data 
  const filterIncomeData = (data: any[]) => {
    return data.filter((item) => item.option === 'income');
  };
  
 //handle search
const handleSearchByOption = (value: string) => {
  setSelectedOption(value);
  applyFilters(chartData);
};

// Reset to original data
const resetFilters = () => {
  setFilteredData(chartData); 
  setSelectedOption(null);
  setSearchName(null);
  setSelectedMonth(null);
};
// handle search name 
const handleSearchByName = (value: string) => {
  const filteredByName = chartData.filter((data) => data.name.toLowerCase().includes(value.toLowerCase()));
  setFilteredData(filteredByName);
  setSearchName(value);
};
// filter expenses 
const filterExpenseData = (data: any[]) => {
  return data
    .filter((item) => item.option === 'expense')
    .map((item) => ({
      ...item,
      amount: item.amount.toString().replace('-', ''), 
    }));
};

const applyFilters = (data: any[]) => {
  let filteredData = data;
  if (selectedOption) {
    filteredData = filteredData.filter((item) => item.option === selectedOption);
  }
  setFilteredData([...filteredData].reverse());
};
// table data 
const columns = [
  {
    title: t('date'),
    dataIndex: 'date',
    key: 'date', 
    defaultSortOrder: 'descend' as SortOrder, 
    render: (date: Date) => formatTick(date),
    sorter: (a: any, b: any) => a.date.getTime() - b.date.getTime(), 

  },
  {
    title: t('amount'),
    dataIndex: 'amount',
    key: 'amount',
  },
];

columns.unshift(
  {
    title: t('transactionName'),
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: t('kindTra'),
    dataIndex: 'option',
    key: 'option',
  }
);
return (

      <div className={`m-auto overflow-x-hidden ${mode === 'dark' ? 'text-white' : 'text-black'}` }>
   <div className="p-16"></div>
    <div className="">
    
        <div className="w-100 text-blue-400  p-5 text-center  text-2xl">
         {t('reportsInfo')} {user.displayName} 😀
            <span className={`text-blue-200 ml-2 ${mode === 'dark' ? 'text-blue' : 'text-blue-500'}`} > {t('yourrepo')} 
            </span>
           </div>
         </div> 
      
      <p className="p-2  w-100 m-auto lg:w-1/2 lg:col-span-2">
      {t('repoInfo')} </p>

     {/* no data  */}
   {!chartData.length && (
              <div className="text-center text-red-300 m-20">
                {t('noData')}  
                <Link className="underline text-blue-300" to="/"> {t('hoempage')}</Link>.
        </div>
      )}


    {/* data exist */}
    {chartData.length > 0 && (
      <div className="grid md:grid-cols-2 gap-4  sm:grid-cols-1 ">

    {/* chart of balance over days  */}
      <div className="col-span-2  m-auto ">
         <LineChart width={330} height={300} data={chartData}>
            <Line type="monotone" dataKey="amount" stroke="#DDA0DD" />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="date" tickFormatter={(date) => formatTick(date)} />
            <YAxis />
            <Tooltip />
            <Legend verticalAlign="top" height={36} content={<div style={{ color: 'plum' }}> {t('firstG')} </div>} />
          </LineChart>
        </div>

  {/* Filter by Option (Income/Expense) */}
    <div className="text-center col-span-2 lg:p-10">
        <Select
          className="m-2 "
          placeholder={t('filterByOption')}
          value={selectedOption}
          onChange={(value) => handleSearchByOption(value)} >
          <Select.Option value="income"> {t('income')}</Select.Option>
          <Select.Option value="expense">{t('expense')}</Select.Option>
        </Select>
    
     {/* Filter by name */}
      <Input
        className="m-2 w-32"
        placeholder={t('filterByName')}
        value={searchName || ''} 
        onChange={(e) => handleSearchByName(e.target.value)}
      />  

     {/* Filter by date */}
     <DatePicker className="m-2" placeholder={t('filterByDate')} onChange={(date) => handleSearchByDate(date)} />
       <Button className="m-2 text-white bg-blue-500" onClick={resetFilters}>
       {t('resetFilters')}
      </Button>

       <Table className="m-5" dataSource={filteredDatas} columns={columns} />
    </div>

<div className=" lg:flex col-span-2 m-auto ">
    
       {/* expense chart */}
      <BarChart width={330} height={300} data={expenseData}>
      <XAxis dataKey="date" tickFormatter={(date) => formatTick(date)} />
      <YAxis />
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip />
      <Legend verticalAlign="top" height={36} content={<div style={{ color: 'red' }}>{t('expenses')}</div>} />
      <Bar dataKey="amount" fill="#FF0000" />
      </BarChart>


         {/* income chart */}
      <BarChart width={330} height={300} data={incomeData}>
      <XAxis dataKey="date" tickFormatter={(date) => formatTick(new Date(date))} />
      <YAxis />
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip />
      <Legend verticalAlign="top" height={36} content={<div style={{ color: 'green' }}> {t('incomes')}</div>} />
      <Bar dataKey="amount" fill="#008000" />
      </BarChart>

  </div>
</div>
)};
</div>
);}
export default Reports;