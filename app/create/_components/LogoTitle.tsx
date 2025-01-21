"use client";

import React, { useEffect, useState } from "react";
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
	setEmptyTitle: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function LogoTitle({
	handleInputChange,
	formData,
	setEmptyTitle,
}: handleInputChangeProps) {
	const searchParams = useSearchParams();
	const search = searchParams.get("title");
	const [title, setTitle] = useState(search || formData?.title);

	const stableHandleInputChange = React.useRef(handleInputChange);
	const stableSetEmptyTitle = React.useRef(setEmptyTitle);

	useEffect(() => {
		stableHandleInputChange.current = handleInputChange;
		stableSetEmptyTitle.current = setEmptyTitle;
	}, [handleInputChange, setEmptyTitle]);

	useEffect(() => {
		if (search !== null && search !== "") {
			stableHandleInputChange.current(search ?? "");
			stableSetEmptyTitle.current(false);
		} else {
			stableSetEmptyTitle.current(true);
		}
	}, [search]);

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
				value={title}
				onChange={(e) => {
					const value = e.target.value;
					setTitle(value);
					handleInputChange(value);
					setEmptyTitle(value === "");
				}}
			/>
		</div>
	);
}
