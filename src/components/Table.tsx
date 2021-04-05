import React from 'react';
import { checkIfObstacleExists, equals } from '../utils/utils';

interface Props {
	table: number[][];
	position: number[];
	width: number;
	prize: number[];
	obstacle: number[][];
}

export const Table: React.FC<Props> = ({ table, position, width, prize, obstacle }) => {
	return (
		<div style={{ padding: 20 }}>
			<table
				style={{
					border: '2px solid black',
				}}
			>
				<tbody>
					{table.map((row, index) => (
						<tr key={Math.random()}>
							{table[index].map((col, index) => (
								<td style={{ width: `calc(100% / ${width})` }} key={Math.random()}>
									{equals([col, index], position)
										? '🧲'
										: equals([col, index], prize)
										? '🏆'
										: checkIfObstacleExists(obstacle, [col, index])
										? '❌'
										: '-'}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};
