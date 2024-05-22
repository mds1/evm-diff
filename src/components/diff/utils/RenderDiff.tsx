// Shows content if present, or a message if there's no diff.
export const RenderDiff = ({ content }: { content: JSX.Element }) => {
	const children = content.props.children as (boolean | null | JSX.Element)[];
	const isEmpty = children.every((child) => child === false);

	const EmptyDiff = () => (
		<div className="text-secondary my-4 text-base leading-7">No differences found.</div>
	);

	return !isEmpty ? content : <EmptyDiff />;
};
