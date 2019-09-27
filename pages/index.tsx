import React from 'react';
import Head from 'next/head';
import Link from 'next/link'

export default (): JSX.Element => (
  <React.Fragment>
    <Head>
      <title>Buscaminas</title>
      <link rel="stylesheet" type="text/css" href="/static/style.css" />
    </Head>
    <Link href="/styleA">
      <a className="menu">Versión A</a>
    </Link>
    <Link href="/styleB">
      <a className="menu">Versión B</a>
    </Link>
    
  </React.Fragment>
);
