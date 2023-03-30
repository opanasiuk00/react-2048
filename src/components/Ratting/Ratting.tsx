import React, { memo } from 'react';
import styles from './Ratting.module.css';
import { RattingProps } from './Ratting.props';

export const Ratting = memo(({ title, points }: RattingProps): JSX.Element => {

	return (
		<div className={styles.ratting}>
			<h4 className={styles.title}>{title}</h4>
			<h3 className={styles.points}>{points}</h3>
		</div>
	)
});
