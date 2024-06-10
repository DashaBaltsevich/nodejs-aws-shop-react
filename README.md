S3 Bucket
https://serving-spa-1-manually.s3.eu-central-1.amazonaws.com/index.html

CloudFront
https://d31de00i8tzb2t.cloudfront.net/

![image](https://github.com/DashaBaltsevich/nodejs-aws-shop-react/assets/60328521/be104933-c889-4f7f-b0ca-5f8bf21c52b2)

AutoDeploy:

S3 Bucket
https://js-cloudfront-s3-bucket.s3.eu-central-1.amazonaws.com/index.html

CloudFront
https://d58mq6vfqepjo.cloudfront.net

Module2 Done:

30 - S3 bucket has been created and configured properly. The app has been uploaded to the bucket and is available though the Internet. Nothing else has been done. (Link to S3 bucket/website is provided. There is no Pull Request in the YOUR OWN frontend repository.)

40 - In addition to the previous work a CloudFront distribution is created and configured properly and the site is served now with CloudFront and is available through the Internet over CloudFront URL, not S3-website link (due to changes in bucket’s policy...). (Link to CloudFront website is provided. S3-website shows 403 Access Denied error. There is no Pull Request in the YOUR OWN frontend repository.)

30 - S3 bucket creation, website deployment, CloudFront Distribution and Invalidation added and configured by using AWS CDK. The app can be built and deployed by running npm script command. (Link to CloudFront website is provided. PR with all changes is submitted in the YOUR OWN frontend repository and its link is provided for review.)

# React-shop-cloudfront

This is frontend starter project for nodejs-aws mentoring program. It uses the following technologies:

-   [Vite](https://vitejs.dev/) as a project bundler
-   [React](https://beta.reactjs.org/) as a frontend framework
-   [React-router-dom](https://reactrouterdotcom.fly.dev/) as a routing library
-   [MUI](https://mui.com/) as a UI framework
-   [React-query](https://react-query-v3.tanstack.com/) as a data fetching library
-   [Formik](https://formik.org/) as a form library
-   [Yup](https://github.com/jquense/yup) as a validation schema
-   [Vitest](https://vitest.dev/) as a test runner
-   [MSW](https://mswjs.io/) as an API mocking library
-   [Eslint](https://eslint.org/) as a code linting tool
-   [Prettier](https://prettier.io/) as a code formatting tool
-   [TypeScript](https://www.typescriptlang.org/) as a type checking tool

## Available Scripts

### `start`

Starts the project in dev mode with mocked API on local environment.

### `build`

Builds the project for production in `dist` folder.

### `preview`

Starts the project in production mode on local environment.

### `test`, `test:ui`, `test:coverage`

Runs tests in console, in browser or with coverage.

### `lint`, `prettier`

Runs linting and formatting for all files in `src` folder.
