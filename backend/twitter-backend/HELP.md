# Getting Started

### Maven Parent overrides

Due to Maven's design, elements are inherited from the parent POM to the project POM.
While most of the inheritance is fine, it also inherits unwanted elements like `<license>` and `<developers>` from the parent.
To prevent this, the project POM contains empty overrides for these elements.
If you manually switch to a different parent and actually want the inheritance, you need to remove those overrides.

### Generating RSA Private and Public Keys

**Navigate to the `certs` directory**

```bash
cd src/main/resources/certs
```   

```bash
openssl genrsa -out keypar.pem 2048
```

```bash
openssl rsa -in keypar.pem -pubout -out public.pem
```

```bash
openssl pkcs8 -topk8 -inform PEM -outform PEM -nocrypt -in keypar.pem -out private.pem 
```


```sql
----Function for Getting feed Posts

CREATE OR REPLACE FUNCTION get_feed_posts(id INT, session_start date)
RETURNS refcursor AS $$
DECLARE
    ret refcursor;
    following_ids INT[];  -- Array to hold the following user IDs
BEGIN
    -- Fetch the following user IDs into the array
    SELECT ARRAY(SELECT u.user_id
                 FROM users u
                 INNER JOIN "following" f ON u.user_id = f.following_id
                 WHERE f.user_id = id AND f.following_id != id)
    INTO following_ids;

    -- Open the cursor with the posts query using the following user IDs
    ret := 'ret_cursor';
    OPEN ret FOR

		SELECT * FROM 

		(

		SELECT p.post_id, p.audience, p.content, p.posted_date, p.is_reply, p.reply_restriction,
               p.scheduled, p.scheduled_date, p.author_id, p.poll_id
        FROM posts p where p.author_id = id
			
		UNION

        SELECT p.post_id, p.audience, p.content, p.posted_date, p.is_reply, p.reply_restriction,
               p.scheduled, p.scheduled_date, p.author_id, p.poll_id
        FROM posts p
        INNER JOIN post_repost pr ON p.post_id = pr.post_id
        WHERE pr.user_id = ANY(following_ids)

        UNION

        SELECT p.post_id, p.audience, p.content, p.posted_date, p.is_reply, p.reply_restriction,
               p.scheduled, p.scheduled_date, p.author_id, p.poll_id
        FROM posts p
        WHERE p.author_id = ANY(following_ids)

		) AS p WHERE p.posted_date <= session_start ORDER BY p.posted_date DESC;

    RETURN ret;
END;
$$ LANGUAGE plpgsql;
```



**How to call the function in Postgres**
```sql
BEGIN;
SELECT get_feed_posts(1,'2024-09-16T02:53:10'); 
-- Fetch data from the cursor
FETCH ALL IN ret_cursor;
-- Close the cursor and commit the transaction
CLOSE ret_cursor;
COMMIT;
```