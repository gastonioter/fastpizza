import { formatCurrency } from '../../utils/helpers';

import DeleteItem from './DeleteItem';
import UpdateItemQty from './UpdateItemQty';

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;

  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between">
      <p>
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between sm:space-x-3">
        <p className="font-bold">{formatCurrency(totalPrice)}</p>
        <UpdateItemQty pizzaId={pizzaId} />
        <DeleteItem pizzaId={pizzaId} />
      </div>
    </li>
  );
}

export default CartItem;
