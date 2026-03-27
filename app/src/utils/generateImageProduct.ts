import { HOST_API } from "../services/api";

export function generateImageUrlProduct(url?: string): string {
  if (!url) return "https://www.shutterstock.com/image-vector/default-ui-image-placeholder-wireframes-600nw-1037719192.jpg";

  return `${HOST_API}${url}`;
}
