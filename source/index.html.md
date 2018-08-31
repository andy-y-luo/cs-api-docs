---
title: CrowdShout API Reference

language_tabs:
  - json: JSON

toc_footers:
  - <a href='https://github.com/tripit/slate'>Documentation Powered by Slate</a>

includes:
  - errors
  - authentication
  - users
  - shouts
  - shoutcontents
  - shoutbeacons

search: true
---

# CrowdShout API Documentation

This page provides documentation for the CrowdShout API. This API should only be accessed by the native
CrowdShout applications running on mobile devices. As new features are added and changes are made
to the endpoints, necessary information for frontend developers will be found here.

## JSON API Specification

Almost all responses from the CrowdShout API will adhere to [JSON API 1.0]('http://jsonapi.org/') specifications
for ease of use and consistency. Please ensure that your client parses correctly according to these specifications.
All resource requests will be in JSON API 1.0, and most non-resource requests will be as well. Should
a request deviate from the specification, it will be for good reason and clearly documented.

### Client Responsibilities
The client is responsible for adhering to the following:

1. Clients **must** send all JSON API data in request documents with the header `Content-Type: application/vnd.api+json`
without any media type parameters.
2. Clients that include the JSON API media type in their `Accept` header  **must** specify the media
type there at least once without any media type parameters.
3. Clients **must** ignore any parameters for the `application/vnd.api+json` media type received in the
`Content-Type` header of response documents
