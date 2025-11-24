import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as libraryApi from '../api/libraryApi'
import ItemCard from '../components/ItemCard'

const LibraryListPage = () => {
  const [items, setItems] = useState([])
  const [typeFilter, setTypeFilter] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const params = typeFilter ? { type: typeFilter } : undefined
    libraryApi.getAll(params).then(setItems).catch(console.error)
  }, [typeFilter])

  return (
    <section className="library-page">
      <div className="library-page__header">
        <h2>Library Items</h2>
        <select value={typeFilter} onChange={(event) => setTypeFilter(event.target.value)}>
          <option value="">All</option>
          <option value="movie">Movies</option>
          <option value="book">Books</option>
        </select>
      </div>
      <div className="item-list">
        {items.map((item) => (
          <ItemCard key={item.id} item={item} onSelect={(id) => navigate(`/items/${id}`)} />
        ))}
      </div>
    </section>
  )
}

export default LibraryListPage
