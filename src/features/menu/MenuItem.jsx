import Button from '../../ui/Button';
import { formatCurrency } from '../../utils/helpers';

formatCurrency;
function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

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
          <Button type="small">Add to Cart</Button>
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
