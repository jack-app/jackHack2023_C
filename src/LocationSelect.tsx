import React from "react";
import { css } from "@emotion/react";
import { LocationPaths, FireWorks } from "./constants";
import { sp, pc, vw } from "./media";

interface Props {
  onChangeLocation: (locationUrl: string, location: { x: number; y: number; z: number }) => void;
}
export const RawLocationSelect: React.FC<Props> = ({ onChangeLocation }) => (
  <>
    <select>
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

export const LocationSelect: React.FC<Props> = ({ onChangeLocation }) => {
  const [selected, setSelected] = React.useState(FireWorks[0].name);

  return (
    <div
      css={css`
        min-width: 12em;
        ${sp`
        width: 100%;
        height: 20svh;
        overflow: scroll;
      `}
      `}
    >
      {FireWorks.map((firework) => {
        return (
          <div
            tabIndex={0}
            onKeyDown={(e) => {
              setSelected(firework.name);
              onChangeLocation(firework.tilesetUrl, firework.location);
            }}
            onClick={(e) => {
              setSelected(firework.name);
              onChangeLocation(firework.tilesetUrl, firework.location);
            }}
            role="button"
            css={css`
              border: 1px solid #16274a;
              margin: 0 0 -1px;
              padding: 0.2em;
              cursor: pointer;
              color: #fff;
              background-color: #233b6c;
              &:hover {
                background-color: #16274a;
                .location_name {
                  color: #fff;
                }
              }
              .location_name {
                color: #8693ad;
              }
              ${selected === firework.name &&
              `
            background-color: #16274a;
          `}
            `}
          >
            <div
              css={css`
                font-weight: bold;
              `}
            >
              {firework.name}
            </div>
            <span className="location_name">{firework.place}</span>
          </div>
        );
      })}
    </div>
  );
};
