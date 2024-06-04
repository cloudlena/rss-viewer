import { Component, Switch, Match, For, createResource } from "solid-js";
import { XMLParser } from "fast-xml-parser";
import "./App.css";

const parser = new XMLParser();

const fetchFeed = async (url: string) => {
  const resp = await fetch(url);
  const respStr = await resp.text();
  const feed = parser.parse(respStr);

  return feed;
};

const fetchWeather = async (location: string) => {
  const url = new URL("https://wttr.in");
  url.searchParams.set("format", "j1");
  url.searchParams.set("location", location);
  const resp = await fetch(url);
  const respJSON = await resp.json();

  return respJSON;
};

const App: Component = () => {
  const urlParams = new URLSearchParams(window.location.search);

  const feedURLEncoded = urlParams.get("feed");
  const feedURL = decodeURI(feedURLEncoded);
  const [feed] = createResource(feedURL, fetchFeed);

  const location = urlParams.get("location");
  const [weather] = createResource(location, fetchWeather);

  return (
    <div>
      <div class="mt-4 mb-1 flex items-center justify-center">
        <Switch fallback={<div>Weather Not Found</div>}>
          <Match
            when={weather.state === "pending" || weather.state === "unresolved"}
          >
            Loading Weather...
          </Match>

          <Match when={weather.state === "ready"}>
            <div
              class="w-full flex justify-between px-4"
              style="font-size:62px;font-weight:bold"
            >
              <div class="flex flex-row gap-8">
                <div>{weather().current_condition[0].weatherDesc[0].value}</div>
                <div>{weather().current_condition[0].temp_C}°C</div>
              </div>
              <div class="flex flex-row gap-8">
                <div>{weather().weather[0].mintempC}°C / {weather().weather[0].maxtempC}°C</div>
              </div>
            </div>
          </Match>

          <Match when={weather.state === "errored"}>
            <h1>Error</h1>
            <p>{JSON.stringify(weather.error)}</p>
          </Match>
        </Switch>
      </div>

      <div class="p-4 flex justify-center">
        <Switch fallback={<div>Feed Not Found</div>}>
          <Match when={feed.state === "pending" || feed.state === "unresolved"}>
            Loading Feed...
          </Match>

          <Match when={feed.state === "ready"}>
            <div class="grid grid-cols-3 gap-4">
              <For each={feed().rss.channel.item}>
                {(item) => (
                  <div
                    style="font-size:22px;font-weight:bold;line-height:28px;"
                    innerHTML={item.description}
                  />
                )}
              </For>
              <p>{feed().rss.channel.title}</p>
            </div>
          </Match>

          <Match when={feed.state === "errored"}>
            <h1>Error</h1>
            <p>{JSON.stringify(feed.error)}</p>
          </Match>
        </Switch>
      </div>
    </div>
  );
};

export default App;
