import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic'

const Editor = dynamic(() => import('../components/Editor'), { ssr: false })

export default function Home() {
  const [siteId, setSiteId] = useState(0)
  const [sites, setSites] = useState([])
  const [selectedSite, setSelectedSite] = useState({})
  
  // Fix error on create pages
  useEffect(() => {
    fetch(`http://localhost:3001/sites`)
      .then(response => response.json())
      .then(data => data && setSites(data))
  }, [])

  const createPage = () => {
    // sites.length !== 0 && setSiteId(sites?.length + 1)
    const defaulPageData = {
      id: sites.length !== 0 && setSiteId(sites?.length + 1),
      name: "New Page",
      assets: "[]",
      components: "",
      css: "",
      html: "",
      styles: "[]"
  }
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(defaulPageData)
    };
    fetch('http://localhost:3001/sites/add', requestOptions)
      .then(response => response.json())
      .then(data => data);
  }

  const backButton = () => {
    setSiteId(0)
    window.location.reload(false);
  }
  
  return (
    <>
      <button onClick={() => createPage()}>Create Page</button>
      {!siteId ? (
        <div>
          {sites?.map((site, index) => {
            return <button onClick={() => setSiteId(site?.id)} key={index}>{site?.name}</button>
          })}
        </div>
      ) : (
        <div>
          <button onClick={() => backButton()}>Back</button>
          <Editor selectedSite={selectedSite} siteId={siteId} />
        </div>
      )}
    </>
  );
}
