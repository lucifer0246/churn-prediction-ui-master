'use client';
import LoginCard from '@/components/auth/LoginCard';
import { Grid, Typography } from '@mui/material';

const Auth = () => {
	return (
		<Grid
			sx={{ display: 'flex', flex: 1, background: '#84cc16', height: '100vh' }}
		>
			<Grid
				sx={{
					display: 'flex',
					flex: 1,
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				{<LoginCard />}
			</Grid>
			<Grid
				sx={{ display: 'flex', flex: 1, alignItems: 'center', height: '100%' }}
			>
				<Typography
					sx={{ fontSize: '64px', fontWeight: 700, color: '#365314' }}
				>
					{'Predict customer churn using machine learning'}
				</Typography>
			</Grid>
		</Grid>
	);
};

export default Auth;
