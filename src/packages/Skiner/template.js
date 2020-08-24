export default color => {
  return `
  #side-menu-wrapper .main-menu li.main-menu__item.is-active{background-color:${color}} 
  #side-menu-wrapper .menu-item .menu-node__content.is-active .menu-node__label{ color: ${color}}
  #header-wrapper #Header{background-color:${color}}
  `;
};
