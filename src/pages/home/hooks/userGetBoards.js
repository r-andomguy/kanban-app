import { getAllBoardsAPI, getBoardAPI } from "../../../core/api";

export async function useGetBoards() {
  try {
    const response = await getAllBoardsAPI({});
    return response.data || [];
  } catch (error) {
    console.error("Erro ao buscar boards:", error);
    return [];
  }
}

export async function useGetBoard(id) {
  try {
    const response = await getBoardAPI({ id });
    return response.data || null;
  } catch (error) {
    console.error("Erro ao buscar board por ID:", error);
    return null;
  }
}