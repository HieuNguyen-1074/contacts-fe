import React, { useState, useCallback } from 'react';
import { useGetContacts } from '../hooks/react-query/getContacts';
import ContactForm from '../components/ContactForm';
import ContactCard from '../components/ContactCard';

export default function HomePage() {
  //state
  const { data } = useGetContacts();
  const total = 100;

  const getPaginationUI = (total) => {
    let jsxPagination = [];
    let jsxPaginationPrev = [];
    let jsxPaginationNext = [];

    for (let i = 1; i <= (total < 3 ? total : 3); i++) {
      jsxPaginationPrev.push(<button>{i}</button>);
    }
    if (total > 3) {
      for (
        let i = total;
        i > (total > 6 ? total - 3 : total - (5 - total));
        i--
      ) {
        jsxPaginationNext.push(<button>{i}</button>);
      }
    }

    jsxPaginationNext.reverse();
    jsxPagination = [...jsxPagination, ...jsxPaginationPrev];
    jsxPaginationNext.length > 0 && jsxPagination.push(<>....</>);
    jsxPaginationNext.length > 0 &&
      (jsxPagination = [...jsxPagination, ...jsxPaginationNext]);
    return jsxPagination;
  };

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

  return (
    <div>
      {getPaginationUI(10)}
      <button onClick={() => handleOpen()}>click here</button>
      <div className='flex  '>
        {data &&
          data.map((contact) => {
            return (
              <ContactCard
                key={contact?._id}
                {...contact}
                handleOpenForm={handleOpen}
              />
            );
          })}

        <ContactForm
          isOpenForm={isOpenForm}
          handleClose={handleClose}
          dataForm={dataForm}
        />
      </div>
    </div>
  );
}
