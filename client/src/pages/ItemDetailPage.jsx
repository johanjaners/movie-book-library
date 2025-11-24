import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import * as libraryApi from '../api/libraryApi'

const ItemDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [item, setItem] = useState(null)

  useEffect(() => {
    libraryApi.getById(id).then(setItem).catch(() => navigate('/'))
  }, [id, navigate])

  if (!item) {
    return <p>Loading...</p>
  }

  return (
    <div>
      <button onClick={() => navigate(-1)}>Back</button>
      <h2>{item.title}</h2>
      <p>Type: {item.type}</p>
      {item.year && <p>Year: {item.year}</p>}
      {item.status && <p>Status: {item.status}</p>}
      {item.rating && <p>Rating: {item.rating}</p>}
      {item.notes && <p>Notes: {item.notes}</p>}
      <div>
        <button onClick={() => navigate(`/items/${id}/edit`)}>Edit</button>
        <button onClick={async () => {
          await libraryApi.remove(id)
          navigate('/')
        }}>Delete</button>
      </div>
    </div>
  )
}

export default ItemDetailPage
