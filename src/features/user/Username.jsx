import { useSelector } from 'react-redux';

export default function Username() {
  const username = useSelector((state) => state.user.username);
  if (!username) return null;

  return (
    <p className="hidden text-sm font-semibold uppercase md:block">
      {username}
    </p>
  );
}
