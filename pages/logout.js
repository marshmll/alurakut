import React from 'react';
import Box from '../src/componentes/Box';
import { useRouter } from "next/router"; // Hook do Next.js
import { destroyCookie } from 'nookies'

export default function LogoutScreeen() {
	LogoutUser();
	return(
		<Box>
			<h1 style={{textAlign: 'center'}} className="title">Logout</h1>
		</Box>
	)
}

async function LogoutUser() {
	const router = useRouter();
	destroyCookie(null, "USER_TOKEN");
	router.push("/login")
	console.log("ol")
}