import React, { useState, useCallback, Suspense } from 'react';
import ContactForm from '../components/ContactForm';
import ContactCard from '../components/ContactCard';

import { Pagination } from '@ngochuytu/react-pagination';
import { useContacts } from '../context/contacts';

import { CiSquarePlus } from 'react-icons/ci';
import Chat from '../components/Chat';

export default function HomePage() {
  //state
  const { data, itemPerPage, setPage } = useContacts();

  const [dataForm, setDataForm] = useState();

  const [isOpenForm, setIsOpenForm] = useState(false);
  // handle events

  const handleClose = useCallback(() => {
    setIsOpenForm(false);
  }, []);

  const handleOpen = useCallback((data) => {
    setDataForm(data);
    setIsOpenForm(true);
  }, []);

  const onPageChange = (activePage) => {
    setPage(activePage);
  };
  return (
    <div className='h-[700px]'>
      <div className='h-full flex sm:justify-start md:justify-center flex-col  w-full  md:mt-0 mt-20'>
        <div className='flex w-full justify-between '>
          <div className='flex justify-between w-full '>
            <Pagination
              totalPages={Math.ceil(data?.totalRecords / itemPerPage)}
              activePage={1}
              breakButtonStep={2}
              pageRange={6}
              onPageChange={onPageChange}
              navigateToFirstPageButtonLabel='&#171;'
              navigateToLastPageButtonLabel='&#187;'
            />
            <button
              className='mr-[-5px] '
              onClick={() => handleOpen()}>
              <CiSquarePlus
                size={35}
                className='-mt-1'
              />
            </button>
          </div>
        </div>

        <div className='grid lg:grid-cols-5 md:grid-cols-4  sm:grid-cols-3   gap-2 flex-wrap mt-10 '>
          {data &&
            data?.list?.map((contact) => {
              return (
                <ContactCard
                  key={contact?._id}
                  {...contact}
                  handleOpenForm={handleOpen}
                />
              );
            })}
        </div>
      </div>
      <ContactForm
        isOpenForm={isOpenForm}
        handleClose={handleClose}
        dataForm={dataForm}
      />
      <Chat />
    </div>
  );
}
