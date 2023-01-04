import React, { useEffect, useState } from 'react';
import 'grapesjs/dist/css/grapes.min.css';
import grapesjs from 'grapesjs';
import newsletter from 'grapesjs-preset-newsletter';
import { defaultHtml, defaultCss } from './defaultComponents';

const Editor = () => {
  const siteId = 3;
  const endpoint = `${process.env.NEXT_PUBLIC_BASE_URL}`;

  const [newPage, setNewPage] = useState(false)
  const [pageData, setPageData] = useState();
  
  // useEffect(() => {
  //   fetch(`http://localhost:3001/sites/${siteId}`)
  //     .then(response => response.json())
  //     .then(data => setPageData(data))
  // }, [])

  useEffect(() => {
    let editor;
      if (!editor) {
          const editor = grapesjs?.init({
              container : '#editor',
              plugins: [newsletter],  
              // storageManager: {
              //     type: 'remote',
              //     autosave: true,
              //     autoload: true,
              //     stepsBeforeSave: 1,
              //     options: {
              //       local: {
              //         key: `gjs-`,
              //         checkLocal: false,
              //       },
              //       remote: {
                      // urlStore: `${endpoint}/edit/${siteId}`,
                      // urlLoad: `${endpoint}/sites/${siteId}`,
              //         fetchOptions: opts => (opts.method === 'POST' ?  { method: 'PATCH' } : {}),
              //         onStore: data => ({ id: siteId, data }),
              //         onLoad: result => result.data,
              //         contentTypeJson: true,
              //       }
              //     }
              //   },
                storageManager: {
                  type: 'remote',
                  stepsBeforeSave: 1,
                  contentTypeJson: true,
                  storeComponents: true,
                  storeStyles: true,
                  storeHtml: true,
                  storeCss: true,
                  credentials: 'include',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  id: 'editor-',
                  urlStore: `${endpoint}/edit/${siteId}`,
                  urlLoad: `${endpoint}/sites/${siteId}`,
                  onStore: data => data,
                  onLoad: data => data,
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

          const storedProjectData = editor.store();
          console.log('storedProjectData: ', storedProjectData)
            
          editor
      }
  }, [])

  
  
  return (
    <>
      <div id="editor" />
    </>
  )
}

export default Editor;
