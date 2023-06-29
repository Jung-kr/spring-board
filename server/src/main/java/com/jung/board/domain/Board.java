package com.jung.board.domain;

import jakarta.persistence.*;

import lombok.AccessLevel;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Data // @Getter @Setter 한번에
@Table(name = "board")
@NoArgsConstructor(access = AccessLevel.PROTECTED)  // 생성자 관련
@ToString(of = {"id, title"})
public class Board {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String content;

    public Board(Long id, String title, String content) {
        this.id = id;
        this.title = title;
        this.content = content;
    }
}