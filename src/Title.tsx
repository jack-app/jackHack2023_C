import React from "react";
import { css } from "@emotion/react";

export const Title: React.FC = () => (
  // Reactでは、複数の要素を返すことができない。
  // そのため、以下のようにReact.Fragmentを使う必要がある
  <>
    
    
    <img src="/images/title_5.png"width = {1450} height = {850}/>
    {/* <img src="/images/title.png"width = {1450} height = {1100}/> */}
  </>
);
