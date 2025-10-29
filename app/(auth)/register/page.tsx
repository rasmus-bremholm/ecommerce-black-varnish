"use client";
import { Box, Typography, FormControl, Input, InputLabel, Button } from "@mui/material";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function Register() {
	const supabase = createClient();
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
	});
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError("");

		const { data, error } = await supabase.auth.signUp({
			email,
			password,
			options: {
				data: {
					first_name: formData.firstName,
				},
			},
		});

      if(error){
         setError(error.message)
      } else{
         // Success!
         
      }
	};

	return (
		<main>
			<Box display='flex' flexDirection='column' sx={{ gap: 1 }}>
				<Typography>Create New Account</Typography>
				<FormControl>
					<InputLabel htmlFor='input_first_name'>Firstname: </InputLabel>
					<Input id='input_first_name' />
				</FormControl>
				<FormControl>
					<InputLabel htmlFor='input_last_name'>Lastname: </InputLabel>
					<Input id='input_last_name' />
				</FormControl>
				<FormControl>
					<InputLabel htmlFor='input_email'>Email: </InputLabel>
					<Input id='input_email' />
				</FormControl>
				<FormControl>
					<InputLabel htmlFor='input_password'>Password: </InputLabel>
					<Input id='input_password' />
				</FormControl>
			</Box>
		</main>
	);
}
