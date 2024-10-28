--Temp users
insert into users(email,enabled,first_name,last_name,nickname,password,username,bio)
values ('rick@test.com',true,'Rick','Sanchez','Rick','$2a$10$/BLhUEO8i/qmf1S8fsM.Nuhy7wXQdIfBT5TOc7.S/QCC7GEUuCGIe','RickSanchez','I''m pickle rick'),
('morty@test.com', true, 'Morty', 'Smith', 'Morty', '$2a$10$/BLhUEO8i/qmf1S8fsM.Nuhy7wXQdIfBT5TOc7.S/QCC7GEUuCGIe', 'MortySmith', 'Aw, jeez!'),
('summer@test.com', true, 'Summer', 'Smith', 'Summer', '$2a$10$/BLhUEO8i/qmf1S8fsM.Nuhy7wXQdIfBT5TOc7.S/QCC7GEUuCGIe', 'SummerSmith', 'I''m cool too! Morty'),
('birdperson@test.com', true, 'Birdperson', '', 'Birdperson', '$2a$10$/BLhUEO8i/qmf1S8fsM.Nuhy7wXQdIfBT5TOc7.S/QCC7GEUuCGIe', 'Birdperson', 'In bird culture, that is considered a compliment. Morty');

--Rick has 3 followers
--Rick has the followers BirdPerson
insert into followers values (1,4);
--BirdPerson is following Rick
insert into following values (4,1);

--Morty is following Rick
insert into followers values (1,2);
insert into following values (2,1);

--Summer is following back
insert into followers values (1,3);
insert into following values (3,1);

--BirdPerson has 2 followers
--Rick is following BirdPerson
insert into followers values (4,1);
insert into following values (1,4);

--Morty has 2 followers
--Rick is following Morty
insert into followers values (3,1);
insert into following values (1,3);

--Bird Person is following Morty
insert into followers values (2,4);
insert into following values (4,2);

--Summer has one followers
insert into followers values (3,4 );
insert into following values (4,3 );

