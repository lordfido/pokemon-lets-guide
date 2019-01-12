interface ITranslationsCollection {
  [token: string]: [string, string, string, string, string, string, string, string];
}

const translations: ITranslationsCollection = {
  demo: ['', '', '', '', '', '', '', ''],
  order: ['japanese', 'english', 'german', 'spanish', 'french', 'italian', 'korean', 'chinese'],

  'generic-no': ['', 'No', '', 'No', '', '', '', ''],
  'generic-yes': ['', 'Yes', '', 'Si', '', '', '', ''],

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

  // Header
  'header-calculator': ['', 'Calculator', '', 'Calculadora', '', '', '', ''],
  'header-home': ['', 'Home', '', 'Inicio', '', '', '', ''],
  'header-pokedex': ['', 'Pokédex', '', 'Pokédex', '', '', '', ''],
  'header-skills': ['', 'Skills', '', 'Movimientos', '', '', '', ''],

  // Calculator
  'calculator-candies': ['', 'Candies', '', 'Caramelos', '', '', '', ''],
  'calculator-candy-attack': ['', 'Mighty candy', '', 'Caramelo Músculo', '', '', '', ''],
  'calculator-candy-defense': ['', 'Tough candy', '', 'Caramelo Aguante', '', '', '', ''],
  'calculator-candy-hp': ['', 'Health candy', '', 'Caramelo Vigor', '', '', '', ''],
  'calculator-candy-spAttack': ['', 'Smart candy', '', 'Caramelo Intelecto', '', '', '', ''],
  'calculator-candy-spDefense': ['', 'Courage candy', '', 'Caramelo Mente', '', '', '', ''],
  'calculator-candy-speed': ['', 'Quick candy', '', 'Caramelo Ímpetu', '', '', '', ''],
  'calculator-final-stats': ['', 'Final stats', '', 'Estadísticas finales', '', '', '', ''],
  'calculator-increase': ['', 'Increase', '', 'Aumenta', '', '', '', ''],
  'calculator-ivs': ['', 'IVs', '', 'IVs', '', '', '', ''],
  'calculator-level': ['', 'Level', '', 'Nivel', '', '', '', ''],
  'calculator-level-down': ['', 'Set to min.', '', 'Bajar al mín.', '', '', '', ''],
  'calculator-level-up': ['', 'Set to max.', '', 'Subir al máx.', '', '', '', ''],
  'calculator-nature': ['', 'Nature', '', 'Naturaleza', '', '', '', ''],
  'calculator-reduce': ['', 'Reduce', '', 'Reduce', '', '', '', ''],
  'calculator-reset': ['', 'Reset', '', 'Reiniciar', '', '', '', ''],
  'calculator-select-pokemon': ['', 'Select a Pokémon', '', 'Seleciona un Pokémon', '', '', '', ''],

  // Pokemon list
  'pokemon-avatar': ['', 'Avatar', '', 'Avatar', '', '', '', ''],
  'pokemon-base-cp': ['', 'Base CP', '', 'PC Base', '', '', '', ''],
  'pokemon-details': ['', 'Details', '', 'Detalles', '', '', '', ''],
  'pokemon-load-more': ['', 'Load more', '', 'Ver más', '', '', '', ''],
  'pokemon-name': ['', 'Name', '', 'Nombre', '', '', '', ''],
  'pokemon-type-1': ['', 'Type 1', '', 'Tipo 1', '', '', '', ''],
  'pokemon-type-2': ['', 'Type 2', '', 'Tipo 2', '', '', '', ''],

  // Pokemon details
  'pokemon-details-bars': ['', 'Bars', '', 'Barras', '', '', '', ''],
  'pokemon-details-base-stats': ['', 'Base Stats', '', 'Estadísticas base', '', '', '', ''],
  'pokemon-details-chart': ['', 'Chart', '', 'Gráfica', '', '', '', ''],
  'pokemon-details-no-pokedex-entry': [
    '',
    'There is no data about this pokemon yet.',
    '',
    'Todavía no hay datos acerca de este pokémon',
    '',
    '',
    '',
    '',
  ],
  'pokemon-details-pokedex-number': ['', 'Pokédex No.', '', 'Nº en la Pokédex:', '', '', '', ''],
  'pokemon-details-preview': ['', ':var: preview', '', 'Imagen de :var:', '', '', '', ''],
  'pokemon-details-recommended': [
    '',
    'Recommended capture with :var: perfect IVs',
    '',
    'Captura recomendada con :var: IVs perfectos',
    '',
    '',
    '',
    '',
  ],

  // Search
  'search-best-stats': ['', 'Best stats', '', 'Mejores estadísitcas', '', '', '', ''],
  'search-exclude-types': ['', 'Exclude types', '', 'Excluir tipos', '', '', '', ''],
  'search-include-types': ['', 'Include types', '', 'Incluir tipos', '', '', '', ''],
  'search-max-cp': ['', 'Max. Base CP', '', 'PC base máximos', '', '', '', ''],
  'search-min-cp': ['', 'Min. Base CP', '', 'PC base mínimos', '', '', '', ''],
  'search-name-or-number': ['', 'Name or number', '', 'Nombre o número', '', '', '', ''],
  'search-reset-filters': ['', 'Reset filters', '', 'Limpiar filtros', '', '', '', ''],
  'search-select-some-stats': ['', 'Select some stats', '', 'Selecciona alguna estadística', '', '', '', ''],
  'search-select-some-types': ['', 'Select some types', '', 'Selecciona algún tipo', '', '', '', ''],
  'search-show-alolan-forms': ['', 'Show Alolan forms', '', 'Mostrar formas Alola', '', '', '', ''],
  'search-show-megaevolutions': ['', 'Show Megaevolutions', '', 'Mostrar Megaevoluciones', '', '', '', ''],
  'search-strong-against': ['', 'Strong against', '', 'Fuerte contra', '', '', '', ''],
  'search-weak-against': ['', 'Weak against', '', 'Débil contra', '', '', '', ''],
  'search-worst-stats': ['', 'Worst stats', '', 'Peores estadísticas', '', '', '', ''],
};

export default translations;
