import React from 'react';
import Head from 'next/head';
import Link from 'next/link'

export default (): JSX.Element => (
  <React.Fragment>
    <Head>
      <title>Buscaminas</title>
      <link rel="stylesheet" type="text/css" href="/static/style.css" />
    </Head>
    <h1>Buscaminas</h1>
    <p>
      <Link href="/styleA">
        <a className="menu">Versión A</a>
      </Link>
    </p>
    <p>
      <Link href="/styleB">
        <a className="menu">Versión B</a>
      </Link>
    </p>
  </React.Fragment>
);
