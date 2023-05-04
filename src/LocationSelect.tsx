import React from "react";
import { css } from "@emotion/react";
import { LocationPaths, FireWorks } from "./constants";

interface Props {
  onChangeLocation: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}
export const RawLocationSelect: React.FC<Props> = ({ onChangeLocation }) => (
  <>
    <select onChange={onChangeLocation}>
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
  <>
    <label
      css={css`
        display: inline-flex;
        align-items: center;
        position: relative;

        &::after {
          position: absolute;
          right: 15px;
          width: 10px;
          height: 7px;
          background-color: #535353;
          clip-path: polygon(0 0, 100% 0, 50% 100%);
          content: "";
          pointer-events: none;
        }

        select {
          appearance: none;
          min-width: 230px;
          height: 2.8em;
          padding: 0.4em calc(0.8em + 30px) 0.4em 0.8em;
          border: 1px solid #cccccc;
          border-radius: 3px;
          background-color: #fff;
          color: #333333;
          font-size: 1em;
          cursor: pointer;
        }
      `}
    >
      <select onChange={onChangeLocation}>
        {FireWorks.map((path) => {
          return (
            <option key={path.name} value={[path.tilesetUrl, path.location.x.toString(), path.location.y.toString(), path.location.z.toString()].join(",")}>
              {path.name}, {path.place}
            </option>
          );
        })}
      </select>
    </label>
  </>
);
