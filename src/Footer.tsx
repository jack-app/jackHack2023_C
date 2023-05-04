import React from "react";
import { css } from "@emotion/react";

export const Footer: React.FC = () => (
  // Reactでは、複数の要素を返すことができない。
  // そのため、以下のようにReact.Fragmentを使う必要がある
  <>
    <p
      css={css`
        color: red;
      `}
    >
        フッターフッターフッターフッターフッターフッターフッターフッターフッターフッターフッターフッター
    </p>
    <p>うおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおお</p>
  </>
);
