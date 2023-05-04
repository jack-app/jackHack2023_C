import React from "react";
import { css } from "@emotion/react";

// 画像をインポート
import Image from 'next/image'
export const Avatar: React.FC = () => (
  <Image src="/images/akki.png" width={64} height={64} alt="背景画像" />
)


export const Description: React.FC = () => (
  // Reactでは、複数の要素を返すことができない。
  // そのため、以下のようにReact.Fragmentを使う必要がある
  <>
  
  <div style={{ position: 'relative', width: '100vw', height: "100%" }}>
    <Image src="/images/akki.png" layout="fill" />
    <div
      css={css`
      // 背景色
      background-color:rgba(147, 112, 219, 0.9);
      position:absolute;
      bottom:0;
      width:100vw;
    `}>
      <div>
        <h3
          css={css`
          padding-top:100px;
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
        `}>
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
        `}>
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
        `}>
        「「美しい眺めだった」」
        </h2>
      </div>
    </div>
  </div>

  {/* 使い方の説明 */}
  <div css={css`
    margin:100px;

  `}>
    <h2 css={css`
    padding:30px;
    background-color:rgba(147, 112, 219, 0.9);
    `}>
      ＜使い方＞
  </h2>
  
    <div css={css`
    width:90%;
    margin:0 auto;
    `}>
      <h3 css={css`
      background-color:rgba(147, 112, 219, 0.9);
      padding:15px 30px;
      `}>
        タイトル
      </h3>
      <p css={css`
      margin-left:50px;
      `}>
        aaaaaaaaaaaaaaaa
      </p>
    </div>
  </div>
  </>
);
