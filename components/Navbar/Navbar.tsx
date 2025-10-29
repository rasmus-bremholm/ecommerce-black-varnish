"use client";
import { IconButton, Typography, Stack, Divider, Box, Avatar, Skeleton } from "@mui/material";
import { Login } from "@mui/icons-material";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import getInitials from "@/utils/getInitials";

export default function Navbar() {
	const { user, isLoading } = useAuth();
	const initials = getInitials(user?.user_metadata.first_name, user?.user_metadata.last_name);

	return (
		<Box
			component='nav'
			display='flex'
			flexDirection='row'
			justifyContent='space-between'
			alignItems='center'
			sx={{ py: 2, px: { xs: 1, sm: 2, md: 8, lg: 16 } }}>
			<Stack direction='row' spacing={2}>
				<Typography component={Link} href='/'>
					Home
				</Typography>
				<Typography component={Link} href='/products'>
					Products
				</Typography>
				<Typography component={Link} href='/new'>
					New Arrivals
				</Typography>
				<Typography component={Link} href='/categories'>
					Categories
				</Typography>
			</Stack>

			<Divider orientation='vertical' />

			{isLoading ? (
				// Loading state
				<Skeleton variant='circular' width={24} height={24} />
			) : user ? (
				// User IS logged in
				<Box component={Link} href='/profile' display='flex' alignItems='center' sx={{ gap: 1 }}>
					<Typography>My Account</Typography>
					<Avatar alt={`${user.user_metadata.first_name} avatar`} sx={{ width: 24, height: 24 }}>
						{initials}
					</Avatar>
				</Box>
			) : (
				// User is NOT logged in
				<Box component={Link} href='/login' display='flex' alignItems='center'>
					<Typography>Login</Typography>
					<IconButton size='small'>
						<Login />
					</IconButton>
				</Box>
			)}
		</Box>
	);
}
