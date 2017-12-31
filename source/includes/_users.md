# Users
Users are the core of the platform, and can post Shouts, create Echoes of Shouts, and perform other interactions with social content. Each `User` corresponds to a user account, and can be accessed from any client. Users can additionally block other `User`s' Shouts from appearing in his/her feed. Users can't view content that they are not authorized to view such as other `User`s' personal information or detailed analytics about Shouts/Echoes that they have not made or been involved in.



## Creating User
> Upon successful creation, the API will return the following response:

```json
HTTP/1.1 201 Created
Content-Type: application/vnd.api+json
{
    "data": {
        "id": "3",
        "type": "users",
        "attributes": {
            "first-name": "Shreyas",
            "last-name": "Radhakrishna",
            "username": "airdog",
            "email": "sar5744@psu.edu",
            "birthday": "1986-03-28"
        },
        "relationships": {
            "shout-contents": {
                "data": []
            }
        }
    }
}
```

> If an error is encountered at any point while servicing the request, the API will respond with the following structure:

```json
HTTP/1.1 400 Bad Request
Content-Type: application/vnd.api+json
{
    "errors": [
        {
            "status": "400",
            "code": "2",
            "title": "First name empty error",
            "detail": "The provided user first_name is empty.",
            "source": {
                "pointer": "/data/attributes/first_name"
            }
        }
    ]
}
```

Creates a new User with the provided personal information and login credentials.

### HTTP Request
`POST http://api.crowdshout.tech/users`

### Headers
This request does not require a `User` Bearer Token, since the User has not yet been created, and therefore does not require the `Authentication-Token` header.

### Request Parameters
Name | Required | Description
 - | - | -
 first_name | Yes | the first name of the user
 last_name | Yes | the last name of the user
 username | Yes | the display name of the user
 email | Yes | the user's email address used for confirmation and periodic updates
 birthday | Yes | the birthday of the user, for age confirmation
 password | Yes | the chosen password for Authentication
 password_confirmation | Yes | must match `password` for request to succeed

#### First and Last Name Requirements
The first and last names must each be under 50 characters in length.

#### Username Requirements
The username must be between 5 and 30 characters, inclusive. The backend will validate the username for uniqueness.

#### Password Requirements
The password must be:

* between 8 and 72 characters

* contain at least 1 uppercase letter

* contain at least 1 number

#### Email Address
The email address must be a unique, accessible address that is shared by no other user accounts. Once once an account has been created, the associated email address cannot be changed. This ensures that each user account is tied to a unique email address.

#### Birthday Formatting
Please format the birthday string as `YYYY-MM-DD`.

### Errors
#### First Name Errors
Code | Title | Detail | Source | Status (HTTP)
- | - | - | - | -
200 | Empty attribute error | The provided first name is empty. | /data/attributes/first_name | 400
201 | Invalid attribute length error | The provided first name exceeds maximum length (50 characters). | /data/attributes/first_name | 400

#### Last Name Errors
Code | Title | Detail | Source | Status (HTTP)
- | - | - | - | -
202 | Empty attribute error | The provided last name is empty. | /data/attributes/last_name | 400
203 | Invalid attribute length error | The provided last name exceeds maximum length (50 characters). | /data/attributes/last_name | 400

#### Email Errors
Code | Title | Detail | Source | Status (HTTP)
- | - | - | - | -
204 | Empty attribute error | The provided email is empty. | /data/attributes/email | 400
205 | Invalid attribute error | The provided email is not valid. | /data/attributes/email | 400
206 | Non-unique attribute error | The provided email is already associated with a user. | /data/attributes/email | 400
207 | Invalid attribute length error | The provided email exceeds maximum length (255 characters). | /data/attributes/email | 400

#### Username Errors
Code | Title | Detail | Source | Status (HTTP)
- | - | - | - | -
208 | Empty attribute error | The provided username is empty. | /data/attributes/username | 400
209 | Invalid attribute length error | The provided username exceeds maximum length (30 characters). | /data/attributes/username | 400
xxx | Invalid attribute length error | The provided username is shorter than minimum length (5 characters). | /data/attributes/username | 400
210 | Non-unique attribute error | The provided username is already associated with a user. | /data/attributes/username | 400

#### Birthday Errors
Code | Title | Detail | Source | Status (HTTP)
- | - | - | - | -
211 | Empty attribute error | The provided birthday is empty. | /data/attributes/birthday | 400
212 | Invalid attribute format error | The provided birthday is incorrectly formatted. | /data/attributes/birthday | 400
213 | Implausible attribute error | The provided birthday is wildly implausible | /data/attributes/birthday | 400

#### Password Errors
Code | Title | Detail | Source | Status (HTTP)
- | - | - | - | -
xx | Empty attribute error | The provided password is empty. | /data/attributes/password | 400
xx | Empty attribute error | The provided password confirmation is empty. | /data/attributes/password_confirmation | 400
xx | Invalid attribute error | The provided password/password confirmation does not meet the password requirements (must contain uppercase and digit(s)). | /data/attributes/password | 400
xx | Attribute confirmation mismatch error | The password confirmation does not match the provided password. | /data/attributes/password_confirmation | 400
xx | Invalid attribute length error | The provided password is shorter than the minimum length (8 characters). | /data/attributes/password | 400
xx | Invalid attribute length error | The provided password confirmation is shorter than the minimum length (8 characters). | /data/attributes/password_confirmation | 400
xx | Invalid attribute length error | The provided password exceeds the maximum length (72 characters). | /data/attributes/password | 400
xx | Invalid attribute length error | The provided password confirmation exceeds the maximum length (72 characters). | /data/attributes/password_confirmation | 400

## Showing User
This request is for retrieving a single User provided by its UID, including the `ShoutContent`s (Shouts) that the user has made. In order to utilize this request, a valid `User` Bearer Token (does not have to correspond to the `User` to be retrieved, but must be authorized to view it) must be included.

<aside class="success">
Future versions of the API will only respond with a subset of the associated `ShoutContent`s, or pagination will be implemented.
</aside>

> If successful, the API will return the following response:

```json
HTTP/1.1 200 OK
Content-Type: application/vnd.api+json
{
    "data": {
        "id": "3",
        "type": "users",
        "attributes": {
            "first-name": "Shreyas",
            "last-name": "Radhakrishna",
            "username": "airdog",
            "email": "sar5744@psu.edu",
            "birthday": "1986-03-28"
        },
        "relationships": {
            "shout-contents": {
                "data": []
            }
        }
    }
}
```


### HTTP Request
`GET http://api.crowdshout.tech/users/:user_id`

Where `:user_id` is the UID of the `User` to be retrieved.

### Headers
Name | Required | Description
 - | - | -
 Authentication-Token | Yes | The valid bearer token acquired from `/authenticate` endpoint

### Request Parameters
This request does not require any query parameters.

### Errors
Code | Title | Detail | Source | Status (HTTP)
- | - | - | - | -
xx | User does not exist error | There is no User corresponding to the provided :user_id | user_id | 404
xx | User unauthorized error | The requester is not authorized to view this User | user_id | 403


## Updating User
Whenever information about a `User` needs to be changed, use this request. As of now, the only information that can't be changed is the email address and password. In order to use this request, you must have a valid `User` Bearer Token belonging the specific User you wish to update. This means that a user can only update his/her own `User` information.

> If successful, API will return the following response:

```json
HTTP/1.1 200 OK
Content-Type: application/vnd.api+json
{
    "data": {
        "id": "3",
        "type": "users",
        "attributes": {
            "first-name": "Shreyas",
            "last-name": "Radhakrishna",
            "username": "airdog123",
            "email": "sar5744@psu.edu",
            "birthday": "1986-03-28"
        },
        "relationships": {
            "shout-contents": {
                "data": []
            }
        }
    }
}

```

### HTTP Request
`PUT http://api.corwdshout.tech/users/:user_id`

Where `:user_id` is the UID of the `User` to be updated.

### Headers
Name | Required | Description
 - | - | -
 Authentication-Token | Yes | The valid bearer token for the `User` to be updated

### Request Parameters
Name | Required | Description
 - | - | -
 first_name | No | the first name of the user
 last_name | No | the last name of the user
 username | No | the display name of the user
 birthday | No | the birthday of the user, for age confirmation

You may choose to update one or more of the above `User` attributes.

#### Username Requirements
The username must be 30 characters or shorter. The backend will validate the username for uniqueness.

#### Password Requirements
The password must be:

* at least 8 characters

* at most 72 characters

* contain at least 1 uppercase letter

* contain at least 1 number

#### Birthday Formatting
Please format the birthday string as `YYYY-MM-DD`.

### Errors
For attribute validations, refer to the error tables of the Creating User section. Refer to the following to ables for errors specific to updating `User` attributes.

Code | Title | Detail | Source | Status (HTTP)
- | - | - | - | -
xx | User does not exist error | There is no `User` corresponding to the provided :user_id | user_id | 404
xx | User unauthorized error | The Bearer token is not authorized to update this `User` | user_id | 403

## Destroying User
> Upon successful completion, the API responds with an empty body

```json
HTTP/1.1 204 No Content
Content-Type: application/vnd.api+json
```

This request removes all records of the `User` and in essence terminates the user account. Whenever this request is used, the `ShoutContent`s (Shouts) and `ShoutBeacon`s (Echoes) produced by the `User` will also be deleted. Use caution when utilizing this request, as there is no way to reverse the deletion of a `User`.

### HTTP Request
`DELETE http://api.corwdshout.tech/users/:user_id`

Where `:user_id` is the UID of the `User` to be deleted.

### Errors
Code | Title | Detail | Source | Status (HTTP)
- | - | - | - | -
xx | Resource does not exist error | There is no `User` corresponding to the provided :user_id | user_id | 404
xx | User unauthorized error | The requester is not authorized to delete this `User` | user_id | 403

## Authentication-Token
### Errors
Code | Title | Detail | Source | Status (HTTP)
- | - | - | - | -
xx | Expired token error | The provided Bearer token has expired. | Authentication-Token | 401
xx | Missing header error | The Authentication-Token header is missing. | Authentication-Token | 400
xx | User not found error | The Bearer token does not correspond to a user. | Authentication-Token | 401
xx | Decoding error | The provided Bearer token could not be decoded. | Authentication-Token | 500
