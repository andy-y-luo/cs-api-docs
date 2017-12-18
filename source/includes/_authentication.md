# Authentication

## Retrieve Authorization Token

> Returns Authorization Token in following JSON response:

```json
{
    "data": {
        "id": "2017-12-17T20:02:22.049-05:00",
        "type": "token",
        "attributes": {
            "access_token": "eyJ0eXAiOiJKV1QiLCJhbGci...",
            "token_type": "Bearer",
            "expires_in": "1440"
        }
    }
}
```

The CrowdShout API requires an Authorization Token in requests that access protected or
user-specific content/endpoints. For a mobile client to use the majority of the API, it must first
acquire this Authorization Token through an authentication process. The returned token is
user-specific and time-sensitive.

### HTTP Request
`POST http://api.crowdshout.tech/authenticate`

### Query Parameters

Key | Description | Required?
- | - | -
email | the email address of the user to be authenticated | Yes
password | the text password of the user to be authenticated | Yes
expires_in | the desired expiration of the token (in minutes) | No

The maximum `expires_in` allowed by the API is `2880`. If a larger duration is requested, the generated
token will have a `expires_in` of `2880`. If the `expires_in` parameter is empty or omitted, the API will
default to `1440`.

### Query Response
The value keyed by `"id"` holds a timestamp of when the token was generated

<aside class="success">
The API will return appropriate error responses should request fail!
</aside>

Store the Authorization Token locally (and securely).
