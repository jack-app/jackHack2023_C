import React from "react";
import { css } from "@emotion/react";
import { LocationPaths } from "./constants";

interface Props {
  onChangeLocation: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}
export const LocationSelect: React.FC<Props> = ({ onChangeLocation }) => (
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
