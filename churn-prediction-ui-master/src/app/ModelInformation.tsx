import {
	CircularProgress,
	Grid,
	Typography,
	TableCell,
	TableContainer,
	TableBody,
	Table,
	TableRow,
	Paper,
	TableHead,
} from '@mui/material';
import { useAppSelector } from '@/store';

const ModelInformation = () => {
	const models = useAppSelector((state) => state.model.allModels);

	return models ? (
		<Grid
			sx={{
				display: 'flex',
				flexDirection: 'column',
				padding: '40px',
				height: '100%',
			}}
		>
			<Grid>
				<Typography
					sx={{
						fontSize: '24px',
						fontWeight: '600',
						marginBottom: '20px',
					}}
				>
					{'All Models Information'}
				</Typography>
			</Grid>
			<Grid
				sx={{
					display: 'flex',
					flexDirection: 'column',
					width: '100%',
					height: '100%',
					alignItems: 'center',
				}}
			>
				<TableContainer component={Paper}>
					<Table stickyHeader aria-label='customized table'>
						<TableHead>
							<TableRow>
								{[
									'Sr No.',
									'Model Name',
									'Accurancy',
									'Precision',
									'Recall',
									'F1 Score',
								].map((title, index) => (
									<TableCell
										key={index}
										sx={{ fontSize: '1.6rem' }}
										component='th'
										align='center'
										scope='row'
									>
										{title}
									</TableCell>
								))}
							</TableRow>
						</TableHead>
						<TableBody>
							{models.map((model, index) => (
								<TableRow key={model.id}>
									<TableCell sx={{ fontSize: '1.6rem' }} align='center'>
										{index + 1}
									</TableCell>
									<TableCell sx={{ fontSize: '1.6rem' }} align='center'>
										{model.model_name}
									</TableCell>
									<TableCell sx={{ fontSize: '1.6rem' }} align='center'>
										{model.accurancy}
									</TableCell>
									<TableCell sx={{ fontSize: '1.6rem' }} align='center'>
										{model.precision}
									</TableCell>
									<TableCell sx={{ fontSize: '1.6rem' }} align='center'>
										{model.recall}
									</TableCell>
									<TableCell sx={{ fontSize: '1.6rem' }} align='center'>
										{model.f_score}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</Grid>
		</Grid>
	) : (
		<Grid
			sx={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				minHeight: '60vh',
				width: '100%',
			}}
		>
			<CircularProgress />
		</Grid>
	);
};

export default ModelInformation;
