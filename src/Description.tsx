import React from "react";
import { css } from "@emotion/react";

export const Description: React.FC = () => (
  // Reactでは、複数の要素を返すことができない。
  // そのため、以下のようにReact.Fragmentを使う必要がある
  <>
    <p
      css={css`
        color: red;
      `}
    >
      説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明
    </p>
    <p>うおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおお</p>
  </>
);
