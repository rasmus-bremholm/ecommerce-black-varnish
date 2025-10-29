"use client";
import { IconButton, Typography, Stack, Divider, Box, Avatar } from "@mui/material";
import { GroupAdd, Login, Person } from "@mui/icons-material";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import getInitials from "@/utils/getInitials";

export default function Navbar() {
	const { user, isLoading } = useAuth();
	const initials = getInitials(user?.user_metadata.first_name, user?.user_metadata.last_name);
	console.log(initials);

	if (isLoading)
		return (
			<nav>
				<Box display='flex' flexDirection='row' alignItems='center' sx={{ p: 2 }}>
					<Stack direction='row' spacing={2}>
						<Link href='/'>
							<Typography>Home</Typography>
						</Link>
						<Link href='/products'>
							<Typography>Products</Typography>
						</Link>
						<Link href='/something'>
							<Typography>Something</Typography>
						</Link>
					</Stack>
				</Box>
			</nav>
		);

	return (
		<nav>
			<Box display='flex' flexDirection='row' justifyContent='space-between' alignItems='center' sx={{ py: 2, px: { xs: 1, sm: 2, md: 8, lg: 16 } }}>
				<Stack direction='row' spacing={2}>
					<Link href='/'>
						<Typography>Home</Typography>
					</Link>
					<Link href='/products'>
						<Typography>Products</Typography>
					</Link>
					<Link href='/something'>
						<Typography>Something</Typography>
					</Link>
				</Stack>
				<Divider orientation='vertical' />
				{user ? (
					// User IS logged in - show avatar and profile link
					<Stack direction='row'>
						<Link href='/profile'>
							<Box display='flex' alignItems='center'>
								<Typography>My Account</Typography>
								<Avatar alt={`${user.user_metadata.first_name} avatar`} sx={{ width: 24, height: 24 }}>
									{initials}
								</Avatar>
							</Box>
						</Link>
					</Stack>
				) : (
					// User is NOT logged in - show login button
					<Stack direction='row'>
						<Link href='/login'>
							<Box display='flex' alignItems='center'>
								<Typography>Login</Typography>
								<IconButton>
									<Login />
								</IconButton>
							</Box>
						</Link>
					</Stack>
				)}
			</Box>
		</nav>
	);
}
