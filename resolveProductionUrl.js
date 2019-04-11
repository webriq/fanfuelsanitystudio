export default function resolveProductionUrl(document) {
	return `https://fanfuelhq.webriq.me/preview?post=${document._id}`;
	console.log(document._id);
}
