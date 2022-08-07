## Data Penduduk With Native HTTP NodeJS

### Install
```
npm install
```
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

### API Spec
- Port: `8181`
#### Province
- Request: `POST`
- Endpoint: `/province`
- Body
```json
{
    "id": "03",
    "name": "Sumatera Utara"
}
```
- Response:
```json
{
    "code": 200,
    "message": "SUCCESS",
    "data": {
        "id": "04",
        "name": "Sumatera Barat",
        "createdAt": "2022-08-06T21:47:20.717Z",
        "updatedAt": null
    }
}
```
- Request: `GET`
- Endpoint: `/provinve`
- Response:
```json
{
    "code": 200,
    "message": "SUCCESS",
    "data": [
        {
            "id": "03",
            "name": "Sumatera Utara",
            "createdAt": "2022-08-06T17:47:40.240Z",
            "updatedAt": "2022-08-06T18:16:17.022Z"
        },
        {
            "id": "01",
            "name": "Aceh",
            "createdAt": "2022-08-06T17:47:18.092Z",
            "updatedAt": null
        }
    ]
}
 ```
- Request: `GET`
- Endpoint: `/provinve/03`
- Response:
```json
{
    "code": 200,
    "message": "SUCCESS",
    "data": {
      "id": "03", 
      "name": "Sumatera Utara",
      "createdAt": "2022-08-06T17:47:40.240Z",
      "updatedAt": "2022-08-06T18:16:17.022Z"
    }
}
 ```
- Request: `PUT`
- Endpoint: `/province`
- Body
```json
{
    "id": "03",
    "name": "Sumatera Utara"
}
```
- Response:
```json
{
    "code": 200,
    "message": "SUCCESS",
    "data": {
        "id": "04",
        "name": "Sumatera Barat",
        "createdAt": "2022-08-06T21:47:20.717Z",
        "updatedAt": null
    }
}
```

- Request: `DELETE`
- Endpoint: `/provinve/02`
- Response:
```json
{
    "code": 200,
    "message": "SUCCESS",
    "data": "Province ID with value 02 deleted success"
}
 ```
#### Regency
- Request: `POST`
- Endpoint: `/regency`
- Body
```json
{
  "id": "02",
  "name": "Batu Bara",
  "provinceId": "03"
}
```
- Response:
```json
{
  "code": 200,
  "message": "SUCCESS",
  "data": {
    "id": "03",
    "name": "Batu Bara 2",
    "province": {
      "id": "03",
      "name": "Sumatera Utara",
      "createdAt": "2022-08-06T17:47:40.240Z",
      "updatedAt": "2022-08-06T18:16:17.022Z"
    },
    "createdAt": "2022-08-07T01:49:56.014Z",
    "updatedAt": null
  }
}
```
- Request: `GET`
- Endpoint: `/regency`
- Response:
```json
{
  "code": 200,
  "message": "SUCCESS",
  "data": [
    {
      "id": "03",
      "name": "Batu Bara 2",
      "province": {
        "id": "03",
        "name": "Sumatera Utara",
        "createdAt": "2022-08-06T17:47:40.240Z",
        "updatedAt": "2022-08-06T18:16:17.022Z"
      },
      "createdAt": "2022-08-07T01:49:56.014Z",
      "updatedAt": null
    },
    {
      "id": "02",
      "name": "Deli Serdang",
      "province": {
        "id": "03",
        "name": "Sumatera Utara",
        "createdAt": "2022-08-06T17:47:40.240Z",
        "updatedAt": "2022-08-06T18:16:17.022Z"
      },
      "createdAt": "2022-08-06T19:41:50.476Z",
      "updatedAt": null
    },
    {
      "id": "01",
      "name": "Batu Bara",
      "province": {
        "id": "03",
        "name": "Sumatera Utara",
        "createdAt": "2022-08-06T17:47:40.240Z",
        "updatedAt": "2022-08-06T18:16:17.022Z"
      },
      "createdAt": "2022-08-06T18:59:31.293Z",
      "updatedAt": "2022-08-06T19:24:22.073Z"
    }
  ]
}
 ```
- Request: `GET`
- Endpoint: `/regency/03`
- Response:
```json
{
  "code": 200,
  "message": "SUCCESS",
  "data": {
    "id": "02",
    "name": "Deli Serdang",
    "province": {
      "id": "03",
      "name": "Sumatera Utara",
      "createdAt": "2022-08-06T17:47:40.240Z",
      "updatedAt": "2022-08-06T18:16:17.022Z"
    },
    "createdAt": "2022-08-06T19:41:50.476Z",
    "updatedAt": null
  }
}
 ```
- Request: `PUT`
- Endpoint: `/province`
- Body
```json
{
  "id": "01",
  "name": "Batu Bara",
  "provinceId": "03"
}
```
- Response:
```json
{
  "code": 200,
  "message": "SUCCESS",
  "data": {
    "id": "01",
    "name": "Batu Bara",
    "province": {
      "id": "03",
      "name": "Sumatera Utara",
      "createdAt": "2022-08-06T17:47:40.240Z",
      "updatedAt": "2022-08-06T18:16:17.022Z"
    },
    "createdAt": "2022-08-06T18:59:31.293Z",
    "updatedAt": "2022-08-07T01:51:05.828Z"
  }
}
```

- Request: `DELETE`
- Endpoint: `/regency/02`
- Response:
```json
{
  "code": 200,
  "message": "SUCCESS",
  "data": "Regency with ID 02 deleted success"
}
 ```
#### District
- Request: `POST`
- Endpoint: `/district`
- Body
```json
{
  "id": "01",
  "name": "Datuk Tanah Datar",
  "regencyId": "01"
}
```
- Response:
```json
{
  "code": 200,
  "message": "SUCCESS",
  "data": {
    "id": "01",
    "name": "Datuk Tanah Datar",
    "regency": {
      "id": "01",
      "name": "Batu Bara",
      "province": {
        "id": "03",
        "name": "Sumatera Utara",
        "createdAt": "2022-08-06T17:47:40.240Z",
        "updatedAt": "2022-08-06T18:16:17.022Z"
      },
      "createdAt": "2022-08-06T18:59:31.293Z",
      "updatedAt": "2022-08-07T01:51:05.828Z"
    },
    "createdAt": "2022-08-07T01:52:52.088Z",
    "updatedAt": null
  }
}
```
- Request: `GET`
- Endpoint: `/district`
- Response:
```json
{
  "code": 200,
  "message": "SUCCESS",
  "data": [
    {
      "id": "01",
      "name": "Datuk Tanah Datar",
      "regency": {
        "id": "01",
        "name": "Batu Bara",
        "province": {
          "id": "03",
          "name": "Sumatera Utara",
          "createdAt": "2022-08-06T17:47:40.240Z",
          "updatedAt": "2022-08-06T18:16:17.022Z"
        },
        "createdAt": "2022-08-06T18:59:31.293Z",
        "updatedAt": "2022-08-07T01:51:05.828Z"
      },
      "createdAt": "2022-08-07T01:52:52.088Z",
      "updatedAt": null
    }
  ]
}
 ```
- Request: `GET`
- Endpoint: `/district/01`
- Response:
```json
{
  "code": 200,
  "message": "SUCCESS",
  "data": {
    "id": "01",
    "name": "Datuk Tanah Datar",
    "regency": {
      "id": "01",
      "name": "Batu Bara",
      "province": {
        "id": "03",
        "name": "Sumatera Utara",
        "createdAt": "2022-08-06T17:47:40.240Z",
        "updatedAt": "2022-08-06T18:16:17.022Z"
      },
      "createdAt": "2022-08-06T18:59:31.293Z",
      "updatedAt": "2022-08-07T01:51:05.828Z"
    },
    "createdAt": "2022-08-07T01:52:52.088Z",
    "updatedAt": null
  }
}
 ```
- Request: `PUT`
- Endpoint: `/district`
- Body
```json
{
  "id": "01",
  "name": "Datuk Lima Puluh",
  "regencyId": "01"
}
```
- Response:
```json
{
  "code": 200,
  "message": "SUCCESS",
  "data": {
    "id": "01",
    "name": "Datuk Lima Puluh",
    "regency": {
      "id": "01",
      "name": "Batu Bara",
      "province": {
        "id": "03",
        "name": "Sumatera Utara",
        "createdAt": "2022-08-06T17:47:40.240Z",
        "updatedAt": "2022-08-06T18:16:17.022Z"
      },
      "createdAt": "2022-08-06T18:59:31.293Z",
      "updatedAt": "2022-08-07T01:51:05.828Z"
    },
    "createdAt": "2022-08-07T01:52:52.088Z",
    "updatedAt": "2022-08-07T01:53:56.122Z"
  }
}
```

- Request: `DELETE`
- Endpoint: `/district/01`
- Response:
```json
{
  "code": 200,
  "message": "SUCCESS",
  "data": "District with ID 01 deleted success"
}
 ```
#### People
- Request: `POST`
- Endpoint: `/people`
- Body
```json
{
  "id": "P0001",
  "name": "Jution Candra Kirana",
  "gender": "Laki-laki",
  "dob": "1998-12-29",
  "pob": "Natar",
  "provinceId": "01",
  "regencyId": "01",
  "districtId": "01"
}
```
- Response:
```json
{
  "code": 200,
  "message": "SUCCESS",
  "data": {
    "id": "P0001",
    "nik": "0101012912984821",
    "name": "Jution Candra Kirana",
    "gender": "Laki-laki",
    "dob": "1998-12-29T07:00:00.000Z",
    "pob": "Natar",
    "province": {
      "id": "01",
      "name": "Aceh",
      "createdAt": "2022-08-06T17:47:18.092Z",
      "updatedAt": null
    },
    "regency": {
      "id": "01",
      "name": "Batu Bara",
      "province": {
        "id": "01",
        "name": "Aceh",
        "createdAt": "2022-08-06T17:47:18.092Z",
        "updatedAt": null
      },
      "createdAt": "2022-08-06T18:59:31.293Z",
      "updatedAt": "2022-08-07T01:51:05.828Z"
    },
    "district": {
      "id": "01",
      "name": "Datuk Tanah Datar",
      "regency": {
        "id": "01",
        "name": "Batu Bara",
        "province": {
          "id": "01",
          "name": "Aceh",
          "createdAt": "2022-08-06T17:47:18.092Z",
          "updatedAt": null
        },
        "createdAt": "2022-08-06T17:47:18.092Z",
        "updatedAt": null
      },
      "createdAt": "2022-08-07T01:57:51.063Z",
      "updatedAt": null
    },
    "createdAt": "2022-08-07T01:58:19.559Z",
    "updatedAt": null
  }
}
```
- Request: `GET`
- Endpoint: `/people`
- Response:
```json
{
  "code": 200,
  "message": "SUCCESS",
  "data": [
    {
      "id": "P0001",
      "name": "Jution Candra Kirana",
      "nik": "0101012912984821",
      "gender": "Laki-laki",
      "dob": "1998-12-29T07:00:00.000Z",
      "pob": "Natar",
      "province": {
        "id": "01",
        "name": "Aceh",
        "createdAt": "2022-08-06T17:47:18.092Z",
        "updatedAt": null
      },
      "regency": {
        "id": "01",
        "name": "Batu Bara",
        "province": {
          "id": "01",
          "name": "Aceh",
          "createdAt": "2022-08-06T17:47:18.092Z",
          "updatedAt": null
        },
        "createdAt": "2022-08-06T18:59:31.293Z",
        "updatedAt": "2022-08-07T01:51:05.828Z"
      },
      "district": {
        "id": "01",
        "name": "Batu Bara",
        "regency": {
          "id": "01",
          "name": "Batu Bara",
          "province": {
            "id": "01",
            "name": "Aceh",
            "createdAt": "2022-08-06T17:47:18.092Z",
            "updatedAt": null
          },
          "createdAt": "2022-08-06T18:59:31.293Z",
          "updatedAt": "2022-08-07T01:51:05.828Z"
        },
        "createdAt": "2022-08-07T01:57:51.063Z",
        "updatedAt": null
      },
      "createdAt": "2022-08-07T01:58:19.559Z",
      "updatedAt": null
    }
  ]
}
 ```
- Request: `GET`
- Endpoint: `/people/P0001`
- Response:
```json
{
  "code": 200,
  "message": "SUCCESS",
  "data": {
    "id": "P0001",
    "name": "Jution Candra Kirana",
    "nik": "0101012912984821",
    "gender": "Laki-laki",
    "dob": "1998-12-29T07:00:00.000Z",
    "pob": "Natar",
    "province": {
      "id": "01",
      "name": "Aceh",
      "createdAt": "2022-08-06T17:47:18.092Z",
      "updatedAt": null
    },
    "regency": {
      "id": "01",
      "name": "Batu Bara",
      "province": {
        "id": "01",
        "name": "Aceh",
        "createdAt": "2022-08-06T17:47:18.092Z",
        "updatedAt": null
      },
      "createdAt": "2022-08-06T18:59:31.293Z",
      "updatedAt": "2022-08-07T01:51:05.828Z"
    },
    "district": {
      "id": "01",
      "name": "Batu Bara",
      "regency": {
        "id": "01",
        "name": "Batu Bara",
        "province": {
          "id": "01",
          "name": "Aceh",
          "createdAt": "2022-08-06T17:47:18.092Z",
          "updatedAt": null
        },
        "createdAt": "2022-08-06T18:59:31.293Z",
        "updatedAt": "2022-08-07T01:51:05.828Z"
      },
      "createdAt": "2022-08-07T01:57:51.063Z",
      "updatedAt": null
    },
    "createdAt": "2022-08-07T01:58:19.559Z",
    "updatedAt": null
  }
}
 ```
- Request: `GET`
- Endpoint: `/people/nik/0101012912984821`
- Response:
```json
{
  "code": 200,
  "message": "SUCCESS",
  "data": {
    "id": "P0001",
    "name": "Jution Candra Kirana",
    "nik": "0101012912984821",
    "gender": "Laki-laki",
    "dob": "1998-12-29T07:00:00.000Z",
    "pob": "Natar",
    "province": {
      "id": "01",
      "name": "Aceh",
      "createdAt": "2022-08-06T17:47:18.092Z",
      "updatedAt": null
    },
    "regency": {
      "id": "01",
      "name": "Batu Bara",
      "province": {
        "id": "01",
        "name": "Aceh",
        "createdAt": "2022-08-06T17:47:18.092Z",
        "updatedAt": null
      },
      "createdAt": "2022-08-06T18:59:31.293Z",
      "updatedAt": "2022-08-07T01:51:05.828Z"
    },
    "district": {
      "id": "01",
      "name": "Batu Bara",
      "regency": {
        "id": "01",
        "name": "Batu Bara",
        "province": {
          "id": "01",
          "name": "Aceh",
          "createdAt": "2022-08-06T17:47:18.092Z",
          "updatedAt": null
        },
        "createdAt": "2022-08-06T18:59:31.293Z",
        "updatedAt": "2022-08-07T01:51:05.828Z"
      },
      "createdAt": "2022-08-07T01:57:51.063Z",
      "updatedAt": null
    },
    "createdAt": "2022-08-07T01:58:19.559Z",
    "updatedAt": null
  }
}
```

- Request: `DELETE`
- Endpoint: `/people/P0001`
- Response:
```json
{
  "code": 200,
  "message": "SUCCESS",
  "data": "People with ID P0001 deleted success"
}
 ```
