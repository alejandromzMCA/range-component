import Head from "next/head";
import { useRouter } from "next/router";

const Home = () => {
  const {push} = useRouter();

  return (
    <>
      <Head>
        <title>Range Component</title>
        <meta name="description" content="Technical test project" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '3rem',
        alignItems: 'center',
        padding: '5rem',
      }}>
       <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
       }}>
        <span>
        Normal Range:
        </span>
       <button onClick={()=>push('./exercise1')}> Exercise 1</button>
       </div>
       <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
       }}>
        <span>
        Fixed values Range:
        </span>
       <button onClick={()=>push('./exercise2')}> Exercise 2</button>
       </div>
      </main>
    </>
  );
}

export default Home