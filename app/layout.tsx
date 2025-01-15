import type { Metadata } from "next";
import { Host_Grotesk } from "next/font/google";
import "./globals.css";
import Provider from "./provider";

const hostGrotesk = Host_Grotesk({
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={hostGrotesk.className}>
				<Provider>{children}</Provider>
			</body>
		</html>
	);
}
