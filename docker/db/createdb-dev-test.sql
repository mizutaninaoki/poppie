CREATE role poppieuser login password 'poppiedb';
CREATE DATABASE poppie_development encoding 'UTF8' owner poppieuser;
CREATE DATABASE poppie_test encoding 'UTF8' owner poppieuser;
ALTER role poppieuser createdb;
ALTER role poppieuser SET timezone TO 'Asia/Tokyo';
GRANT ALL privileges on database poppie_development to poppieuser;
GRANT ALL privileges on database poppie_test to poppieuser;
