import React, { useEffect, useState } from 'react';
import 'grapesjs/dist/css/grapes.min.css';
import grapesjs from 'grapesjs';
import newsletter from 'grapesjs-preset-newsletter';
import { defaultHtml, defaultCss } from './defaultComponents';

const Editor = ({ siteId }) => {
  const [newPage, setNewPage] = useState(false)
  // const [saved, setSaved] = useState();
  const [pageData, setPageData] = useState({ id: null, name: "", assets: "", components: "", css: "", html: "", styles: "" });

  useEffect(() => {
    fetch(`http://localhost:3001/sites/${siteId}`)
      .then(response => response.json())
      .then(data => setPageData(data))
  }, [])

  const save = () => {
    const payload = {
      id: siteId,
      name: pageData?.name,
      assets: localStorage.getItem('gjs-assets'),
      components: localStorage.getItem('gjs-components'),
      css: localStorage.getItem('gjs-css'),
      html: localStorage.getItem('gjs-html'),
      styles: localStorage.getItem('gjs-styles')
    }
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    };
    fetch('http://localhost:3001/sites/edit/3', requestOptions)
      .then(response => response.json())
      .then(data => data );
  }

  useEffect(() => {
    let editor;
      if (!editor) {
          const editor = grapesjs?.init({
              container : '#editor',
              plugins: [newsletter],  
                storageManager: {
                  type: 'local',
                  stepsBeforeSave: 1,
                  contentTypeJson: true,
                  // storeComponents: true,
                  // storeStyles: true,
                  storeHtml: true,
                  storeCss: true,
                  credentials: 'include',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                },
          });

          // set default page components
          if (newPage) {
            editor.setComponents(defaultHtml);
            editor.setStyle(defaultCss);
          } else {
            editor.setComponents(pageData?.html);
            editor.setStyle(pageData?.css);
          }
      }
  }, [pageData])

  return (
    <div>
      <button onClick={() => save()}>Save</button>
      <div id="editor" />
    </div>
  )
}

export default Editor;
