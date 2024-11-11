package com.twitter.repositories;

import com.twitter.models.AppUser;
import com.twitter.models.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Repository
public interface PostRepository extends JpaRepository<Post,Integer> {

    Optional<Set<Post>> findByAuthor(AppUser author);

    @Query( "SELECT p from Post p WHERE p.author IN(:authors) and p.postDate <= :sessionStart")
    Page<Post> findPostsByAuthorIds(@Param("authors") Set<AppUser> authors, @Param("sessionStart") LocalDateTime sessionStart, Pageable pageable);

    @Query("SELECT p.reposts FROM Post p WHERE p.id = :postId")
    Set<AppUser> findRepostsByPostId(@Param("postId") Long postId);

    @Query("SELECT p.bookmarks FROM Post p WHERE p.id = :postId")
    Set<AppUser> findBookmarksByPostId(@Param("postId") Long postId);

    @Query("SELECT p.views FROM Post p WHERE p.id = :postId")
    Set<AppUser> findViewsByPostId(@Param("postId") Long postId);

    @Query("SELECT p.likes FROM Post p WHERE p.id = :postId")
    Set<AppUser> findViewsByLikeId(@Param("postId") Long postId);

}
