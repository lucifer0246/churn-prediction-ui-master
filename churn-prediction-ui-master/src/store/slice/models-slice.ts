import { GetAllModelsInformationResponse, ModelInformation } from '@/client';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { getAllModels } from '../actions/model';

type ModelsInitialState = {
	allModels?: ModelInformation[];
};

const initialState: ModelsInitialState = {
	allModels: undefined,
};

const modelSlice = createSlice({
	name: 'models',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(
			getAllModels.fulfilled,
			(state, action: PayloadAction<GetAllModelsInformationResponse>) => {
				state.allModels = action.payload.models;
			},
		);
		builder.addCase(getAllModels.rejected, (state) => {
			state.allModels = [];
		});
	},
});

export default modelSlice.reducer;
