import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchOrder() {
  const [orderId, setOrderId] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!orderId) return;
    console.log("order id");
    navigate(`/order/${orderId}`);
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search order #"
        value={orderId}
        onChange={(e) => setOrderId(e.target.value)}
      />
    </form>
  );
}
