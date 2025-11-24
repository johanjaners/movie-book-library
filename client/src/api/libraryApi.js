const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:5000/api/libraryitems';

export const getAll = async (params = {}) => {
  const url = new URL(BASE_URL);
  if (params.type) {
    url.searchParams.set('type', params.type);
  }

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to load items');
  }

  return response.json();
};

export const getById = async (id) => {
  const response = await fetch(`${BASE_URL}/${id}`);
  if (!response.ok) {
    throw new Error('Item not found');
  }

  return response.json();
};

export const create = async (data) => {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to create item');
  }

  return response.json();
};

export const update = async (id, data) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to update item');
  }

  return response.json();
};

export const remove = async (id) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete item');
  }
};
