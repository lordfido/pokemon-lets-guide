import { library } from '@fortawesome/fontawesome-svg-core';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const initFontAwesome = () => {
  library.add(faGithub, faSearch);
};

export default initFontAwesome;
