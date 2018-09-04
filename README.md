
Dependencies:
 - Node 8.4.0

- Install Foreman:
  ```bash
  $ npm install -g foreman
  ```

- Install ReDoc:
  ```bash
  $ redoc-cli
  ```

- Install json-refs:
  ```bash
  $ npm install -g json-refs
  ```

- Intsall staticrypt:
  ```bash
  $ npm install -g staticrypt
  ```

- Install project specific dependencies:
  ```bash
  $ npm i
  ```

- Ensure you have aws profiles and tokens configured:

- Build and deploy:
  ```bash
  $ ./s3deploy.sh [aws-profile]
  ```
  where `[aws-profile]` is the name of the aws-cli profile you have configured