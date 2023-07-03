package com.jung.board.service;

import com.jung.board.domain.Board;
import com.jung.board.dto.BoardDto;
import com.jung.board.repository.BoardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class BoardService {

    private final BoardRepository boardRepository;
    public List<Board> findBoards() {
        return boardRepository.findAll();
    }

    @Transactional
    public Board findOne(Long boardId) {
        // 조회수 카운트
        Board board = boardRepository.findById(boardId).get();
        board.setCountVisit(board.getCountVisit()+1L);

        return boardRepository.findById(boardId).orElseThrow(NullPointerException::new);
    }

    @Transactional // DB에 직접적인 영향을 주기 때문, 안전하게 작동하기 위함
    public void create(Board board) {
        boardRepository.save(board);
    }

    @Transactional
    public void update(Long id, String title, String content) {
        Board board = boardRepository.findById(id).orElseThrow(NullPointerException::new);
        board.setTitle(title);
        board.setContent(content);
    }

    @Transactional
    public void delete(Board board) {
        boardRepository.delete(board);
    }
}
