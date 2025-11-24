import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import * as libraryApi from '../api/libraryApi'

const ItemDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [item, setItem] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const load = async () => {
      try {
        const data = await libraryApi.getById(id)
        setItem(data)
        setError('')
      } catch (err) {
        setError('Unable to load the requested item.')
      } finally {
        setIsLoading(false)
      }
    }

    load()
  }, [id])

  const handleDelete = async () => {
    if (!window.confirm('Delete this item? This cannot be undone.')) {
      return
    }

    try {
      await libraryApi.remove(id)
      navigate('/')
    } catch (err) {
      setError(err.message ?? 'Failed to delete item')
    }
  }

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (error) {
    return (
      <div>
        <p className="error">{error}</p>
        <button onClick={() => navigate('/')}>Back to list</button>
      </div>
    )
  }

  if (!item) {
    return null
  }

  return (
    <div className="item-detail">
      <button onClick={() => navigate(-1)}>Back</button>
      <h2>{item.title}</h2>
      <p>Type: {item.type}</p>
      {item.year && <p>Year: {item.year}</p>}
      {item.status && <p>Status: {item.status}</p>}
      {item.rating && <p>Rating: {item.rating}</p>}
      {item.notes && <p>Notes: {item.notes}</p>}
      <div className="item-detail__actions">
        <button onClick={() => navigate(`/items/${id}/edit`)}>Edit</button>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  )
}

export default ItemDetailPage
