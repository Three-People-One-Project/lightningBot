DROP TABLE completedChallenges;
DROP TABLE challenges;
DROP TABLE users;

CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  discordID INTEGER
);


CREATE TABLE completedChallenges( 
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id),
  challenge_id INT NOT NULL,
  FOREIGN KEY (challenge_id) REFERENCES challenges(id)
);


CREATE TABLE challenges(
  id SERIAL PRIMARY KEY,
  challenge_id VARCHAR(255),
  challenge_name VARCHAR(255)
);