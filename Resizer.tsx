
/** @jsx  h */

import { h,useCallback,memo } from './deps.ts';

import { ClientPosition } from './util.ts';

export interface ResizerProps {
	split: 'horizontal' | 'vertical';
	className: string;
	index: number;

	onDragStarted: (index: number, pos: ClientPosition) => void;
}

export const Resizer = memo<ResizerProps>(({ split, className, index, onDragStarted }) => {
	const handleMouseDown = useCallback(
		(event: MouseEvent) => {
			event.preventDefault();

			onDragStarted(index, event);
		},
		[index, onDragStarted],
	);

	const handleTouchStart = useCallback(
		(event: TouchEvent) => {
			event.preventDefault();

			onDragStarted(index, event.touches[0]);
		},
		[index, onDragStarted],
	);

	const classes = ['Resizer', split, className].join(' ');

	return (
		<span
			role='presentation'
			className={classes}
			style={{ flex: 'none' }}
			onMouseDown={handleMouseDown}
			onTouchStart={handleTouchStart}
		/>
	);
});
Resizer.displayName = 'Resizer';
