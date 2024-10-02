import {
	Grid,
	Typography,
	TableCell,
	TableRow,
	TableHead,
	TableContainer,
	Table,
	TableBody,
	Paper,
	CircularProgress,
	Select,
	MenuItem,
	FormHelperText,
} from '@mui/material';
import FileUploadInput from '../FileUploadInput';
import React, { useState } from 'react';
import { PredictService } from '@/client';
import { useAppSelector } from '@/store';

const PredictMultipleValues = () => {
	const [predictResult, setPredictResult] = useState<number[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const models = useAppSelector((state) => state.model.allModels);
	const [selectedModel, setSelectedModel] = useState(models?.[0].id);
	const [apiError, setApiError] = useState('');

	const onFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
		setApiError('');
		const file = e.currentTarget.files?.[0];
		if (file && selectedModel) {
			setIsLoading(true);
			try {
				const res =
					await PredictService.predictMultipleValuePredictUploadFilePost({
						formData: {
							dataset: file,
						},
						selectedModelId: selectedModel,
					});

				setPredictResult(res.result);
			} catch (e: any) {
				setApiError(e?.body?.detail?.message || '');
			}

			setIsLoading(false);
		}
		if (e.currentTarget && e.currentTarget.value) {
			e.currentTarget.value = '';
			e.currentTarget.files = null;
		}
	};

	return (
		<Grid
			sx={{
				margin: '2rem 10rem',
				paddingLeft: '2rem',
				paddingRight: '2rem',
			}}
		>
			<Grid sx={{ marginBottom: '2.4rem' }}>
				<Typography sx={{ fontSize: '1.6rem', marginBottom: '1.2rem' }}>
					Upload the CSV file containing the customer data.
				</Typography>
				<Typography sx={{ fontSize: '1.6rem' }}>
					<span style={{ fontWeight: '600' }}>Note: </span>
					The file should contain the columns customerID, gender, SeniorCitizen,
					Partner, Dependents, tenure, PhoneService, MultipleLines,
					InternetService, OnlineSecurity, OnlineBackup, DeviceProtection,
					TechSupport, StreamingTV, StreamingMovies, Contract, PaperlessBilling,
					PaymentMethod, MonthlyCharges and TotalCharges to predict churn.
				</Typography>
			</Grid>

			<Grid
				sx={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					gap: '5rem',
				}}
			>
				{models && models.length > 0 && (
					<Select
						value={selectedModel}
						onChange={(e) => setSelectedModel(e.target.value)}
						sx={{ padding: '0px' }}
					>
						{models.map((model, index) => (
							<MenuItem key={model.id} value={model.id || index}>
								<Typography fontSize={'1.4rem !important'}>
									{model.model_name}
								</Typography>
							</MenuItem>
						))}
					</Select>
				)}
				<FileUploadInput onChange={onFileUpload} />
			</Grid>
			{apiError.length === 0 ? (
				<Grid sx={{ marginTop: '2.4rem' }}>
					{!isLoading && predictResult.length > 0 && (
						<TableContainer component={Paper} sx={{ maxHeight: '30rem' }}>
							<Table
								stickyHeader
								sx={{ minWidth: 700 }}
								aria-label='customized table'
							>
								<TableHead>
									<TableRow>
										<TableCell sx={{ fontSize: '1.8rem' }} align='center'>
											customer_no
										</TableCell>
										<TableCell sx={{ fontSize: '1.8rem' }} align='center'>
											is_churn
										</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{predictResult.map((isChurn, index) => (
										<TableRow key={index}>
											<TableCell
												sx={{ fontSize: '1.6rem' }}
												component='th'
												align='center'
												scope='row'
											>
												{index + 1}
											</TableCell>
											<TableCell sx={{ fontSize: '1.6rem' }} align='center'>
												{isChurn ? 'Yes' : 'No'}
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
					)}
					{isLoading && (
						<Grid sx={{ display: 'flex', justifyContent: 'center' }}>
							<CircularProgress />
						</Grid>
					)}
				</Grid>
			) : (
				<FormHelperText
					sx={{
						fontSize: '1.6rem',
						marginTop: '2.4rem',
						textAlign: 'center',
					}}
				>
					{apiError}
				</FormHelperText>
			)}
		</Grid>
	);
};

export default PredictMultipleValues;
