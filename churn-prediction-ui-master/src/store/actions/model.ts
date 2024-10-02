import { TrainService } from '@/client';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getAllModels = createAsyncThunk(
	'models/get-all-models',
	async () => {
		const response = await TrainService.getAllModelsTrainGetAllModelsGet();
		return response;
	},
);
