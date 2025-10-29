"use client";
import { Box, Typography, FormControl, Input, InputLabel, Button, FormHelperText } from "@mui/material";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { validateEmail, validatePassword } from "../utils";

export default function Register() {
	const supabase = createClient();
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		confirmPassword: "",
	});

	const [errors, setErrors] = useState({
		email: "",
		password: "",
		confirmPassword: "",
	});

	const [touched, setTouched] = useState({
		email: false,
		password: false,
		confirmPassword: false,
	});
	const [loading, setLoading] = useState(false);
	const [submitError, setSubmitError] = useState("");
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	useEffect(() => {
		const newErrors = { email: "", password: "", confirmPassword: "" };

		// Email Validation
		if (touched.email && formData.email) {
			if (!validateEmail(formData.email)) {
				newErrors.email = "Please enter a valid email address";
			}
		}
		// Password validation
		if (touched.password && formData.password) {
			if (!validatePassword(formData.password)) {
				newErrors.password = "Minimum of 5 characters";
			}
		}

		// Confirm password
		if (touched.confirmPassword && formData.confirmPassword) {
			if (formData.password !== formData.confirmPassword) {
				newErrors.confirmPassword = "Passwords dont match";
			}
		}
		setErrors(newErrors);
	}, [formData, touched]);

	const handleInputChange = (field: string, value: string) => {
		setFormData({ ...formData, [field]: value });
		if (field === "password" && value.length > 0) {
			setShowConfirmPassword(true);
		}
	};

	const handleBlur = (field: string) => {
		setTouched({ ...touched, [field]: true });
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		// Mark all as touched to show errors.
		setTouched({
			email: true,
			password: true,
			confirmPassword: true,
		});

		// validation check
		if (errors.email || errors.password || errors.confirmPassword) {
			setSubmitError("Please fix the errors");
			return;
		}

		setLoading(true);
		setSubmitError("");

		const { data, error } = await supabase.auth.signUp({
			email: formData.email,
			password: formData.password,
			options: {
				data: {
					first_name: formData.firstName,
					last_name: formData.lastName,
				},
			},
		});

		if (error) {
			setSubmitError(error.message);
		} else {
			// Sucess!
			console.log(`User Created: ${data}`);
		}

		setLoading(false);
	};

	return (
		<main>
			<Box component='form' onSubmit={handleSubmit} display='flex' flexDirection='column' sx={{ gap: 1, maxWidth: 400, margin: "0 auto", p: 3 }}>
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
