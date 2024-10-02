import {
	Button,
	FormControl,
	FormHelperText,
	Grid,
	TextField,
	Typography,
} from '@mui/material';
import styles from './authcard.module.css';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch } from '@/store';
import { setUser } from '@/store/slice/user-slice';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useRouter } from 'next/navigation';
import { AuthService, OpenAPI } from '@/client';

const LoginCard = () => {
	const [isShowLogin, setIsShowLogin] = useState(true);
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [apiError, setApiError] = useState('');

	const dispatch = useAppDispatch();
	const router = useRouter();
	const {
		register,
		handleSubmit,
		formState: { errors, defaultValues },
		watch,
	} = useForm({
		defaultValues: {
			email: '',
			password: '',
			confirm_password: '',
		},
	});

	const passwordContainsLowerCase = /^(?=.*[a-z])/.test(watch('password'));
	const passwordContainsUpperCase = /^(?=.*[A-Z])/.test(watch('password'));
	const passwordContainsDigit = /^(?=.*\d)/.test(watch('password'));
	const passwordContainsSpecialChar = /^(?=.*[@.#$!%*?&^])/.test(
		watch('password'),
	);
	const passwordContainsMoreCharacters = watch('password').length >= 8;

	useEffect(() => {
		OpenAPI.TOKEN = localStorage.getItem('access_token') ?? '';
		OpenAPI.BASE = process.env.API_BASE_URL ?? '';

		(async () => {
			try {
				const res = await AuthService.getCurrentUserCurrentUserGet();
				dispatch(
					setUser({
						isAuthenticated: true,
						user: {
							email: res.email,
							role: res.role,
						},
					}),
				);
				router.replace('/');
			} catch (e) {
				console.log(e);
			}
		})();
	}, [dispatch, router]);

	const onSubmit = async (data: typeof defaultValues) => {
		setApiError('');
		try {
			if (isShowLogin) {
				const res = await AuthService.loginAuthPost({
					requestBody: {
						email: data?.email!,
						password: data?.password!,
					},
				});
				localStorage.setItem('access_token', res.access_token);
				OpenAPI.TOKEN = res.access_token;
				dispatch(
					setUser({
						isAuthenticated: true,
						user: {
							email: res.email,
							role: res.role,
						},
					}),
				);
				router.replace('/');
			} else {
				const res = await AuthService.createUserCreateUserPost({
					requestBody: {
						email: data?.email!,
						password: data?.password!,
						confirm_password: data?.confirm_password!,
					},
				});
				localStorage.setItem('access_token', res.access_token);
				OpenAPI.TOKEN = res.access_token;
				dispatch(
					setUser({
						isAuthenticated: true,
						user: {
							email: res.email,
							role: res.role,
						},
					}),
				);
				router.replace('/');
			}
		} catch (e: any) {
			setApiError(e?.body?.detail?.message || '');
		}
	};

	const password = watch('password');



	return (
		<Grid className={styles.authcard} boxShadow={3}>
			<Typography className={styles.cardTitle}>
				{isShowLogin ? 'Login' : 'Sign Up'}
			</Typography>
			<form className={styles.fromContainer}>
				<Grid className={styles.inputBox}>
					<FormControl className={styles.inputContainer}>
						<Typography className={styles.inputLabel}>E-mail</Typography>
						<TextField
							inputProps={{
								className: styles.fromInput,
							}}
							type='email'
							variant='filled'
							{...register('email', {
								validate: (val) => {
									if (val.length === 0) {
										return 'Please enter email.';
									}

									if (!val.includes('@')) {
										return 'Please enter valid email.';
									}
									return true;
								},
								pattern: {
									value: /(.+)@(.+){2,}\.(.+){2,}/,
									message: 'Invalid Email Address',
								},
								setValueAs(value) {
									return value.replace(/\s/g, '');
								},
							})}
							helperText={errors.email?.message}
							FormHelperTextProps={{
								className: styles.helperText,
							}}
						/>
					</FormControl>
					<FormControl className={styles.inputContainer}>
						<Typography className={styles.inputLabel}>Password</Typography>
						<TextField
							inputProps={{
								className: styles.fromInput,
							}}
							type={showPassword ? 'text' : 'password'}
							InputProps={{
								endAdornment: !showPassword ? (
									<VisibilityIcon
										sx={{ fontSize: '2rem', cursor: 'pointer' }}
										onClick={() => setShowPassword((prev) => !prev)}
									/>
								) : (
									<VisibilityOffIcon
										sx={{ fontSize: '2rem', cursor: 'pointer' }}
										onClick={() => setShowPassword((prev) => !prev)}
									/>
								),
							}}
							variant='filled'
							{...register('password', {
								validate: (val) => {
									if (val.length === 0) {
										return 'Please enter password.';
									}

									if (val.length < 8) {
										return 'Password should contains at least 8 characters.';
									}
									return true;
								},
								pattern: !isShowLogin
									? {
											value:
												/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,}$/,
											message: 'Please enter strong password',
									  }
									: undefined,
								setValueAs(value) {
									return value.replace(/\s/g, '');
								},
							})}
							FormHelperTextProps={{
								className: styles.helperText,
							}}
							helperText={errors.password?.message}
						/>
						<Grid
							display={!isShowLogin ? 'flex' : 'none'}
							justifyContent={'space-between'}
							flexWrap={'wrap'}
							marginTop={'1.2rem'}
						>
							<Typography
								color={
									errors.password?.message && !passwordContainsLowerCase
										? '#DB0303'
										: passwordContainsLowerCase
										? '#84cc16'
										: '#7B7B7B99'
								}
								className={styles.passwordConditionsContainer}
							>
								<CheckCircleIcon sx={{ fontSize: { md: '12px', xs: '8px' } }} />
								{'Lower Case'}
							</Typography>
							<Typography
								color={
									errors.password?.message && !passwordContainsUpperCase
										? '#DB0303'
										: passwordContainsUpperCase
										? '#84cc16'
										: '#7B7B7B99'
								}
								className={styles.passwordConditionsContainer}
							>
								<CheckCircleIcon sx={{ fontSize: { md: '12px', xs: '8px' } }} />
								{'Upper Case'}
							</Typography>
							<Typography
								color={
									errors.password?.message && !passwordContainsDigit
										? '#DB0303'
										: passwordContainsDigit
										? '#84cc16'
										: '#7B7B7B99'
								}
								className={styles.passwordConditionsContainer}
							>
								<CheckCircleIcon sx={{ fontSize: { md: '12px', xs: '8px' } }} />
								{'Number'}
							</Typography>
							<Typography
								color={
									errors.password?.message && !passwordContainsSpecialChar
										? '#DB0303'
										: passwordContainsSpecialChar
										? '#84cc16'
										: '#7B7B7B99'
								}
								className={styles.passwordConditionsContainer}
							>
								<CheckCircleIcon sx={{ fontSize: { md: '12px', xs: '8px' } }} />
								{'Special Character'}
							</Typography>
							<Typography
								color={
									errors.password?.message && !passwordContainsMoreCharacters
										? '#DB0303'
										: passwordContainsMoreCharacters
										? '#84cc16'
										: '#7B7B7B99'
								}
								className={styles.passwordConditionsContainer}
							>
								<CheckCircleIcon sx={{ fontSize: { md: '12px', xs: '8px' } }} />
								{'8+ Characters'}
							</Typography>
						</Grid>
					</FormControl>
					{!isShowLogin && (
						<FormControl className={styles.inputContainer}>
							<Typography className={styles.inputLabel}>
								Confirm password
							</Typography>
							<TextField
								inputProps={{
									className: styles.fromInput,
								}}
								type={showConfirmPassword ? 'text' : 'password'}
								variant='filled'
								{...register('confirm_password', {
									validate: (val) => {
										if (val.length === 0) {
											return 'Please confirm password.';
										}

										if (val !== password) {
											return `Confirmed password doesn't match! Confirm again.`;
										}
										return true;
									},
								})}
								InputProps={{
									endAdornment: !showConfirmPassword ? (
										<VisibilityIcon
											sx={{ fontSize: '2rem', cursor: 'pointer' }}
											onClick={() => setShowConfirmPassword((prev) => !prev)}
										/>
									) : (
										<VisibilityOffIcon
											sx={{ fontSize: '2rem', cursor: 'pointer' }}
											onClick={() => setShowConfirmPassword((prev) => !prev)}
										/>
									),
								}}
								FormHelperTextProps={{
									className: styles.helperText,
								}}
								helperText={errors.confirm_password?.message}
							/>
						</FormControl>
					)}
				</Grid>
				<FormHelperText sx={{ fontSize: '1.2rem', marginBottom: '1rem' }}>
					{apiError}
				</FormHelperText>
				<Grid className={styles.btnContainer}>
					<Button
						variant='contained'
						className={styles.btn}
						onClick={handleSubmit(onSubmit)}
					>
						{isShowLogin ? 'Login' : 'Sign up'}
					</Button>
					<Typography
						sx={{
							cursor: 'pointer',
							fontSize: '1.6rem',
							textAlign: 'center',
							color: '#ffffff',
						}}
					>
						{isShowLogin ? 'New user? ' : 'Existing user? '}
						<span
							onClick={() => setIsShowLogin((prev) => !prev)}
							className={styles.signInLoginLink}
						>
							{isShowLogin ? 'Sign Up' : 'Login'}
						</span>
					</Typography>
				</Grid>
			</form>
		</Grid>
	);
};

export default LoginCard;
