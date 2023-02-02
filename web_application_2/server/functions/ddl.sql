-- 書籍管理
CREATE TABLE booksList_table(
 id INT AUTO_INCREMENT NOT NULL,
 title CHAR(20),
 genre CHAR(20),
 purchaseDate CHAR(8),
 buyer CHAR(20),
 review VARCHAR(50),
 insertDate DATE,
 updateDate DATE,
 PRIMARY KEY (id)
);
