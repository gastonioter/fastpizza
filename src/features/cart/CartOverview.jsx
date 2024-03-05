import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getTotalCartPrice, getTotalCartQty } from './CartSlice';
import { formatCurrency } from '../../utils/helpers';
function CartOverview() {
  const qty = useSelector(getTotalCartQty);
  const price = useSelector(getTotalCartPrice);

  if (!useSelector(getTotalCartQty)) return null;
  return (
    <div className="flex items-center justify-between bg-stone-800 p-4 uppercase text-stone-200">
      <p className="space-x-4  text-sm font-semibold text-stone-300 md:text-base">
        <span>{qty} pizzas</span>
        <span>{formatCurrency(price)}</span>
      </p>
      <Link to={'cart'}>Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
