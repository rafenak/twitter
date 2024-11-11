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
public interface PostRepository extends JpaRepository<Post, Integer> {

    String FEED_QUERY = "SELECT * FROM \n" +
            "\n" +
            "\t\t(\n" +
            "\n" +
            "\t\tSELECT p.post_id, p.audience, p.content, p.posted_date, p.is_reply, p.reply_restriction, p.reply_to,\n" +
            "               p.scheduled, p.scheduled_date, p.author_id, p.poll_id\n" +
            "        FROM posts p where p.author_id = :id\n" +
            "\t\t\t\n" +
            "\t\tUNION\n" +
            "\n" +
            "        SELECT p.post_id, p.audience, p.content, p.posted_date, p.is_reply, p.reply_restriction, p.reply_to,\n" +
            "               p.scheduled, p.scheduled_date, p.author_id, p.poll_id\n" +
            "        FROM posts p\n" +
            "        INNER JOIN post_repost pr ON p.post_id = pr.post_id\n" +
            "        WHERE pr.user_id IN (SELECT u.user_id\n" +
            "                 FROM users u\n" +
            "                 INNER JOIN \"following\" f ON u.user_id = f.following_id\n" +
            "                 WHERE f.user_id = :id AND f.following_id != :id\n" +
            "        )\n" +
            "        \n" +
            "        UNION\n" +
            "\n" +
            "        SELECT p.post_id, p.audience, p.content, p.posted_date, p.is_reply, p.reply_restriction, p.reply_to,\n" +
            "               p.scheduled, p.scheduled_date, p.author_id, p.poll_id\n" +
            "        FROM posts p\n" +
            "        WHERE p.author_id IN (SELECT u.user_id\n" +
            "                 FROM users u\n" +
            "                 INNER JOIN \"following\" f ON u.user_id = f.following_id\n" +
            "                 WHERE f.user_id = :id AND f.following_id != :id\n" +
            "        )\n" +
            "\n" +
            "\t\t) AS p WHERE p.posted_date <= :session_start ORDER BY p.posted_date DESC";


//    @Query( "SELECT p from Post p WHERE p.author IN(:authors) and p.postDate <= :sessionStart")
//    Page<Post> findPostsByAuthorIds(@Param("authors") Set<AppUser> authors, @Param("sessionStart") LocalDateTime sessionStart, Pageable pageable);

//    @Procedure("get_feed_posts")
//    Page<Post> findFeedPost(Integer userId,LocalDateTime sessionStart, Pageable pageable);

    Optional<Set<Post>> findByAuthor(AppUser author);

    @Query(nativeQuery = true, value = FEED_QUERY)
    Page<Post> findFeedPost(@Param("id") Integer userId, @Param("session_start") LocalDateTime sessionStart, Pageable pageable);


    @Query("SELECT p.reposts FROM Post p WHERE p.id = :postId")
    Set<AppUser> findRepostsByPostId(@Param("postId") Long postId);

    @Query("SELECT p.bookmarks FROM Post p WHERE p.id = :postId")
    Set<AppUser> findBookmarksByPostId(@Param("postId") Long postId);

    @Query("SELECT p.views FROM Post p WHERE p.id = :postId")
    Set<AppUser> findViewsByPostId(@Param("postId") Long postId);

    @Query("SELECT p.likes FROM Post p WHERE p.id = :postId")
    Set<AppUser> findViewsByLikeId(@Param("postId") Long postId);

    @Query("SELECT p.replyTo FROM Post p WHERE p.id = :postId")
    Optional<Post> findReplyToByPostId(@Param("postId") Long postId);

}
