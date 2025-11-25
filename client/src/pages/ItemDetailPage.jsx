import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import * as libraryApi from '../api/libraryApi'

const ItemDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [item, setItem] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [imageError, setImageError] = useState(false)

  useEffect(() => {
    const load = async () => {
      try {
        const data = await libraryApi.getById(id)
        setItem(data)
        setError('')
        setImageError(false)
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

  const showImage = Boolean(item.coverImageUrl) && !imageError
  const initial = item.title?.[0]?.toUpperCase() ?? '?'

  return (
    <section className="item-detail panel">
      <div className="item-detail__heading">
        <button className="btn btn-secondary" onClick={() => navigate(-1)}>
          Back
        </button>
        <h2>{item.title}</h2>
      </div>
      <div className="item-detail__layout">
        <div className="item-detail__media">
          {showImage ? (
            <img
              src={item.coverImageUrl}
              alt={`${item.title} cover`}
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="item-detail__placeholder" aria-hidden="true">
              {initial}
            </div>
          )}
        </div>
        <div className="item-detail__body">
          <div className="item-detail__metadata">
            <div>
              <span className="label">Type</span>
              <span className="value">{item.type}</span>
            </div>
            {item.year && (
              <div>
                <span className="label">Year</span>
                <span className="value">{item.year}</span>
              </div>
            )}
            {item.status && (
              <div>
                <span className="label">Status</span>
                <span className="value">{item.status}</span>
              </div>
            )}
            {item.rating && (
              <div>
                <span className="label">Rating</span>
                <span className="value">{item.rating}/5</span>
              </div>
            )}
          </div>
          {item.notes && (
            <div className="item-detail__notes">
              <span className="label">Notes</span>
              <p>{item.notes}</p>
            </div>
          )}
          <div className="item-detail__actions">
            <button className="btn" onClick={() => navigate(`/items/${id}/edit`)}>
              Edit
            </button>
            <button className="btn btn-danger" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ItemDetailPage
