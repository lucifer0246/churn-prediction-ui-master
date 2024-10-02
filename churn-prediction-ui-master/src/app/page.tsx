'use client';

import { Grid } from '@mui/material';
import ModelInformation from './ModelInformation';

export default function Home() {
	return (
		<Grid
			sx={{
				width: '100%',
				height: '100%',
			}}
		>
			<ModelInformation />
		</Grid>
	);
}
