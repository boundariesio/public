import React from 'react';

export default props => {
  return (
    <>
      <div
        className={`${
          props.open ? 'fixed z-50 inset-0' : 'hidden'
        } animated fadeIn overflow-auto bg-smoke-dark flex`}
      >
        <div
          className={`${
            props.open ? 'fixed bottom-0 inset-x-0' : 'hidden'
          } animated fadeInUp z-50 shadow-inner max-w-3xl relative align-top m-auto justify-end md:justify-center p-8 bg-white md:rounded w-full md:h-auto md:shadow flex flex-col`}
        >
          <span className="absolute top-0 right-0 right-0 p-4">
            <svg
              className="h-4 w-4 fill-current text-grey hover:text-grey-darkest"
              role="button"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              onClick={props.onClose}
            >
              <title>Close</title>
              <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
            </svg>
          </span>
          {props.children}
        </div>
      </div>
    </>
  );
};
