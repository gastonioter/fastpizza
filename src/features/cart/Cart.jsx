import { Link } from 'react-router-dom';
import LinkButton from '../../ui/LinkButton';
import Button from '../../ui/Button';
import CartItem from '../cart/CartItem';
import { useDispatch, useSelector } from 'react-redux';
import { clear } from './CartSlice';
import EmptyCart from '../cart/EmptyCart';

function Cart() {
  const cart = useSelector((state) => state.cart.pizzas);
  const dispatch = useDispatch();
  const username = useSelector((state) => state.user.name);

  if (!cart.length) return <EmptyCart />;
  return (
    <div className="px-4 py-3">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <h2 className="mt-7 text-xl font-semibold">Your cart, {username}</h2>

      <ul className="mt-4 divide-y divide-stone-200 border-b">
        {cart.map((item) => (
          <CartItem item={item} key={item.id} />
        ))}
      </ul>
      <div className="mt-8 space-x-2">
        <Button type={'primary'} to="/order/new">
          Order pizzas
        </Button>
        <Button onClick={() => dispatch(clear())} type={'secondary'}>
          Clear cart
        </Button>
      </div>
    </div>
  );
}

export default Cart;
