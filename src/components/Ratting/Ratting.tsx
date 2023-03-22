import React from 'react';
import styles from './Ratting.module.css';
import { RattingProps } from './Ratting.props';

// в даному випадку, мемо можна не використовувати
export const Ratting = ({ title, points }: RattingProps): JSX.Element => {

	return (
		<div className={styles.ratting}>
			<h4 className={styles.title}>{title}</h4>
			<h3 className={styles.points}>{points}</h3>
		</div>
	)
};
