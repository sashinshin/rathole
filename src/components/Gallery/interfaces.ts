export interface ImageData {
  src: string;
  alt: string;
  about?: string;
}

export interface ImageStyles {
  top: string;
  left: string;
  width: string;
}
  
export type StyledImageData = ImageData & ImageStyles;