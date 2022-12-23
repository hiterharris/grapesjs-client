import React, { useEffect, useState } from 'react';
import 'grapesjs/dist/css/grapes.min.css';
import grapesjs from 'grapesjs';
import newsletter from 'grapesjs-preset-newsletter';

const Editor = () => {
    const [pageEditor, setPageEditor] = useState();
    const [storeData, setStoreData] = useState()

    const projectID = 1;
    const projectEndpoint = `http://localhost:3001/projects`;
    // npx json-server --watch db.json
    
    useEffect(() => {
      let editor;
        if (!editor) {
            const editor = grapesjs?.init({
                container : '#editor',
                plugins: [newsletter],
                storageManager: {
                    type: 'remote', // Type of the storage, available: 'local' | 'remote'
                    autosave: true, // Store data automatically
                    autoload: true, // Autoload stored data on init
                    stepsBeforeSave: 1, // If autosave enabled, indicates how many changes are necessary before store method is triggered
                    options: {
                      local: { // Options for the `local` type
                        key: 'gjsProject', // The key for the local storage
                      },
                      remote: {
                        urlLoad: projectEndpoint,
                        urlStore: projectEndpoint,
                        fetchOptions: opts => (opts.method === 'POST' ?  { method: 'PATCH' } : {}),
                        onStore: data => ({ id: projectID, data }),
                        onLoad: result => result.data,
                      }
                    }
                  }
            });

            setPageEditor(editor)
        }
    }, [])

    useEffect(() => {
      fetch(projectEndpoint)
        .then(response => response.json())
        .then(data => setStoreData(data));
    }, [])

    useEffect(() => {
      console.log('storeData: ', storeData)
    }, [storeData])

    // const storedProjectData = pageEditor?.store();
    // useEffect(() => {
    //   console.log('storedProjectData: ', storedProjectData)
    // }, [storedProjectData])
    
    // const saveData = (data) => {
    //   fetch(projectEndpoint, {
    //     method: 'POST', 
    //     mode: 'cors', 
    //     body: JSON.stringify(data)
    //   })
    // }
    // saveData(storedProjectData)
    
    return <div id="editor" />;
}

export default Editor;
