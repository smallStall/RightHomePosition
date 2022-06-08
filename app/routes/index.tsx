import type { LinksFunction } from "@remix-run/cloudflare";
import stylesUrl from "../styles/keyboard.css";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesUrl }];
};


export default function Index() {
  
  return (
    <>
      <p>工事中です🚧</p>  
    </>
  );
}
