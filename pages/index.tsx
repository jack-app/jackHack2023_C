import { Global, css } from "@emotion/react";
import { NextPage } from "next";
import React from "react";
import Head from "next/head";

import { App } from "../src/App";

const Index: NextPage = () => {
  const title = "打ち上げ花火、下調べしてから見るか";
  const description = "打ち上げ花火が見える場所を下調べできるwebアプリです";
  const url = "https://jack-hack2023-c.vercel.app";
  const imgUrl = "https://jack-hack2023-c.vercel.app/images/title_5.png";
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content={description} />
        <meta property="og:url" content={url} />
        <meta property="og:title" content={title} />
        <meta property="og:site_name" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={imgUrl} />
        <meta property="og:image:width" content="2940" />
        <meta property="og:image:height" content="1654" />
        <meta name="twitter:card" content="summary" />
      </Head>
      <Global
        styles={css`
          html,
          body,
          #__next {
            width: 100%;
            height: 100%;
            margin: 0;
            background-color: #061424;
          }
        `}
      />
      <App />
    </>
  );
};

export default Index;
