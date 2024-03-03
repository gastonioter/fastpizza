import { Link } from "react-router-dom";
import SearchOrder from "../features/oreder/SearchOrder";

export default function Header() {
  return (
    <header>
      <Link to={"/"}>Fast react pizza company</Link>
      <SearchOrder />
      <p>Gaston</p>
    </header>
  );
}
