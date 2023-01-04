export const pageLogo = (editor) => {
    editor.BlockManager.add("logo", {
      label: `<div className="gjs-block-label"><img src="https://i.ibb.co/nL2Q7WN/logo.png"></div>`,
      content: `<span><img src="https://i.ibb.co/nL2Q7WN/logo.png" /></span>`,
      category: {
        id: "logo",
        label: "Logo",
        open: true
      }
    });
  }
  