# Ol Intelligence Server

## Documentation

This project is built using the [Remix Blues Stack](https://remix.run/stacks).

We will keep the framework of the Blues Stack as long as we can to keep this project easy to maintain. Newcomers can review the blues stack documentation and maintainers can avoid having to write additional documentation.

## Development

- This step only applies if you've opted out of having the CLI install dependencies for you:

  ```sh
  npx remix init
  ```

- Start the Postgres Database in [Docker](https://www.docker.com/get-started):

  ```sh
  npm run docker
  ```

  > **Note:** The npm script will complete while Docker sets up the container in the background. Ensure that Docker has finished and your container is running before proceeding.

- Initial setup:

  ```sh
  npm run setup
  ```

- Run the first build:

  ```sh
  npm run build
  ```

- Start dev server:

  ```sh
  npm run dev
  ```

This starts your app in development mode, rebuilding assets on file changes.
