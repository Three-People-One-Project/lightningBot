DROP TABLE completedChallenges;
DROP TABLE challenges;
DROP TABLE users;
DROP TABLE duels;


CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  discordID VARCHAR(255)
);

CREATE TABLE challenges(
  id SERIAL PRIMARY KEY,
  challenge_id VARCHAR(255),
  challenge_name VARCHAR(255)
);

CREATE TABLE completedChallenges( 
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id),
  challenge_id INT NOT NULL,
  FOREIGN KEY (challenge_id) REFERENCES challenges(id)
);

CREATE TABLE duels(
  id SERIAL PRIMARY KEY,
  userOne_id INT NOT NULL,
  FOREIGN KEY (userOne_id) REFERENCES users(id),
  userTwo_id INT NOT NULL,
  FOREIGN KEY (userTwo_id) REFERENCES users(id),
  winner VARCHAR(255),
  loser VARCHAR(255)
);

CREATE TABLE technical(
  id SERIAL PRIMARY KEY,
  question VARCHAR(255),
  answer VARCHAR(1)
)

