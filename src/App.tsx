import React, { useEffect, useState } from 'react';
import { Table } from './components/Table';

import { equals, handleKeys, setPrizeLocation } from './utils/utils';
import { cols, rows, table } from './utils/variables';

import './styles/App.css';
import { GameOver } from './components/GameOver';

export const App: React.FC = () => {
	const [seconds, setSeconds] = useState<number>(3);
	const [points, setPoints] = useState<number>(0);
	const [isGameOver, setIsGameOver] = useState<boolean>(false);
	const [currentPos, setCurrentPos] = useState<number[]>([0, 0]);

	const [prizePos, setPrizePos] = useState<number[]>([
		Math.floor(Math.random() * rows),
		Math.floor(Math.random() * cols),
	]);
	const [obstacles, setObstacles] = useState<number[][]>([
		[Math.floor(Math.random() * rows), Math.floor(Math.random() * cols)],
	]);

	const setPrizeLoc = () => {
		setPoints(points + 1);
		setPrizePos(setPrizeLocation(rows, cols, obstacles, currentPos, setObstacles));
	};

	const handleKeyEvent = (e: KeyboardEvent) => {
		e.preventDefault();
		handleKeys(e.keyCode, cols, rows, currentPos, obstacles, setCurrentPos);
	};

	// KeyboardPress EventListener
	useEffect(() => {
		if (seconds !== 0) {
			if (equals(currentPos, prizePos)) setPrizeLoc();
			window.addEventListener('keydown', handleKeyEvent);

			return () => {
				window.removeEventListener('keydown', handleKeyEvent);
			};
		}
	});

	// Keeping track of time left for the player
	useEffect(() => {
		if (seconds !== 0) {
			const interval = setInterval(() => {
				setSeconds((seconds) => seconds - 1);
			}, 1000);

			return () => {
				clearInterval(interval);
			};
		} else setIsGameOver(true);
	}, [seconds]);

	return (
		<div style={{ textAlign: 'center' }}>
			<h1>Navigate With Arrow Keys or WASD to Win Prizes</h1>
			<h1>{seconds} Left</h1>
			{isGameOver ? (
				<GameOver pointsTotal={points} />
			) : (
				<Table
					table={table}
					position={currentPos}
					width={cols}
					prize={prizePos}
					obstacle={obstacles}
				/>
			)}
		</div>
	);
};
