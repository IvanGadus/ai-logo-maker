"use client";
import { Button } from "@/components/ui/button";
import { UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Header() {
	const { user } = useUser();
	return (
		<div className="px-10 lg:px-32 xl:px-48 2xl:px-56 p-4 flex items-center justify-between shadow-sm">
			<Link href="/">
				<Image src={"logo.svg"} width={180} height={100} alt="logo" />
			</Link>
			<div className="flex gap-3 items-center">
				{user ? (
					<Button variant={"outline"}>Dashboard</Button>
				) : (
					<Button>Get started</Button>
				)}

				<UserButton />
			</div>
		</div>
	);
}
