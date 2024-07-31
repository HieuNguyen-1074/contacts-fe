import ReactLoading from 'react-loading';
import { motion } from 'framer-motion';
import m1 from '../assets/loading/1.png';
import m2 from '../assets/loading/2.png';
import m3 from '../assets/loading/3.png';
import m4 from '../assets/loading/4.png';
import m5 from '../assets/loading/5.png';
import m6 from '../assets/loading/6.png';
import m7 from '../assets/loading/7.png';
const { createContext, useState, useContext, useEffect } = require('react');

const Loading = createContext(false);

export default function LoadingProvider({ children }) {
  const [isloading, setIsLoading] = useState(false);
  const images = [m1, m2, m3, m4, m5, m6, m7];
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const repeat = setInterval(() => {
      setIndex(Math.round(Math.random() * (6 - 0) + 0));
    }, 100);
    return () => {
      clearInterval(repeat);
    };
  }, [isloading]);

  return (
    <Loading.Provider value={{ isloading, setIsLoading }}>
      {isloading && (
        <div
          className={`fixed top-0 left-0 w-screen h-screen bg-main flex justify-center items-center`}>
          <img
            className='w-[100px]'
            src={m7}
            alt='loading'
          />
        </div>
        // <motion.div
        //   initial={{ opacity: 0, scale: 0.5 }}
        //   animate={{ opacity: 1, scale: 1 }}
        //   transition={{ duration: 0.5 }}>

        // </motion.div>
      )}

      {children}
    </Loading.Provider>
  );
}

export function useLoading() {
  return useContext(Loading);
}
