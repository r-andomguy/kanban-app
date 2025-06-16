import { createBoardAPI } from "../../../core/api";

export async function handleCreateBoard({ title }) {
  const response = await createBoardAPI({ title });
  return response; 
}