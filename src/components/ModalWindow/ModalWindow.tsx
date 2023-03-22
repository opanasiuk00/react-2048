import React from 'react';
import styles from './ModalWindow.module.css';
import { ModalWindowProps } from './ModalWindow.props';

export const ModalWindow = ({ children, isActive }: ModalWindowProps): JSX.Element => {

	if (!isActive) {
		return <></>
	}
	return (
		<div className={styles.modal}>
			<div className={styles.content}>
				{children}
			</div>
		</div>
	)
};
