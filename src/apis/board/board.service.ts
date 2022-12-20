import { Injectable } from '@nestjs/common';
import { CreateBoardInput } from './dto/createBoard.input';

@Injectable()
export class BoardService {
  findAll() {
    const result = [
      { number: 1, writer: '철수', title: '제목', contents: '내용' },
      { number: 2, writer: '영희', title: '제목', contents: '내용' },
      { number: 3, writer: '훈이', title: '제목', contents: '내용' },
    ];

    return result;
  }

  createBoard(createBoardInput: CreateBoardInput) {
    console.log(createBoardInput);
    return 'success';
  }
}
