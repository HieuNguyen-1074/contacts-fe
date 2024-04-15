import React from 'react';

export default function ContactForm({ isOpenForm }) {
  return (
    <div
      className={` ${
        isOpenForm ? 'opacity-100 ' : 'opacity-0 '
      }  bg-[rgb(0,0,0)] opacity-50 fixed top-0 left-0 w-screen h-screen transition-all`}>
      <form
        className={`flex  flex-col w-[500px] center-center-ab bg-white p-10 rounded-lg`}>
        <input
          className='input'
          type='text'
        />
        <input
          className='input'
          type='text'
        />
        <input
          className='input'
          type='text'
        />
        <input
          type='submit'
          className='bg-main mt-4 text-white p-3 rounded-lg text-[1.5rem] cursor-pointer'
          value={'Add'}
        />
      </form>
    </div>
  );
}
