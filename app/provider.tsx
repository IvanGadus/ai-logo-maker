"use client";
import React, { useEffect, useState } from "react";
import Header from "./_components/Header";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { UserDetailContext } from "./_context/UserDetailContext";

type userDetailType = {
	email: string;
	name: string;
	credits: number;
};

export default function Provider({ children }: { children: React.ReactNode }) {
	const { user } = useUser();
	const [userDetail, setUserDetail] = useState<userDetailType | null>(null);

	useEffect(() => {
		const checkUserAuth = async () => {
			const result = await axios.post("/api/users", {
				userName: user?.fullName,
				userEmail: user?.primaryEmailAddress?.emailAddress,
			});
			// console.log(result.data);
			setUserDetail(result.data);
		};
		if (user) {
			checkUserAuth();
		}
	}, [user]);

	return (
		<div>
			<UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
				<Header />
				<div className="px-10 lg:px-32 xl:px-48 2xl:px-56">{children}</div>
			</UserDetailContext.Provider>
		</div>
	);
}
