--Role
insert into roles(role_id,authority) values (1,'USER');

insert into users(first_name,last_name,email,username,password,bio,nickname,verified_account,private_account,phone)
values ('Rafe','Nakhuda','rafe@test.com','rafen','$2a$10$BCUOcPxHx.2xqAGe1qd08uujzI2jk25cDYjslFzC37MXbVTmmjj7u',
'Software Engineer','Rafe Nakhuda',true,false,'9876543210');

insert into user_role(role_id,user_id) values (1,1);

insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id)
values (0, 'This was posted over an hour ago, but less than a day ', '2024-11-02 08:10:46', 0, false, 1);





--Temp users
insert into users(email,enabled,first_name,last_name,nickname,password,username,bio)
values ('rick@test.com',true,'Rick','Sanchez','Rick','$2a$10$/BLhUEO8i/qmf1S8fsM.Nuhy7wXQdIfBT5TOc7.S/QCC7GEUuCGIe','RickSanchez','I''m pickle rick'),
('morty@test.com', true, 'Morty', 'Smith', 'Morty', '$2a$10$/BLhUEO8i/qmf1S8fsM.Nuhy7wXQdIfBT5TOc7.S/QCC7GEUuCGIe', 'MortySmith', 'Aw, jeez!'),
('summer@test.com', true, 'Summer', 'Smith', 'Summer', '$2a$10$/BLhUEO8i/qmf1S8fsM.Nuhy7wXQdIfBT5TOc7.S/QCC7GEUuCGIe', 'SummerSmith', 'I''m cool too! Morty'),
('birdperson@test.com', true, 'Birdperson', '', 'Birdperson', '$2a$10$/BLhUEO8i/qmf1S8fsM.Nuhy7wXQdIfBT5TOc7.S/QCC7GEUuCGIe', 'Birdperson', 'In bird culture, that is considered a compliment. Morty');



insert into users (bio, email, enabled , first_name , last_name , nickname , password, phone, username) values ('Monitored content-based matrices', 'eblomfield0@rakuten.co.jp', true, 'Evie', 'Blomfield', 'eblomfield0', '$2a$04$FGRxRS0m61B2jiGCAu80leVd4b/Xof5oaNHo.teJoSi9LwdX5wFU2', '748-728-4209', 'eblomfield0');
insert into users (bio, email, enabled , first_name , last_name , nickname , password, phone, username) values ('Open-architected interactive budgetary management', 'abrucker1@gizmodo.com', true, 'Arni', 'Brucker', 'abrucker1', '$2a$04$k4DauFu247j9o4.YNjkRUe62Oa4Xv56yvpD5ykRzYPeNDS459aPuy', '701-870-5666', 'abrucker1');
insert into users (bio, email, enabled , first_name , last_name , nickname , password, phone, username) values ('Compatible radical open architecture', 'bhenstridge2@discovery.com', true, 'Barbra', 'Henstridge', 'bhenstridge2', '$2a$04$y04MDzjgXOdLlHZ/KXPfyeS6vUeg7vsk2qobIUZyfgQ3DCKr58s1O', '289-870-8940', 'bhenstridge2');
insert into users (bio, email, enabled , first_name , last_name , nickname , password, phone, username) values ('Focused next generation process improvement', 'rmaginot3@sciencedaily.com', true, 'Ricardo', 'Maginot', 'rmaginot3', '$2a$04$Uv4Z/U1Ao7jvqUzsnZNPI.4yPYanuHuFQfEc5ndfuQXYj1xpOFNUq', '557-393-2691', 'rmaginot3');
insert into users (bio, email, enabled , first_name , last_name , nickname , password, phone, username) values ('Proactive transitional emulation', 'lmartinelli4@yandex.ru', true, 'Lorrie', 'Martinelli', 'lmartinelli4', '$2a$04$T242cTAUOcGP2JT57wxBqOktlbvt2U.52wzcfeJqhG6iO8G4z3loG', '132-259-8587', 'lmartinelli4');
insert into users (bio, email, enabled , first_name , last_name , nickname , password, phone, username) values ('Organized systematic framework', 'lreilingen5@deviantart.com', true, 'Lynda', 'Reilingen', 'lreilingen5', '$2a$04$BzQU8OlUlpEOhojIPAMwVu8w83F3Y6Z/OkyAhmAyOX7XgylKa0nqm', '507-355-6672', 'lreilingen5');
insert into users (bio, email, enabled , first_name , last_name , nickname , password, phone, username) values ('Intuitive dedicated conglomeration', 'dcicchetto6@cpanel.net', true, 'Damaris', 'Cicchetto', 'dcicchetto6', '$2a$04$8deyapLrApT7htyAPXVNsuxEzVNlYztcN1ruMMjPYa1Rn3Fbs/MMm', '134-842-0626', 'dcicchetto6');
insert into users (bio, email, enabled , first_name , last_name , nickname , password, phone, username) values ('Compatible interactive utilisation', 'dbelin7@webmd.com', true, 'Dagny', 'Belin', 'dbelin7', '$2a$04$5AAdbixFxn/DdqPoVquVn.U2FW48GKpM0lzEtxmGI2g8ujzCZT1Mm', '936-482-9558', 'dbelin7');
insert into users (bio, email, enabled , first_name , last_name , nickname , password, phone, username) values ('User-friendly mission-critical architecture', 'adeer8@printfriendly.com', true, 'Alisun', 'Deer', 'adeer8', '$2a$04$PX6HRtFuBXm9nKM3WRbfO.DWmT89lt6TqnWxMhiXN6ulM58VuHxzy', '717-669-3746', 'adeer8');
insert into users (bio, email, enabled , first_name , last_name , nickname , password, phone, username) values ('Advanced asynchronous knowledge user', 'estubbins9@nba.com', true, 'Elsie', 'Stubbins', 'estubbins9', '$2a$04$JHtShSEsiUeY6NHDQuZjfeCO/V8jrRE1e.B6knQx8.VawPfCe4qGu', '404-429-9653', 'estubbins9');
insert into users (bio, email, enabled , first_name , last_name , nickname , password, phone, username) values ('Sharable interactive flexibility', 'sguytona@cargocollective.com', true, 'Sharron', 'Guyton', 'sguytona', '$2a$04$hb4XSIc7ei0jbGSd6/KD0eOpWogiv5PugPZxqQZZNyt5y1o7j0YmG', '284-487-1992', 'sguytona');
insert into users (bio, email, enabled , first_name , last_name , nickname , password, phone, username) values ('Advanced systemic application', 'ggaitherb@fotki.com', true, 'Gideon', 'Gaither', 'ggaitherb', '$2a$04$NdSSUpAXTRG6EcoK7D8xjuZsipSG2supq7MQBvzgh9W9iVNjcaXVK', '311-529-3492', 'ggaitherb');
insert into users (bio, email, enabled , first_name , last_name , nickname , password, phone, username) values ('Inverse web-enabled initiative', 'bhoveec@friendfeed.com', true, 'Brigit', 'Hovee', 'bhoveec', '$2a$04$F5yEwsQ.l18L9CD5ZHDOQ.MvjRKoZK.3LvO7nn322o0W74bb/fq52', '101-204-3426', 'bhoveec');
insert into users (bio, email, enabled , first_name , last_name , nickname , password, phone, username) values ('User-friendly discrete success', 'ghyamsd@t-online.de', true, 'Goldi', 'Hyams', 'ghyamsd', '$2a$04$zb1Ft3xE2bSbJYiMOFwqMuVuLQ3/oA9TYb.RvLwlegmV8QWEkv7Am', '285-523-5109', 'ghyamsd');
insert into users (bio, email, enabled , first_name , last_name , nickname , password, phone, username) values ('Streamlined intermediate productivity', 'hworsfolde@woothemes.com', true, 'Hewett', 'Worsfold', 'hworsfolde', '$2a$04$uV5.fsF/sYofWVF6fPhKAOVKMlIjtfj5D0W4zzjoIDYW.Y3BE.M1q', '116-344-0163', 'hworsfolde');
insert into users (bio, email, enabled , first_name , last_name , nickname , password, phone, username) values ('Ameliorated content-based matrix', 'bcarlessf@yolasite.com', true, 'Blinni', 'Carless', 'bcarlessf', '$2a$04$YC5MRDqVEcO1lMSZj/1dv.sIYzVZoyt4xJV5Ar/hrkwxqSC/L8BJG', '124-489-0943', 'bcarlessf');
insert into users (bio, email, enabled , first_name , last_name , nickname , password, phone, username) values ('Robust clear-thinking policy', 'pocurrigang@newsvine.com', true, 'Portie', 'O''Currigan', 'pocurrigang', '$2a$04$rAnEpTIzsTprJYcfbYtDPuD3hrrPw6NNe8RShQo4eCRvReKD0SrXC', '563-716-2501', 'pocurrigang');
insert into users (bio, email, enabled , first_name , last_name , nickname , password, phone, username) values ('Adaptive multi-state strategy', 'zstronghillh@privacy.gov.au', true, 'Zerk', 'Stronghill', 'zstronghillh', '$2a$04$69w9ctw.5VjuWTY7zEmco.SNviEwFnw9S7x668gmGc/JKNW9aaagS', '376-920-3418', 'zstronghillh');
insert into users (bio, email, enabled , first_name , last_name , nickname , password, phone, username) values ('User-friendly regional implementation', 'wyurmanovevi@ehow.com', true, 'Werner', 'Yurmanovev', 'wyurmanovevi', '$2a$04$mLKi39VeVhpJjQYgtUKqGeIiUZbEnIJEn3iDldcQ8ts2/N92Snzw.', '490-227-1174', 'wyurmanovevi');
insert into users (bio, email, enabled , first_name , last_name , nickname , password, phone, username) values ('Profound upward-trending knowledge base', 'adeliaj@biglobe.ne.jp', true, 'Aylmar', 'D''Elia', 'adeliaj', '$2a$04$eDSJtZD3WYgooBIhejcEZe0vL9DR9P2zRSDs972fRd1.eyTWB7z/C', '313-863-1821', 'adeliaj');
insert into users (bio, email, enabled , first_name , last_name , nickname , password, phone, username) values ('Synergistic 4th generation software', 'lgamblesk@google.pl', true, 'Lilla', 'Gambles', 'lgamblesk', '$2a$04$4.VSAsjWj.cRkbg/vHXUI.RattHPkpaBHG0sWnuQYzE7K.drozBx.', '848-617-5741', 'lgamblesk');
insert into users (bio, email, enabled , first_name , last_name , nickname , password, phone, username) values ('Right-sized cohesive website', 'anotonl@hexun.com', true, 'Annissa', 'Noton', 'anotonl', '$2a$04$XFsW2IXQJ0/S2aR07CakmeCiidxYoGWEEep6Kk6uYKO7PrzypN6Le', '287-637-1993', 'anotonl');
insert into users (bio, email, enabled , first_name , last_name , nickname , password, phone, username) values ('Function-based background initiative', 'evowdenm@sciencedaily.com', true, 'Emilee', 'Vowden', 'evowdenm', '$2a$04$ACTYJlJhLCCYL.ecu0OhC.YzxRg4bRxogGETjrMj/wVIuN/6hzd0e', '787-770-1913', 'evowdenm');
insert into users (bio, email, enabled , first_name , last_name , nickname , password, phone, username) values ('Inverse full-range productivity', 'rsibsonn@mediafire.com', true, 'Reagan', 'Sibson', 'rsibsonn', '$2a$04$pl7Tl2WxUpYYUQIxOAG8oO8br4QuE7pIDNvz7WYEtZm2i0F5nLcBS', '433-914-5980', 'rsibsonn');
insert into users (bio, email, enabled , first_name , last_name , nickname , password, phone, username) values ('Business-focused tertiary paradigm', 'hwheelero@blogtalkradio.com', true, 'Hector', 'Wheeler', 'hwheelero', '$2a$04$XCsu0.QQsXTCrSC55SFM9OBmmgWv7Xy1.D64yM4bGIas1.Kv87hqK', '302-895-0728', 'hwheelero');
insert into users (bio, email, enabled , first_name , last_name , nickname , password, phone, username) values ('Re-contextualized systematic application', 'mgiddinsp@java.com', true, 'Meir', 'Giddins', 'mgiddinsp', '$2a$04$bl2K2UsH25rMlMzWtWG1tuUlhiHAVckoMXRGGSvghpO3MXvvhYcry', '987-726-6955', 'mgiddinsp');
insert into users (bio, email, enabled , first_name , last_name , nickname , password, phone, username) values ('Networked background forecast', 'hbloomerq@newsvine.com', true, 'Hannah', 'Bloomer', 'hbloomerq', '$2a$04$EAQbFTUOKWB8X1C4vb7OP.BE4fTEShAu1FEHAY3Fmj8vlobLWPG6G', '951-714-3957', 'hbloomerq');
insert into users (bio, email, enabled , first_name , last_name , nickname , password, phone, username) values ('Synchronised bi-directional encoding', 'wmenpesr@furl.net', true, 'Wynn', 'Menpes', 'wmenpesr', '$2a$04$.fn8Z3SanqW0qAREAbaJI.fztn7T2j1Qs8DQHVjOnm6Y.uGYMoJiS', '594-474-8176', 'wmenpesr');
insert into users (bio, email, enabled , first_name , last_name , nickname , password, phone, username) values ('Advanced bifurcated service-desk', 'cfrancescuzzis@jimdo.com', true, 'Cris', 'Francescuzzi', 'cfrancescuzzis', '$2a$04$5p0q.PcnUlvlUma0jhx5oeJlvWKkxFZQbFJ5x/.yA/Jt7Pm4x1ZaG', '464-447-8399', 'cfrancescuzzis');
insert into users (bio, email, enabled , first_name , last_name , nickname , password, phone, username) values ('Optimized empowering superstructure', 'ganandt@rambler.ru', true, 'Gloriana', 'Anand', 'ganandt', '$2a$04$SeLRV2w/UYp/ILny4pnD2.UdKVjwrYQxkxdoFjMkh9IKdzQpqvWkK', '558-188-3165', 'ganandt');
insert into users (bio, email, enabled , first_name , last_name , nickname , password, phone, username) values ('Open-source stable database', 'ckuzemkau@bizjournals.com', true, 'Carolin', 'Kuzemka', 'ckuzemkau', '$2a$04$IDO3N3lZ6LvN4fCFU1CukOleYNUrwtLopLZYZEBv.rSgTU8/ywYMi', '559-732-3669', 'ckuzemkau');
insert into users (bio, email, enabled , first_name , last_name , nickname , password, phone, username) values ('Networked hybrid collaboration', 'arabbev@ca.gov', true, 'Ardelia', 'Rabbe', 'arabbev', '$2a$04$xhvrz770rD98QSXmaG4B7eo9RKD2fN505Ki4Ai3iIXg7R6iZGnewG', '886-290-1451', 'arabbev');
insert into users (bio, email, enabled , first_name , last_name , nickname , password, phone, username) values ('Cloned human-resource circuit', 'rkoeppkew@alibaba.com', true, 'Robinia', 'Koeppke', 'rkoeppkew', '$2a$04$6UWkeaMWVqtjWubdWtqUKuuKeUCJTpxaCwZ3/oAoxbDkqbjy50BOK', '473-589-4830', 'rkoeppkew');
insert into users (bio, email, enabled , first_name , last_name , nickname , password, phone, username) values ('Mandatory high-level flexibility', 'fduplainx@gmpg.org', true, 'Fran', 'Duplain', 'fduplainx', '$2a$04$7BCIsFYvs6qwuOyUIjjLG.KERLu1GMkR08rpUFG7eYyg0NsQeCUXW', '843-795-1305', 'fduplainx');
insert into users (bio, email, enabled , first_name , last_name , nickname , password, phone, username) values ('Visionary explicit product', 'rcaspery@ustream.tv', true, 'Rubetta', 'Casper', 'rcaspery', '$2a$04$JLPstuABiyR9Meu7w72OJ.r/KPwDv0ak2k/8bOoO5IdAgSXJp22vW', '601-723-6544', 'rcaspery');
insert into users (bio, email, enabled , first_name , last_name , nickname , password, phone, username) values ('Exclusive local protocol', 'ptomankiewiczz@clickbank.net', true, 'Paloma', 'Tomankiewicz', 'ptomankiewiczz', '$2a$04$RZ.fjlMlwtQY57xU8DEnE.dCQu6EYRDsHF2CtskjVkHmS9S6SGtr6', '135-187-5116', 'ptomankiewiczz');
insert into users (bio, email, enabled , first_name , last_name , nickname , password, phone, username) values ('Proactive holistic pricing structure', 'mwhether10@vistaprint.com', true, 'Morgen', 'Whether', 'mwhether10', '$2a$04$VCQqp5nWZPWcYiDGPWoOFOPjuP.XqDIj7ql46w5nhPXL61Q6WKxcu', '323-160-9516', 'mwhether10');
insert into users (bio, email, enabled , first_name , last_name , nickname , password, phone, username) values ('Diverse actuating database', 'mgudyer11@cornell.edu', true, 'Margaret', 'Gudyer', 'mgudyer11', '$2a$04$lRjqfe5DBfo4P5yX1SRabOOzu/VN2BQD07jD2BquMioOMwxOmvn2i', '877-356-2099', 'mgudyer11');
insert into users (bio, email, enabled , first_name , last_name , nickname , password, phone, username) values ('Digitized tertiary task-force', 'jgostyke12@spotify.com', true, 'Jard', 'Gostyke', 'jgostyke12', '$2a$04$OZ6xqWj2U5eeZaR6GwOMVubZFnqI5y0KXBx3dgEIWbFKkq9IbiOgi', '149-584-0736', 'jgostyke12');
insert into users (bio, email, enabled , first_name , last_name , nickname , password, phone, username) values ('Down-sized impactful data-warehouse', 'iellph13@purevolume.com', true, 'Isabella', 'Ellph', 'iellph13', '$2a$04$sMeD3N/rfrxg/SAwFj/REuhS/51EOwBObahezYp6LAb8XeI1DdfCW', '425-184-6289', 'iellph13');
insert into users (bio, email, enabled , first_name , last_name , nickname , password, phone, username) values ('Fundamental scalable encoding', 'rdodding14@ucla.edu', true, 'Rolph', 'Dodding', 'rdodding14', '$2a$04$o6JJm8UvZ7nzz4beJe1ts.sx1To8XGwDmrMPFlLkTCeKDoZo5YUHa', '462-352-7230', 'rdodding14');
insert into users (bio, email, enabled , first_name , last_name , nickname , password, phone, username) values ('Focused mobile paradigm', 'jtilford15@gnu.org', true, 'Janenna', 'Tilford', 'jtilford15', '$2a$04$oji.Xrx.BfzMi9WEGF3axe28iDxAiNqC8ViUr9Ts8d27oFShCrXOi', '414-504-3714', 'jtilford15');
insert into users (bio, email, enabled , first_name , last_name , nickname , password, phone, username) values ('Multi-lateral context-sensitive neural-net', 'lsherreard16@yahoo.co.jp', true, 'Luz', 'Sherreard', 'lsherreard16', '$2a$04$AsvJC8LF0uvRX2dow1UCY.ofKTAYQj5YnHRNCCVU6tFF1Iodtn/dK', '556-460-6858', 'lsherreard16');
insert into users (bio, email, enabled , first_name , last_name , nickname , password, phone, username) values ('Distributed background archive', 'ccarletti17@blinklist.com', true, 'Charmian', 'Carletti', 'ccarletti17', '$2a$04$CJiy2gpTNZbYYEkHz..n8udHgTpqzA/C3LsTkYiStzlQbcJEBrOAW', '138-208-0650', 'ccarletti17');
insert into users (bio, email, enabled , first_name , last_name , nickname , password, phone, username) values ('Face to face multi-tasking approach', 'caikin18@cnn.com', true, 'Carmon', 'Aikin', 'caikin18', '$2a$04$AKsrKr3ZTSjctjOYs4i1peoGxaaf.rwGgjFGofR9IQa4BIJdtN3Va', '157-795-7083', 'caikin18');
insert into users (bio, email, enabled , first_name , last_name , nickname , password, phone, username) values ('Switchable multi-state success', 'hnorcliffe19@youtube.com', true, 'Harlin', 'Norcliffe', 'hnorcliffe19', '$2a$04$nEirJz4KU.eYG.NX7YqhYuUeupf.VcTdhcc525tnoGHPg/XPyr2ve', '240-318-1862', 'hnorcliffe19');
insert into users (bio, email, enabled , first_name , last_name , nickname , password, phone, username) values ('Exclusive static project', 'fwelfare1a@princeton.edu', true, 'Filberto', 'Welfare', 'fwelfare1a', '$2a$04$UwVMFLs2wuhiknjuUMf4cu329.REw06Bf19M6CbfXXS4bO5D88sm2', '696-579-8704', 'fwelfare1a');
insert into users (bio, email, enabled , first_name , last_name , nickname , password, phone, username) values ('Down-sized asymmetric utilisation', 'bmurton1b@webs.com', true, 'Brook', 'Murton', 'bmurton1b', '$2a$04$xST.G2ulq3diO4SXwHlitO1oATiH22M0qxAC4De/0dot8pvvzxwEK', '362-375-8862', 'bmurton1b');
insert into users (bio, email, enabled , first_name , last_name , nickname , password, phone, username) values ('Optimized non-volatile product', 'lgallen1c@imgur.com', true, 'Lurlene', 'Gallen', 'lgallen1c', '$2a$04$u1crSYyf4x/tOQHgVBJRqurfPY5u1mrBruCCJoBq3vireR5rzX4je', '951-296-4543', 'lgallen1c');
insert into users (bio, email, enabled , first_name , last_name , nickname , password, phone, username) values ('Multi-layered homogeneous hub', 'kmcmurdo1d@bigcartel.com', true, 'Kelsey', 'McMurdo', 'kmcmurdo1d', '$2a$04$dsVlNz/.z3gXWIofKgsuiOsVTVE9M2r7B1mMGPfkY8obu4MwSWrlu', '964-245-5850', 'kmcmurdo1d');
insert into users (bio, email, enabled , first_name , last_name , nickname , password, phone, username) values ('Face to face zero defect neural-net', 'sfavey1e@github.com', true, 'Sherlock', 'Favey', 'sfavey1e', '$2a$04$PtCm7BHCZFXrSy0eaQydnOVVFM.KkllrykneNRTgPI3SvgYCr0lia', '545-292-8313', 'sfavey1e');
insert into users (bio, email, enabled , first_name , last_name , nickname , password, phone, username) values ('Organic 4th generation infrastructure', 'csickert1f@upenn.edu', true, 'Christa', 'Sickert', 'csickert1f', '$2a$04$PmnXlEOoGLkhnnrMtmCZce2qb4dYXcUcpwVL46SaDLa1iHr2161NS', '156-871-1982', 'csickert1f');
insert into users (bio, email, enabled , first_name , last_name , nickname , password, phone, username) values ('Managed client-driven hardware', 'ncraddy1g@jigsy.com', true, 'Nessy', 'Craddy', 'ncraddy1g', '$2a$04$fXi53sTiF2LCsdXJbGgV/.28A2oDOFu3Zp9gpzyr4I2KzbQkWlTZ2', '542-273-8866', 'ncraddy1g');
insert into users (bio, email, enabled , first_name , last_name , nickname , password, phone, username) values ('Open-source intermediate Graphical User Interface', 'pcloutt1h@joomla.org', true, 'Penni', 'Cloutt', 'pcloutt1h', '$2a$04$Y0n0YTOEKoy2QcRpWKQFgO8it26/pE0/SPJt/XVHEgr5HG39E2g5S', '122-818-4338', 'pcloutt1h');
insert into users (bio, email, enabled , first_name , last_name , nickname , password, phone, username) values ('Reduced optimal hierarchy', 'fjennemann1i@tamu.edu', true, 'Fran', 'Jennemann', 'fjennemann1i', '$2a$04$9mZN36SxIQRg0lFs4O4zN.VR5EnGbVTY/rDeeG5Dw.XevamqAJmga', '161-271-6340', 'fjennemann1i');
insert into users (bio, email, enabled , first_name , last_name , nickname , password, phone, username) values ('Networked transitional standardization', 'slinden1j@ning.com', true, 'Selena', 'Linden', 'slinden1j', '$2a$04$iqYfAMJF5GXYA9kIqkZoLuPod5jlYkvvgKhdonRNRAWmbHxFoCs6O', '168-396-8204', 'slinden1j');
insert into users (bio, email, enabled , first_name , last_name , nickname , password, phone, username) values ('Open-architected heuristic middleware', 'rnajera1k@spotify.com', true, 'Rabi', 'Najera', 'rnajera1k', '$2a$04$61eS8MXKmlw/nnm1dP6dR.a2lAFoAQFfQMh0XKfS6spmm5XMS3u42', '998-716-9206', 'rnajera1k');
insert into users (bio, email, enabled , first_name , last_name , nickname , password, phone, username) values ('Re-contextualized value-added website', 'rniesegen1l@newsvine.com', true, 'Rudd', 'Niesegen', 'rniesegen1l', '$2a$04$oFk4r5wJ6xegAF1Qv1Km4OMW0.fQuEKtNJoz/fSaz.27fuz4.vMZK', '225-400-0996', 'rniesegen1l');
insert into users (bio, email, enabled , first_name , last_name , nickname , password, phone, username) values ('Customer-focused grid-enabled matrix', 'amclennan1m@seattletimes.com', true, 'Ase', 'McLennan', 'amclennan1m', '$2a$04$chOS5bQvcWo..DUPVutI7eX3jQIi6xtKqYYgDqd1O95R2YJOm6uNS', '717-626-8901', 'amclennan1m');
insert into users (bio, email, enabled , first_name , last_name , nickname , password, phone, username) values ('Virtual modular data-warehouse', 'tbarnby1n@digg.com', true, 'Terencio', 'Barnby', 'tbarnby1n', '$2a$04$XuhXY919/bp7DiskfUWNFuD8LXqJ9rv87I9.7.ADu/mHBsxmGjXIe', '314-356-9088', 'tbarnby1n');
insert into users (bio, email, enabled , first_name , last_name , nickname , password, phone, username) values ('Front-line human-resource open architecture', 'wmeak1o@oakley.com', true, 'Whittaker', 'Meak', 'wmeak1o', '$2a$04$PuuhhvWn5a01FOq5xUfdiuCh8yfY9yHUX9K4R5HdyIqZh4jo.W0Za', '616-174-2549', 'wmeak1o');
insert into users (bio, email, enabled , first_name , last_name , nickname , password, phone, username) values ('Implemented maximized array', 'scromar1p@hatena.ne.jp', true, 'Skylar', 'Cromar', 'scromar1p', '$2a$04$QEFc574vLetwpU1OLeg74.kd4.6QaL9Tfnyk26IGKRHLDzvoXFgHa', '342-962-8533', 'scromar1p');
insert into users (bio, email, enabled , first_name , last_name , nickname , password, phone, username) values ('Face to face object-oriented definition', 'ctettersell1q@twitter.com', true, 'Codie', 'Tettersell', 'ctettersell1q', '$2a$04$HCWMp91s/l97Y1QsjYN2ge4NbONSpQrJuGEWzwYvqpNPr0UMq4Vx.', '134-381-7711', 'ctettersell1q');
insert into users (bio, email, enabled , first_name , last_name , nickname , password, phone, username) values ('Digitized incremental internet solution', 'rhaighton1r@de.vu', true, 'Roch', 'Haighton', 'rhaighton1r', '$2a$04$H3iYjShonnJKC5yfLBUm5eH8g4mHeK4xNxH8VrE4lJcb27.bR5gri', '134-975-4508', 'rhaighton1r');
insert into users (bio, email, enabled , first_name , last_name , nickname , password, phone, username) values ('Implemented user-facing portal', 'pmcglaughn1s@irs.gov', true, 'Priscilla', 'McGlaughn', 'pmcglaughn1s', '$2a$04$kpyDY66TNMPxssHpLLJYP.eIxfaCoSPGabLZWAZA4XtufCPFg4PRK', '321-307-0094', 'pmcglaughn1s');
insert into users (bio, email, enabled , first_name , last_name , nickname , password, phone, username) values ('Self-enabling systematic migration', 'melles1t@icq.com', true, 'Mei', 'Elles', 'melles1t', '$2a$04$pY.q/nSS4LPJGZjb5IGmOuMZKGsrWkya9O.sVCeAZnuruouBAGUxe', '471-405-7260', 'melles1t');
insert into users (bio, email, enabled , first_name , last_name , nickname , password, phone, username) values ('Synergized value-added solution', 'lmcknish1u@boston.com', true, 'Loren', 'McKnish', 'lmcknish1u', '$2a$04$Q/5KXIPtz3cVtwWrhRONJODaynQXlZ.2khEqmEAuaEqELVpP7AuCu', '802-247-1929', 'lmcknish1u');
insert into users (bio, email, enabled , first_name , last_name , nickname , password, phone, username) values ('Reactive content-based neural-net', 'lmaccathay1v@nature.com', true, 'Lodovico', 'MacCathay', 'lmaccathay1v', '$2a$04$Vu9Zz8zx7O6gCL1V0NiXkeciA/wDv2dgUlTDNQuJipBMFD8IYVjne', '717-442-7274', 'lmaccathay1v');
insert into users (bio, email, enabled , first_name , last_name , nickname , password, phone, username) values ('Operative system-worthy groupware', 'acrowley1w@wired.com', true, 'Aline', 'Crowley', 'acrowley1w', '$2a$04$X83JziDsZ2P1gQLCUqERU.274djwDEdeOVifD/oH2wRi.Vv7oTJ32', '602-368-6868', 'acrowley1w');
insert into users (bio, email, enabled , first_name , last_name , nickname , password, phone, username) values ('Phased impactful paradigm', 'hditt1x@geocities.com', true, 'Hatti', 'Ditt', 'hditt1x', '$2a$04$WTweRYYOmw7EsPSP6kx7W./jTN6gAJGJq49RKtiBMI6iPQyNVVSie', '420-655-0982', 'hditt1x');
insert into users (bio, email, enabled , first_name , last_name , nickname , password, phone, username) values ('Implemented local migration', 'cmurfett1y@sakura.ne.jp', true, 'Chloris', 'Murfett', 'cmurfett1y', '$2a$04$Vxf0NG0CHeTbisdS.eElMu.Nn0YiFHQeUoTL7/wPocuMHzBbrBNPG', '950-879-3407', 'cmurfett1y');
insert into users (bio, email, enabled , first_name , last_name , nickname , password, phone, username) values ('Fully-configurable static product', 'agillibrand1z@techcrunch.com', true, 'Abagail', 'Gillibrand', 'agillibrand1z', '$2a$04$5dcF0Y.5Pugy4eVURCHCpeLbWeaK8LfKB9OQlvkJvW4or1pA9BtmK', '214-887-2321', 'agillibrand1z');
insert into users (bio, email, enabled , first_name , last_name , nickname , password, phone, username) values ('Organized motivating flexibility', 'rmilligan20@furl.net', true, 'Robb', 'Milligan', 'rmilligan20', '$2a$04$N1fkDVSxVqRCAehy5RXluOn8qlBNRSkhoFeobYe8MI.UDih3RWvY2', '773-620-2517', 'rmilligan20');
insert into users (bio, email, enabled , first_name , last_name , nickname , password, phone, username) values ('Total dynamic array', 'shallyburton21@walmart.com', true, 'Sophronia', 'Hallyburton', 'shallyburton21', '$2a$04$aBI7B/I8/2obFXQSMl2HgOthsac0nHgjU4Q754k7dBzMh.l0EvLli', '914-381-3612', 'shallyburton21');
insert into users (bio, email, enabled , first_name , last_name , nickname , password, phone, username) values ('Re-engineered cohesive superstructure', 'ltull22@goo.gl', true, 'Larine', 'Tull', 'ltull22', '$2a$04$oGD0uYuUl40ya8eLyQvileqnSVTQra.Yd8hltwTTYUg.tDe8DrlFG', '600-220-3040', 'ltull22');
insert into users (bio, email, enabled , first_name , last_name , nickname , password, phone, username) values ('Reduced demand-driven groupware', 'jennals23@domainmarket.com', true, 'Jane', 'Ennals', 'jennals23', '$2a$04$OJh4sCrYX0IDSerY8nTe..VWuRmK4CEsS2nFw7uf7UgygsQBq907q', '666-777-0523', 'jennals23');
insert into users (bio, email, enabled , first_name , last_name , nickname , password, phone, username) values ('Operative tangible standardization', 'aodriscoll24@skyrock.com', true, 'Annabella', 'O''Driscoll', 'aodriscoll24', '$2a$04$luqKHVTVo7.nx.sH0al60uarUrp6VoIBZ2LnlUbsYiVHJ4Q/CfH1O', '168-841-2650', 'aodriscoll24');
insert into users (bio, email, enabled , first_name , last_name , nickname , password, phone, username) values ('Innovative incremental archive', 'sblackater25@paypal.com', true, 'Sharona', 'Blackater', 'sblackater25', '$2a$04$Bf6.u1XP3q3VK8nRvNxuce/kcAFmJPZxmO5AlxlTeaaVOnCfwh35G', '166-258-3995', 'sblackater25');
insert into users (bio, email, enabled , first_name , last_name , nickname , password, phone, username) values ('Open-architected systemic portal', 'bsemple26@qq.com', true, 'Briana', 'Semple', 'bsemple26', '$2a$04$UQeyOV67DErTa5hFsPG06OhI6xbEEVSQSHR5akTiKvlkYe/KAb/FO', '585-361-1201', 'bsemple26');
insert into users (bio, email, enabled , first_name , last_name , nickname , password, phone, username) values ('Operative leading edge adapter', 'mlevis27@merriam-webster.com', true, 'Muire', 'Levis', 'mlevis27', '$2a$04$0/H6D1Dt.PsEREAi.P1f6.kt2TL/RhIpmhMK1tTS1cqvi1pqWWIVG', '852-679-2179', 'mlevis27');
insert into users (bio, email, enabled , first_name , last_name , nickname , password, phone, username) values ('Stand-alone maximized initiative', 'tivancevic28@multiply.com', true, 'Thatcher', 'Ivancevic', 'tivancevic28', '$2a$04$GNQGeBPfDWvNFhWs9hSptePKSFakUl4gfrX0e4e5E04NXsiED8Q3q', '511-937-5069', 'tivancevic28');
insert into users (bio, email, enabled , first_name , last_name , nickname , password, phone, username) values ('Cross-group leading edge approach', 'elamey29@scribd.com', true, 'Eleanore', 'Lamey', 'elamey29', '$2a$04$POT1DEU2kI9AW/hNqg2rcOD2k8NItqoR.JxTnahWR.hB8KeGvLjPK', '419-423-1661', 'elamey29');
insert into users (bio, email, enabled , first_name , last_name , nickname , password, phone, username) values ('Compatible executive adapter', 'csaggs2a@ebay.com', true, 'Clara', 'Saggs', 'csaggs2a', '$2a$04$j5pVxhE42JjBtrfr.GCcaudeKiZXVfgSE5FK367tJGuG/P2hOPKSa', '928-714-2721', 'csaggs2a');
insert into users (bio, email, enabled , first_name , last_name , nickname , password, phone, username) values ('Front-line 24 hour instruction set', 'mgarrod2b@friendfeed.com', true, 'Marshal', 'Garrod', 'mgarrod2b', '$2a$04$KeKkJdZApRcV3bQosHK4X.bVvEFbaBZro4kLIDl./ZbxfERv7cerm', '354-183-5582', 'mgarrod2b');
insert into users (bio, email, enabled , first_name , last_name , nickname , password, phone, username) values ('Configurable context-sensitive Graphical User Interface', 'dshevlan2c@geocities.jp', true, 'Daisie', 'Shevlan', 'dshevlan2c', '$2a$04$zzE6JkvwXH/IBxeDTnnCQe4mhYC4hauVOj5bDjtepFwwHkQEb.CpW', '372-888-3501', 'dshevlan2c');
insert into users (bio, email, enabled , first_name , last_name , nickname , password, phone, username) values ('Mandatory hybrid flexibility', 'agorgl2d@facebook.com', true, 'Ariella', 'Gorgl', 'agorgl2d', '$2a$04$8nBYpT2LWlfOx5fFZcwMaOfJvTnte/KpWrhEYMxfTcOKAqgn4u7..', '417-726-9822', 'agorgl2d');
insert into users (bio, email, enabled , first_name , last_name , nickname , password, phone, username) values ('Adaptive discrete Graphic Interface', 'npriver2e@com.com', true, 'Nariko', 'Priver', 'npriver2e', '$2a$04$F29te06fToRpqIfkwJy2deuj924HkPFyhypV6xueLNRuU5OP3ZAJW', '886-722-6881', 'npriver2e');
insert into users (bio, email, enabled , first_name , last_name , nickname , password, phone, username) values ('Streamlined stable focus group', 'maddams2f@java.com', true, 'Max', 'Addams', 'maddams2f', '$2a$04$YgUwSzt0bjX2Khg6AjeGHeK9/7txUVRDUenudvPqytVpU3rs8NVNi', '270-525-9734', 'maddams2f');
insert into users (bio, email, enabled , first_name , last_name , nickname , password, phone, username) values ('Up-sized explicit workforce', 'rtennison2g@youtu.be', true, 'Ron', 'Tennison', 'rtennison2g', '$2a$04$24aRCwp1p/cFNDCLJNf1reiM.xSJfi6EHljq9zmlEQWsj4.mhGRs2', '364-228-4801', 'rtennison2g');
insert into users (bio, email, enabled , first_name , last_name , nickname , password, phone, username) values ('Horizontal demand-driven toolset', 'bcaras2h@vk.com', true, 'Bridget', 'Caras', 'bcaras2h', '$2a$04$xdQB7mrAmoDkWoAha56dbeBRDrcKSXMyz.8ii9JXvAFML3Cru.GLC', '433-388-6922', 'bcaras2h');
insert into users (bio, email, enabled , first_name , last_name , nickname , password, phone, username) values ('Multi-layered interactive pricing structure', 'dmoyes2i@surveymonkey.com', true, 'Darin', 'Moyes', 'dmoyes2i', '$2a$04$pHv6f6BhPVxR98jF8cAhNuZm6USTQmkUaS74DH1gPXeJz3GsAD1aG', '855-757-9745', 'dmoyes2i');
insert into users (bio, email, enabled , first_name , last_name , nickname , password, phone, username) values ('Decentralized motivating toolset', 'ekilshall2j@reverbnation.com', true, 'Estrellita', 'Kilshall', 'ekilshall2j', '$2a$04$s0Hw2TolbskIrMvuqIqCaetFI9j4DK5Y2UR40FWLAZQdwJLN9HBVC', '460-810-2822', 'ekilshall2j');
insert into users (bio, email, enabled , first_name , last_name , nickname , password, phone, username) values ('Networked full-range open architecture', 'pwaud2k@sun.com', true, 'Perla', 'Waud', 'pwaud2k', '$2a$04$OiQ4ErlDuKrWEq1vXjsWR.J4p/cJXNmpfjxKQR5hGXcpygFgN1alK', '596-835-0059', 'pwaud2k');
insert into users (bio, email, enabled , first_name , last_name , nickname , password, phone, username) values ('Profit-focused 5th generation instruction set', 'anutbeem2l@bing.com', true, 'Andria', 'Nutbeem', 'anutbeem2l', '$2a$04$hjghW4FimrgK7biyLk3SiuShnT38hh9YBWSIf6Xrwb40LPUpyxJsS', '332-160-0296', 'anutbeem2l');
insert into users (bio, email, enabled , first_name , last_name , nickname , password, phone, username) values ('Centralized encompassing data-warehouse', 'fabden2m@networksolutions.com', true, 'Fraser', 'Abden', 'fabden2m', '$2a$04$6F15Jv6HpfosjB9PI9ResuRYC/ZjFDPn/m5n9q7/fgN9g5Q1oRtGC', '405-361-9336', 'fabden2m');
insert into users (bio, email, enabled , first_name , last_name , nickname , password, phone, username) values ('Expanded asymmetric Graphic Interface', 'bmoxsom2n@vinaora.com', true, 'Babette', 'Moxsom', 'bmoxsom2n', '$2a$04$G56TtLUhbPZwEUAAAJsQHunM8dWAMuLdtOxIcu3EXjqEn7U3so12O', '984-115-6956', 'bmoxsom2n');
insert into users (bio, email, enabled , first_name , last_name , nickname , password, phone, username) values ('Open-architected object-oriented database', 'kcogle2o@upenn.edu', true, 'Karissa', 'Cogle', 'kcogle2o', '$2a$04$6JV2liiKfklN5zjtpN0hL.Lyqts9C8v6Bvgk0NHYYptNPoynj016a', '983-309-1875', 'kcogle2o');
insert into users (bio, email, enabled , first_name , last_name , nickname , password, phone, username) values ('Down-sized asynchronous project', 'rchesterman2p@skyrock.com', true, 'Reg', 'Chesterman', 'rchesterman2p', '$2a$04$SDRs2HlKcThxM/ikUZF5JOr9WMAJiEQigpo4HMtwJXBFqCdrfrb4e', '840-976-5159', 'rchesterman2p');
insert into users (bio, email, enabled , first_name , last_name , nickname , password, phone, username) values ('Open-source mission-critical contingency', 'fdowning2q@diigo.com', true, 'Fredric', 'Downing', 'fdowning2q', '$2a$04$/ZQQ.sFsAcGNg2t4v4R5IurpucSIiYQC8ngdu5eyz9.goEzZv.Aeu', '127-643-1108', 'fdowning2q');
insert into users (bio, email, enabled , first_name , last_name , nickname , password, phone, username) values ('Digitized secondary initiative', 'amullins2r@tinypic.com', true, 'Almira', 'Mullins', 'amullins2r', '$2a$04$RZj2hJ9s3PPASGhhrtuDBuXeWes/lD9Gh0sUzVkkA0AZYyT2ici9G', '152-951-0688', 'amullins2r');




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



insert into followers (user_id , follower_id ) values (60, 39);
insert into followers (user_id , follower_id ) values (24, 47);
insert into followers (user_id , follower_id ) values (13, 45);
insert into followers (user_id , follower_id ) values (18, 33);
insert into followers (user_id , follower_id ) values (11, 52);
insert into followers (user_id , follower_id ) values (81, 99);
insert into followers (user_id , follower_id ) values (31, 25);
insert into followers (user_id , follower_id ) values (12, 81);
insert into followers (user_id , follower_id ) values (101, 27);
insert into followers (user_id , follower_id ) values (69, 15);
insert into followers (user_id , follower_id ) values (84, 69);
insert into followers (user_id , follower_id ) values (73, 64);
insert into followers (user_id , follower_id ) values (96, 20);
insert into followers (user_id , follower_id ) values (53, 3);
insert into followers (user_id , follower_id ) values (83, 91);
insert into followers (user_id , follower_id ) values (39, 34);
insert into followers (user_id , follower_id ) values (36, 33);
insert into followers (user_id , follower_id ) values (12, 29);
insert into followers (user_id , follower_id ) values (14, 48);
insert into followers (user_id , follower_id ) values (10, 45);
insert into followers (user_id , follower_id ) values (103, 83);
insert into followers (user_id , follower_id ) values (66, 8);
insert into followers (user_id , follower_id ) values (67, 90);
insert into followers (user_id , follower_id ) values (94, 36);
insert into followers (user_id , follower_id ) values (95, 77);
insert into followers (user_id , follower_id ) values (47, 74);
insert into followers (user_id , follower_id ) values (33, 2);
insert into followers (user_id , follower_id ) values (66, 92);
insert into followers (user_id , follower_id ) values (56, 42);
insert into followers (user_id , follower_id ) values (100, 34);
insert into followers (user_id , follower_id ) values (32, 13);
insert into followers (user_id , follower_id ) values (67, 35);
insert into followers (user_id , follower_id ) values (82, 17);
insert into followers (user_id , follower_id ) values (52, 74);
insert into followers (user_id , follower_id ) values (52, 13);
insert into followers (user_id , follower_id ) values (70, 81);
insert into followers (user_id , follower_id ) values (80, 71);
insert into followers (user_id , follower_id ) values (70, 41);
insert into followers (user_id , follower_id ) values (63, 97);
insert into followers (user_id , follower_id ) values (83, 103);
insert into followers (user_id , follower_id ) values (90, 41);
insert into followers (user_id , follower_id ) values (102, 92);
insert into followers (user_id , follower_id ) values (98, 6);
insert into followers (user_id , follower_id ) values (45, 104);
insert into followers (user_id , follower_id ) values (73, 80);
insert into followers (user_id , follower_id ) values (75, 85);
insert into followers (user_id , follower_id ) values (92, 18);
insert into followers (user_id , follower_id ) values (18, 87);
insert into followers (user_id , follower_id ) values (47, 34);
insert into followers (user_id , follower_id ) values (55, 59);
insert into followers (user_id , follower_id ) values (91, 3);
insert into followers (user_id , follower_id ) values (61, 5);
insert into followers (user_id , follower_id ) values (56, 65);
insert into followers (user_id , follower_id ) values (11, 46);
insert into followers (user_id , follower_id ) values (51, 84);
insert into followers (user_id , follower_id ) values (88, 23);
insert into followers (user_id , follower_id ) values (61, 63);
insert into followers (user_id , follower_id ) values (7, 104);
insert into followers (user_id , follower_id ) values (66, 26);
insert into followers (user_id , follower_id ) values (76, 79);
insert into followers (user_id , follower_id ) values (94, 4);
insert into followers (user_id , follower_id ) values (5, 59);
insert into followers (user_id , follower_id ) values (27, 14);
insert into followers (user_id , follower_id ) values (67, 76);
insert into followers (user_id , follower_id ) values (49, 81);
insert into followers (user_id , follower_id ) values (73, 51);
insert into followers (user_id , follower_id ) values (15, 45);
insert into followers (user_id , follower_id ) values (10, 62);
insert into followers (user_id , follower_id ) values (41, 95);
insert into followers (user_id , follower_id ) values (27, 27);
insert into followers (user_id , follower_id ) values (67, 91);
insert into followers (user_id , follower_id ) values (40, 21);
insert into followers (user_id , follower_id ) values (76, 45);
insert into followers (user_id , follower_id ) values (36, 27);
insert into followers (user_id , follower_id ) values (102, 51);
insert into followers (user_id , follower_id ) values (28, 82);
insert into followers (user_id , follower_id ) values (37, 78);
insert into followers (user_id , follower_id ) values (18, 65);
insert into followers (user_id , follower_id ) values (83, 27);
insert into followers (user_id , follower_id ) values (5, 26);
insert into followers (user_id , follower_id ) values (21, 48);
insert into followers (user_id , follower_id ) values (18, 66);
insert into followers (user_id , follower_id ) values (51, 24);
insert into followers (user_id , follower_id ) values (14, 83);
insert into followers (user_id , follower_id ) values (84, 56);
insert into followers (user_id , follower_id ) values (22, 34);
insert into followers (user_id , follower_id ) values (42, 3);
insert into followers (user_id , follower_id ) values (58, 48);
insert into followers (user_id , follower_id ) values (19, 3);
insert into followers (user_id , follower_id ) values (46, 4);
insert into followers (user_id , follower_id ) values (9, 14);
insert into followers (user_id , follower_id ) values (99, 104);
insert into followers (user_id , follower_id ) values (19, 16);
insert into followers (user_id , follower_id ) values (1, 90);
insert into followers (user_id , follower_id ) values (77, 42);
insert into followers (user_id , follower_id ) values (21, 37);
insert into followers (user_id , follower_id ) values (73, 91);
insert into followers (user_id , follower_id ) values (100, 5);
insert into followers (user_id , follower_id ) values (24, 2);
insert into followers (user_id , follower_id ) values (76, 6);



insert into following (user_id , following_id) values (62, 9);
insert into following (user_id , following_id) values (9, 99);
insert into following (user_id , following_id) values (70, 6);
insert into following (user_id , following_id) values (33, 91);
insert into following (user_id , following_id) values (30, 97);
insert into following (user_id , following_id) values (11, 75);
insert into following (user_id , following_id) values (61, 104);
insert into following (user_id , following_id) values (83, 19);
insert into following (user_id , following_id) values (72, 77);
insert into following (user_id , following_id) values (41, 27);
insert into following (user_id , following_id) values (104, 30);
insert into following (user_id , following_id) values (44, 1);
insert into following (user_id , following_id) values (83, 69);
insert into following (user_id , following_id) values (11, 73);
insert into following (user_id , following_id) values (62, 14);
insert into following (user_id , following_id) values (17, 20);
insert into following (user_id , following_id) values (91, 52);
insert into following (user_id , following_id) values (55, 93);
insert into following (user_id , following_id) values (90, 58);
insert into following (user_id , following_id) values (51, 42);
insert into following (user_id , following_id) values (48, 49);
insert into following (user_id , following_id) values (29, 58);
insert into following (user_id , following_id) values (98, 18);
insert into following (user_id , following_id) values (22, 95);
insert into following (user_id , following_id) values (43, 8);
insert into following (user_id , following_id) values (30, 95);
insert into following (user_id , following_id) values (50, 76);
insert into following (user_id , following_id) values (9, 82);
insert into following (user_id , following_id) values (7, 22);
insert into following (user_id , following_id) values (91, 31);
insert into following (user_id , following_id) values (88, 52);
insert into following (user_id , following_id) values (81, 55);
insert into following (user_id , following_id) values (96, 98);
insert into following (user_id , following_id) values (88, 18);
insert into following (user_id , following_id) values (68, 36);
insert into following (user_id , following_id) values (41, 86);
insert into following (user_id , following_id) values (25, 95);
insert into following (user_id , following_id) values (37, 78);
insert into following (user_id , following_id) values (90, 2);
insert into following (user_id , following_id) values (64, 62);
insert into following (user_id , following_id) values (34, 40);
insert into following (user_id , following_id) values (71, 95);
insert into following (user_id , following_id) values (28, 38);
insert into following (user_id , following_id) values (65, 89);
insert into following (user_id , following_id) values (1, 100);
insert into following (user_id , following_id) values (48, 11);
insert into following (user_id , following_id) values (47, 66);
insert into following (user_id , following_id) values (65, 23);
insert into following (user_id , following_id) values (87, 92);
insert into following (user_id , following_id) values (86, 7);
insert into following (user_id , following_id) values (55, 24);
insert into following (user_id , following_id) values (71, 74);
insert into following (user_id , following_id) values (104, 96);
insert into following (user_id , following_id) values (55, 6);
insert into following (user_id , following_id) values (92, 8);
insert into following (user_id , following_id) values (68, 61);
insert into following (user_id , following_id) values (63, 30);
insert into following (user_id , following_id) values (24, 86);
insert into following (user_id , following_id) values (54, 60);
insert into following (user_id , following_id) values (31, 93);
insert into following (user_id , following_id) values (102, 37);
insert into following (user_id , following_id) values (103, 64);
insert into following (user_id , following_id) values (68, 73);
insert into following (user_id , following_id) values (37, 91);
insert into following (user_id , following_id) values (74, 103);
insert into following (user_id , following_id) values (77, 63);
insert into following (user_id , following_id) values (82, 13);
insert into following (user_id , following_id) values (34, 69);
insert into following (user_id , following_id) values (12, 44);
insert into following (user_id , following_id) values (71, 78);
insert into following (user_id , following_id) values (96, 78);
insert into following (user_id , following_id) values (6, 101);
insert into following (user_id , following_id) values (7, 25);
insert into following (user_id , following_id) values (102, 26);
insert into following (user_id , following_id) values (81, 65);
insert into following (user_id , following_id) values (101, 22);
insert into following (user_id , following_id) values (30, 76);
insert into following (user_id , following_id) values (58, 16);
insert into following (user_id , following_id) values (93, 51);
insert into following (user_id , following_id) values (17, 14);
insert into following (user_id , following_id) values (26, 86);
insert into following (user_id , following_id) values (57, 94);
insert into following (user_id , following_id) values (41, 79);
insert into following (user_id , following_id) values (99, 57);
insert into following (user_id , following_id) values (64, 57);
insert into following (user_id , following_id) values (48, 64);
insert into following (user_id , following_id) values (5, 61);
insert into following (user_id , following_id) values (101, 34);
insert into following (user_id , following_id) values (77, 55);
insert into following (user_id , following_id) values (73, 36);
insert into following (user_id , following_id) values (32, 7);
insert into following (user_id , following_id) values (55, 87);
insert into following (user_id , following_id) values (71, 66);
insert into following (user_id , following_id) values (30, 54);
insert into following (user_id , following_id) values (12, 3);
insert into following (user_id , following_id) values (39, 37);
insert into following (user_id , following_id) values (102, 92);
insert into following (user_id , following_id) values (68, 59);
insert into following (user_id , following_id) values (33, 82);
insert into following (user_id , following_id) values (43, 18);



insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id) values (0, 'Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.', '2024-10-22 22:48:46', 0, false, 69);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id) values (0, 'Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.', '2024-05-15 03:59:08', 0, false, 43);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id) values (0, 'Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.', '2024-05-23 05:15:13', 0, false, 5);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id) values (0, 'In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.', '2024-04-26 16:40:20', 0, false, 45);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id) values (0, 'Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.', '2024-05-18 14:49:58', 0, false, 74);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id) values (0, 'Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit.', '2024-07-31 20:36:03', 0, false, 35);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id) values (0, 'Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.', '2024-08-14 02:53:10', 0, false, 4);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id) values (0, 'Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.', '2024-08-12 05:03:22', 0, false, 32);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id) values (0, 'Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.', '2024-10-24 14:25:34', 0, false, 23);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id) values (0, 'Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.', '2024-10-28 19:57:15', 0, false, 104);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id) values (0, 'Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.', '2024-03-23 00:29:20', 0, false, 12);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id) values (0, 'Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.', '2024-03-26 17:09:49', 0, false, 52);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id) values (0, 'Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.', '2024-09-01 05:42:28', 0, false, 69);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id) values (0, 'Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.', '2024-10-16 16:12:32', 0, false, 44);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id) values (0, 'Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.', '2024-10-17 12:45:54', 0, false, 89);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id) values (0, 'Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.', '2024-07-29 09:38:43', 0, false, 82);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id) values (0, 'Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.', '2024-10-09 14:23:21', 0, false, 80);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id) values (0, 'Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.', '2024-08-30 15:41:39', 0, false, 42);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id) values (0, 'Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.', '2024-03-24 15:00:56', 0, false, 74);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id) values (0, 'Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.', '2024-03-23 05:30:41', 0, false, 90);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id) values (0, 'Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.', '2024-09-03 20:29:01', 0, false, 2);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id) values (0, 'Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.', '2024-09-05 00:11:09', 0, false, 9);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id) values (0, 'Sed ante. Vivamus tortor. Duis mattis egestas metus.', '2024-06-21 09:13:43', 0, false, 70);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id) values (0, 'Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.', '2024-07-15 23:17:28', 0, false, 49);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id) values (0, 'Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.', '2024-05-16 01:03:51', 0, false, 95);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id) values (0, 'Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.', '2024-10-18 02:41:34', 0, false, 62);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id) values (0, 'Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.', '2024-06-28 02:26:08', 0, false, 42);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id) values (0, 'Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.', '2024-08-01 17:44:49', 0, false, 78);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id) values (0, 'Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.', '2024-10-22 02:30:48', 0, false, 4);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id) values (0, 'Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.', '2024-08-16 19:25:36', 0, false, 85);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id) values (0, 'Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.', '2024-07-09 04:39:49', 0, false, 26);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id) values (0, 'Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.', '2024-05-31 03:51:39', 0, false, 36);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id) values (0, 'Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.', '2024-09-12 02:25:33', 0, false, 14);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id) values (0, 'Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.', '2024-07-05 11:14:05', 0, false, 10);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id) values (0, 'Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.', '2024-10-16 15:35:17', 0, false, 79);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id) values (0, 'Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.', '2024-09-24 23:44:25', 0, false, 89);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id) values (0, 'Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.', '2024-08-06 07:43:24', 0, false, 81);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id) values (0, 'Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.', '2024-08-02 10:14:20', 0, false, 66);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id) values (0, 'In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.', '2024-08-22 08:11:12', 0, false, 25);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id) values (0, 'Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.', '2024-09-17 05:51:31', 0, false, 2);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id) values (0, 'Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.', '2024-09-02 04:26:23', 0, false, 23);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id) values (0, 'Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.', '2024-06-10 00:59:36', 0, false, 63);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id) values (0, 'Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.', '2024-03-25 08:27:44', 0, false, 17);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id) values (0, 'Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.', '2024-06-07 08:13:39', 0, false, 10);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id) values (0, 'In congue. Etiam justo. Etiam pretium iaculis justo.', '2024-10-12 23:11:47', 0, false, 87);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id) values (0, 'Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.', '2024-09-23 04:24:13', 0, false, 38);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id) values (0, 'Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.', '2024-08-19 17:05:18', 0, false, 26);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id) values (0, 'Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.', '2024-07-03 06:30:52', 0, false, 62);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id) values (0, 'Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.', '2024-07-30 22:56:51', 0, false, 37);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id) values (0, 'Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.', '2024-08-31 02:21:17', 0, false, 54);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id) values (0, 'Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.', '2024-10-28 04:24:14', 0, false, 22);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id) values (0, 'Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.', '2024-06-24 05:58:54', 0, false, 80);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id) values (0, 'In congue. Etiam justo. Etiam pretium iaculis justo.', '2024-06-26 04:15:22', 0, false, 69);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id) values (0, 'Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.', '2024-05-23 15:19:45', 0, false, 46);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id) values (0, 'In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.', '2024-10-22 12:35:10', 0, false, 48);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id) values (0, 'Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.', '2024-06-14 04:30:47', 0, false, 74);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id) values (0, 'In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.', '2024-07-01 18:28:29', 0, false, 92);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id) values (0, 'Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.', '2024-04-12 14:46:53', 0, false, 34);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id) values (0, 'Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis', '2024-05-17 00:19:49', 0, false, 78);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id) values (0, 'In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.', '2024-08-12 10:13:02', 0, false, 14);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id) values (0, 'Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.', '2024-06-28 22:09:36', 0, false, 35);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id) values (0, 'Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.', '2024-07-06 01:46:34', 0, false, 76);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id) values (0, 'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.', '2024-03-26 23:38:19', 0, false, 26);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id) values (0, 'In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.', '2024-04-07 10:32:50', 0, false, 45);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id) values (0, 'In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.', '2024-04-08 18:50:45', 0, false, 16);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id) values (0, 'Phasellus in felis. Donec semper sapien a libero. Nam dui.', '2024-04-08 15:23:54', 0, false, 58);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id) values (0, 'Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.', '2024-03-21 21:20:22', 0, false, 45);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id) values (0, 'Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.', '2024-10-10 07:22:49', 0, false, 96);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id) values (0, 'Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.', '2024-04-22 15:24:30', 0, false, 26);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id) values (0, 'Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.', '2024-10-05 16:37:40', 0, false, 76);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id) values (0, 'Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.', '2024-09-01 03:33:45', 0, false, 7);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id) values (0, 'Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.', '2024-10-30 12:34:08', 0, false, 36);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id) values (0, 'Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.', '2024-04-27 13:31:03', 0, false, 1);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id) values (0, 'Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.', '2024-06-15 09:01:10', 0, false, 25);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id) values (0, 'Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.', '2024-04-07 06:52:08', 0, false, 97);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id) values (0, 'Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.', '2024-03-21 16:03:42', 0, false, 19);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id) values (0, 'Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.', '2024-05-03 14:06:04', 0, false, 96);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id) values (0, 'Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.', '2024-04-15 17:02:26', 0, false, 77);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id) values (0, 'Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.', '2024-07-30 08:51:07', 0, false, 37);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id) values (0, 'Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.', '2024-07-18 15:32:58', 0, false, 54);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id) values (0, 'Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.', '2024-07-21 15:32:07', 0, false, 73);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id) values (0, 'Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.', '2024-08-22 09:44:16', 0, false, 66);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id) values (0, 'Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.', '2024-06-14 22:41:37', 0, false, 22);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id) values (0, 'Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.', '2024-03-18 08:36:41', 0, false, 17);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id) values (0, 'Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.', '2024-04-02 03:15:24', 0, false, 5);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id) values (0, 'Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.', '2024-09-13 04:11:40', 0, false, 32);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id) values (0, 'Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.', '2024-06-15 17:57:13', 0, false, 9);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id) values (0, 'Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.', '2024-05-10 04:22:49', 0, false, 10);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id) values (0, 'Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.', '2024-07-11 13:20:04', 0, false, 29);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id) values (0, 'Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.', '2024-07-25 08:14:51', 0, false, 65);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id) values (0, 'Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.', '2024-05-10 05:30:58', 0, false, 23);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id) values (0, 'Fusce consequat. Nulla nisl. Nunc nisl.', '2024-07-27 02:09:43', 0, false, 39);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id) values (0, 'In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.', '2024-03-21 11:32:05', 0, false, 27);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id) values (0, 'Phasellus in felis. Donec semper sapien a libero. Nam dui.', '2024-07-09 18:06:02', 0, false, 101);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id) values (0, 'Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.', '2024-04-08 17:52:34', 0, false, 30);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id) values (0, 'Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.', '2024-08-21 22:12:22', 0, false, 34);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id) values (0, 'Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.', '2024-06-30 22:11:53', 0, false, 61);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id) values (0, 'Curabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.', '2024-09-23 18:39:54', 0, false, 10);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id) values (0, 'Sed ante. Vivamus tortor. Duis mattis egestas metus.', '2024-08-01 01:38:08', 0, false, 9);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id) values (0, 'Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.', '2024-04-08 13:58:27', 0, false, 38);



