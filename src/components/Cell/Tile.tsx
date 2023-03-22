import React, { useEffect, useRef } from 'react';
import styles from './Tile.module.css';
import { TileProps } from './Tile.props';

export const Tile = ({ children, x, y }: TileProps): JSX.Element => {

	const animateRef = useRef<boolean>(true);

	// щоб анімація появи була тільки 1 раз, при повторному перерендері не було неї
	useEffect(() => {
		if (animateRef.current) {
			animateRef.current = false;
		}
	}, []);

	const color = 100 - Math.log2(Number(children)) * 9;

	const args = {
		"--x": x,
		"--y": y,
		color: `hsl(25, 60%, ${color < 50 ? 90 : 10}%)`,
		backgroundColor: `hsl(25, 60%, ${100 - Math.log2(Number(children)) * 9}%)`
	};

	return (
		<div className={`${styles.tile} ${animateRef.current ? styles.animation : ''}`} style={args}>{children}</div>
	)
};
