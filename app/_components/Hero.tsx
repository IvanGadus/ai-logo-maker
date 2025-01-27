"use client";
import React, { useState } from "react";
import Lookup from "../_data/Lookup";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Hero() {
	const [logoTitle, setLogoTitle] = useState("");
	return (
		<div className="flex items-center my-10 sm:mt-24 flex-col gap-5">
			<h2 className="text-primary text-4xl md:text-5xl text-center font-bold">
				{Lookup.HeroHeading}
			</h2>
			<h2 className="text-2xl text-center font-bold md:text5xl">
				{Lookup.HeroSubheading}
			</h2>
			<p className="text-lg text-gray-500 text-center">{Lookup.HeroDesc}</p>
			<div className="flex gap-6 w-full max-w-2xl mt-10">
				<input
					className="p-3 border rounded-md w-full shadow-md"
					type="text"
					placeholder={Lookup.InputTitlePlaceholder}
					onChange={(e) => setLogoTitle(e.target.value)}
				/>
				<Link href={`/create?title=${logoTitle}`}>
					<Button className="w-full p-6">Get started</Button>
				</Link>
			</div>
		</div>
	);
}
