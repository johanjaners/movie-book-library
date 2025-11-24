import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as libraryApi from '../api/libraryApi'
import ItemCard from '../components/ItemCard'

const LibraryListPage = () => {
  const [items, setItems] = useState([])
  const [typeFilter, setTypeFilter] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const loadItems = useCallback(async () => {
    setIsLoading(true)
    setError('')

    try {
      const params = typeFilter ? { type: typeFilter } : undefined
      const data = await libraryApi.getAll(params)
      setItems(data)
    } catch (err) {
      setError(err.message ?? 'Failed to load items')
    } finally {
      setIsLoading(false)
    }
  }, [typeFilter])

  useEffect(() => {
    loadItems()
  }, [loadItems])

  return (
    <section className="library-page">
      <div className="library-page__header">
        <div>
          <h2>Library Items</h2>
          <p>Browse and manage movies and books.</p>
        </div>
        <div className="library-page__actions">
          <select value={typeFilter} onChange={(event) => setTypeFilter(event.target.value)}>
            <option value="">All</option>
            <option value="movie">Movies</option>
            <option value="book">Books</option>
          </select>
          <button onClick={() => navigate('/items/new')}>Add Item</button>
        </div>
      </div>

      {isLoading && <p>Loading items...</p>}
      {error && <p className="error">{error}</p>}

      {!isLoading && !error && items.length === 0 && <p>No items found.</p>}

      <div className="item-list">
        {items.map((item) => (
          <ItemCard key={item.id} item={item} onSelect={(id) => navigate(`/items/${id}`)} />
        ))}
      </div>
    </section>
  )
}

export default LibraryListPage
