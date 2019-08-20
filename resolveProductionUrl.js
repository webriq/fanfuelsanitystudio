export default function resolveProductionUrl(document) {
	return `https://fanfuelhq.com/preview?post=${document._id}`;
	console.log(document._id);
}
