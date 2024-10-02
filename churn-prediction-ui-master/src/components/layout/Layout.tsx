'use client';
import {
	AppBar,
	Avatar,
	Box,
	Button,
	CircularProgress,
	Divider,
	Drawer,
	Grid,
	IconButton,
	List,
	ListItem,
	ListItemButton,
	Toolbar,
	Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './Layout.module.css';
import { useAppDispatch, useAppSelector } from '@/store';
import { usePathname, useRouter } from 'next/navigation';
import { setUser } from '@/store/slice/user-slice';
import { getAllModels } from '@/store/actions/model';

const TABS_USER = [
	{
		title: 'Model information',
		link: '/',
	},
	{
		title: 'Predict churn',
		link: '/predict',
	},
	{
		title: 'About dataset',
		link: '/about-dataset',
	},
];

const TABS_ADMIN = [
	{
		title: 'Model information',
		link: '/',
	},
	{
		title: 'Predict churn',
		link: '/predict',
	},
	{
		title: 'Train model',
		link: '/train',
	},
	{
		title: 'About dataset',
		link: '/about-dataset',
	},
];

const Layout = ({ children }: { children: React.ReactNode }) => {
	const drawerWidth = 240;
	const [activeTab, setActiveTab] = useState(0);
	const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated);
	const userData = useAppSelector((state) => state.user.user);
	const router = useRouter();
	const dispatch = useAppDispatch();
	const pathname = usePathname();
	const models = useAppSelector((state) => state.model.allModels);

	useEffect(() => {
		if ((models === undefined || models.length === 0) && isAuthenticated) {
			dispatch(getAllModels());
		}
	}, [models, dispatch, isAuthenticated]);

	useEffect(() => {
		if (isAuthenticated) {
			const idx = (
				userData.role === 'admin' ? TABS_ADMIN : TABS_USER
			).findIndex((tab) => tab.link.includes(pathname));
			setActiveTab(idx);
		}
	}, [isAuthenticated, pathname, userData]);

	useEffect(() => {
		if (!isAuthenticated) {
			router.replace('/auth');
		}
	}, [isAuthenticated, router]);

	if (!isAuthenticated) {
		return <Box>{children}</Box>;
	}

	const onLogout = () => {
		localStorage.removeItem('access_token');
		dispatch(
			setUser({
				isAuthenticated: false,
				user: {
					email: '',
					role: '',
				},
			}),
		);
		router.replace('/auth');
	};

	return models ? (
		<Box display={'flex'} overflow={'hidden'}>
			<Drawer
				sx={{
					width: drawerWidth,
					'& .MuiDrawer-paper': {
						width: drawerWidth,
						boxSizing: 'border-box',
					},
				}}
				variant='permanent'
				anchor='left'
			>
				<Toolbar sx={{ backgroundColor: '#262626' }} />
				<Divider />
				<List
					sx={{
						backgroundColor: '#262626',
						height: '100%',
					}}
				>
					{(userData.role === 'admin' ? TABS_ADMIN : TABS_USER).map(
						({ title, link }, index) => (
							<ListItem
								key={index}
								sx={{
									padding: '0',
									margin: '0',
									backgroundColor: index === activeTab ? '#84cc16' : 'unset',
								}}
							>
								<ListItemButton sx={{ padding: 0, margin: 0 }}>
									<Link
										href={link}
										onClick={() => {
											setActiveTab(index);
										}}
										className={styles.navLink}
									>
										<Typography
											sx={{
												paddingY: '1rem',
												fontSize: '1.6rem',
												color: index === activeTab ? '#171717' : '#fff',
												fontWeight: '700',
											}}
										>
											{title}
										</Typography>
									</Link>
								</ListItemButton>
							</ListItem>
						),
					)}
				</List>
			</Drawer>
			<Grid
				sx={{
					width: `calc(100% - ${drawerWidth}px)`,
					height: '100vh',
					overflow: 'hidden',
				}}
			>
				<AppBar sx={{ position: 'relative' }}>
					<Toolbar sx={{ justifyContent: 'right' }}>
						<IconButton id='basic-button'>
							<Avatar />
						</IconButton>
						<Button
							variant='outlined'
							sx={{ textTransform: 'unset', fontSize: '1.6rem' }}
							onClick={onLogout}
						>
							Logout
						</Button>
					</Toolbar>
				</AppBar>
				<Box
					component={'main'}
					sx={{
						backgroundColor: '#171717',
						height: '100%',
						position: 'relative',
					}}
				>
					{children}
				</Box>
			</Grid>
		</Box>
	) : (
		<Box
			sx={{
				flexGrow: 1,
				height: '100vh',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<CircularProgress />
		</Box>
	);
};

export default Layout;
