# ShoutBeacons
A `ShoutBeacon` represents a circular geo-temporal coverage that belongs to a `ShoutContent` and gives it physical meaning. A `ShoutContent` has-many `ShoutBeacons` and a `ShoutBeacon` belongs-to a `ShoutContent`. In addition, each `ShoutBeacon` is associated with the `User` that creates it, either through an Echo or as the root beacon for a new Shout. A `User` has-many `ShoutBeacons` and a `ShoutBeacon` belongs-to a `User`. They cover a circular geographic region for a specific time frame, and can vary in size and duration. However, the physical coverage and duration are constrained in a way so the overall area*time metric is fairly consistent between all `ShoutBeacons`.

## Showing ShoutBeacon
>Upon success, the API will return the following response:

```json
HTTP/1.1 200 OK
Content-Type: application/vnd.api+json; charset=utf-8
{
  "data": {
    "id": "1301",
    "type": "shout-beacons",
    "attributes": {
      "center": "POINT (114.60788 -89.98983)",
      "radius": 2497,
      "duration": 686,
      "generation": 1,
      "expires-at": "2018-03-10T07:30:15.197Z",
      "created-at": "2018-03-09T20:04:15.200Z"
    },
    "relationships": {
      "shout-content": {
        "data": { "id": "745", "type": "shout-contents" }
      },
      "user": {
        "data": { "id": "1550", "type": "users" }
      }
    }
  },
  "included": [
    {
      "id": "1550",
      "type": "users",
      "attributes": {
        "username": "ChaimBrownrox",
        "first-name": "Chaim",
        "last-name": "Brown"
      }
    }
  ]
}
```

> If an error is encountered at any point while servicing the request, the API will respond in the following manner:

```json

```

This request shows a single `ShoutBeacon`, which does not have to belong to the user issuing the request.

### HTTP Request
`GET http://api.crowdshout.tech/shout_beacons/:shout_beacon_id`

Where `:shout_beacon_id` is the UID of the `ShoutBeacon` to be returned.

### Headers
Name | Required | Description
 - | - | -
 Authentication-Token | Yes | The valid bearer token acquired from `/authenticate` endpoint

### Request Parameters
This request does not require any query parameters.

### Errors

## Listing ShoutBeacons (Index for ShoutContent)
>Upon success, the API will return the following response:

```json
HTTP/1.1 200 OK
Content-Type: application/vnd.api+json; charset=utf-8
{
  "data": [
    {
      "id": "1292",
      "type": "shout-beacons",
      "attributes": {
        "center": "POINT (90.79869 -20.1119)",
        "radius": 3238,
        "duration": 245,
        "generation": 0,
        "expires-at": "2018-03-10T00:09:14.871Z",
        "created-at": "2018-03-09T20:04:14.882Z"
      },
      "relationships": {
        "shout-content": {
          "data": { "id": "741", "type": "shout-contents" }
        },
        "user": {
          "data": { "id": "1541", "type": "users" }
        }
      }
    },
    {
      "id": "1293",
      "type": "shout-beacons",
      "attributes": {
        "center": "POINT (90.79176 -20.1191)",
        "radius": 1254,
        "duration": 178,
        "generation": 1,
        "expires-at": "2018-03-09T23:02:14.898Z",
        "created-at": "2018-03-09T20:04:14.901Z"
      },
      "relationships": {
        "shout-content": {
          "data": { "id": "741", "type": "shout-contents" }
        },
        "user": {
          "data": { "id": "1542", "type": "users" }
        }
      }
    }
  ],
  "included": [
    {
      "id": "1541",
      "type": "users",
      "attributes": {
        "username": "VivianeRebeccarox",
        "first-name": "Viviane",
        "last-name": "Rebecca"
      }
    },
    {
      "id": "1542",
      "type": "users",
      "attributes": {
        "username": "EleazarLorenzrox",
        "first-name": "Eleazar",
        "last-name": "Lorenz"
      }
    }
  ]
}
```
> If an error is encountered at any point while servicing the request, the API will respond in the following manner:

```json

```
Returns the collection of expired and non-expired `ShoutBeacons` for a given `ShoutContent`. A user may issue this command for their own `ShoutContent`, or for one belonging to a different user.

### HTTP Request
`GET http://api.crowdshout.tech/shout_contents/:shout_content_id/shout_beacons`

Where `:shout_content_id` is the UID of the `ShoutContent` whose associated `ShoutBeacons` are to be listed.

### Headers
Name | Required | Description
 - | - | -
 Authentication-Token | Yes | The valid bearer token acquired from `/authenticate` endpoint

### Request Parameters
This request does not require any query parameters.

### Errors


## Listing ShoutBeacons (Index for User)
>Upon success, the API will return the following response:

```json
HTTP/1.1 200 OK
Content-Type: application/vnd.api+json; charset=utf-8
{
  "data": [
    {
      "id": "91085",
      "type": "shout-beacons",
      "attributes": {
        "center": "POINT (152.85679 38.8839)",
        "radius": 2719,
        "duration": 695,
        "generation": 1,
        "expires-at": "2018-02-11T10:26:27.387Z",
        "created-at": "2018-02-10T22:51:27.389Z"
      },
      "relationships": {
        "shout-content": {
          "data": {
            "id": "37317",
            "type": "shout-contents"
          }
        },
        "user": {
          "data": {
            "id": "92335",
            "type": "users"
          }
        }
      }
    }
  ],
  "included": [
    {
      "id": "37317",
      "type": "shout-contents",
      "attributes": {
        "title": "Charlie"
      },
      "relationships": {
        "user": {
          "data": {
            "id": "92334",
            "type": "users"
          }
        }
      }
    }
  ]
}
```
> If an error is encountered at any point while servicing the request, the API will respond in the following manner:

```json

```
Returns the collection of expired and non-expired `ShoutBeacons` associated with (made by) a given `User`. A user may issue this command for their own `User`, or for one corresponding to a different user.

### HTTP Request
`GET http://api.crowdshout.tech/users/:user_id/shout_beacons`

Where `:user_id` is the UID of the `User` whose associated `ShoutBeacons` are to be listed.

### Headers
Name | Required | Description
 - | - | -
 Authentication-Token | Yes | The valid bearer token acquired from `/authenticate` endpoint

### Request Parameters
This request does not require any query parameters.

### Errors
