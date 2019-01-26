interface ITranslationsCollection {
  [token: string]: [string, string, string, string, string, string, string, string];
}

export const gameTranslations: ITranslationsCollection = {
  // Pokemon stats
  'stat-attack': ['', 'Attack', '', 'Ataque', '', '', '', ''],
  'stat-defense': ['', 'Defense', '', 'Defensa', '', '', '', ''],
  'stat-hp': ['', 'HP', '', 'PS', '', '', '', ''],
  'stat-spAttack': ['', 'Sp. At.', '', 'Ataque Esp.', '', '', '', ''],
  'stat-spDefense': ['', 'Sp. Def.', '', 'Defensa Esp.', '', '', '', ''],
  'stat-speed': ['', 'Speed', '', 'Velocidad', '', '', '', ''],

  // IV Ranges
  'iv-best': ['', 'Best', '', 'Inmejorable', '', '', '', ''],
  'iv-decent': ['', 'Decent', '', 'No está mal', '', '', '', ''],
  'iv-fantastic': ['', 'Fantastic', '', 'Espectacular', '', '', '', ''],
  'iv-noGood': ['', 'Not good', '', 'Cojea un poco', '', '', '', ''],
  'iv-prettyGood': ['', 'Pretty good', '', 'Notable', '', '', '', ''],
  'iv-veryGood': ['', 'Very good', '', 'Genial', '', '', '', ''],

  // Forms
  'forms-alolan': ['', 'Alolan', '', 'Alola', '', '', '', ''],

  // Pokemon data
  'base-cp': ['', 'Base CP', '', 'PC Base', '', '', '', ''],
  'base-stats': ['', 'Base Stats', '', 'Estadísticas base', '', '', '', ''],
  name: ['', 'Name', '', 'Nombre', '', '', '', ''],
  'pokedex-number': ['', 'Pokédex No.', '', 'Nº en la Pokédex:', '', '', '', ''],
  'type-1': ['', 'Type 1', '', 'Tipo 1', '', '', '', ''],
  'type-2': ['', 'Type 2', '', 'Tipo 2', '', '', '', ''],

  // Pokemon modifiers
  happiness: ['', 'Happiness', '', 'Felicidad', '', '', '', ''],
  ivs: ['', 'IVs', '', 'IVs', '', '', '', ''],
  level: ['', 'Level', '', 'Nivel', '', '', '', ''],
  nature: ['', 'Nature', '', 'Naturaleza', '', '', '', ''],

  // Moves data
  accuracy: ['', 'Accuracy', '', 'Precisión', '', '', '', ''],
  category: ['', 'Category', '', 'Categoría', '', '', '', ''],
  power: ['', 'Power', '', 'Potencia', '', '', '', ''],
  pp: ['', 'PP', '', 'PP', '', '', '', ''],
  probability: ['', 'Probability', '', 'Probabilidad', '', '', '', ''],
  tm: ['', 'TM', '', 'MT', '', '', '', ''],
  type: ['', 'Type', '', 'Tipo', '', '', '', ''],

  // Categories
  'category-Physical': ['', 'Physical', '', 'Normal', '', '', '', ''],
  'category-Special': ['', 'Special', '', 'Especial', '', '', '', ''],
  'category-Status': ['', 'Status', '', 'Estado', '', '', '', ''],

  // Candies
  candies: ['', 'Candies', '', 'Caramelos', '', '', '', ''],
  'candy-attack': ['', 'Mighty candy', '', 'Caramelo Músculo', '', '', '', ''],
  'candy-defense': ['', 'Tough candy', '', 'Caramelo Aguante', '', '', '', ''],
  'candy-hp': ['', 'Health candy', '', 'Caramelo Vigor', '', '', '', ''],
  'candy-spAttack': ['', 'Smart candy', '', 'Caramelo Intelecto', '', '', '', ''],
  'candy-spDefense': ['', 'Courage candy', '', 'Caramelo Mente', '', '', '', ''],
  'candy-speed': ['', 'Quick candy', '', 'Caramelo Ímpetu', '', '', '', ''],
};

export const uiTranslations: ITranslationsCollection = {
  demo: ['', '', '', '', '', '', '', ''],
  order: ['japanese', 'english', 'german', 'spanish', 'french', 'italian', 'korean', 'chinese'],

  'generic-no': ['', 'No', '', 'No', '', '', '', ''],
  'generic-yes': ['', 'Yes', '', 'Si', '', '', '', ''],

  // Header
  'header-calculator': ['', 'Calculator', '', 'Calculadora', '', '', '', ''],
  'header-home': ['', 'Home', '', 'Inicio', '', '', '', ''],
  'header-moves': ['', 'Moves', '', 'Movimientos', '', '', '', ''],
  'header-pokedex': ['', 'Pokédex', '', 'Pokédex', '', '', '', ''],

  // Footer
  'footer-game-elements': ['', "Game elements' language", '', 'Idioma de los elementos del juego', '', '', '', ''],
  'footer-ui-elements': ['', "App's language", '', 'Idioma de la App', '', '', '', ''],

  // Landing
  'landing-calculate': [
    '',
    'Calculate how your Pokémon will look',
    '',
    'Calcula cómo quedará tu Pokémon',
    '',
    '',
    '',
    '',
  ],
  'landing-calculate-cta': ['', 'Calculate', '', 'Calcular', '', '', '', ''],
  'landing-find-best-moves': [
    '',
    'Find the best moves against a particular Pokémon',
    '',
    'Encuentra los mejores movimientos contra un Pokémon en particular',
    '',
    '',
    '',
    '',
  ],
  'landing-how-to-defeat': [
    '',
    'Find best Pokémon to defeat your rival',
    '',
    'Encuentra los mejores Pokémon para vencer a tu rival',
    '',
    '',
    '',
    '',
  ],

  // Calculator
  'calculator-empty-case': ['', 'Select a Pokémon', '', 'Seleciona un Pokémon', '', '', '', ''],
  'calculator-final-stats': ['', 'Final stats', '', 'Estadísticas finales', '', '', '', ''],
  'calculator-generic': ['', 'Generic', '', 'General', '', '', '', ''],
  'calculator-level-down': ['', 'Set to min.', '', 'Bajar al mín.', '', '', '', ''],
  'calculator-level-up': ['', 'Set to max.', '', 'Subir al máx.', '', '', '', ''],
  'calculator-nature-increase': ['', 'Nature that increases', '', 'Naturaleza que aumenta', '', '', '', ''],
  'calculator-nature-reduce': ['', 'Nature that reduces', '', 'Naturaleza que reduce', '', '', '', ''],
  'calculator-reset': ['', 'Reset', '', 'Reiniciar', '', '', '', ''],
  'calculator-select-pokemon': ['', 'Pokémon', '', 'Pokémon', '', '', '', ''],

  // Pokédex
  'pokedex-details': ['', 'Details', '', 'Detalles', '', '', '', ''],
  'pokedex-load-more': ['', 'Load more', '', 'Ver más', '', '', '', ''],

  // Pokémon
  'pokemon-bars': ['', 'Bars', '', 'Barras', '', '', '', ''],
  'pokemon-chart': ['', 'Chart', '', 'Gráfica', '', '', '', ''],
  'pokemon-no-pokedex-entry': [
    '',
    'There is no data about this pokemon yet.',
    '',
    'Todavía no hay datos acerca de este pokémon',
    '',
    '',
    '',
    '',
  ],
  'pokemon-preview': ['', ':var: preview', '', 'Imagen de :var:', '', '', '', ''],
  'pokemon-recommended': [
    '',
    'Recommended capture with :var: perfect IVs',
    '',
    'Captura recomendada con :var: IVs perfectos',
    '',
    '',
    '',
    '',
  ],

  // Moves
  'moves-details': ['', 'Details', '', 'Detalles', '', '', '', ''],
  'moves-load-more': ['', 'Load more', '', 'Ver más', '', '', '', ''],

  // Move

  // Search
  'search-base-cp': ['', 'Base CP', '', 'PC base', '', '', '', ''],
  'search-best-stats': ['', 'Best stats', '', 'Mejores estadísitcas', '', '', '', ''],
  'search-exclude-types': ['', 'Exclude types', '', 'Excluir tipos', '', '', '', ''],
  'search-filters-apply': ['', 'Search', '', 'Buscar', '', '', '', ''],
  'search-filters-reset': ['', 'Reset', '', 'Limpiar', '', '', '', ''],
  'search-include-types': ['', 'Include types', '', 'Incluir tipos', '', '', '', ''],
  'search-move': ['', 'Move', '', 'Movimiento', '', '', '', ''],
  'search-pokemon': ['', 'Pokémon', '', 'Pokémon', '', '', '', ''],
  'search-select-some-stats': ['', 'Select some stats', '', 'Selecciona alguna estadística', '', '', '', ''],
  'search-select-some-types': ['', 'Select some types', '', 'Selecciona algún tipo', '', '', '', ''],
  'search-show-alolan-forms': ['', 'Show Alolan forms', '', 'Mostrar formas Alola', '', '', '', ''],
  'search-show-megaevolutions': ['', 'Show Megaevolutions', '', 'Mostrar Megaevoluciones', '', '', '', ''],
  'search-show-tm': ['', 'Show TM moves', '', 'Mostrar movimientos MT', '', '', '', ''],
  'search-strong-against': ['', 'Strong against', '', 'Fuerte contra', '', '', '', ''],
  'search-weak-against': ['', 'Weak against', '', 'Débil contra', '', '', '', ''],
  'search-worst-stats': ['', 'Worst stats', '', 'Peores estadísticas', '', '', '', ''],
};
