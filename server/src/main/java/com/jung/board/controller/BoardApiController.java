package com.jung.board.controller;

import com.jung.board.domain.Board;
import com.jung.board.dto.ApiResult;
import com.jung.board.dto.BoardDeleteDto;
import com.jung.board.dto.BoardDto;
import com.jung.board.service.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/board")
@RequiredArgsConstructor
public class BoardApiController {

    private final BoardService boardService; // Autowired로 스프링 빈에 등록

    // 게시글 전체 보기
    @GetMapping("/all")
    public ApiResult<List<BoardDto>> boardAllList(){
        List<Board> boardList = boardService.findBoards();
        List<BoardDto> boardDtoList = boardService.findBoards().stream().map(b -> new BoardDto(b)).collect(Collectors.toList());
        return ApiResult.OK(boardDtoList);  // 확장성을 가져가기 위해서 WrapperClass 사용
    }

    // 게시글 상세보기
    @GetMapping("/detail/{boardId}")
    public ApiResult<BoardDto> boardDetail(@PathVariable("boardId") Long boardId){
        Board board = boardService.findOne(boardId);
        BoardDto boardDto = new BoardDto(board);
        return ApiResult.OK(boardDto);
    }

    // 게시글 생성
    @PostMapping("/create")
    public ApiResult<?> boardCreate(@RequestBody BoardDto boardDto){
        try{
            Board board = new Board(
                    boardDto.getId(),
                    boardDto.getTitle(),
                    boardDto.getContent()
            );
            boardService.create(board);
            return ApiResult.OK(true);
        } catch (Exception e){
            return ApiResult.ERROR(e, HttpStatus.BAD_REQUEST);
        }
    }

    // 게시글 수정
    @PutMapping("/update")
    public ApiResult<?> boardUpdate(@RequestBody BoardDto boardDto){
        try{
            boardService.update(boardDto.getId(), boardDto.getTitle(), boardDto.getContent());
            return ApiResult.OK(true);
        } catch (Exception e){
            return ApiResult.ERROR(e, HttpStatus.BAD_REQUEST);
        }
    }

    // 게시글 삭제
    @DeleteMapping("/delete")
    public ApiResult<?> boardDelete(@RequestBody BoardDeleteDto boardDeleteDto){
        try{
            Board board = boardService.findOne(boardDeleteDto.getId());
            boardService.delete(board);
            return ApiResult.OK(true);
        } catch (Exception e){
            return ApiResult.ERROR(e, HttpStatus.BAD_REQUEST);
        }
    }
}