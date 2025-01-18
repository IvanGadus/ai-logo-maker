"use client";
import React, { useContext, useEffect, useState } from "react";
import { UserDetailContext } from "../_context/UserDetailContext";
import Lookup from "../_data/Lookup";
import Prompt from "../_data/Prompt";
import axios from "axios";
import Image from "next/image";
import { Loader2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import DownloadImage from "./_components/DownloadImage";
import { NextResponse } from "next/server";

type contextType = {
	userDetail: userDetailType | null;
	setUserDetail: React.Dispatch<React.SetStateAction<userDetailType | null>>;
};

type userDetailType = {
	email: string;
	name: string;
	credits: number;
};

type formDataType = {
	title?: string;
	desc?: string;
	color?: string;
	design?: {
		title: string;
		image: string;
		prompt: string;
	};
};

export default function page() {
	const context = useContext(UserDetailContext);
	const { userDetail, setUserDetail } = context as contextType;
	const [formData, setFormData] = useState<formDataType>();
	const [imgSrc, setImgSrc] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (typeof window !== "undefined" && userDetail?.email) {
			const storage = localStorage.getItem("formData");
			if (storage) {
				setFormData(JSON.parse(storage));
				console.log(JSON.parse(storage));
			}
		}
	}, [userDetail]);

	useEffect(() => {
		{
			formData?.title && generateAILogo();
		}
	}, [formData]);

	const generateAILogo = async () => {
		setLoading(true);

		const PROMPT = Prompt.LOGO_PROMPT.replace(
			"{logoTitle}",
			formData?.title ?? ""
		)
			.replace("{logoDesc}", formData?.desc ?? "")
			.replace("{logoColor}", formData?.color ?? "")
			.replace("{logoIdea}", formData?.design?.title ?? "")
			.replace("{logoDesign}", formData?.design?.title ?? "")
			.replace("{logoPrompt}", formData?.design?.prompt ?? "");

		// console.log(PROMPT);

		try {
			throw new Error("Error from API");
			const result = await axios.post("/api/ai-logo-model", {
				prompt: PROMPT,
				email: userDetail?.email,
				title: formData?.title,
				desc: formData?.desc,
			});

			//zobrazit vysledok v obrazku
			setImgSrc(result.data.imageUrl);
			setLoading(false);
		} catch (e) {
			setError("Something went wrong. Please try again.");
			setLoading(false);
			return NextResponse.json({ error: e });
		}
	};

	return (
		<div className="flex flex-col items-center mt-10">
			<h1 className="text-2xl text-primary font-bold">
				{!error && "Your logo is being created."}
			</h1>
			<div>
				{!loading && imgSrc !== "" ? (
					<Image
						className="my-10"
						src={imgSrc}
						width={400}
						height={400}
						alt="logo"
					/>
				) : error ? (
					<h1 className="text-2xl text-primary font-bold">{error}</h1>
				) : (
					<div className="flex flex-col items-center">
						<p>
							Please wait a moment while we work our magic to bring your logo to
							life.
						</p>
						<div className="loader mt-10 mb-10"></div>
					</div>
				)}
			</div>
			{imgSrc !== "" && (
				<div className="flex gap-20">
					<DownloadImage image={imgSrc} />
					<Button variant={"outline"}>Dashboard</Button>
				</div>
			)}
		</div>
	);
}
