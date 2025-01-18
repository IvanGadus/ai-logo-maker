"use client";
import React, { useState } from "react";
import LogoTitle from "./_components/LogoTitle";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import LogoDesc from "./_components/LogoDesc";
import LogoColorPallete from "./_components/LogoColorPallete";
import LogoDesigns from "./_components/LogoDesigns";
import LogoIdea from "./_components/LogoIdea";
import PricingModel from "./_components/PricingModel";

export default function page() {
	const [step, setStep] = useState(1);
	const [formData, setFormData] = useState({});

	const handleInputChange = (field: string, value: string | object) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
		console.log(formData);
	};
	return (
		<div className=" p-10 border rounded-xl mt-10">
			{step === 1 ? (
				<LogoTitle
					handleInputChange={(v) => handleInputChange("title", v)}
					formData={formData}
				/>
			) : step === 2 ? (
				<LogoDesc
					handleInputChange={(v) => handleInputChange("desc", v)}
					formData={formData}
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
				step === 6 && (
					<PricingModel
						handleInputChange={(v) => handleInputChange("price", v)}
						formData={formData}
					/>
				)
			)}
			<div className="flex items-center justify-between mt-10">
				{step !== 1 && (
					<Button onClick={() => setStep((prev) => prev - 1)} variant="outline">
						{" "}
						<ArrowLeft /> Previous
					</Button>
				)}
				{step < 6 && (
					<Button onClick={() => setStep((prev) => prev + 1)}>
						{" "}
						<ArrowRight /> Continue
					</Button>
				)}
			</div>
		</div>
	);
}
