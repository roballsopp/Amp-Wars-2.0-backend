import { cursorToOffset } from 'graphql-relay';

export function getPaginationOptsFromConnectionArgs(args) {
	const paginationsOpts = { offset: 0 };
	if (Number.isFinite(args.first)) {
		paginationsOpts.limit = args.first;
		if (args.after) {
			paginationsOpts.offset = cursorToOffset(args.after) + 1;
		}
	} else if (Number.isFinite(args.last)) {
		paginationsOpts.limit = args.last;
		if (args.before) {
			const offset = cursorToOffset(args.before) - args.last;
			paginationsOpts.offset = Math.max(offset, 0);
		}
	}
	return paginationsOpts;
}
