import { Link } from 'react-router-dom';
import SearchOrder from '../features/oreder/SearchOrder';
import Username from '../features/user/Username';
export default function Header() {
  return (
    <header className="flex items-center justify-between border-b border-stone-200 text-sm md:text-base bg-yellow-500 px-4 py-3 uppercase">
      <Link to={'/'} className="tracking-widest">
        Fast react pizza company
      </Link>
      <SearchOrder />
      
      <Username />
    </header>
  );
}
