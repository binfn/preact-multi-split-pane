/** @jsx  h */

import { Ref,ComponentChildren,memo,h } from './deps.ts';

export interface PaneProps {
	size: number;
	minSize: number;

	split: 'horizontal' | 'vertical';
	className: string;

	forwardRef: Ref<HTMLDivElement>;

	children: ComponentChildren;
}

const baseStyle: h.JSX.CSSProperties = {
	position: 'relative',
	outline: 'none',
	border: 0,
	overflow: 'hidden',
	display: 'flex',
	flexBasis: 'auto',
};

export const Pane = memo<PaneProps>(({ size, minSize, split, className, forwardRef, children }) => {
	const style: h.JSX.CSSProperties = {
		...baseStyle,
		flexGrow: size,
		flexShrink: size,
	};

	if (split === 'vertical') {
		style.width = 0;
		style.height = '100%';
		style.minWidth = minSize;
	} else {
		style.width = '100%';
		style.height = 0;
		style.minHeight = minSize;
	}

	const classes = ['Pane', split, className].join(' ');

	return (
		<div className={classes} style={style} ref={forwardRef}>
			{children}
		</div>
	);
});
Pane.displayName = 'Pane';
