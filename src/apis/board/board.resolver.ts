import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BoardService } from './board.service';
import { Board } from './entities/board.entity';
import { CreateBoardInput } from './dto/createBoard.input';

@Resolver()
export class BoardResolver {
  constructor(private readonly boardService: BoardService) {}

  @Query(() => [Board])
  findAllBoards() {
    return this.boardService.findAll();
  }

  @Query(() => Board)
  findByBoardId() {
    // return this.boardService.findByBoardId();
  }

  @Mutation(() => String)
  createBoard(@Args('createBoardInput') createBoardInput: CreateBoardInput) {
    return this.boardService.createBoard(createBoardInput);
  }
}
