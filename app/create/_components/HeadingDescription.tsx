import React from "react";

type HeadingDescriptionProps = {
	title: string;
	description: string;
};

export default function HeadingDescription({
	title,
	description,
}: HeadingDescriptionProps) {
	return (
		<div>
			<h2 className="font-bold text-3xl text-primary">{title}</h2>
			<p className="text-lg text-gray-500 mt-2">{description}</p>
		</div>
	);
}
