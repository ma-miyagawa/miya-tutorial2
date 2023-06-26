-- 書籍管理
CREATE TABLE booksList_table(
 id INT AUTO_INCREMENT NOT NULL,
 title CHAR(20),
 genreCode CHAR(2),
 purchaseDate CHAR(8),
 buyer CHAR(20),
 review VARCHAR(50),
 insertDate DATE,
 updateDate DATE,
 PRIMARY KEY (id)
);
-- ジャンルマスタ
CREATE TABLE genre_table(
 genreCode CHAR(2) NOT NULL,
 genreName CHAR(20) NOT NULL,
 PRIMARY KEY (genreCode)
);
