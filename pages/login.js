import React from 'react';
import { useRouter } from "next/router"; // Hook do Next.js
import nookies from 'nookies';

export default function LoginScreen() {

	const router = useRouter();

	const [message, setMessage] = React.useState("");


	const [githubUser, setGithubUser] = React.useState("");

	return (
		<main style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<div className="loginScreen">
				<section className="logoArea">
					<img src="https://alurakut.vercel.app/logo.svg" />

					<p><strong>Conecte-se</strong> aos seus amigos e familiares usando recados e mensagens instantâneas</p>
					<p><strong>Conheça</strong> novas pessoas através de amigos de seus amigos e comunidades</p>
					<p><strong>Compartilhe</strong> seus vídeos, fotos e paixões em um só lugar</p>
				</section>

				<section className="formArea">

					<form className="box" onSubmit={(event) => {

						event.preventDefault();

						fetch('https://alurakut.vercel.app/api/login', {

							method: "POST",
							headers: {
								'Content-Type': 'application/json'
							},
							body: JSON.stringify({ githubUser })

						})
						.then(async (resposta) => {

							const dadosResposta = (await resposta.json());
							
							const TOKEN = dadosResposta.token;
							
							nookies.set(null, 'USER_TOKEN', TOKEN, {
								path: '/',
								maxAge: 86400 * 7
							});

							router.push("/");
							setTimeout(() => {
								setMessage("Usuário inválido")
							}, 3000); 

						})
					}}>
						<p>
							Acesse agora mesmo com seu usuário do <strong>GitHub</strong>!
						</p>
						<div style={{borderBottom: "1px solid red", padding: ".05rem"}}><h2 style={{fontSize: "15px", color: "red"}}>{message}</h2></div>
						<input 
						placeholder="Usuário"
						value={githubUser}
						onChange={(event) => setGithubUser(event.target.value)}
						/>

						<button type="submit">
							Login
						</button>
					</form>

					<footer className="box">
						<p>
							Ainda não é membro? <br />
							<a href="/login">
								<strong>
									ENTRAR JÁ
								</strong>
							</a>
						</p>
					</footer>
				</section>

				<footer className="footerArea">
					<p>
						© 2021 alura.com.br - <a href="/">Sobre o Orkut.br</a> - <a href="/">Centro de segurança</a> - <a href="/">Privacidade</a> - <a href="/">Termos</a> - <a href="/">Contato</a>
					</p>
				</footer>
			</div>
		</main>
	)
}