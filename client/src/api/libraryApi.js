const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:5000';
const BASE_URL = `${API_BASE_URL}/api/libraryitems`;

const handleResponse = async (response, defaultMessage) => {
  if (response.ok) {
    return response.status === 204 ? null : response.json();
  }

  let message = defaultMessage;
  try {
    const text = await response.text();
    if (text) {
      message = text;
    }
  } catch (err) {
    // ignore parsing failures; fall back to default
  }

  throw new Error(message);
};

export const getAll = async (params = {}) => {
  const url = new URL(BASE_URL);
  if (params.type) {
    url.searchParams.set('type', params.type);
  }

  const response = await fetch(url);
  return handleResponse(response, 'Failed to load items');
};

export const getById = async (id) => {
  const response = await fetch(`${BASE_URL}/${id}`);
  return handleResponse(response, 'Item not found');
};

export const create = async (data) => {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  return handleResponse(response, 'Failed to create item');
};

export const update = async (id, data) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  return handleResponse(response, 'Failed to update item');
};

export const remove = async (id) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
  });

  return handleResponse(response, 'Failed to delete item');
};
