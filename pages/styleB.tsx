import React from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import {resetBoard} from '../model/board';

const Board = dynamic(import('../components/Board'), { ssr: false });
export default (): JSX.Element => (
  <React.Fragment>
    <Head>
      <title>Buscaminas</title>
      <link rel="stylesheet" type="text/css" href="/static/style-b/style.css" />
    </Head>    
    <button onClick={resetBoard} type="button" className="reset">Reiniciar</button>
    <Link href="/">
      <button type="button" className="back">Regresar</button>
    </Link>
    <Board />
  </React.Fragment>
);
