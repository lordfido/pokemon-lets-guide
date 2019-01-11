import { library } from '@fortawesome/fontawesome-svg-core';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faMinus, faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';

const initFontAwesome = () => {
  library.add(faGithub, faMinus, faPlus, faSearch);
};

export default initFontAwesome;
