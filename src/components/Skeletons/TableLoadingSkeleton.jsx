import { Box, Skeleton } from '@mui/material';
import React from 'react';

const TableLoadingSkeleton = () => {
	return (
		<Box
			sx={{
				height: 'max-content',
			}}
		>
			{[...Array(10)].map((_, index) => (
				<Skeleton key={index} variant='rectangular' sx={{ my: 4, mx: 2 }} />
			))}
		</Box>
	);
};

export default TableLoadingSkeleton;
