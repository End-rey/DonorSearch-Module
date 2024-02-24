import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

const ErrorPage = () => {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return (
      <div className='flex h-dvh flex-col items-center justify-center'>
        <h1 className='text-2xl font-bold'>Эта страница не существует</h1>
        <p>{error.status}</p>
      </div>
    );
  }
  if (error instanceof Error) {
    return (
      <div className='flex h-dvh flex-col items-center justify-center'>
        <h1 className='text-2xl font-bold'>Что-то пошло не так</h1>
        <p>{error.message}</p>
      </div>
    );
  }
};

export default ErrorPage;
