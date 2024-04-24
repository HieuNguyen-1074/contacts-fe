import ReactLoading from 'react-loading';

const { createContext, useState, useContext } = require('react');

const Loading = createContext(false);

export default function LoadingProvider({ children }) {
  const [isloading, setIsLoading] = useState(false);

  return (
    <Loading.Provider value={{ isloading, setIsLoading }}>
      <div
        className={`${
          isloading ? 'opacity-100 ' : 'opacity-0 pointer-events-none'
        } transition-all fixed top-0 left-0  w-screen h-screen z-50 flex justify-center items-center bg-[rgba(0,0,0,.4)]`}>
        <ReactLoading
          type='balls'
          color='red'
        />
      </div>
      {children}
    </Loading.Provider>
  );
}

export function useLoading() {
  return useContext(Loading);
}
