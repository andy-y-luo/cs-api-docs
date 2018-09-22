# CrowdShout API Documentation
This project writes and deploys the CrowdShout backend API, provided to frontend developers as a reference. The documentation is written according to OAS 3.0.0.

## Contributing
First setup your development environment: [start here.](setup/start_here.md)

### Source File Organization
It is important to note the manner in which files are organized in the `src` directory. For the most part, folder and file structure mirror the OAS 3.0.0 schema, with a `index.yaml` file in each sub directory that ties together the files in that sub directory. To avoid redundancy, the naming convention for elements and files drop the {type} as a prefix or postfix.

For example, for a `Response` object for the create user endpoint, instead of `#/components/responses/create_user_response`, it would be `#/components/responses/create_user`.

### Generating backend error examples
The backend application has a number of errors that are raised in various conditions. For these to be properly documented, each one is an example instance that can be referenced to in `response` objects. To generate these from the existing error descriptions in the backend project, first clone the `cs-api-backend` project.

Next copy and edit the `.env` file to point to the directory.
```bash
$ cp .env.example .env
```
In the `.env` file, replace the dummy path with the absolute path to the error descriptions directory in the `cs-api-backend` repository. In relation to the root of that repository, it can be found at `app/exceptions/error_descriptions`. Appending the absolute path of the repository gets you the path you need to replace in the `.env` file.

To perform the actual generation:
```bash
$ node gen_errors.js
```

### Local Development Server
Using foreman, a local server is spun up that watches the source directory and updates whenever a file changes:
```bash
$ nf start
```

### Deploying to AWS
Using the aws cli, the documentation static site is deployed to AWS:
```bash
$ ./scripts/s3_deploy <aws-profile-name>
```
where `<aws-profile-name>` is the name of your aws cli profile for your CrowdShout AWS account. For more information on setting up aws-cli see [here](https://docs.aws.amazon.com/lambda/latest/dg/setup-awscli.html).