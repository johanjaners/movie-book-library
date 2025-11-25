import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as libraryApi from '../api/libraryApi'
import ItemCard from '../components/ItemCard'
import HeroSection from '../components/HeroSection'

const LibraryListPage = () => {
  const [items, setItems] = useState([])
  const [typeFilter, setTypeFilter] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [searchText, setSearchText] = useState('')
  const [sortOption, setSortOption] = useState('title')
  const navigate = useNavigate()
  const libraryListRef = useRef(null)

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

  const filteredItems = useMemo(() => {
    const normalizedSearch = searchText.trim().toLowerCase()
    let result = items

    if (normalizedSearch) {
      result = result.filter((item) => item.title.toLowerCase().includes(normalizedSearch))
    }

    const sorted = [...result]
    switch (sortOption) {
      case 'year-desc':
        sorted.sort((a, b) => (b.year ?? 0) - (a.year ?? 0))
        break
      case 'rating-desc':
        sorted.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
        break
      default:
        sorted.sort((a, b) => a.title.localeCompare(b.title))
        break
    }

    return sorted
  }, [items, searchText, sortOption])

  const stats = useMemo(() => {
    const total = items.length
    const movies = items.filter((item) => item.type === 'movie').length
    const books = items.filter((item) => item.type === 'book').length
    return { total, movies, books }
  }, [items])

  const handleBrowseClick = useCallback(() => {
    libraryListRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  return (
    <>
      <HeroSection onBrowseClick={handleBrowseClick} />
      <section id="library-list" ref={libraryListRef} className="library-page panel library-list-section">
      <div className="library-page__header">
        <div>
          <h2>Library Items</h2>
          <p>Browse and manage movies and books.</p>
        </div>
        <div className="library-page__actions">
          <button className="btn btn-primary" onClick={() => navigate('/items/new')}>
            Add Item
          </button>
        </div>
      </div>

      <p className="library-stats">
        Total: {stats.total} items — {stats.movies} movies, {stats.books} books
      </p>

      <div className="library-page__controls">
        <label className="input-control">
          <span>Type</span>
          <select value={typeFilter} onChange={(event) => setTypeFilter(event.target.value)}>
            <option value="">All</option>
            <option value="movie">Movies</option>
            <option value="book">Books</option>
          </select>
        </label>

        <label className="input-control input-control--grow">
          <span>Search</span>
          <input
            type="text"
            value={searchText}
            placeholder="Search by title"
            onChange={(event) => setSearchText(event.target.value)}
          />
        </label>

        <label className="input-control">
          <span>Sort by</span>
          <select value={sortOption} onChange={(event) => setSortOption(event.target.value)}>
            <option value="title">Title (A–Z)</option>
            <option value="year-desc">Year (Newest first)</option>
            <option value="rating-desc">Rating (Highest first)</option>
          </select>
        </label>
      </div>

      {isLoading && <p>Loading items...</p>}
      {error && <p className="error">{error}</p>}

      {!isLoading && !error && filteredItems.length === 0 && <p>No items match your filters.</p>}

      <div className="item-list">
        {filteredItems.map((item) => (
          <ItemCard key={item.id} item={item} onSelect={(id) => navigate(`/items/${id}`)} />
        ))}
      </div>
    </section>
    </>
  )
}

export default LibraryListPage
