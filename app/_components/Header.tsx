import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

export default function Header() {
	return (
		<div className="px-10 lg:px-32 xl:px-48 2xl:px-56 p-4 flex items-center justify-between shadow-sm">
			<Image src={"logo.svg"} width={180} height={100} alt="logo" />
			<Button>Get started</Button>
		</div>
	);
}
