
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "decks" VARCHAR (2000),
    "img_url" VARCHAR (256),
    "clearance" VARCHAR (15),
    "friends" VARCHAR (5000)
    
);

CREATE TABLE "card_item" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR (200) NOT NULL,
    "quantity" INT,
    "is_cmdr" BOOLEAN,
    "is_featured" BOOLEAN,
    "api_data" VARCHAR (50000),
    "deckid" INT REFERENCES "deck",
    "comboid" VARCHAR (200)

);

CREATE TABLE "deck" (
    "id" SERIAL PRIMARY KEY,
    "userid" INT REFERENCES "user",
    "deckname" VARCHAR (80) NOT NULL,
    "ispublic" BOOLEAN,
    "description" VARCHAR (2000),
    "decklist" VARCHAR (5000),
    "featured_card" VARCHAR (256),
    "upvotes" VARCHAR (15),
    "comments" VARCHAR (5000)
    
);