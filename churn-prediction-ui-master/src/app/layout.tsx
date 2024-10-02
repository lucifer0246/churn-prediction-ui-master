'use client';
import './globals.css';
import ThemeRegistry from '@/components/ThemeRegistry/ThemeRegistry';
import { Provider } from 'react-redux';
import store from '@/store';
import Layout from '@/components/Layout/layout';

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body>
				<ThemeRegistry>
					<Provider store={store}>
						<Layout>{children}</Layout>
					</Provider>
				</ThemeRegistry>
			</body>
		</html>
	);
}
