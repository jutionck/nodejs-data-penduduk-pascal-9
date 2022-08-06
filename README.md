## Data Penduduk

### Database & Table
```sql
create database db_population;

create table if not exists province (
	id varchar(5) primary key,
	name varchar(50),
	created_at timestamp,
	updated_at timestamp
);

create table if not exists regency (
	id varchar(5) primary key,
	name varchar(50),
	province_id varchar(5),
	created_at timestamp,
	updated_at timestamp,
	foreign key (province_id) references province(id)
);

create table if not exists district (
	id varchar(5) primary key,
	name varchar(50),
	regency_id varchar(5),
	created_at timestamp,
	updated_at timestamp,
	foreign key (regency_id) references regency(id)
);

create table if not exists people (
	id varchar(5) primary key,
	nik varchar(16),
	name varchar(50),
	gender varchar(1),
	dob date,
	pob varchar(35),
	province_id varchar(5),
	regency_id varchar(5),
	district_id varchar(5),
	created_at timestamp,
	updated_at timestamp,
	foreign key (province_id) references province(id),
	foreign key (regency_id) references regency(id),
	foreign key (district_id) references district(id)
);
```
