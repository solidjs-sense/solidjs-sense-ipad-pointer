const styles = `
:root {
  --main-cursor-clr: rgb(0, 0, 0, 0.2);
  --main-cursor-hover-clr: rgb(0, 0, 0, 0.07);
  --ghost-shadow: 0 7px 15px rgba(0, 0, 0, 0.14); }

.ipad-pointer {
  position: fixed;
  z-index: 9999;
  pointer-events: none;
  border-radius: 200px;
  background-color: var(--main-cursor-clr);
  transition: background-color 0.2s ease-in-out;
}

.ipad-pointer-active {
  background-color: var(--main-cursor-hover-clr);
}

.ipad-pointer-lift-active {
  background-color: rgba(0,0,0,0);
}
`;

const hideOriginCursorStyle = `
* {
  cursor: none !important;
}
`;

const setStyles = (hideOriginCursor?: boolean) => {
  const styleSheet = document.createElement('style');
  styleSheet.innerText = styles + (hideOriginCursor ? hideOriginCursorStyle : '');
  document.head.appendChild(styleSheet);

  return () => {
    document.head.removeChild(styleSheet);
  };
};

export default setStyles;
