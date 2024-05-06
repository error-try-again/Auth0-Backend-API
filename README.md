```bash
/bin/sh -c 'if [ -d Auth0-Backend-API ]; then rm -rf Auth0-Backend-API; fi && git clone https://github.com/error-try-again/Auth0-Backend-API.git; cd Auth0-Backend-API && echo 'DEV_PORT=4041' >> .env && echo 'PROD_PORT=4040' >> .env && npm install && ts-node src/server.ts "
```