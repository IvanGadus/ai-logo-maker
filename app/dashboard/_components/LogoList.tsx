"use client";
import { UserDetailContext } from "@/app/_context/UserDetailContext";
import { db } from "@/app/configs/FirebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { Download } from "lucide-react";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";

type contextType = {
	userDetail: userDetailType | null;
	setUserDetail: React.Dispatch<React.SetStateAction<userDetailType | null>>;
};

type userDetailType = {
	email: string;
	name: string;
	credits: number;
};

type logosType = {
	desc: string;
	image: string;
	title: string;
};

export default function LogoList() {
	const [logoList, setLogoList] = useState<logosType[]>();
	const context = useContext(UserDetailContext);
	const { userDetail } = context as contextType;

	useEffect(() => {
		const getUserLogos = async () => {
			if (userDetail) {
				const query = await getDocs(
					collection(db, "users", userDetail.email, "logos")
				);
				const logoListData = query.docs.map((doc) => ({ ...doc.data() }));
				setLogoList(logoListData as logosType[]);
			}
		};
		if (userDetail) {
			getUserLogos();
		}
	}, [userDetail]);

	const downloadImage = (image: string) => {
		const a = document.createElement("a"); // Vytvorenie odkazu
		a.href = image; // Nastavenie URL na base64 obrázok
		a.download = "image.png"; // Nastavenie názvu súboru na stiahnutie
		a.click(); // Simulovanie kliknutia na odkaz (spustí stiahnutie)
	};

	return (
		<div className="mt-10 mb-10">
			<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
				{logoList && logoList?.length > 0
					? logoList?.map((logo, index) => {
							// console.log(logoList);
							return (
								<div
									key={index}
									className=" hover:scale-105 transition-all cursor-pointer"
								>
									<Image
										src={logo.image}
										width={400}
										height={200}
										alt={logo.title}
										className="w-full rounded-xl"
									/>
									<div className="flex flex-row items-center justify-center gap-3 mt-3">
										<div>
											<h2 className="text-center text-lg font-medium mt2">
												{logo.title}
											</h2>
											<p className="text-sm text-gray-500 text-center">
												{logo.desc}
											</p>
										</div>
										<Download
											onClick={() => downloadImage(logo.image)}
											className="hover:text-primary self-end mb-1"
										/>
									</div>
								</div>
							);
					  })
					: [1, 2, 3, 4, 5, 6].map((item, index) => (
							<div
								key={index}
								className="bg-slate-200 animate-pulse rounded-xl w-full h-[200px]"
							></div>
					  ))}
			</div>
		</div>
	);
}
