
# Auth0-Backend-API

This project is a simple express server that provides a minimal backend for my react-native project. It is used to isolate sensitive calls to the Auth0 Management API from the frontend.

## Installation

Populate the .env

```bash
AUTH0_AUDIENCE
AUTH0_MANAGEMENT_AUDIENCE
AUTH0_ISSUER
AUTH0_GRANT_TYPE
TOKEN_SIGNING_ALG
AUTH0_CLIENT_ID
AUTH0_CLIENT_SECRET
AUTH0_DOMAIN
PORT
USE_SSL
DOMAIN
ORIGIN
AUTH0_ACCESS_TOKEN
```

Install the dependencies and start the server.

```bash
 npm install && npx ts-node src/server.ts
```

## Test API calls

```bash
  curl -k -X GET "https://localhost:8082/list_users" \
     -H "Authorization: Bearer my_access_token" \
     -H "Content-Type: application/json"
```

## Client

Correctly initialize the Auth0 client with the correct audience and scope.


```javascript
  const {authorize} = useAuth0();

  const login = useCallback(async () => {
    try {
      await authorize({
        audience: 'your-auth0-audience',
        scope: 'openid profile email',
      });
    } catch {
      // console.log('could not log in', error);
    }
  }, [authorize]);
```


## License
[MIT](https://choosealicense.com/licenses/mit/)