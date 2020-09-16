import { createGlobalStyle } from "styled-components"

import { Colors } from "./constants/branding"

export default createGlobalStyle`
  body.noscroll {
    overflow: hidden;
  }

  h2 {
    color: ${Colors.HEADLINE};
  }

  p {
    line-height: 1.5;
  }
`