import './App.css';
import Router from './router';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className='App h-screen  max-w-[1000px]  md:px-4 sm:px-6 mx-auto px-20'>
      <Router />
      <ToastContainer />
    </div>
  );
}

export default App;
