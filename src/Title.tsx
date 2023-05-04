import React from "react";
import { css } from "@emotion/react";
import Image from 'next/image'

export const Title: React.FC = () => (
  // Reactでは、複数の要素を返すことができない。
  // そのため、以下のようにReact.Fragmentを使う必要がある
  <>
    
    <img src="/images/title_5.png" width="100%" />
    {/* <img src="/images/title.png"width = {1450} height = {1100}/> */}
  </>
);
