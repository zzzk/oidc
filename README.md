# oidc
openid connect server and client setup with the aim to do extensive iam checks for developers.


start keycloak with the docker-compose:
```
docker-compose up -d
````
* login on localhost:8087
* create a test realm
* configure the test realm:
 ** create a test client
 ** Root & Home URL: http://localhost:8000
 ** validate rdirect URLs: http://localhost:8000/*
 ** web-origins: http://localhost:8000
 ** create a test user (and set it's password)

start the client app:
```
cd kc-materia/ch4
npm start dev
```

start your tests on localhost:8000
* Issuer: http://localhost:8087/realms/test



