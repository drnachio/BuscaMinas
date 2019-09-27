import React from 'react';
import Head from 'next/head';

export default (): JSX.Element => (
  <React.Fragment>
    <Head>
      <title>Buscaminas</title>
      <link rel="stylesheet" type="text/css" href="/static/style.css" />
    </Head>
    <a href="/styleA" className="menu">Versión A</a>
    <a href="/styleB" className="menu">Versión B</a>
    
  </React.Fragment>
);
