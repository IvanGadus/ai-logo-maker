const {
	GoogleGenerativeAI,
	HarmCategory,
	HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
	model: "gemini-2.0-flash-exp",
});

const generationConfig = {
	temperature: 1,
	topP: 0.95,
	topK: 40,
	maxOutputTokens: 8192,
	responseMimeType: "application/json",
};

export const AIDesignIdea = model.startChat({
	generationConfig,
	history: [
		{
			role: "user",
			parts: [
				{
					text: "Based on Logo of type Modern Mascot Logos Generate a text prompt to create Logo for Logo title/Brand name : Indian Spice with decription: Indian Restaurant and refering to prompt: A vibrant logo featuring a friendly, animated character with a playful expression. The character is dressed in a classic uniform, complete with a distinctive accessory that adds personality. In one hand, they hold a signature item that represents the brand, while the other elements of the design—such as small decorative touches or natural accents—enhance the overall look. The background consists of a bold, circular design with subtle accents to highlight the character. Below, the brand name is displayed in bold, stylized lettering, with a slight curve and complementary decorative lines. The overall style is fun, welcoming, and full of character.. Give me 4/5 Suggestion of logo idea (each idea with maximum 4-5 words), Result in JSON format with ideas field.",
				},
			],
		},
		{
			role: "model",
			parts: [
				{
					text: '```json\n{\n  "ideas": [\n    "Chef Elephant with Spice",\n    "Smiling Tiger Holding Curry",\n    "Friendly Peacock with Naan",\n    "Animated Chef with Tandoor",\n      "Playful Monkey with Masala"\n  ]\n}\n```\n',
				},
			],
		},
	],
});

export const AILogoPrompt = model.startChat({
	generationConfig,
	history: [
		{
			role: "user",
			parts: [
				{
					text: "Generate a text prompt to create Logo for Logo Title/Brand name : sdffdf,with description: fsd, with Color combination of Sunset Warmth, also include the Vintage Logo Designs With Text & Icon and include Vintage Logo Designs With Text & Icon design idea and Referring to this Logo Prompt:Design a collection of vintage-inspired logos with a hand-drawn, artistic style. Incorporate a variety of themes, including food, animals, characters, and unique brand elements. Each logo should feature bold typography, intricate details, and a retro aesthetic that is versatile and suitable for diverse brands or businesses.  Give me result in JSON portal with prompt field only",
				},
			],
		},
		{
			role: "model",
			parts: [
				{
					text: '```json\n{\n  "prompt": "Create a vintage logo design for the brand \\"sdffdf\\", described as \\"fsd\\". Use a color combination evoking \\"Sunset Warmth\\". The design should feature a hand-drawn, artistic style with bold typography and intricate details. Incorporate both text and an icon within the logo, reflecting a retro aesthetic. Referencing design idea : Design a collection of vintage-inspired logos with a hand-drawn, artistic style. Incorporate a variety of themes, including food, animals, characters, and unique brand elements. Each logo should feature bold typography, intricate details, and a retro aesthetic that is versatile and suitable for diverse brands or businesses."\n}\n```\n',
				},
			],
		},
	],
});
// const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
// console.log(result.response.text());
