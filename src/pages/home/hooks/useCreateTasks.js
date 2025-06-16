import { createTask, updateTask, getAllTasks, getTask } from "../../../core/api";

export async function handleCreateTask({ id, category_id, title, description, status }) {
  await createTask({ id, category_id, title, description, status });
}

export async function handleUpdateTask({ id, category_id, title, description, status, task_id }) {
  await updateTask({ id, category_id, title, description, status, task_id });
}

export async function useGetAllTasks({ id, category_id }) {
  const response = await getAllTasks({ id, category_id });
  return response;
}

export async function useGetTask({ id, category_id, task_id}) {
  const response = await getTask({ id, category_id, task_id });
  return response;
}