"use client";
import { Box, Typography, FormControl, Input, InputLabel, Button, FormHelperText, Stack } from "@mui/material";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { validateEmail, validatePassword } from "../utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useToast } from "@/contexts/ToastContext";

export default function Login() {
	const supabase = createClient();
	const router = useRouter();
	const { showToast } = useToast();
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const [errors, setErrors] = useState({
		email: "",
		password: "",
	});

	const [touched, setTouched] = useState({
		email: false,
		password: false,
	});
	const [loading, setLoading] = useState(false);
	const [submitError, setSubmitError] = useState("");

	useEffect(() => {
		const newErrors = { email: "", password: "" };

		// Email Validation
		if (touched.email && formData.email) {
			if (!validateEmail(formData.email)) {
				newErrors.email = "Please enter a valid email address";
			}
		}
		// Password validation
		if (touched.password && formData.password) {
			if (!validatePassword(formData.password)) {
				newErrors.password = "Must be 5+ characters with uppercase, lowercase, and number";
			}
		}

		setErrors(newErrors);
	}, [formData, touched]);

	const handleInputChange = (field: string, value: string) => {
		setFormData({ ...formData, [field]: value });
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
		});

		// validation check
		if (errors.email || errors.password) {
			setSubmitError("Please fix the errors above");
			return;
		}

		setLoading(true);
		setSubmitError("");

		try {
			const { data, error } = await supabase.auth.signInWithPassword({
				email: formData.email,
				password: formData.password,
			});

			if (error) {
				setSubmitError(error.message);
				showToast(error.message, "error");
			} else {
				// Success!
				showToast("Successfully logged in! Redirecting...", "success");

				setTimeout(() => {
					router.push("/");
				}, 1000);
			}
		} catch (error) {
			const errorMessage = "An unexpected error occurred. Please try again.";
			setSubmitError(errorMessage);
			showToast(errorMessage, "error");
		} finally {
			setLoading(false);
		}
	};

	return (
		<main>
			<Box
				component='form'
				border={1}
				borderRadius={2}
				onSubmit={handleSubmit}
				display='flex'
				flexDirection='column'
				sx={{ gap: 2, maxWidth: 400, margin: "0 auto", p: 3 }}>
				<Typography variant='h4'>Login</Typography>

				<FormControl error={Boolean(errors.email && touched.email)}>
					<InputLabel htmlFor='input_email'>Email</InputLabel>
					<Input
						type='email'
						required
						onBlur={() => handleBlur("email")}
						id='input_email'
						value={formData.email}
						autoComplete='email'
						onChange={(e) => handleInputChange("email", e.target.value)}
					/>
					{errors.email && touched.email && <FormHelperText error>{errors.email}</FormHelperText>}
				</FormControl>

				<FormControl error={Boolean(errors.password && touched.password)}>
					<InputLabel htmlFor='input_password'>Password</InputLabel>
					<Input
						onBlur={() => handleBlur("password")}
						type='password'
						id='input_password'
						autoComplete='current-password'
						value={formData.password}
						onChange={(e) => handleInputChange("password", e.target.value)}
					/>
					{errors.password && touched.password && <FormHelperText error>{errors.password}</FormHelperText>}
				</FormControl>

				{submitError && <Typography color='error'>{submitError}</Typography>}

				<Stack gap={2} alignItems='center' mt={2}>
					<Button sx={{ width: "100%" }} type='submit' variant='contained' disabled={loading}>
						{loading ? "Logging In..." : "Login"}
					</Button>
					<Link href={"/register"}>
						<Typography>New here? Register Here</Typography>
					</Link>
				</Stack>
			</Box>
		</main>
	);
}
