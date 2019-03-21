export default function resolveProductionUrl(document) {
  return `https://fanfuelgatsby.netlify.com/preview?post=${document._id}`;
}
