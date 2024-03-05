import { useDispatch, useSelector } from 'react-redux';
import Button from '../../ui/Button';
import { decQty, getQuantityById, incQty } from './CartSlice';

function UpdateItemQty({ pizzaId }) {
  const dispatch = useDispatch();
  const qty = useSelector(getQuantityById(pizzaId));

  function inc() {
    dispatch(incQty(pizzaId));
  }
  function dec() {
    dispatch(decQty(pizzaId));
  }
  return (
    <div className="flex items-center gap-1 md:gap-3">
      <Button type="rounded" onClick={inc}>
        +
      </Button>
      <span>{qty}</span>
      <Button type="rounded" onClick={dec}>
        -
      </Button>
    </div>
  );
}

export default UpdateItemQty;
