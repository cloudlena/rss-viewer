# RSS Viewer

📺 A static webpage to view the weather and any RSS feed. This can be used on an E Ink display or small screen in your home (e.g., [Inklay](https://www.inklay.app/)).

**There is a [Demo](https://cloudlena.github.io/rss-viewer?location=Bern&feed=https%3A%2F%2Fwww.srf.ch%2Fnews%2Fbnf%2Frss%2F19032223) available.**

## Usage

You can either self-host RSS Viewer or use the deployed version at <https://cloudlena.github.io/rss-viewer>.

Open the app providing a `location` query string parameter for the weather and a `feed` one containing the URL-encoded URL of the RSS feed you want to view. E.g., `?feed=https%3A%2F%2Fwww.srf.ch%2Fnews%2Fbnf%2Frss%2F19032223` to view the feed at `https://www.srf.ch/news/bnf/rss/19032223`.

## Available Scripts

In the project directory, you can run:

### `npm run dev` or `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>

### `npm run build`

Builds the app for production to the `dist` folder.<br>
It correctly bundles Solid in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

## Deployment

The viewer is deployed at <https://cloudlena.github.io/rss-viewer/> and can be used there for free.

To host your own instance, you can deploy the `dist` folder to any static host provider (GitHub Pages, Netlify, Surge, Now, etc.).
