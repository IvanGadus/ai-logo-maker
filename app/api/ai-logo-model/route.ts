import { AILogoPrompt } from "@/app/configs/AiModel";
import { db } from "@/app/configs/FirebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	const { prompt, email, title, desc } = await req.json();

	try {
		// Generate prompt for image generating

		const result = await AILogoPrompt.sendMessage(prompt);
		const generatedPrompt = await JSON.parse(result.response.text());
		console.log(generatedPrompt);

		// Generate image with prompt

		const response = await fetch(
			"https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-3.5-large",
			{
				headers: {
					Authorization: "Bearer " + process.env.HUGGING_FACE_KEY,
					"Content-Type": "application/json",
				},
				method: "POST",
				body: JSON.stringify(generatedPrompt.prompt),
			}
		);

		// Handling response

		const arrayBuffer = await response.arrayBuffer();
		const base64String = Buffer.from(arrayBuffer).toString("base64");

		// Storing in Firestore
		await setDoc(doc(db, "users", email, "logos", Date.now().toString()), {
			image: `data:image/png;base64,${base64String}`,
			title: title,
			desc: desc,
		});

		return NextResponse.json({
			imageUrl: `data:image/png;base64,${base64String}`,
		});
	} catch (e) {
		return NextResponse.json({ error: e });
	}
}
