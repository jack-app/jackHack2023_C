import React from "react";
import { css } from "@emotion/react";
import Image from "next/image";
import { sp, pc } from "./media";

export const Title: React.FC = () => (
  // Reactでは、複数の要素を返すことができない。
  // そのため、以下のようにReact.Fragmentを使う必要がある
  <>
    <div
      css={css`
        width: 100vw;
        height: 100vh;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        background-image: url("/images/jackHack_title_image.jpg");
        background-size: cover;
      `}
    >
      <div
        css={css`
      ${sp`
        width: 70vw;
        height: 87vw;
      `}
      ${pc`
        width: 20em;
        padding-left: 50vw;
      `}
          z-index: 2;
        `}
      >
        <img
          src="/images/jackHack_title_text.png"
          css={css`
            width: 100%;
            z-index: 1;
            object-fit: contain;
          `}
        />
      </div>
      {/* <Image src="/images/jackHack_title_image.jpg" layout="fill" objectFit="cover" /> */}
    </div>
    {/* <img src="/images/title_5.png" width="100%" /> */}
    {/* <img src="/images/title.png"width = {1450} height = {1100}/> */}
  </>
);
