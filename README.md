# Microtop

This is small application that presents bibliography on **Belarusian microtoponymy** (i.e. names of small places around settlements, such as hills,  ponds, and other natural landmarks).

The app is written in Vue3, with TypeScript support.

One can download the repository, run `npm install` and then `npm run build` to get the instance able to work on local machine.

The project content is stored in [src/bibliography.json](src/bibliography.json). One can put own data with the same structure and get them rendered via the app.

- compile the project based on CSV file: `./json.sh`
- publish the project:

`npx wrangler pages deploy dist`

or

`npx wrangler pages deploy dist --commit-dirty=true --branch master`

:space_invader:



