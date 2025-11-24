import './ItemCard.css'

const ItemCard = ({ item, onSelect }) => {
  return (
    <button className="item-card" onClick={() => onSelect?.(item.id)}>
      <h3>{item.title}</h3>
      <p>Type: {item.type}</p>
      {item.year && <p>Year: {item.year}</p>}
      {item.status && <p>Status: {item.status}</p>}
    </button>
  )
}

export default ItemCard
