import React from "react";
import { css } from "@emotion/react";

export const Title: React.FC = () => (
  // Reactでは、複数の要素を返すことができない。
  // そのため、以下のようにReact.Fragmentを使う必要がある
  <>
    <h1
      css={css`
        color: red;
        font-weight: bold;
      `}
    >
      タイトル
    </h1>
  </>
);
