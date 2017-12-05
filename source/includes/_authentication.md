# Authentication

## Retrieve Authorization Token
> To obtain the user-specific and time-sensitive authorization token:

> Returns Authorization Token in following JSON response:

```json
{
  "auth_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1N..."
}
```

The CrowdShout API requires an Authorization Token in requests that access protected or
user-specific content/endpoints. For a mobile client to use the majority of the API, it must first
acquire this Authorization Token through an authentication process. The returned token is
user-specific and time-sensitive.

### HTTP Request
`POST http://api.crowdshout.tech/authenticate`

### Query Parameters

Key | Description
- | -
email | the email address of the user to be authenticated
password | the text password of the user to be authenticated

<aside class="success">
The API will return appropriate error responses should request fail!
</aside>

Store the Authorization Token locally (and securely).
