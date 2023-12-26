import Map from "@/components/map";
import Script from "next/script";

export default function Home() {
  return (
    <main>
      <Script
        type="text/javascript"
        src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.MAP_CLIENT_ID}`}
      />
      {/* <Map /> */}
    </main>
  );
}
