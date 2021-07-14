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

  const usuario = 'marshmll';

  const [comunidades, setComunidades] = React.useState([{

    id: '234542135464',
    title: 'Eu odeio acordar cedo',
    image: "https://alurakut.vercel.app/capa-comunidade-01.jpg",
    link: "#"

  }
  ]);

  const pessoasFavoritas = [

    'juunegreiros',
    'omariosouto',
    'peas',
    'rafaballerini',
    'marcobrunodev',
    'felipefialho',
    'torvalds',
    'flaviohenriquealmeida'

  ]

  const [seguidores, setSeguidores] = React.useState([]);

  React.useEffect(() => {

    fetch(`https://api.github.com/users/${usuario}/followers`)
      .then((resposta) => resposta.json())
      .then((respostaCompleta) => setSeguidores(respostaCompleta));

  }, []);

  return (
    <>
      <AlurakutMenu githubUser={usuario}/>
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

                id: new Number(Math.round(Math.random() * 10000)),

                title: dadosDoForm.get("title"),

                image: dadosDoForm.get("image"),

                link: dadosDoForm.get("link")

              };


              const comunidadesAtualizadas = [...comunidades, comunidade];

              setComunidades(comunidadesAtualizadas);

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
                  placeholder="Coloque o link da sua comunidade"
                  name="link"
                  aria-label="Coloque o link da sua comunidade"
                />
              </div>
              <button>
                Criar comunidade
              </button>
            </form>
          </Box>
        </div>
        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
          {/* <ProfileRelationsBox title="Seguidores" items={seguidores} /> */}
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Comunidades ({comunidades.length})
            </h2>
            <ul>
              {
                comunidades.map((itemAtual) => {
                  return (
                    <li key={itemAtual.id}>
                      <a href={itemAtual.link}>
                        <img src={itemAtual.image} />
                        <span>{itemAtual.title}</span>
                      </a>
                    </li>
                  )
                })
              }

            </ul>
          </ProfileRelationsBoxWrapper>
          <ProfileRelationsBox title="Pessoas da Comunidade" items={pessoasFavoritas} />
        </div>
      </MainGrid>
    </>
  )
}