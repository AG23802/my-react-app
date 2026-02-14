import Fruits from "../components/Fruits/Fruits"
import { SearchBar } from "../components/SearchBar/SearchBar"

export default function FruitsPage() {
  return (
    <>
    <h2>Fruits Page</h2>
      <SearchBar />
      <Fruits />
    </>
  )
}