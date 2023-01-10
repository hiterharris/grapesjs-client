import React, { useEffect, useState } from 'react';
import 'grapesjs/dist/css/grapes.min.css';
import grapesjs from 'grapesjs';
import newsletter from 'grapesjs-preset-newsletter';
import { defaultHtml, defaultCss } from './defaultComponents';

const Editor = ({ selectedSite, siteId }) => {
  const [editor, setEditor] = useState(false)
  const [newPage, setNewPage] = useState(false)
  const [isSaving, setIsSaving] = useState();
  const [pageData, setPageData] = useState({ id: null, name: "", assets: "", components: "", css: "", html: "", styles: "" });

  console.log('selectedSite: ', selectedSite)

  // get sites
  // TODO: move call to index
  useEffect(() => {
    fetch(`http://localhost:3001/sites/${siteId}`)
      .then(response => response?.json())
      .then(data => setPageData(data))
  }, [siteId])

  const save = () => {
    setIsSaving(true)
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
    fetch(`http://localhost:3001/sites/edit/${siteId}`, requestOptions)
      .then(response => response.json())
      .then(data => data);
    setTimeout(() => {
      setIsSaving(false)
    }, 3000)
  }

  useEffect(() => {
    // set editor
    let editor;
      if (!editor) {
          const e = grapesjs?.init({
              container : '#editor',
              plugins: [newsletter],  
                storageManager: {
                  type: 'local',
                  stepsBeforeSave: 1,
                  contentTypeJson: true,
                  storeHtml: true,
                  storeCss: true,
                  credentials: 'include',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                },
          });
          setEditor(e)
          return editor;
      }
  }, [pageData])

  // set default page components
  // if (!siteId) {
  //   editor.setComponents(defaultHtml);
  //   editor.setStyle(defaultCss);
  // } else {
  //   editor.setComponents(pageData?.html);
  //   editor.setStyle(pageData?.css);
  // }

  return (
    <div>
      <div>
        {!isSaving ? (
          <button onClick={() => save()}>Save</button>
        ) : (
          <p style={{ margin: 0}}>Saved</p>
        )}
      </div>
      <div id="editor" />
    </div>
  )
}

export default Editor;
