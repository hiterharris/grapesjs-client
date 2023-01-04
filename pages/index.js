import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic'
import { defaultCss, defaultHtml } from '../components/defaultComponents';

const Editor = dynamic(() => import('../components/Editor'), { ssr: false })

export default function Home() {
  const siteId = 1;
  const [sites, setSites] = useState([])
  useEffect(() => {
    fetch(`http://localhost:3001/sites`)
      .then(response => response.json())
      .then(data => setSites(data))
  }, [])

  const createPage = () => {
    const defaulPageData = {
      id: sites?.length + 1,
      name: "New Page",
      assets: "",
      components: "",
      css: defaultCss,
      html: defaultHtml,
      styles: ""
  }
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(defaulPageData)
    };
    fetch('http://localhost:3001/sites/add', requestOptions)
      .then(response => response.json())
      .then(data => console.log(data));
  }

  useEffect(() => {
    console.log('sites: ', sites)
  }, [sites])
  
  return (
    <>
      <button onClick={() => createPage()}>Create Page</button>
      <Editor siteId={siteId} />
      {/* <Editor siteId={siteId} pageData={pageData} /> */}
    </>
  );
}
