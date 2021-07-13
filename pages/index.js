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

export default function Home() {
  const usuario = 'marshmll';
  const [comunidades, setComunidades] = React.useState([{
    id: '234542135464',
    title: 'Eu odeio acordar cedo',
    image: "https://alurakut.vercel.app/capa-comunidade-01.jpg"
  },
  {
    id: "5354654865",
    title: "Bom dia grupo imagens",
    image: "https://scontent.fbfh8-1.fna.fbcdn.net/v/t1.6435-9/123547456_201935804645704_6511389256942308507_n.jpg?_nc_cat=105&ccb=1-3&_nc_sid=8631f5&_nc_eui2=AeH1HFHXNA94ogPPV9SR5MGb-ZejKxqfDAX5l6MrGp8MBbNm4oM_lAOXP3y2cTJgB4d5PUSxH8Vu7qnIy6rvmXRA&_nc_ohc=9xYrbdQTVwgAX-HUrr2&_nc_ht=scontent.fbfh8-1.fna&oh=5cd254299389af637e6f5cedc47d06c4&oe=60F31B96"
  },
  {
    id: "6546548654",
    title: "grupo do caminhoneiro.",
    image: 'https://scontent.fbfh8-1.fna.fbcdn.net/v/t1.6435-9/74476580_151810962872433_6299743530239655936_n.jpg?_nc_cat=109&ccb=1-3&_nc_sid=8631f5&_nc_eui2=AeE5AHHsvijLn9xHzk1NE7c33pIW1sMAPtHekhbWwwA-0QWv0mBJwVkAwNQQ2gZH5t76OxMsDOBdZDVRNx6jMA4D&_nc_ohc=7abh5HgizHsAX8yP9Fe&tn=nEgZG1XCO1p3DSnJ&_nc_ht=scontent.fbfh8-1.fna&oh=ed1fb833aa5772a5b6eea7ee670b577a&oe=60F3178B',
  }]);
  const pessoasFavoritas = [
    'juunegreiros',
    'omariosouto',
    'peas',
    'rafaballerini',
    'marcobrunodev',
    'felipefialho'
  ]

  return (
    <>
      <AlurakutMenu />
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

              const dadosDoForm = new FormData(event.target);
              console.log(dadosDoForm.get("title"));
              console.log(dadosDoForm.get("image"));

              const comunidade = {
                id: new Date().toISOString,
                title: dadosDoForm.get("title"),
                image: dadosDoForm.get("image")
              };

              event.preventDefault();
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
              <button>
                Criar comunidade
              </button>
            </form>
          </Box>
        </div>
        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Comunidades ({comunidades.length})
            </h2>
            <ul>
              {comunidades.map((itemAtual) => {
                return (
                  <li key={itemAtual.id}>
                    <a href={`/users/${itemAtual.title}`}>
                      <img src={itemAtual.image} />
                      <span>{itemAtual.title}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da Comunidade ({pessoasFavoritas.length})
            </h2>
            <ul>
              {pessoasFavoritas.map((itemAtual) => {
                return (
                  <li key={itemAtual}>
                    <a href={`/users/${itemAtual}`}>
                      <img src={`https://github.com/${itemAtual}.png`} />
                      <span>{itemAtual}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  )
}