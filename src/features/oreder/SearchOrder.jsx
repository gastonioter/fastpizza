import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SearchOrder() {
  const [orderId, setOrderId] = useState('');
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!orderId) return;
    console.log('order id');
    navigate(`/order/${orderId}`);
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        className="focus:ring-offset-1: w-28  rounded-full bg-yellow-100 px-4 py-2 text-sm transition-[width] duration-200 placeholder:text-stone-400  focus:outline-none  focus:ring-2 focus:ring-yellow-400 sm:w-64   sm:focus:w-72 "
        type="text"
        placeholder="Search order #"
        value={orderId}
        onChange={(e) => setOrderId(e.target.value)}
      />
    </form>
  );
}
