import React, { useState, useCallback, Suspense } from 'react';
import ContactForm from '../components/ContactForm';
import ContactCard from '../components/ContactCard';

import { CiSquarePlus } from 'react-icons/ci';
import { Pagination } from '@ngochuytu/react-pagination';
import { useContacts } from '../context/contacts';

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
    <Suspense fallback={<p>loading</p>}>
      <div className='h-full'>
        <div className='h-full flex sm:justify-start md:justify-center flex-col  w-[100vw] max-w-[1000px] md:px-4 sm:px-6 mx-auto px-20  md:mt-0 mt-20'>
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
                className='mr-[-5px]'
                onClick={() => handleOpen()}>
                <CiSquarePlus size={35} />
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
      </div>
    </Suspense>
  );
}
