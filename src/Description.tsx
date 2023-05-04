import React from "react";
import { css } from "@emotion/react";

export const Description: React.FC = () => (
  // Reactでは、複数の要素を返すことができない。
  // そのため、以下のようにReact.Fragmentを使う必要がある
  <>
  <div
    css={css`
      // 背景色
      background-color:rgba(0, 0, 139, 0.3);
    `}
  >
    <h3
      css={css`
        padding-top:75px;
        margin-left:100px;
        color: black;
        font-family:serif;

        // アニメーション
        animation-name: fadeInAnime;
        animation-fill-mode:backwards;
        animation-duration:3s;
        animation-timing-function:ease;
        animation-delay: 0.5s;
        animation-direction:normal;
        @keyframes fadeInAnime{
          0% {
            opacity: 0;
          }
          
          100% {
            opacity: 1;
          }
        }
      `}
    >
      「あの日、君と見た花火。それはまるで、」
    </h3>
    <h3
      css={css`
      margin-left:100px;
      color: black;
      font-family:serif;

      // アニメーション
      animation-name: fadeInAnime;
      animation-fill-mode:backwards;
      animation-duration:3s;
      animation-timing-function:ease;
      animation-delay: 5.5s;
      animation-direction:normal;
      @keyframes fadeInAnime{
        0% {
          opacity: 0;
        }
        
        100% {
          opacity: 1;
        }
      }
      `}
    >
      「まるで夢の景色のように、ただひたすらに」
    </h3>

    <h2
      css={css`
      margin-top:30px;
      margin-left:100px;
      padding-bottom:60px;
      color: black;
      font-family:serif;
      
      // アニメーション
      animation-name: fadeInAnime;
      animation-fill-mode:backwards;
      animation-duration:3s;
      animation-timing-function:ease;
      animation-delay: 10.5s;
      animation-direction:normal;
      @keyframes fadeInAnime{
        0% {
          opacity: 0;
        }
        
        100% {
          opacity: 1;
        }
      }
      `}
    >
      「「美しい眺めだった」」
    </h2>
  </div>

  {/* 使い方の説明 */}
    <h2 css={css`
    margin-left:100px;
    `}
    >
      ＜使い方＞
    </h2>
  
    <div>
      <h3 css={css`
        margin-left:100px;
        `}
      >
        タイトル
      </h3>
      <p css={css`
        margin-left:100px;
        `}
      >
        aaaaaaaaaaaaaaaa
      </p>
    </div>
  </>
);
