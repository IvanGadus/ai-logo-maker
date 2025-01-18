"use client";

import React, { useEffect } from "react";
import HeadingDescription from "./HeadingDescription";
import Lookup from "@/app/_data/Lookup";
import { useSearchParams } from "next/navigation";

type handleInputChangeProps = {
	handleInputChange: (value: string) => void;
	formData: {
		desc?: string;
		title?: string;
		color?: string;
		design?: {
			title: string;
			image: string;
			prompt: string;
		};
	};
};
export default function LogoTitle({
	handleInputChange,
	formData,
}: handleInputChangeProps) {
	const searchParam = useSearchParams();
	const [title, setTitle] = React.useState(
		searchParam?.get("title") || formData?.title
	);

	useEffect(() => {
		const title = searchParam?.get("title") ?? "";
		handleInputChange(title);
	}, []);

	return (
		<div className="my-10">
			<HeadingDescription
				title={Lookup.LogoTitle}
				description={Lookup.LogoTitleDesc}
			/>
			<input
				className="p-4 border rounded-lg mt-5 w-full"
				type="text"
				placeholder={Lookup.InputTitlePlaceholder}
				defaultValue={title}
				onChange={(e) => handleInputChange(e.target.value)}
			/>
		</div>
	);
}
