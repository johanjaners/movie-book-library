import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import * as libraryApi from '../api/libraryApi'

const emptyForm = {
  title: '',
  type: 'movie',
  year: '',
  status: '',
  rating: '',
  notes: '',
}

const ItemFormPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEdit = Boolean(id)
  const [form, setForm] = useState(emptyForm)

  useEffect(() => {
    if (!isEdit) return
    libraryApi.getById(id).then((data) => {
      setForm({
        title: data.title ?? '',
        type: data.type ?? 'movie',
        year: data.year ?? '',
        status: data.status ?? '',
        rating: data.rating ?? '',
        notes: data.notes ?? '',
      })
    })
  }, [id, isEdit])

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const payload = {
      ...form,
      year: form.year ? Number(form.year) : undefined,
      rating: form.rating ? Number(form.rating) : undefined,
    }

    if (isEdit) {
      await libraryApi.update(id, payload)
    } else {
      await libraryApi.create(payload)
    }

    navigate('/')
  }

  return (
    <div>
      <h2>{isEdit ? 'Edit' : 'Create'} Item</h2>
      <form onSubmit={handleSubmit} className="item-form">
        <label>
          Title
          <input name="title" value={form.title} onChange={handleChange} required />
        </label>
        <label>
          Type
          <select name="type" value={form.type} onChange={handleChange} required>
            <option value="movie">Movie</option>
            <option value="book">Book</option>
          </select>
        </label>
        <label>
          Year
          <input name="year" value={form.year} onChange={handleChange} type="number" />
        </label>
        <label>
          Status
          <input name="status" value={form.status} onChange={handleChange} />
        </label>
        <label>
          Rating
          <input name="rating" value={form.rating} onChange={handleChange} type="number" min="1" max="5" />
        </label>
        <label>
          Notes
          <textarea name="notes" value={form.notes} onChange={handleChange} />
        </label>
        <button type="submit">Save</button>
      </form>
    </div>
  )
}

export default ItemFormPage
