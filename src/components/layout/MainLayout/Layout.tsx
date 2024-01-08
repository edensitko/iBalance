import React from 'react';
import Footer from '../footer/Footer';
import { Routes } from 'react-router-dom';
import MainRoutes from '../routes/MainRoutes';
import { useAuthContext } from '../../../hooks/useAuthContext';
import useTheme from '../../../hooks/useTheme';
import Navbar from '../Navbar/navbar';

const Layout: React.FC = () => {
  const {mode}=useTheme()
  const {authIsReady}= useAuthContext()

  return (
    <div className="layout ">

      {/* authorized */}
      {authIsReady && (
        <>
        <div className="nav block ">
           <Navbar />
        </div>
      <div className="content ">
       <main className={`main  ${mode === "dark" ? "bg-gray-700" : ""}  h-full `}>
           <MainRoutes />
       </main>
      </div>
           <Footer />
     </>
      )}

     {/* not authorized */}
     {!authIsReady && (
      <>
       <div>loading</div>
      </>
      )}
    </div>

  );
};
export default Layout;
