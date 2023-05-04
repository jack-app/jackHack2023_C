import React from "react";
import { css } from "@emotion/react";
import { LocationPaths, FireWorks } from "./constants";

interface Props {
  onChangeLocation: (locationUrl: string, location: { x: number; y: number; z: number }) => void;
}
export const RawLocationSelect: React.FC<Props> = ({ onChangeLocation }) => (
  <>
    <select >
      {LocationPaths.map((path) => {
        if (path.TYPE == "bldg" && path.URL.match(/notexture/))
          return (
            <option key={path.CITYCODE + path.TYPE + path.URL} value={path.URL}>
              {path.TYPE}: {path.URL}
            </option>
          );
      })}
    </select>
  </>
);

export const LocationSelect: React.FC<Props> = ({ onChangeLocation }) => (
  <div>
    {FireWorks.map((firework) => {
      return (
        <div 
        tabIndex={0}
        onKeyDown={(e) => {onChangeLocation(firework.tilesetUrl, firework.location)}}
        onClick={(e) => {onChangeLocation(firework.tilesetUrl, firework.location)}}
        role="button"
        css={css`
          border: 1px solid #446173;
          margin: 0 0 -1px;
          &:hover {
            background-color: #446173;
            color: #fff;
          }
          cursor: pointer;
          padding: 0.2em;
        `}>
          <div css={css`
            font-weight: bold;
          `}
          >{firework.name}</div>
          <span css={css`
            font-size: 0.8em;
            color: #446173;
          `}
          >{firework.place}</span>
        </div>
      );
    })}
  </div>
);
