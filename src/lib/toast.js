// custom toast

import { toast } from 'react-toastify';

import errorGhost from '../assets/notif/error.png';
import okGhost from '../assets/notif/ok.png';
import warningGhost from '../assets/notif/warning.png';
import { TYPE_TOAST } from '../utils/constant';

/**
 * a component that customizes the toast element
 * @returns
 */
const CustomToast = ({ closeToast, toastProps: { type, message } }) => {
  const typeMashImage = {
    [TYPE_TOAST.SUCCESS]: okGhost,
    [TYPE_TOAST.ERROR]: errorGhost,
    [TYPE_TOAST.WRANING]: warningGhost,
  };
  return (
    <div className='relative flex items-center'>
      <p>{message}</p>
      <img
        className='w-10 h-10 object-contain drop-shadow-lg  '
        src={typeMashImage[type] || errorGhost}
        alt=''
      />
    </div>
  );
};

/**
 * show toast box
 * @param {*} }
 */
function openToast({ message, type }) {
  toast(<CustomToast />, {
    type: type,
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    message: message,
  });
}
/**
 *
 * @param {*} errors it must be an array of errors that belong react-hook-form
 */
function logErrors(errors) {
  for (const key in errors) {
    if (Object.hasOwnProperty.call(errors, key)) {
      const error = errors[key];
      if (error) openToast(error);
    }
  }
}

export { openToast, logErrors };
