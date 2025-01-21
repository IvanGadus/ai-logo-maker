import React, { useState } from "react";
import HeadingDescription from "./HeadingDescription";
import Lookup from "@/app/_data/Lookup";
import Image from "next/image";
import LogoDesign from "@/app/_data/LogoDesign";

type LogoDesignProps = {
	handleInputChange: (
		value: string | { title: string; image: string; prompt: string }
	) => void;
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

export default function LogoDesigns({
	handleInputChange,
	formData,
}: LogoDesignProps) {
	const [selectedOption, setSelectedOption] = useState(formData?.design?.title);
	return (
		<div className="my-10">
			<HeadingDescription
				title={Lookup.LogoDesignTitle}
				description={Lookup.LogoDesignDesc}
			/>

			<div className="grid grid-cols-2 md:grid-cols-3 md:gap-10 gap-5 mt-10">
				{LogoDesign.map((design, index) => (
					<div
						className={` hover:outline outline-2 outline-offset-2 outline-primary rounded-xl cursor-pointer ${
							(selectedOption === design.title ||
								formData?.design?.title === design.title) &&
							"outline"
						}`}
						key={index}
						onClick={() => {
							setSelectedOption(design.title);
							handleInputChange(design);
						}}
					>
						<Image
							className="w-full rounded-xl h-[150px] object-cover"
							src={design.image}
							alt={design.title}
							width={300}
							height={200}
						/>
					</div>
				))}
			</div>
		</div>
	);
}
