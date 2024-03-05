import { Form, redirect, useActionData, useNavigation } from 'react-router-dom';
import { createOrder } from '../../services/apiRestaurant';
import Button from '../../ui/Button';
import { useDispatch, useSelector } from 'react-redux';
import { getTotalCartPrice } from '../cart/CartSlice';
import EmptyCart from '../cart/EmptyCart';
import { formatCurrency } from '../../utils/helpers';
import { useState } from 'react';
import { fetchAddress } from '../user/UserSlice';
// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const { name, address, position, status, error } = useSelector(
    (state) => state.user,
  );

  const isLoadingPosition = status === 'loading';

  const [withPriority, setWithPriority] = useState(false);
  const cart = useSelector((state) => state.cart.pizzas);
  const navigation = useNavigation();
  const errorsData = useActionData();
  const dispatch = useDispatch();

  const totalCartPrice = useSelector(getTotalCartPrice);

  const finalPrice = withPriority ? totalCartPrice * 1.2 : totalCartPrice;

  const isSubmitting = navigation.state === 'submitting';

  if (cart.length == 0) return <EmptyCart />;
  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Lets go!</h2>

      <Form method="POST" action="/order/new" autoComplete="off" className="">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input
            className="input grow uppercase"
            type="text"
            name="customer"
            defaultValue={name}
            required
          />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40 sm:self-start">Phone number</label>
          <div className="grow">
            <input className="input w-full" type="tel" name="phone" required />
            {errorsData?.phone && (
              <p className="mt-2  rounded-md bg-red-100 px-2 py-1 text-xs text-red-700 ">
                {errorsData?.phone}
              </p>
            )}
          </div>
        </div>

        <div className="relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="self-start sm:basis-40">Address</label>
          <div className="grow">
            <input
              className="input w-full"
              type="text"
              name="address"
              defaultValue={
                isLoadingPosition ? 'Searching your position...' : address
              }
              disabled={isLoadingPosition}
              required
            />
            {status == 'error' && (
              <p className="mt-2  rounded-md bg-red-100 px-2 py-1 text-xs text-red-700 ">
                {error}
              </p>
            )}
          </div>

          {!position.longitude && !position.latitude && (
            <span className="absolute right-2 top-1">
              <Button
                type={'small'}
                disabled={isLoadingPosition}
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(fetchAddress());
                }}
              >
                Get Position
              </Button>
            </span>
          )}
        </div>

        <div className="mb-12 flex items-center gap-5">
          <input
            className="h-6 w-6 accent-yellow-400"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-medium">
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <Button type="primary">
            {!isSubmitting
              ? `Order Now for ${formatCurrency(Math.round(finalPrice))}`
              : 'Placing order...'}
          </Button>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="position"
            value={`${position.latitude},${position.longitude}`}
          />
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  // request: es el objeto que se crea desde la API WEB de Fetch, no es nada de react especial
  const formData = await request.formData();

  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    priority: data.priority == 'on' ? true : false,
    cart: JSON.parse(data.cart),
  };
  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone =
      'Please give us your correct phone number. We migth need it to contact you';

  if (Object.keys(errors).length > 0) return errors;

  const newOrder = await createOrder(order);

  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
