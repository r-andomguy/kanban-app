import { apiCall } from './helper';
import { saveToken } from './auth';

const BASE_URL = 'http://127.0.0.1:8000/api';

export async function loginAPI({ email, password }) {
  const response = await apiCall({
    url: `${BASE_URL}/login`,
    method: 'POST',
    data: { email, password },
  });

  if (response?.token) {
    saveToken(response.token);
  }

  return response;
}

export async function registerAPI({ name, email, password, passwordConfirmation }) {
  await apiCall({ url: 'http://127.0.0.1:8000/sanctum/csrf-cookie' });
  
  return apiCall({
    url: `${BASE_URL}/register`,
    method: 'POST',
    data: { name, email, password, password_confirmation: passwordConfirmation },
  });
}

export function createBoardAPI({ title }) {
  return apiCall({
    url: `${BASE_URL}/boards`,
    method: 'POST',
    data: { title },
  });
}

export function getAllBoardsAPI({}) {
  return apiCall({
    url: `${BASE_URL}/boards`,
    method: 'GET',
  });
}

export function getBoardAPI({id}) {
  return apiCall({
    url: `${BASE_URL}/boards/${id}`,
    method: 'GET',
  });
}

export function createColumn({id, title}) {
  return apiCall({
    url: `${BASE_URL}/boards/${id}/categories`,
    method: 'POST',
    data: { title },
  });
}

export function getAllColumns({id}) {
  return apiCall({
    url: `${BASE_URL}/boards/${id}/categories`,
    method: 'GET',
  });
}

export function getColumn({id, columnId}) {
  return apiCall({
    url: `${BASE_URL}/boards/${id}/categories/${columnId}`,
    method: 'GET',
  });
}

export function createTask({id, category_id, title, description, status}) {
  return apiCall({
    url: `${BASE_URL}/boards/${id}/categories/${category_id}/tasks`,
    method: 'POST',
    data: { title, description, status },
  });
}

export function updateTask({id, category_id, title, description, status, task_id}) {
  return apiCall({
    url: `${BASE_URL}/boards/${id}/categories/${category_id}/tasks/${task_id}`,
    method: 'PUT',
    data: { id, category_id, title, description, status, task_id },
  });
}

export function getAllTasks({id, category_id}) {
  return apiCall({
    url: `${BASE_URL}/boards/${id}/categories/${category_id}/tasks`,
    method: 'GET',
  });
}

export function getTask({id, category_id, task_id}) {
  return apiCall({
    url: `${BASE_URL}/boards/${id}/categories/${category_id}/tasks/${task_id}`,
    method: 'GET',
  });
}


