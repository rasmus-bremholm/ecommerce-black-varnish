"use client";
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";
import { log } from "console";

interface AuthContextType {
	user: User | null;
	isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
	const supabase = createClient();
	const [user, setUser] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		// Get logged in user.
		const getUser = async () => {
			setIsLoading(true);
			const {
				data: { user },
			} = await supabase.auth.getUser();
			setIsLoading(false);
		};
		getUser();

		//Listen for auth changes
		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((_event, session) => {
			setUser(session?.user ?? null);
			setIsLoading(false);
		});

		// cleanup subscreiption
		return () => {
			subscription.unsubscribe();
		};
	}, []);
	console.log("Current User: ", user);
	return <AuthContext value={{ user, isLoading }}>{children}</AuthContext>;
}

export function useAuth() {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth must be used withing AuthProvider");
	}
	return context;
}
