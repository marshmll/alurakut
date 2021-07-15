import React from 'react';
import MainGrid from '../src/componentes/MainGrid';
import Box from '../src/componentes/Box';
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AluraKutCommons'
import { ProfileRelationsBoxWrapper } from '../src/componentes/ProfileRelations';

function ProfileSideBar(propriedades) {

  return (
    <Box as="aside">
      <img src={`https://github.com/${propriedades.githubUser}.png`} style={{ borderRadius: "8px" }} />
      <hr />
      <p>
        <a className="boxLink" href={`https://github.com/${propriedades.githubUser}`}>
          @{propriedades.githubUser}
        </a>
      </p>
      <hr />
      <AlurakutProfileSidebarMenuDefault />
    </Box>
  );

}

function ProfileRelationsBox(props) {
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">
        {props.title} ({props.items.length})
      </h2>
      <ul>

        {props.items.map((itemAtual) => {

          return (

            <li key={itemAtual}>
              <a href={`https://github.com/${itemAtual}`}>
                <img src={`https://github.com/${itemAtual}.png`} />
                <span>{itemAtual}</span>
              </a>
            </li>

          )

        })}

      </ul>
    </ProfileRelationsBoxWrapper>
  )
}

export default function Home() {

  const usuario = 'omariosouto';

  const [comunidades, setComunidades] = React.useState([]);

  const pessoasFavoritas = [

    'juunegreiros',
    'omariosouto',
    'peas',
    'rafaballerini',
    'marcobrunodev',
    'felipefialho',
    'torvalds',
    'flaviohenriquealmeida',
    'filipedeschamps'

  ]

  const [seguidores, setSeguidores] = React.useState([]);

  React.useEffect(() => {

    fetch(`https://api.github.com/users/${usuario}/followers`)
      .then(async (resposta) => {
        const respostaConvertida = await resposta.json()
        setSeguidores(respostaConvertida)
      })

    fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        'Authorization': '5f8338367a600ee4fc22580ff27938',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        'query': `
          query {
            allComunnities {
              title
              id
              imageUrl
              creatorSlug
            }
          }
        `
      })
    })
      .then((response) => response.json())
      .then((response) => {
        const comunidadesRecebidas = response.data.allComunnities
        setComunidades(comunidadesRecebidas)
      })

  }, []);

  return (
    <>
      <AlurakutMenu githubUser={usuario} />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea' }} >
          <ProfileSideBar githubUser={usuario} />
        </div>
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">Bem vindo(a)</h1>
            <OrkutNostalgicIconSet />
          </Box>
          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <form onSubmit={(event) => {

              event.preventDefault();

              const dadosDoForm = new FormData(event.target);

              console.log(dadosDoForm.get("title"));

              console.log(dadosDoForm.get("image"));

              const comunidade = {

                title: dadosDoForm.get("title"),

                imageUrl: dadosDoForm.get("image"),

                link: dadosDoForm.get("link"),

                creatorSlug: usuario

              };

              fetch('/api/comunidades', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(comunidade),
              }).then(async (response) => {
                const dados = await response.json();
                console.log(dados.registroCriado);
                const comunidade = dados.registroCriado;
                const comunidadesAtualizadas = [...comunidades, comunidade];
                setComunidades(comunidadesAtualizadas);
              })
            }}>
              <div>
                <input
                  placeholder="Qual vai ser o nome da sua comunidade?"
                  name="title"
                  aria-label="Qual vai ser o nome da sua comunidade?"
                  type="text"
                />
              </div>
              <div>
                <input
                  placeholder="Coloque uma URL para usarmos de capa"
                  name="image"
                  aria-label="Coloque uma URL para usarmos de capa"
                />
              </div>
              <div>
                <input
                  placeholder="Insira o link da comunidade"
                  name="link"
                  aria-label="Insira o link da comunidade"
                />
              </div>
              <button>
                Criar comunidade
              </button>
            </form>
          </Box>
        </div>
        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
          <ProfileRelationsBox title="Pessoas da Comunidade" items={pessoasFavoritas} />
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Comunidades ({comunidades.length})
            </h2>
            <ul>
              {
                comunidades.map((itemAtual) => {
                  return (
                    <li key={itemAtual.id}>
                      <a href={`/comunnities/${itemAtual.id}`}>
                        <img src={itemAtual.imageUrl} />
                        <span>{itemAtual.title}</span>
                      </a>
                    </li>
                  )
                })
              }

            </ul>
          </ProfileRelationsBoxWrapper>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Seguidores ({seguidores.length})
            </h2>
            <ul>
              {
                seguidores.map((itemAtual) => {
                  return (
                    <li key={itemAtual.id}>
                      <a href={`https://github.com/${itemAtual.login}`}>
                        <img src={`https://github.com/${itemAtual.login}.png`} />
                        <span>{itemAtual.login}</span>
                      </a>
                    </li>
                  )
                })
              }
            </ul>
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  )
}