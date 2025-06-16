import { createColumn, getAllColumns, getColumn } from "../../../core/api";

export async function handleCreateColumn({id, title}) {
  await createColumn({id, title});
}

export async function useGetAllColumns({id}) {
  const response = await getAllColumns({id});
  return response;
}

export async function useGetColumn({id, columnId}) {
  await getColumn({id, columnId});
}