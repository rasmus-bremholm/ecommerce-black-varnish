// Export all your schema types here
// Example:
// export { default as post } from './post'
// export { default as author } from './author'
import productType from "./productType";
import brandType from "./brandType";
import categoryType from "./categoryType";
import { seoType } from "./seoType"; // assuming it's in objects folder

export const schemaTypes = [productType, brandType, categoryType, seoType];
