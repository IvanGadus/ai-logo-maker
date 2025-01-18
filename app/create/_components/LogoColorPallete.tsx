"use client";
import React, { useState } from "react";
import HeadingDescription from "./HeadingDescription";
import Lookup from "@/app/_data/Lookup";
import Colors from "@/app/_data/Colors";

type LogoColorPalleteProps = {
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
export default function LogoColorPallete({
	handleInputChange,
	formData,
}: LogoColorPalleteProps) {
	const [selectedOption, setSelectedOption] = useState(formData?.color);

	return (
		<div className="my-10">
			<HeadingDescription
				title={Lookup.LogoColorPaletteTitle}
				description={Lookup.LogoColorPaletteDesc}
			/>
			<div className="grid grid-cols-2 md:grid-cols-3 gap-5 mt-5">
				{Colors.map((pallete, index) => (
					<div
						className={`flex hover:outline outline-2 outline-offset-2 outline-primary cursor-pointer ${
							(selectedOption === pallete.name ||
								formData?.color === pallete.name) &&
							"outline"
						}`}
						key={index}
					>
						{pallete?.colors.map((color, index) => (
							<div
								onClick={() => {
									setSelectedOption(pallete.name);
									handleInputChange(pallete.name);
								}}
								className="h-24 w-full"
								style={{ backgroundColor: color }}
								key={index}
							></div>
						))}
					</div>
				))}
			</div>
		</div>
	);
}
