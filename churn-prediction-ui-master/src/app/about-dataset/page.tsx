import { Grid, List, ListItem, Tab, Tabs, Typography } from '@mui/material';

const categoricalFeatures = [
	`CustomerID: Customer ID unique for each customer`,
	'gender: Whether the customer is a male or a female',
	'SeniorCitizen: Whether the customer is a senior citizen or not (1, 0)',
	'Partner: Whether the customer has a partner or not (Yes, No)',
	'Dependent: Whether the customer has dependents or not (Yes, No)',
	'PhoneService: Whether the customer has a phone service or not (Yes, No)',
	'MultipeLines: Whether the customer has multiple lines or not (Yes, No, No phone service)',
	'InternetService: Customers internet service provider (DSL, Fiber optic, No)',
	'OnlineSecurity: Whether the customer has online security or not (Yes, No, No internet service)',
	'OnlineBackup: Whether the customer has an online backup or not (Yes, No, No internet service)',
	'DeviceProtection: Whether the customer has device protection or not (Yes, No, No internet service)',
	'TechSupport: Whether the customer has tech support or not (Yes, No, No internet service)',
	'StreamingTV: Whether the customer has streaming TV or not (Yes, No, No internet service)',
	'StreamingMovies: Whether the customer has streaming movies or not (Yes, No, No internet service)',
	'Contract: The contract term of the customer (Month-to-month, One year, Two years)',
	'PaperlessBilling: The contract term of the customer (Month-to-month, One year, Two years)',
	'PaymentMethod: The customers payment method (Electronic check, Mailed check, Bank transfer (automatic), Credit card (automatic))',
];

const numbericFeatures = [
	'Tenure: Number of months the customer has stayed with the company',
	'MonthlyCharges: The amount charged to the customer monthly',
	'TotalCharges: The total amount charged to the customer',
];

const AboutDataset = () => {
	return (
		<Grid
			sx={{
				padding: '2rem 12rem',
				overflowY: 'auto',
				height: '88vh',
			}}
		>
			<Typography
				sx={{ fontSize: '2.0rem', fontWeight: '600', marginBottom: '2.4rem' }}
			>
				{'About dataset'}
			</Typography>
			<Typography fontSize={'1.6rem'}>
				{`The sample data tracks a fictional telecommunications company, Telco. It's customer churn data sourced by the IBM Developer Platform, and it's available here. It includes a target label indicating whether or not the customer left within the last month, and other dependent features that cover demographics, services that each customer has signed up for, and customer account information. It has data for 7043 clients, with 20 features.`}
			</Typography>
			<Grid sx={{ marginTop: '2.4rem' }}>
				<Typography fontSize={'1.6rem'}>
					{'There are 17 categorical features:'}
				</Typography>
				<List>
					{categoricalFeatures.map((feature, index) => (
						<ListItem key={index}>
							<Typography fontSize={'1.6rem'}>{`${
								index + 1
							}. ${feature}`}</Typography>
						</ListItem>
					))}
				</List>
			</Grid>
			<Grid sx={{ marginTop: '2.4rem' }}>
				<Typography fontSize={'1.6rem'}>
					{'There are 3 numerical features:'}
				</Typography>
				<List>
					{numbericFeatures.map((feature, index) => (
						<ListItem key={index}>
							<Typography fontSize={'1.6rem'}>{`${
								index + 1
							}. ${feature}`}</Typography>
						</ListItem>
					))}
				</List>
			</Grid>
		</Grid>
	);
};

export default AboutDataset;
