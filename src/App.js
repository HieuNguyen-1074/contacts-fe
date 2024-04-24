import './App.css';
import Router from './router';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className='App h-screen'>
      <Router />
      <ToastContainer />
    </div>
  );
}

export default App;
