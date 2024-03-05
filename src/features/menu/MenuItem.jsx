/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../ui/Button';
import { formatCurrency } from '../../utils/helpers';
import { add, getQuantityById } from '../cart/CartSlice';
import DeleteItem from '../cart/DeleteItem';
import UpdateItemQty from '../cart/UpdateItemQty';

formatCurrency;
function MenuItem({ pizza }) {
  const dispatch = useDispatch();

  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const quantityItem = useSelector(getQuantityById(id));

  function addPizza() {
    const pizza = {
      pizzaId: id,
      name,
      unitPrice,
      quantity: 1,
      totalPrice: unitPrice,
    };

    dispatch(add(pizza));
  }

  return (
    <li className="flex gap-4 py-2">
      <img
        src={imageUrl}
        alt={name}
        className={`w-24 ${soldOut ? 'opacity-70 grayscale' : ''}`}
      />
      <div className="flex grow flex-col">
        <p className="font-medium">{name}</p>
        <p className="text-sm capitalize italic">{ingredients.join(', ')}</p>
        <div className="mt-auto flex items-center justify-between text-sm">
          {!soldOut ? (
            <p className="text-sm font-medium uppercase">
              {formatCurrency(unitPrice)}
            </p>
          ) : (
            <p>Sold out</p>
          )}

          {quantityItem > 0 && (
            <div className="flex items-center gap-3 sm:gap-8">
              <UpdateItemQty pizzaId={id} />
              <DeleteItem pizzaId={id} />
            </div>
          )}

          {!soldOut && quantityItem == 0 && (
            <Button onClick={addPizza} type="small">
              Add to Cart
            </Button>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
