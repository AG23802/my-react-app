import Fruits from "../components/Fruits/Fruits"
import { SearchBar } from "../components/SearchBar/SearchBar"

export default function FruitsPage() {
  return (
    <>
    <div className="title">Fruits Page</div>
      <SearchBar />
      <Fruits />
    </>
  )
}