import React, { useEffect, useState } from "react";
import HeadingDescription from "./HeadingDescription";
import Lookup from "@/app/_data/Lookup";
import Prompt from "@/app/_data/Prompt";
import { Loader2Icon } from "lucide-react";

type LogoIdeaProps = {
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

export default function LogoIdea({
	handleInputChange,
	formData,
}: LogoIdeaProps) {
	const [ideas, setIdeas] = useState([]);
	const [loading, setLoading] = useState(false);
	const [selectedOption, setSelectedOption] = useState("");

	useEffect(() => {
		generateLogoIdea();
	}, []);
	const generateLogoIdea = async () => {
		setLoading(true);
		const PROMPT = Prompt.DESIGN_IDEA_PROMPT.replace(
			"{logoType}",
			formData?.design?.title ?? ""
		)
			.replace("{logoTitle}", formData?.title ?? "")
			.replace("{logoDesc}", formData.desc ?? "")
			.replace("{logoPrompt}", formData?.design?.prompt ?? "");

		const result = await fetch("/api/ai-design-ideas", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ prompt: PROMPT }),
		});
		const data = await result.json();
		setIdeas(data.ideas);
		setLoading(false);
	};

	return (
		<div className="my-10">
			<HeadingDescription
				title={Lookup.LogoIdeaTitle}
				description={Lookup.LogoIdeaDesc}
			/>
			{loading === true ? (
				<div className="flex justify-center items-center">
					<Loader2Icon className="animate-spin my-10" />
				</div>
			) : (
				<div className="flex flex-wrap gap-3 mt-6">
					{ideas &&
						ideas.map((idea, index) => (
							<h2
								onClick={() => {
									setSelectedOption(idea);
									handleInputChange(idea);
								}}
								key={index}
								className={`p-2 rounded-full border px-3 cursor-pointer hover:border-primary ${
									selectedOption === idea && "border-primary"
								}`}
							>
								{idea}
							</h2>
						))}
					<h2
						onClick={() => {
							setSelectedOption("Let AI select best idea");
							handleInputChange("Let AI select best idea");
						}}
						className={`p-2 rounded-full border px-3 cursor-pointer hover:border-primary ${
							selectedOption === "Let AI select best idea" && "border-primary"
						}`}
					>
						Let AI select best idea
					</h2>
				</div>
			)}
		</div>
	);
}
