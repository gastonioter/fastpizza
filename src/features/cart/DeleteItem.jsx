import { useDispatch } from 'react-redux';
import { remove } from './CartSlice';
import Button from '../../ui/Button';

function DeleteItem({ pizzaId }) {
  const dispatch = useDispatch();

  function handleDelete() {
    dispatch(remove(pizzaId));
  }
  return (
    <Button onClick={handleDelete} type="small">
      Delete
    </Button>
  );
}

export default DeleteItem;
