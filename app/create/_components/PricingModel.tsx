"use client";
import React, { useEffect } from "react";
import HeadingDescription from "./HeadingDescription";
import Lookup from "@/app/_data/Lookup";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import Link from "next/link";

type pricingModelProps = {
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
export default function PricingModel({
	handleInputChange,
	formData,
}: pricingModelProps) {
	const { user } = useUser();

	useEffect(() => {
		if (formData?.title && typeof window !== "undefined") {
			localStorage.setItem("formData", JSON.stringify(formData));
		}
	}, [formData]);

	return (
		<div>
			<HeadingDescription
				title={Lookup.LogoPricingModelTitle}
				description={Lookup.LogoPricingModelDesc}
			/>
			<div className="grid grid-cols-1 md:grid-cols-1 gap-10 mt-5 w-max mx-auto">
				{Lookup.pricingOption.map((item, index) => (
					<div
						key={index}
						className="flex flex-col items-center justify-between p-5 border rounded-2xl"
					>
						<Image src={item.icon} alt={item.title} width={60} height={60} />
						<h2 className="font-medium text-2xl">{item.title}</h2>
						<div>
							{item.features.map((feature, index) => (
								<h2 className="textlg mt-3" key={index}>
									{feature}
								</h2>
							))}
						</div>
						{user ? (
							<Link href={"/generate-logo?type=" + item.title}>
								<Button className="mt-5 ">{item.button}</Button>
							</Link>
						) : (
							<SignInButton
								mode="modal"
								forceRedirectUrl={"/generate-logo?type=" + item.title}
							>
								<Button className="mt-5 ">{item.button}</Button>
							</SignInButton>
						)}
					</div>
				))}
			</div>
		</div>
	);
}
