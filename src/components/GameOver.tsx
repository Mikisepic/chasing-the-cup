import React from 'react';

interface Props {
	pointsTotal: number;
}

export const GameOver: React.FC<Props> = ({ pointsTotal }) => {
	return <h1>Your Points: {pointsTotal}</h1>;
};
