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
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(isEdit)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!isEdit) return

    const load = async () => {
      try {
        const data = await libraryApi.getById(id)
        setForm({
          title: data.title ?? '',
          type: data.type ?? 'movie',
          year: data.year ?? '',
          status: data.status ?? '',
          rating: data.rating ?? '',
          notes: data.notes ?? '',
        })
      } catch (err) {
        setError('Failed to load item details.')
      } finally {
        setIsLoading(false)
      }
    }

    load()
  }, [id, isEdit])

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')

    if (!form.title.trim()) {
      setError('Title is required.')
      return
    }

    if (!form.type) {
      setError('Type is required.')
      return
    }

    setIsSubmitting(true)

    const payload = {
      ...form,
      title: form.title.trim(),
      type: form.type,
      year: form.year ? Number(form.year) : undefined,
      rating: form.rating ? Number(form.rating) : undefined,
      status: form.status || undefined,
      notes: form.notes || undefined,
    }

    try {
      if (isEdit) {
        await libraryApi.update(id, payload)
      } else {
        await libraryApi.create(payload)
      }
      navigate('/')
    } catch (err) {
      setError(err.message ?? 'Failed to save item')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return <p>Loading form...</p>
  }

  return (
    <section className="panel form-page">
      <div className="form-page__header">
        <h2>{isEdit ? 'Edit' : 'Create'} Item</h2>
        <p>Provide a few quick details so the library stays tidy.</p>
      </div>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit} className="item-form">
        <label>
          Title
          <input name="title" value={form.title} onChange={handleChange} required placeholder="e.g. Interstellar" />
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
          <input
            name="year"
            value={form.year}
            onChange={handleChange}
            type="number"
            min="1900"
            max={new Date().getFullYear()}
            placeholder="2010"
          />
        </label>
        <label>
          Status
          <input name="status" value={form.status} onChange={handleChange} placeholder="watching, finished, unread..." />
        </label>
        <label>
          Rating
          <input name="rating" value={form.rating} onChange={handleChange} type="number" min="1" max="5" placeholder="1-5" />
        </label>
        <label>
          Notes
          <textarea name="notes" value={form.notes} onChange={handleChange} rows={3} placeholder="Optional notes" />
        </label>
        <div className="form-actions">
          <button className="btn btn-secondary" type="button" onClick={() => navigate(-1)} disabled={isSubmitting}>
            Cancel
          </button>
          <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Save'}
          </button>
        </div>
      </form>
    </section>
  )
}

export default ItemFormPage
