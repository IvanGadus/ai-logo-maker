"use client";
import React, { useContext, useEffect, useState } from "react";
import { UserDetailContext } from "../_context/UserDetailContext";
import Prompt from "../_data/Prompt";
import axios from "axios";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import DownloadImage from "./_components/DownloadImage";
import { NextResponse } from "next/server";
import Link from "next/link";
import Lookup from "../_data/Lookup";

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
	idea?: string;
};

export default function Page() {
	const context = useContext(UserDetailContext);
	const { userDetail } = context as contextType;
	const [formData, setFormData] = useState<formDataType>();
	const [imgSrc, setImgSrc] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (typeof window !== "undefined" && userDetail?.email) {
			const storage = localStorage.getItem("formData");
			if (storage) {
				setFormData(JSON.parse(storage));
				// console.log(JSON.parse(storage));
			}
		}
	}, [userDetail]);

	useEffect(() => {
		const generateAILogo = async () => {
			setLoading(true);

			const PROMPT = Prompt.LOGO_PROMPT.replace(
				"{logoTitle}",
				formData?.title ?? ""
			)
				.replace("{logoDesc}", formData?.desc ?? "")
				.replace("{logoColor}", formData?.color ?? "")
				.replace("{logoIdea}", formData?.idea ?? "")
				.replace("{logoDesign}", formData?.design?.title ?? "")
				.replace("{logoPrompt}", formData?.design?.prompt ?? "");

			// console.log(PROMPT);

			try {
				// throw new Error("Error from API");
				const result = await axios.post(
					"/api/ai-logo-model",
					{
						prompt: PROMPT,
						email: userDetail?.email,
						title: formData?.title,
						desc: formData?.desc,
					},
					{ timeout: 240000 }
				);

				//zobrazit vysledok v obrazku
				setImgSrc(result.data.imageUrl);
				setLoading(false);
				localStorage.removeItem("formData");
			} catch (e) {
				setError("Something went wrong. Please try again.");
				console.log(e);
				setLoading(false);
				return NextResponse.json({ error: e });
			}
		};

		if (formData?.title) {
			generateAILogo();
		}
	}, [formData, userDetail?.email]);

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
					<div className="flex flex-col items-center gap-3">
						<h1 className="text-2xl text-primary font-bold">{error}</h1>
						<Button
							onClick={() => {
								setError(null);
								window.location.reload();
							}}
						>
							Try again
						</Button>
					</div>
				) : (
					<div className="flex flex-col items-center gap-1 mt-2">
						<p className="text-center">{Lookup.LoadingWaitDesc}</p>
						<p className="text-center">{Lookup.LoadingWaitDesc2}</p>
						<div className="loader mt-10 mb-10"></div>
					</div>
				)}
			</div>
			{imgSrc !== "" && (
				<div className="flex gap-20">
					<DownloadImage image={imgSrc} />
					<Link href="/dashboard">
						<Button variant={"outline"}>Dashboard</Button>
					</Link>
				</div>
			)}
		</div>
	);
}
