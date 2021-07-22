import React from 'react';
import MainGrid from '../src/componentes/MainGrid';
import Box from '../src/componentes/Box';
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AluraKutCommons'
import { ProfileRelationsBoxWrapper } from '../src/componentes/ProfileRelations';
import nookies from 'nookies';
import jwt from 'jsonwebtoken';

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

export default function Home(props) {

  const usuario = props.githubUser;

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
  const [comentarios, setComentarios] = React.useState([]);

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
      });

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
            allComments {
              comment
              user
            }
          }
        `
      })
    })
      .then((response) => response.json())
      .then((response) => {
        const comentariosRecebidos = response.data.allComments
        setComentarios(comentariosRecebidos)
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
                  required
                />
              </div>
              <div>
                <input
                  placeholder="Coloque uma URL para usarmos de capa"
                  name="image"
                  aria-label="Coloque uma URL para usarmos de capa"
                  required
                />
              </div>
              <div>
                <input
                  placeholder="Insira o link da comunidade"
                  name="link"
                  aria-label="Insira o link da comunidade"
                  required
                />
              </div>
              <button>
                Criar comunidade
              </button>
            </form>
          </Box>
          <Box>
            <h2 className="subTitle">Comentários ({comentarios.length})</h2>
            {comentarios.map((comentarioAtual) => {
              return (
                <div style={{ padding: ".25rem", marginBottom: "1rem", border: "1px solid #AAAAAA", borderRadius: "30px", display: "flex", alignItems: "center" }}>
                  <img style={{ marginRight: ".5rem", borderRadius: "30px", width: "7%", display: "inline-block" }} src={`https://github.com/${comentarioAtual.user}.png`} />
                  <ul style={{ listStyle: "none" }}>
                    <li>
                      <div>
                        <h4>{comentarioAtual.user}</h4>
                        <span>{comentarioAtual.comment}</span>
                      </div>
                    </li>
                  </ul>
                </div>
              )
            })}
            <form onSubmit={(event) => {

              event.preventDefault();

              const dadosDoForm = new FormData(event.target);

              const comentario = {
                comment: dadosDoForm.get("comment"),
                user: usuario
              }

              document.querySelector('#comment-input').value = '';

              fetch('/api/comentarios', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(comentario),
              }).then(async (response) => {
                const dados = await response.json();
                console.log(dados.registroCriado);
                const comentario = dados.registroCriado;
                const comentariosAtualizados = [comentario, ...comentarios];
                setComentarios(comentariosAtualizados);
              })

            }}>
              <div>
                <input
                  placeholder="Escreva seu comentário"
                  name="comment"
                  id="comment-input"
                  aria-label="Escreva seu comentário"
                  required
                />
              </div>
              <button>Comentar</button>
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
                      <a href={itemAtual.communityLink}>
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

export async function getServerSideProps(context) {

  const cookies = nookies.get(context);

  const token = cookies.USER_TOKEN || false;

  if(!token) return {

    redirect: {

      destination: '/login',
      permanent: false,

    }

  }

  const { isAuthenticated } = await fetch('https://alurakut.vercel.app/api/auth', {

    headers: {

      Authorization: token

    }

  })
    .then((resposta) => resposta.json());
    
  const { githubUser } = jwt.decode(token);

  const usuarioValido = await fetch(`https://api.github.com/users/${githubUser}`)
    .then(async (resposta) => resposta.ok);

  if (!isAuthenticated || !usuarioValido) {

    return {

      redirect: {

        destination: '/login',
        permanent: false,

      }
    }
  }


  return {

    props: {

      githubUser
      
    },
  }
}