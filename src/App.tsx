import React, { useEffect, useState } from 'react';
import styles from './App.module.css';
import { nanoid } from 'nanoid';
import { Tile } from './components/Cell/Tile';
import { groupCellByColumn, groupCellByColumnReverce, groupCellByRow, groupCellByRowReverse, slideTilesInGroup, sortArray } from './Utils/Utils';
import { Ratting } from './components/Ratting/Ratting';
import { ModalWindow } from './components/ModalWindow/ModalWindow';
import { useSwipeable } from 'react-swipeable';
import { tileTipe } from './Utils/tyleTipe';
import { CELL, GRID_COUNT, GRID_SIZE } from './Utils/initialState';

const dataJson = localStorage.getItem('2048-react');
const data = dataJson ? JSON.parse(dataJson) : [];


function App() {
	// масів квадратіків 
	const [tileArray, setTileArray] = useState<tileTipe[] | []>(data);
	// макс число
	const [maxCurr, setMaxCurr] = useState<number>(0);
	// для модального вікна, title - заголовок, isActive - стан вікна
	const [isActiveModal, setIsActiveModal] = useState<{ isActive: boolean, title: string | null }>({ isActive: false, title: null });
	// пошук найбільшого числа
	const getMaxCurr: number = Math.max(...tileArray.map((obj) => obj.name));
	// унікальний id
	const id: string = nanoid();

	//створення нового квадратіка 2 або 4, і відобразити його на рандомному вільному місці
	function createNew(arr: tileTipe[] | []) {
		const trace = CELL.filter(cellItem => !arr.some(tileItem => cellItem.x === tileItem.x && cellItem.y === tileItem.y));
		const randomIndex = Math.floor(Math.random() * trace.length);
		setTileArray([...arr, { id: id, name: (Math.random() > 0.5 ? 2 : 4), ...trace[randomIndex] }]);
	}

	// створення нового квадратіка при 1 рендері
	useEffect(() => {
		if (tileArray.length === 0) {
			createNew(tileArray)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {

		window.addEventListener('keydown', handleKeyDown);

		const setLocal = JSON.stringify(tileArray);
		localStorage.setItem('2048-react', setLocal);

		// макс, набране число
		setMaxCurr(getMaxCurr);

		// якщо 2048 набрано то win
		if (getMaxCurr === 2048) {
			setIsActiveModal({ isActive: true, title: 'You win!' })
			window.removeEventListener('keydown', handleKeyDown);
		}

		// якщо нема ходів і не було набрано 2048 то 'Game over!'
		if (tileArray.length === GRID_COUNT && !moveUp(tileArray) && !moveDown(tileArray) && !moveLeft(tileArray) && !moveRight(tileArray) && getMaxCurr !== 2048) {
			setIsActiveModal({ isActive: true, title: 'Game over!' })
			window.removeEventListener('keydown', handleKeyDown);
		}
		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [tileArray])

	const handleKeyDown = (e: KeyboardEvent) => {
		switch (e.key) {
			case 'ArrowUp':
				neeedToRender(moveUp(tileArray));
				break;
			case 'ArrowDown':
				neeedToRender(moveDown(tileArray));
				break;
			case 'ArrowLeft':
				neeedToRender(moveLeft(tileArray));
				break;
			case 'ArrowRight':
				neeedToRender(moveRight(tileArray));
				break;

			default:
				return;
		}
	}


	const handlers = useSwipeable(
		{
			onSwipedLeft: () => {
				neeedToRender(moveLeft(tileArray));
			},
			onSwipedRight: () => {
				neeedToRender(moveRight(tileArray));
			},
			onSwipedUp: () => {
				neeedToRender(moveUp(tileArray));
			},
			onSwipedDown: () => {
				neeedToRender(moveDown(tileArray));
			}
		});

	function moveUp(array: tileTipe[]) {
		const groupCell = groupCellByColumn(array);
		return SlideTiles(groupCell, array, 'start', 'y', (GRID_SIZE - 1));
	}

	function moveDown(array: tileTipe[]) {
		const groupCell = groupCellByColumnReverce(array);
		return SlideTiles(groupCell, array, 'end', 'y', (GRID_SIZE - 1));
	}
	function moveLeft(array: tileTipe[]) {
		const groupCell = groupCellByRow(array);
		return SlideTiles(groupCell, array, 'start', 'x', (GRID_SIZE - 1));
	}
	function moveRight(array: tileTipe[]) {
		const groupCell = groupCellByRowReverse(array);
		return SlideTiles(groupCell, array, 'end', 'x', (GRID_SIZE - 1));
	}

	const neeedToRender = (state: tileTipe[] | null) => {
		if (state) {
			createNew(state);
		}
	}

	// 
	function SlideTiles(groupTiles: tileTipe[][], prevTiles: tileTipe[], position: string, transform: string, size: number) {

		const newTiles = groupTiles.flatMap(item => slideTilesInGroup(item, position, transform, size));

		const coincidence = sortArray(prevTiles, newTiles);

		if (!coincidence) {
			return null;
		}

		return newTiles;
	}

	// кнопка New game
	const handleNewGame = () => {
		createNew([]);
	}

	// кнопка в модальному вікні
	const handleTryAgain = () => {
		handleNewGame();
		setIsActiveModal({ isActive: false, title: null })
	}

	return (
		<>
			<div className={styles.wrapper} {...handlers}>
				<div className={styles.container}>
					<header className={styles.header}>
						<h1>2048</h1>
						<Ratting title='Score' points={maxCurr} />
					</header>
					<div className={styles.gameBoard}>
						{
							CELL.map((item, i) => <div key={i} className={styles.cell} />)

						}
						{
							tileArray.map((item) => <Tile key={item.id} y={item.y} x={item.x}>{item.name}</Tile>)
						}
					</div>
					<button className={styles.button} onClick={handleNewGame}>New game</button>
				</div>
				<ModalWindow isActive={isActiveModal.isActive}>
					<h2 className={styles.modalTitle}>{isActiveModal ? isActiveModal.title : 'Error'}</h2>
					<button className={`${styles.button} ${styles.modalButton}`} onClick={handleTryAgain}>Try again</button>
				</ModalWindow>
			</div>
		</>
	);
}

export default App;
