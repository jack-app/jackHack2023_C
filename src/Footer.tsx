import React from "react";
import { css } from "@emotion/react";

export const Footer: React.FC = () => (
  // Reactでは、複数の要素を返すことができない。
  // そのため、以下のようにReact.Fragmentを使う必要がある
  <>
    <p
      css={css`
      .footer02 {
        color: #FFFEF6;
        background: #233B6C;
        text-align: center;
        padding: 30px;
       }
       .footer02 a {
        color: #FFFEF6;
        text-decoration: none;
       }
       .footer02 a:hover {
        text-decoration: underline;
       }
       .footer02 .menu {
        margin: 0;
        padding: 0;
        list-style: none;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
       }
       .footer02 .menu li {
        margin: 0;
        padding: 0 20px;
       }
       .footer02 .copyright {
        margin: 0;
        padding: 20px 0 0 0;
       }
      
      `}
    >
        
        <div className="footer02">
  <ul className="menu">
    <li><a href="#">一番上へ</a></li>
    <li><a href="https://twitter.com/jack20200001101">Jack twitter</a></li>
    <li><a href="https://docs.google.com/forms/d/e/1FAIpQLSeGorKnPS9iZiMva8bNivDDAPgCAG2-fsWStmmCxGhTVF9xkA/viewform?embedded=true">お問い合わせ</a></li>
    
  <p className="copyright">
    &copy; 2023.5.5 JackHack2023_teamC
  </p>
  </ul>
</div>
    </p>
    <p
    >
      
    </p>
    
  </>
);
