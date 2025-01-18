import { createContext } from "react";

type userDetailType = {
	email: string;
	name: string;
	credits: number;
};
type contextType = {
	userDetail: userDetailType | null;
	setUserDetail: React.Dispatch<React.SetStateAction<userDetailType | null>>;
};

export const UserDetailContext = createContext<contextType | undefined>(
	undefined
);
