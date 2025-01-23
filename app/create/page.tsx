"use client";
import React, { Suspense, useState } from "react";
import LogoTitle from "./_components/LogoTitle";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import LogoDesc from "./_components/LogoDesc";
import LogoColorPallete from "./_components/LogoColorPallete";
import LogoDesigns from "./_components/LogoDesigns";
import LogoIdea from "./_components/LogoIdea";
import PricingModel from "./_components/PricingModel";

type formDataType = {
	desc?: string;
	title?: string;
	color?: string;
	design?: {
		title: string;
		image: string;
		prompt: string;
	};
	idea?: string;
};

export default function Page() {
	const [step, setStep] = useState(1);
	const [formData, setFormData] = useState<formDataType>({});
	const [emptyTitle, setEmptyTitle] = useState(true);
	const [emptyDesc, setEmptyDesc] = useState(true);

	const handleInputChange = (field: string, value: string | object) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
		// console.log(formData);
	};

	return (
		<div className=" p-10 border rounded-xl my-10">
			{step === 1 ? (
				<Suspense>
					<LogoTitle
						handleInputChange={(v) => handleInputChange("title", v)}
						formData={formData}
						setEmptyTitle={setEmptyTitle}
					/>
				</Suspense>
			) : step === 2 ? (
				<LogoDesc
					handleInputChange={(v) => handleInputChange("desc", v)}
					formData={formData}
					setEmptyDesc={setEmptyDesc}
				/>
			) : step === 3 ? (
				<LogoColorPallete
					handleInputChange={(v) => handleInputChange("color", v)}
					formData={formData}
				/>
			) : step === 4 ? (
				<LogoDesigns
					handleInputChange={(v) => handleInputChange("design", v)}
					formData={formData}
				/>
			) : step === 5 ? (
				<LogoIdea
					handleInputChange={(v) => handleInputChange("idea", v)}
					formData={formData}
				/>
			) : (
				step === 6 && <PricingModel formData={formData} />
			)}
			<div className="flex items-center justify-between mt-10">
				{step !== 1 && (
					<Button onClick={() => setStep((prev) => prev - 1)} variant="outline">
						{" "}
						<ArrowLeft /> <p className="hidden sm:block">Previous</p>
					</Button>
				)}
				{step < 6 && (
					<Button
						disabled={(step === 1 && emptyTitle) || (step === 2 && emptyDesc)}
						onClick={() => setStep((prev) => prev + 1)}
					>
						{" "}
						<ArrowRight /> <p className="hidden sm:block">Continue</p>
					</Button>
				)}
			</div>
		</div>
	);
}
