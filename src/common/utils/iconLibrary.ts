import { library } from '@fortawesome/fontawesome-svg-core';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faCheckSquare, faSquare } from '@fortawesome/free-regular-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const initFontAwesome = () => {
  library.add(faGithub, faCheckSquare, faSquare, faBars);
};

export default initFontAwesome;
