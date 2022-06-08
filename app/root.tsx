import type { MetaFunction } from "@remix-run/cloudflare";
import { Links, Meta, Outlet, Scripts } from "@remix-run/react";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "RIGHTホームポジション",
  viewport: "width=device-width,initial-scale=1",
});

export default function App() {
  return (
    <html lang="ja">
      <head>
        <Meta />
        <Links />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Source+Code+Pro&display=swap"
          rel="stylesheet"
        ></link>
      </head>
      <body id="__remix">
        <Outlet />
        <Scripts />
      </body>
    </html>
  );
}
