/// <reference types="next/image-types/global" />

declare module '*.svg' {
  const content: StaticImageData

  export default content
}
