import React from 'react';
import { Portal } from '../Portal/Portal';
import styles from './ModalWindow.module.css';
import { ModalWindowProps } from './ModalWindow.props';

export const ModalWindow = ({ children, isActive }: ModalWindowProps): JSX.Element | null => {

	if (!isActive) {
		return null
	}
	return (
		<Portal>
			<div className={styles.modal}>
				<div className={styles.content}>
					{children}
				</div>
			</div>
		</Portal>
	)
};
