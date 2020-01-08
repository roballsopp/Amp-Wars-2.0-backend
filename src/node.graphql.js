import { nodeDefinitions, fromGlobalId } from 'graphql-relay';

const { nodeInterface, nodeField, nodesField } = nodeDefinitions((globalId, ctx) => {
	const { type, id } = fromGlobalId(globalId);

	const ModelsByType = {
		Amp: ctx.models.amp,
		User: ctx.models.user,
	};

	const TypeModel = ModelsByType[type];
	if (!TypeModel) throw new Error(`Attempted node query for unknown type: "${type}"`);
	return TypeModel.findById(id);
});

export { nodeInterface, nodeField, nodesField };
