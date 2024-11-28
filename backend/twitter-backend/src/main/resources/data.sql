--Role
insert into roles(role_id,authority) values (1,'USER');

--Temp users
insert into users(email,enabled,first_name,last_name,nickname,password,username,bio)
values ('rick@test.com',true,'Rick','Sanchez','RickSanchez','$2a$10$/BLhUEO8i/qmf1S8fsM.Nuhy7wXQdIfBT5TOc7.S/QCC7GEUuCGIe','RickSanchez','I''m pickle rick'),
('morty@test.com', true, 'Morty', 'Smith', 'MortySmith', '$2a$10$/BLhUEO8i/qmf1S8fsM.Nuhy7wXQdIfBT5TOc7.S/QCC7GEUuCGIe', 'MortySmith', 'Aw, jeez!'),
('summer@test.com', true, 'Summer', 'Smith', 'SummerSmith', '$2a$10$/BLhUEO8i/qmf1S8fsM.Nuhy7wXQdIfBT5TOc7.S/QCC7GEUuCGIe', 'SummerSmith', 'I''m cool too! Morty'),
('birdperson@test.com', true, 'Birdperson', '', 'Birdperson', '$2a$10$/BLhUEO8i/qmf1S8fsM.Nuhy7wXQdIfBT5TOc7.S/QCC7GEUuCGIe', 'Birdperson', 'In bird culture, that is considered a compliment. Morty');

insert into users(first_name,last_name,email,username,password,bio,nickname,verified_account,private_account,phone)
values ('Rafe','Nakhuda','rafe@test.com','rafen','$2a$10$BCUOcPxHx.2xqAGe1qd08uujzI2jk25cDYjslFzC37MXbVTmmjj7u',
'Software Engineer','Rafe Nakhuda',true,false,'9876543210');

insert into users(first_name,last_name,email,username,password,bio,nickname,verified_account,private_account,phone)
values ('Jerry','Smith','Jerry@test.com','JerrySmith','$2a$10$BCUOcPxHx.2xqAGe1qd08uujzI2jk25cDYjslFzC37MXbVTmmjj7u',
'Software Engineer','Jerry Smith',true,false,'9876543210');

insert into users(first_name,last_name,email,username,password,bio,nickname,verified_account,private_account,phone)
values ('Beth','Smith','Beth@test.com','BethSmith','$2a$10$BCUOcPxHx.2xqAGe1qd08uujzI2jk25cDYjslFzC37MXbVTmmjj7u',
'Software Engineer','Beth Smith',true,false,'9876543210');


insert into user_role(role_id,user_id) values (1,1) ,(1,2), (1,3), (1,4),(1,5 ), (1,6 ),(1,7 );

--For user Rafe
insert into following values (5,1),(5,2),(5,6),(5,7);
insert into followers values (1,5),(2,5),(6,5),(7,5);

