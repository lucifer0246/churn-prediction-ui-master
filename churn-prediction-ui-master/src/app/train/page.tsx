'use client';

import { TrainService } from '@/client';
import FileUploadInput from '@/components/FileUploadInput';
import { useAppDispatch, useAppSelector } from '@/store';
import { getAllModels } from '@/store/actions/model';
import { LoadingButton } from '@mui/lab';
import {
	CircularProgress,
	FormHelperText,
	Grid,
	Typography,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const TrainModel = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [isTraning, setIsTraning] = useState(false);
	const user = useAppSelector((state) => state.user);
	const [apiError, setApiError] = useState('');
	const router = useRouter();

	const dispatch = useAppDispatch();

	useEffect(() => {
		if (user.isAuthenticated && user.user.role !== 'admin') {
			router.replace('/');
		}
	}, [user, router]);
	const onFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.currentTarget.files?.[0];
		setApiError('');
		if (file) {
			setIsLoading(true);
			try {
				const res = await TrainService.uploadDatasetTrainUploadDatasetPost({
					formData: {
						dataset: file,
					},
				});
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

	const onTrain = async () => {
		setIsTraning(true);
		setApiError('');
		try {
			const res = await TrainService.trainModelTrainTrainModelGet();
			await dispatch(getAllModels());
		} catch (e) {
			setApiError('Something went wrong! Please try again.');
		}
		setIsTraning(false);
	};

	return (
		<Grid
			sx={{
				margin: '0 10rem',
				padding: '2rem',
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
					PaymentMethod, MonthlyCharges, TotalCharges and Churn inorder to train
					the model.
				</Typography>
			</Grid>
			<Grid
				sx={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					gap: '20px',
				}}
			>
				<FileUploadInput onChange={onFileUpload} />
				<LoadingButton
					variant={'contained'}
					sx={{
						padding: '0.6rem 2.4rem',
						fontSize: '1.6rem',
						textTransform: 'capitalize',
					}}
					loading={isTraning}
					onClick={onTrain}
				>
					{'Train Model'}
				</LoadingButton>
			</Grid>
			{isLoading && (
				<Grid sx={{ display: 'flex', justifyContent: 'center' }}>
					<CircularProgress />
				</Grid>
			)}
			{apiError.length > 0 && (
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

export default TrainModel;
