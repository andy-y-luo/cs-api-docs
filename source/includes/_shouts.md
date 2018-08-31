# Shouts

Shouts are the base unit of content on the CrowdShout platform. They consist of text (which may contain links) and a title, and always belong to the user that generated it. The coverage of a shout exists in the both the physical and temporal dimensions. The physical coverage can be thought of as a geographic circle, with the location determined by the coordinates of the center and the size determined by its finite radius. Temporally, the shout has a finite active duration. When creating a shout, the user is presented with a inversely proportional constraint between the physical and temporal coverage. Shouts have a metric of popularity called 'Echoes'. Akin to a 'Like' or 'Upvote', the action of echoing a shout can be performed by users when the shout appears in his/her feed.

## Creating New Shout
> Request body:

```json
{
  "data": {
    "type": "new-shout",
    "attributes": {
      "title": "Wow a new shout!",
      "text": "I found brownies under my pillow, come enjoy them in 314 Atherton!",
      "center": "POINT (-166.54787 78.57161)",
      "radius": 5000,
      "duration": 500,
      "expires-at": "2018-01-30T09:04:16Z"
    }
  }
}
```

> Upon successful creation, the API will respond in the following manner:

```json
HTTP/1.1 201 Created
Content-Type: application/vnd.api+json; charset=utf-8
{
  "data": {
    "id": "2866",
    "type": "shout-contents",
    "attributes": {
      "title": "wow a new shout!",
      "text": "I found brownies under my pillow, come enjoy them in 314 Atherton!",
      "echo-count": 0
    },
    "relationships": {
      "shout-beacons": {
        "data": [
          {
            "id": "2641",
            "type": "shout-beacons"
          }
        ]
      },
      "user": {
        "data": {
          "id": "12388",
          "type": "users"
        }
      }
    }
  }
}

```

> If an error is encountered at any point while servicing the request, the API will respond in the following manner:

```json
HTTP/1.1 400 Bad Request
Content-Type: application/vnd.api+json

```

Creates a new `Shout Content` with the provided social content and `User` association. This request will also create the root `Shout Beacon` associated with the shout. These together represent a new shout, which has not been echoed by any other users.

### HTTP Request
`POST http://api.crowdshout.tech/users/:user_id/shout_contents`

Where the `:user_id` UID designates the `User` to be associated with.

### Headers
Name | Required | Description
 - | - | -
 Authentication-Token | Yes | The valid bearer token acquired from `/authenticate` endpoint

This token must belong to the `User` that the `Shout Content` is to be associated with. This prevents users from creating shouts on behalf of other users.

### Request Parameters
Name | Required | Description
 - | - | -
title | No | a title that describes the content of the shout
text | Yes | the social content of the shout as text
center | Yes | the location of the user during the creation of the shout
radius | Yes | the radius of the coverage circle in meters
duration | Yes | the duration of the shout's active phase in minutes
expires_at | Yes | the timestamp of the shout's root beacon expiration

#### Title Requirements
This optional title, if provided, must be range between 1-60 characters in length. If no title is explicitly provided, the first 30 or so characters of the text are used as the title.

#### Text Requirements
The text must range between 1-500 characters in length and may contain links to other websites and media.

#### Center Requirements
The well-known text representation of the point corresponding to the location of the user, with the latitude/longitude having 5 digits of precision after the decimal point.

#### Radius Requirements
The radius, expressed in meters, must be a string value between 100 and 10000.

#### Duration Requirements
The duration, expressed in minutes, must be a string value between 10 and 1000.

#### Radius and Duration Relationship Requirements


#### Expires At Requirements
This is a string representation of a UTC timestamp, equal to the current time as seen by the frontend when the shout is created plus the duration. This value will have second resolution and follow the [ISO8601](https://en.wikipedia.org/wiki/ISO_8601) format.

### Errors
Code | Title | Detail | Source | Status (HTTP)
- | - | - | - | -
xx | Resource creation error | Unable to create root beacon. | N/A | 500
xx | Missing attribute error | The ShoutContent request is missing a required attribute. | N/A | 400
xx | Invalid attribute error | The ShoutContent request contains an incorrectly formatted or invalid attribute | N/A | 400
xx | Missing attribute error | The ShoutBeacon request is missing a required attribute. | N/A | 400
xx | Invalid attribute error | The ShoutBeacon request contains an incorrectly formatted or invalid attribute | N/A | 400


## Echoing a Shout
> Request body:

```json
POST /shout_contents/:shout_content_id/echoes HTTP/1.1
Content-Type: application/vnd.api+json
Accept: application/vnd.api+json
{
  "data": {
    "type": "echoes",
    "attributes": {
      "center": "POINT (-166.54787 78.57161)",
      "parent-shout-beacon-id": 5
    }
  }
}
```

> Upon success, the API will respond in the following manner:

```json
{
  "data": {
    "id": "533",
    "type": "shout-beacons",
    "attributes": {
      "center": "POINT (-166.54787 78.57161)",
      "radius": 4850,
      "duration": 372,
      "expires-at": "2018-01-07T08:17:38.650Z"
    },
    "relationships": {
      "shout-content": {
        "data": {
          "id": "848",
          "type": "shout-contents"
        }
      },
      "user": {
        "data": {
          "id": "3039",
          "type": "users"
        }
      }
    }
  }
}
```

This action creates a `ShoutBeacon`, authored by the echoing `User`, for a `ShoutContent`. Echoing can only occur if, at the time of the request, the user is at a geographic location that overlaps with one of the `ShoutBeacons` for the `ShoutContent`. A request may explicitly designate a `ShoutBeacon` to act as the 'parent' of the `ShoutBeacon` to be created during the echo, however if omitted, the backend will search for a `ShoutBeacon` that is in range. For both, the request will be validated to ensure that the 'parent' `ShoutBeacon` is non-expired and in-range. An error will be returned if the provided 'parent' `ShoutBeacon` fails validations or no in range ones can be found. Upon success, the newly generated `ShoutBeacon` will be returned.

### HTTP Request
`POST http://api.crowdshout.tech/shout_contents/:shout_content_id/echoes`

Where `:shout_content_id` is the UID of the `Shout Content` to be echoed.

### Headers
Name | Required | Description
- | - | -
Authentication-Token | Yes | The valid bearer token acquired from `/authenticate` endpoint

The token does not need to belong to the `User` that the `Shout Content` is associated with. The API determines which `User` is performing the echo by determining which `User` the token corresponds to.

### Request Parameters
Name | Required | Description
 - | - | -
center | Yes | the location of the user during the echo
parent-shout-beacon-id | No | the UID of the shout beacon that points the user to the shout.


#### Center Requirements
The well-known text representation of the point corresponding to the location of the user, with the latitude/longitude having 5 digits of precision after the decimal point.

#### Parent Beacon ID Requirements
The UID must correspond to a non-expired in-range `ShoutBeacon`, if provided.

### Errors
Code | Title | Detail | Source | Status (HTTP)
- | - | - | - | -
xx | No in range ShoutBeacons error | There are no associated ShoutBeacons for the current ShoutContent that are in range of the request location. | center | 400
xx | Not in range of ShoutBeacon error | The request was not made from a location that is in range of the associated ShoutBeacon. | parent-shout-beacon-id | 400
xx | User already echoed error | The User has already echoed this ShoutContent | N/A | 400


## Retrieving Shoutset
> Request body:

```json
GET /shoutsets HTTP/1.1
Content-Type: application/vnd.api+json
Accept: application/vnd.api+json
```

> Upon successful completion, the API will return the following response:

```json
{
  "meta": {
  "shout-count": 3
  },
  "data": [
    {
      "id": "26192",
      "type": "shout-contents",
      "attributes": {
        "title": "Rylan",
        "text": "I find your lack of faith disturbing.",
        "echo-count": 10,
        "prominence": 10,
        "user-echoed?": true,
        "expires-at": "2018-04-15T17:21:33.277Z",
        "created-at": "2018-04-15T02:16:33Z"
      },
      "relationships": {
        "shout-beacon": {
          "data": {
            "type": "shout-beacons",
            "id": "51491"
          }
        },
        "user": {
          "data": {
            "type": "users",
            "id": "60385",
            "attributes": {
              "username": "GlendaJohannrox"
            }
          }
        }
      }
    },
    {
      "id": "26195",
      "type": "shout-contents",
      "attributes": {
        "title": "Gunnar",
        "text": "If you're saying that coming here was a bad idea, I'm starting to agree with you.",
        "echo-count": 10,
        "prominence": 10,
        "user-echoed?": true,
        "expires-at": "2018-04-15T16:42:33.343Z",
        "created-at": "2018-04-15T02:16:33Z"
      },
      "relationships": {
        "shout-beacon": {
          "data": {
            "type": "shout-beacons",
            "id": "51494"
          }
        },
        "user": {
          "data": {
            "type": "users",
            "id": "60385",
            "attributes": {
              "username": "GlendaJohannrox"
            }
          }
        }
      }
    },
    {
      "id": "26193",
      "type": "shout-contents",
      "attributes": {
        "title": "Cristopher",
        "text": "You do have your moments. Not many, but you have them.",
        "echo-count": 10,
        "prominence": 10,
        "user-echoed?": true,
        "expires-at": "2018-04-15T02:41:33.298Z",
        "created-at": "2018-04-15T02:16:33Z"
      },
      "relationships": {
        "shout-beacon": {
          "data": {
            "type": "shout-beacons",
            "id": "51492"
          }
        },
        "user": {
          "data": {
            "type": "users",
            "id": "60385",
            "attributes": {
              "username": "GlendaJohannrox"
            }
          }
        }
      }
    }
  ]
}
```

### HTTP request
`GET http://api.crowdshout.tech/shoutsets`

### Headers
Name | Required | Description
- | - | -
Authentication-Token | Yes | The valid bearer token acquired from `/authenticate` endpoint

### Request Parameters
These request parameters will be formatted as part of the URL, for example:
`http://api.crowdshout.tech/shoutset?latitude=40.79340&longitude=77.86000`

Name | Required | Description
 - | - | -
latitude | Yes | The latitude of the user's location when making the request
longitude | Yes | The longitude of the user's location when making the request

#### Latitude/Longitude Requirements
These parameters form a lat-long pair. Each value must be given as a string and must contain exactly 5 digits after the decimal point, for example `-72.54673`. The latitude value can range from -90.00000 to 90.00000 and the longitude value can range from -180.00000 to 180.00000.

### Errors
Code | Title | Detail | Source | Status (HTTP)
- | - | - | - | -
xx | Missing parameter error | The shoutset request is missing a required parameter. | {} | 400
xx | Invalid coordinate error | The longitude/latitude parameter does not contain a valid value. | latitude/longitude | 400
