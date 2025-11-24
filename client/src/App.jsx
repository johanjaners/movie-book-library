import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import LibraryListPage from './pages/LibraryListPage'
import ItemDetailPage from './pages/ItemDetailPage'
import ItemFormPage from './pages/ItemFormPage'
import './App.css'

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<LibraryListPage />} />
        <Route path="/items/new" element={<ItemFormPage />} />
        <Route path="/items/:id" element={<ItemDetailPage />} />
        <Route path="/items/:id/edit" element={<ItemFormPage />} />
      </Route>
    </Routes>
  )
}

export default App
