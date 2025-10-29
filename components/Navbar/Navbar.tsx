import { IconButton, Typography, Stack, Divider, Box } from "@mui/material";
import { GroupAdd, Login } from "@mui/icons-material";

import Link from "next/link";

export default function Navbar() {
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
				<Divider orientation='vertical' />
				<Stack direction='row'>
					<Link href='/register'>
						<IconButton>
							<GroupAdd />
						</IconButton>
					</Link>
					<Link href='/login'>
						<IconButton>
							<Login />
						</IconButton>
					</Link>
				</Stack>
			</Box>
		</nav>
	);
}
