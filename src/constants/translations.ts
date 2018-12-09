interface TranslationsCollection {
  [token: string]: [string, string, string, string, string, string, string, string];
}

const translations: TranslationsCollection = {
  demo: ['', '', '', '', '', '', '', ''],
  order: ['japanese', 'english', 'german', 'spanish', 'french', 'italian', 'korean', 'chinese'],

  // Pokemon Types
  'type-Bug': ['', 'Bug', '', 'Bicho', '', '', '', ''],
  'type-Dark': ['', 'Dark', '', 'Siniestro', '', '', '', ''],
  'type-Dragon': ['', 'Dragon', '', 'Dragón', '', '', '', ''],
  'type-Electric': ['', 'Electric', '', 'Eléctrico', '', '', '', ''],
  'type-Fairy': ['', 'Fairy', '', 'Hada', '', '', '', ''],
  'type-Fighting': ['', 'Fighting', '', 'Lucha', '', '', '', ''],
  'type-Fire': ['', 'Fire', '', 'Fuego', '', '', '', ''],
  'type-Flying': ['', 'Flying', '', 'Volador', '', '', '', ''],
  'type-Grass': ['', 'Grass', '', 'Planta', '', '', '', ''],
  'type-Ghost': ['', 'Ghost', '', 'Fantasma', '', '', '', ''],
  'type-Ground': ['', 'Ground', '', 'Tierra', '', '', '', ''],
  'type-Ice': ['', 'Ice', '', 'Hielo', '', '', '', ''],
  'type-Normal': ['', 'Normal', '', 'Normal', '', '', '', ''],
  'type-Poison': ['', 'Poison', '', 'Veneno', '', '', '', ''],
  'type-Psychic': ['', 'Psychic', '', 'Psíquico', '', '', '', ''],
  'type-Rock': ['', 'Rock', '', 'Roca', '', '', '', ''],
  'type-Steel': ['', 'Steel', '', 'Acero', '', '', '', ''],
  'type-Water': ['', 'Water', '', 'Agua', '', '', '', ''],

  // Pokemon stats
  'stat-attack': ['', 'Attack', '', 'Ataque', '', '', '', ''],
  'stat-defense': ['', 'Defense', '', 'Defensa', '', '', '', ''],
  'stat-spAttack': ['', 'Sp. At.', '', 'Ataque Esp.', '', '', '', ''],
  'stat-spDefense': ['', 'Sp. Def.', '', 'Defensa Esp.', '', '', '', ''],
  'stat-hp': ['', 'HP', '', 'PS', '', '', '', ''],
  'stat-speed': ['', 'Speed', '', 'Velocidad', '', '', '', ''],

  // IV Ranges
  'iv-best': ['', 'Best', '', 'Perfecto', '', '', '', ''],
  'iv-fantastic': ['', 'Fantastic', '', 'Espectacular', '', '', '', ''],
  'iv-veryGood': ['', 'Very good', '', 'Genial', '', '', '', ''],
  'iv-prettyGood': ['', 'Pretty good', '', 'Bien', '', '', '', ''],
  'iv-decent': ['', 'Decent', '', 'Decente?', '', '', '', ''],
  'iv-noGood': ['', 'Not good', '', 'Malo?', '', '', '', ''],

  // Forms
  'forms-alolan': ['', 'Alolan', '', 'Alola', '', '', '', ''],

  // Header
  'header-go-home': ['', 'Go to Home screen', '', 'Ir a la página de inicio', '', '', '', ''],

  // Search
  'search-name-or-number': ['', 'Name or number', '', 'Nombre o número', '', '', '', ''],
  'search-select-some-types': ['', 'Select some types', '', 'Selecciona algún tipo', '', '', '', ''],
  'search-select-some-stats': ['', 'Select some stats', '', 'Selecciona alguna estadística', '', '', '', ''],
  'search-include-types': ['', 'Include types', '', 'Incluir tipos', '', '', '', ''],
  'search-exclude-types': ['', 'Exclude types', '', 'Excluir tipos', '', '', '', ''],
  'search-strong-against': ['', 'Strong against', '', 'Fuerte contra', '', '', '', ''],
  'search-weak-against': ['', 'Weak against', '', 'Débil contra', '', '', '', ''],
  'search-best-stats': ['', 'Best stats', '', 'Mejores estadísitcas', '', '', '', ''],
  'search-worst-stats': ['', 'Worst stats', '', 'Peores estadísticas', '', '', '', ''],
  'search-min-cp': ['', 'Min. Base CP', '', 'PC base mínimos', '', '', '', ''],
  'search-max-cp': ['', 'Max. Base CP', '', 'PC base máximos', '', '', '', ''],
  'search-show-megaevolutions': ['', 'Show Megaevolutions', '', 'Mostrar Megaevoluciones', '', '', '', ''],
  'search-show-alolan-forms': ['', 'Show Alolan forms', '', 'Mostrar formas Alola', '', '', '', ''],
  'search-reset-filters': ['', 'Reset filters', '', 'Limpiar filtros', '', '', '', ''],

  // Pokemon list
  'pokemon-avatar': ['', 'Avatar', '', 'Avatar', '', '', '', ''],
  'pokemon-name': ['', 'Name', '', 'Nombre', '', '', '', ''],
  'pokemon-type-1': ['', 'Type 1', '', 'Tipo 1', '', '', '', ''],
  'pokemon-type-2': ['', 'Type 2', '', 'Tipo 2', '', '', '', ''],
  'pokemon-base-cp': ['', 'Base CP', '', 'PC Base', '', '', '', ''],
  'pokemon-load-more': ['', 'Load more', '', 'Ver más', '', '', '', ''],
  'pokemon-details': ['', 'Details', '', 'Detalles', '', '', '', ''],

  // Pokemon details
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
  'pokemon-details-pokedex-number': ['', 'Pokédex No.', '', 'Nº en la Pokédex:', '', '', '', ''],
  'pokemon-details-preview': ['', ':var: preview', '', 'Imagen de :var:', '', '', '', ''],
  'pokemon-details-chart': ['', 'Chart', '', 'Gráfica', '', '', '', ''],
  'pokemon-details-bars': ['', 'Bars', '', 'Barras', '', '', '', ''],
  'pokemon-details-base-stats': ['', 'Base Stats', '', 'Estadísticas base', '', '', '', ''],
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
};

export default translations;
