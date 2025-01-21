import React from "react";
import HeadingDescription from "./HeadingDescription";
import Lookup from "@/app/_data/Lookup";

type LogoDescProps = {
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
	setEmptyDesc: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function LogoDesc({
	handleInputChange,
	formData,
	setEmptyDesc,
}: LogoDescProps) {
	const handleEmptyInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.value === "") {
			setEmptyDesc(true);
		} else {
			setEmptyDesc(false);
		}
	};
	return (
		<div className="my-10">
			<HeadingDescription
				title={Lookup.LogoDescTitle}
				description={Lookup.LogoDescDesc}
			/>
			<input
				className="p-4 border rounded-lg mt-5 w-full"
				type="text"
				placeholder={Lookup.LogoDescTitle}
				onChange={(e) => {
					handleInputChange(e.target.value);
					handleEmptyInput(e);
				}}
				defaultValue={formData?.desc}
			/>
		</div>
	);
}
