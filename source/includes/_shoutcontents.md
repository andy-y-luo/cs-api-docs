# ShoutContents

The social content of a Shout is contained in a `ShoutContent` resource. Each Shout has strictly one `ShoutContent`, which in turn belongs to strictly one `User`. The title and text of a `ShoutContent` are displayed to the user whenever they browse Shouts. Any links, pointing to media or otherwise, will be embedded inline and as-is. Each `ShoutContent` has one or more `ShoutBeacon`s, which ground the Shout to geographic and temporal locations.
All 'Shout Contents' will pass through a content filter that will block inappropriate text or links, in addition to content that may severely jeopardize the privacy of the user.

## Showing ShoutContent
>Upon success, the API will return the following response:

```json
HTTP/1.1 200 OK
Content-Type: application/vnd.api+json; charset=utf-8
{
  "meta": {
    "user-echoed?": true
  },
  "data": {
    "id": "552",
    "type": "shout-contents",
    "attributes": {
      "title": "Hank",
      "text": "Only at the end do you realize the power of the Dark Side.",
      "echo-count": 0,
      "shout-view-count": 1,
      "expires-at": "2018-04-14T18:26:43.427Z",
      "created-at": "2018-04-14T02:01:43.431Z"

    },
    "relationships": {
      "shout-beacons": {
        "data": [
          {
            "id": "961",
            "type": "shout-beacons"
          }
        ]
      },
      "user": {
        "data": {
          "id": "1173",
          "type": "users"
        }
      }
    }
  },
  "included": [
    {
      "id": "1173",
      "type": "users",
      "attributes": {
        "username": "ArmandNoemyrox",
        "first-name": "Armand",
        "last-name": "Noemy"
      }
    }
  ]
}
```

> If an error is encountered at any point while servicing the request, the API will respond in the following manner:

```json

```

This request shows an individual `ShoutContent`, which does not have to belong to the user issuing the request.

### HTTP Request
`GET http://api.crowdshout.tech/shout_contents/:shout_content_id`

Where `:shout_content_id` is the UID of the `ShoutContent` to be returned.

### Headers
Name | Required | Description
 - | - | -
 Authentication-Token | Yes | The valid bearer token acquired from `/authenticate` endpoint

The token does not need to belong to the `User` who created the `ShoutContent`.

### Request Parameters
This request does not require any query parameters.

### Errors

## Listing ShoutContents (Index for User)
> Upon success, the API will return the following response:

```json
HTTP/1.1 200 OK
Content-Type: application/vnd.api+json; charset=utf-8
{
  "data": [
    {
      "id": "646",
      "type": "shout-contents",
      "attributes": {
        "title": "Isabel",
        "text": "Fear is the path to the dark side... fear leads to anger... anger leads to hate... hate leads to suffering.",
        "echo-count": 0,
        "shout-view-count": 0,
        "created-at": "2018-03-09T19:59:29.803Z"
      },
      "relationships": {
        "shout-beacons": {
          "data": [
            {
              "id": "1123",
              "type": "shout-beacons"
            }
          ]
        },
        "user": {
          "data": {
            "id": "1371",
            "type": "users"
          }
        }
      }
    },
    {
      "id": "647",
      "type": "shout-contents",
      "attributes": {
        "title": "Malika",
        "text": "You will never find a more wretched hive of scum and villainy. We must be cautious.",
        "echo-count": 0,
        "shout-view-count": 0,
        "created-at": "2018-03-09T19:59:29.826Z"
      },
      "relationships": {
        "shout-beacons": {
          "data": [
            {
              "id": "1124",
              "type": "shout-beacons"
            }
          ]
        },
        "user": {
          "data": {
            "id": "1371",
            "type": "users"
          }
        }
      }
    }
  ],
  "included": [
    {
      "id": "1371",
      "type": "users",
      "attributes": {
        "username": "EdgardoLilianerox",
        "first-name": "Edgardo",
        "last-name": "Liliane"
      }
    }
  ]
}
```

> If an error is encountered at any point while servicing the request, the API will respond in the following manner:

```json

```

Returns the collection of `ShoutContents` for a given user. A user may issue this command for their own `User`, or for one corresponding to a different user. For their own `User` active an inactive ones are returned. For a `User` corresponding to a different user, only active ones are returned.

### HTTP Request
`GET http://api.crowdshout.tech/users/:user_id/shout_contents`

Where `:user_id` is the UID of the `User` whose `Shout Content`s are to be listed.

### Headers
Name | Required | Description
 - | - | -
 Authentication-Token | Yes | The valid bearer token acquired from `/authenticate` endpoint

The token does not need to belong to the `User` whose `Shout Content`s are to be listed.

### Request Parameters
this request does not require any query parameters.

### Errors



## Destroying ShoutContent
> Upon successfully deleting the resources, the API will return the following response:

```json

```

> If an error is encountered at any point while servicing the request, the API will respond in the following manner:

```json

```


This request removes the `Shout Content` and places it into an archive not accessible through the API. It also expires all of the associated `Shout Beacons` so that they will no longer appear in geo-spatial queries, ultimately marking them to be archived.

### HTTP Request
`DELETE http://api.crowdshout.tech/shout_contents/:shout_content_id`

Where `:shout_content_id` is the UID of the `Shout Content` to be deleted.

### Headers

### Request Parameters

### Errors
