import { createBoardAPI } from "../../../core/api";

export async function handleCreateBoard({title}) {
  await createBoardAPI({ title});
}