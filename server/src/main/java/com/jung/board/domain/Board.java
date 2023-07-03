package com.jung.board.domain;

import jakarta.persistence.*;

import lombok.AccessLevel;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;

@Entity
@Data // @Getter @Setter 한번에
@Table(name = "board")
@DynamicInsert
@NoArgsConstructor(access = AccessLevel.PROTECTED)  // 생성자 관련
@ToString(of = {"id, title"})
public class Board {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 30, nullable = false)
    private String writer;

    @Column(length = 500, nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String content;

    @ColumnDefault("0")
    private Long countVisit;

    public Board(Long id, String title, String content, Long countVisit, String writer) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.countVisit = countVisit;
        this.writer = writer;
    }
}