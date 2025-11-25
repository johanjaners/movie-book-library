import { useState } from 'react'
import './ItemCard.css'

const ItemCard = ({ item, onSelect }) => {
  const [imageError, setImageError] = useState(false)
  const showImage = Boolean(item.coverImageUrl) && !imageError
  const initial = item.title?.[0]?.toUpperCase() ?? '?'

  // Debug: log coverImageUrl to verify it's being received
  if (item.coverImageUrl) {
    console.log(`[ItemCard] ${item.title}: coverImageUrl =`, item.coverImageUrl)
  }

  return (
    <button className="item-card" onClick={() => onSelect?.(item.id)}>
      <div className="item-card__media">
        {showImage ? (
          <img
            src={item.coverImageUrl}
            alt={`${item.title} cover`}
            loading="lazy"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="item-card__placeholder" aria-hidden="true">
            {initial}
          </div>
        )}
      </div>
      <div className="item-card__content">
        <h3>{item.title}</h3>
        <p className="item-card__meta">
          <span className="pill">{item.type}</span>
          {item.year && <span>{item.year}</span>}
        </p>
        {item.status && <p className="item-card__status">{item.status}</p>}
      </div>
    </button>
  )
}

export default ItemCard
