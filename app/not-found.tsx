import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default function NotFound() {
	return (
		<div className="flex flex-col items-center justify-center mt-48 gap-5">
			<p>404 | Page not found</p>
			<Link href="/">
				<Button>Return home</Button>
			</Link>
		</div>
	);
}
