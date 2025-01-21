import { Button } from "@/components/ui/button";
import React from "react";

const DownloadImage = ({ image }: { image: string }) => {
	const downloadImage = () => {
		const a = document.createElement("a"); // Vytvorenie odkazu
		a.href = image; // Nastavenie URL na base64 obrázok
		a.download = "image.png"; // Nastavenie názvu súboru na stiahnutie
		a.click(); // Simulovanie kliknutia na odkaz (spustí stiahnutie)
	};

	return (
		<div>
			<Button onClick={downloadImage}>Download</Button>
		</div>
	);
};

export default DownloadImage;
