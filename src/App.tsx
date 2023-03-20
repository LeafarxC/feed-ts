
import { Header } from './components/Header';
import { Post } from './components/Post';
import { Sidebar } from './components/sidebar';
import styles from './App.module.css';
import './global.css'

const posts = [ 
  {
    id: 1,
    author: {
      avatarUrl: 'https://github.com/leafarxc.png',
      name: 'Rafael Vieira da Costa',
      role: 'Marketeer'
    },
    content: [
      {type: 'paragraph', content: 'ola galeraa 👋'},
      {type: 'paragraph', content: 'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀'},
      {type: 'link', content: 'jane.design/doctorcare'},
      {type: 'hashtag', content: '#novoprojeto '},
      {type: 'hashtag', content: '#nlw '},
      {type: 'hashtag', content: '#rocketseat '}
    ],
    publishedAt: new Date('2023-03-15 16:00:00'),
  },
  {
  id: 2,
    author: {
      avatarUrl: 'https://github.com/leafarxc.png',
      name: 'Rafael Vieira da Costa',
      role: 'Marketeer'
    },
    content: [
      {type: 'paragraph', content: 'ala galeraa 👋'},
      {type: 'paragraph', content: 'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀'},
      {type: 'link', content: 'jane.design/doctorcare'},
      {type: 'hashtag', content: '#novoprojeto '},
      {type: 'hashtag', content: '#nlw '},
      {type: 'hashtag', content: '#rocketseat '}
    ],
    publishedAt: new Date('2023-03-05 19:00:00'),
  },
];

export function App() {
  return (

    <div>
      <Header />
      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          {posts.map(post => {
            return(
              <Post 
                key={post.id}
                author={post.author}
                content={post.content}
                publishedAt={post.publishedAt}
              />
            )
          })}
        </main>    
      </div>
    </div>
    
  )
}

