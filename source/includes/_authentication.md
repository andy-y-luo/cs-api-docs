# Authentication

## Retrieve Authorization Token

> Request body:

```json
{
  "data": {
    "type": "user-credentials",
    "attributes": {
      "email": "ayl5429@psu.edu",
      "password": "Hello123!",
      "expires-in": 1440
    }
  }
}
```


> Returns Authorization Token in following JSON response:

```json
{
    "data": {
        "id": "2017-12-17T20:02:22.049-05:00",
        "type": "token",
        "attributes": {
            "access-token": "eyJ0eXAiOiJKV1QiLCJhbGci...",
            "user-id": "5",
            "token-type": "bearer",
            "expires-in": 1440
        }
    }
}
```

The CrowdShout API requires an Authorization Token in requests that access protected or
user-specific content/endpoints. For a mobile client to use the majority of the API, it must first
acquire this Authorization Token through this authentication process. The returned token is
user-specific and time-sensitive, granting the bearer of the token access to authorized resources before the token's expiration.

### HTTP Request
`POST http://api.crowdshout.tech/authenticate`

### Request Parameters

Name | Required | Description
- | - | -
email | Yes | the email address of the user to be authenticated
password | Yes | the text password of the user to be authenticated
expires_in | No | the desired expiration of the token (in minutes)

The maximum `expires_in` allowed by the API is `2880`. If a larger duration is requested, the generated
token will have a `expires_in` of `2880`. If the `expires_in` parameter is empty or omitted, the API will
default to `1440`.

### Query Response
The value keyed by `"id"` holds a timestamp of when the token was generated. The token itself is the value keyed by `access_token`. The `user_id` corresponds to the UID of the authenticated `User` and should be saved for subsequent requests.

### Errors
#### Email Errors
Code | Title | Detail | Source | Status (HTTP)
- | - | - | - | -
xx | Empty parameter error | The provided email is empty. | email | 400
xx | Non-existent parameter error | The email parameter is non-existent. | email | 400
xx | Not found error | The provided email does not correspond to a 'User'. | email | 400

#### Password Errors
Code | Title | Detail | Source | Status (HTTP)
- | - | - | - | -
xx | Empty parameter error | The provided password is empty. | password | 400
xx | Non-existent parameter error | The password parameter is non-existent. | password | 400
xx | Incorrect parameter value error | The provided password is incorrect for provided email. | password | 400

<aside class="success">
Store the Authorization Token locally (and securely).
</aside>
