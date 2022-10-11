import Head from "next/head";
import { ProductsList } from "../components/productsList";
export default function Home() {
  return (
    <>
      <Head>
        <title>Top Telefonía barata</title>
        <meta
          name="description"
          content="Top 1000 artículos de telefonia barata en mercado libre"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ProductsList />
    </>
  );
}
