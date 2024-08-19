create user tuser  with PASSWORD 'password';
CREATE DATABASE twitterdb;
GRANT CONNECT ON DATABASE twitterdb TO tuser;
GRANT ALL PRIVILEGES ON DATABASE twitterdb TO tuser;
