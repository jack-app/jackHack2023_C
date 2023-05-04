import React from "react";
import { css } from "@emotion/react";

export const Title: React.FC = () => (
  // Reactでは、複数の要素を返すことができない。
  // そのため、以下のようにReact.Fragmentを使う必要がある
  <>
    <h1
      css={css`
        color: black;
        font-weight: bold;
        // background: black;
        writing-mode: vertical-rl;
        // border: 5px solid black;
      `}
    >
      {/* 打ち上げ花火、下調べしてから見るか */}
      {/* <img src="/images/618018_l 2.jpg"width = {1450} height = {600} /> */}
    </h1>
    {/* import Image from 'next/image'

    export const Avatar: React.FC = () => (
    <Image src="618018_l 2.jpg" width={64} height={64} alt="My avatar" />
    ) */}
    {/* <img src="/images/618018_l 2.jpg"width = {1450} height = {600} /> */}
    <img src="/images/title.png"width = {1450} height = {600} />
  </>
);
