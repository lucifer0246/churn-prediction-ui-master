'use client';

import { Tabs, Tab } from '@mui/material';
import { useState } from 'react';
import { TabContext, TabPanel } from '@mui/lab';
import PredictSingleValue from '../../components/predict/PredictSingleValue';
import PredictMultipleValues from '@/components/predict/PredictMultipleValues';

const PredictChurn = () => {
	const [activeTab, setActiveTab] = useState(0);

	return (
		<TabContext value={activeTab.toString()}>
			<Tabs
				value={activeTab}
				onChange={(_, value) => setActiveTab(value)}
				sx={{
					justifyContent: 'space-around',
					width: '100%',
				}}
			>
				<Tab
					value={0}
					label='Predict Single Record'
					sx={{ fontSize: '1.6rem', minWidth: '50%' }}
				/>
				<Tab
					value={1}
					label='Predict Multiple Records'
					sx={{ fontSize: '1.6rem', minWidth: '50%' }}
				/>
			</Tabs>
			<TabPanel value={'0'}>
				<PredictSingleValue />
			</TabPanel>
			<TabPanel value={'1'}>
				<PredictMultipleValues />
			</TabPanel>
		</TabContext>
	);
};

export default PredictChurn;
