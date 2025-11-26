import { Board } from "@prisma/client";

 export interface IBoardService{
    getBoardWithUserId():Promise<Board[]>
 }