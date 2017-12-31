# Errors

Each type of API error will have a corresponding universally unique error code. Each section of the documentation will describe its own relevant errors and codes. The API will process a request until successful completion or until the first error is encountered, at which point the API will halt processing and respond with error details.


Error Code | Meaning
---------- | -------
400 | Bad Request
401 | Unauthorized
403 | Forbidden
404 | Not Found
405 | Method Not Allowed
406 | Not Acceptable
410 | Gone
429 | Too Many Requests
500 | Internal Server Error
503 | Service Unavailable

## API Error Index

Code Range | Designation
- | -
0 - 99 | General
100 - 199 | Authentication
200 - 299 | Users
300 - 399 | Shout Contents
400 - 499 | Shout Beacons
500 - 599 | Shout Sets
