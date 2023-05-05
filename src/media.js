import { css } from '@emotion/react'
// import constant from './constant'
const constant = {
  spMax: 768,
  vwWidth: 750,
}
export const sp = (first, ...interpolations) => {
  return css`
    @media (max-width: ${constant.spMax}px) {
      ${css(first, ...interpolations)}
    }
  `
}

export const pc = (first, ...interpolations) => {
  return css`
    @media (min-width: ${constant.spMax + 1}px) {
      ${css(first, ...interpolations)}
    }
  `
}

export const vw = (pxValue) => {
  return (pxValue / constant.vwWidth) * 100 + 'vw'
}