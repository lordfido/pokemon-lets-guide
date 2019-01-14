/**
 * Based on a pokemon national ID, this will return a string with 3 digits
 * @example getPaddedId('10'); Will return '010'
 */
const getPaddedId = pokemonId => {
  let id = String(pokemonId);

  if (id.length === 1) {
    id = `00${pokemonId}`;
  } else if (id.length === 2) {
    id = `0${pokemonId}`;
  }

  return id;
};

const getVariantId = ({ id, isAlolan, isMega, variant }) => {
  if (!isAlolan && !isMega && !variant) {
    return id;
  }

  let option;
  // Alolan pokemon
  if (isAlolan) {
    option = variantOptions.find(o => !!o.isExact && o.name === 'Alolan' && (!o.id || o.id === id));

    // Megaevolutions
  } else if (isMega) {
    if (variant) {
      option = variantOptions.find(o => !!o.isExact && o.name === variant && (!o.id || o.id === id));
    } else {
      option = { form: 'f2' };
    }

    // Other variants (pokemon specific)
  } else {
    option = variantOptions.find(
      o =>
        !!variant && (!o.id || o.id === id) && ((!!o.isExact && o.name === variant) || new RegExp(o.name).test(variant))
    );
  }

  if (option && option.form) {
    return `${id}_${option.form}`;
  }

  return id;
};

/**
 * Based in a pokemon name and variant, generates a new name
 */
const getVariantName = ({ name, isAlolan, isMega, variant }) => {
  if (!isAlolan && !isMega && !variant) {
    return name;
  }

  // Alolan pokemon
  if (isAlolan) {
    return `Alolan ${name}`;
  }

  // Megaevolutions
  if (isMega) {
    if (variant) {
      return `Mega ${name} ${variant}`;
    }

    return `Mega ${name}`;
  }

  // Other variants (pokemon specific)
  if (variant) {
    return `${name} (${variant})`;
  }

  return name;
};
const variantOptions = [
  // Megaevolutions
  {
    form: 'f2',
    isExact: true,
    name: 'X',
  },
  {
    form: 'f3',
    isExact: true,
    name: 'Y',
  },
  // Alolan
  {
    form: 'f2',
    isExact: true,
    name: 'Alolan',
  },
  // Castform
  {
    form: 'f2',
    name: 'Sunny',
  },
  {
    form: 'f3',
    name: 'Rainy',
  },
  {
    form: 'f4',
    name: 'Snowy',
  },
  // Kyogre, Groudon
  {
    form: 'f2',
    name: 'Primal',
  },
  // Deoxys
  {
    form: '',
    name: 'Normal',
  },
  {
    form: 'f2',
    name: 'Attack',
  },
  {
    form: 'f3',
    name: 'Defense',
  },
  {
    form: 'f4',
    name: 'Speed',
  },
  // Wormadan
  {
    form: '',
    name: 'Plant',
  },
  {
    form: 'f2',
    name: 'Sandy',
  },
  {
    form: 'f3',
    name: 'Trash',
  },
  // Rotom
  {
    form: 'f2',
    name: 'Heat',
  },
  {
    form: 'f3',
    name: 'Wash',
  },
  {
    form: 'f4',
    name: 'Frost',
  },
  {
    form: 'f5',
    name: 'Fan',
  },
  {
    form: 'f6',
    name: 'Mow',
  },
  // Giratina
  {
    form: '',
    name: 'Altered',
  },
  {
    form: 'f2',
    name: 'Origin',
  },
  // Shaymin
  {
    form: '',
    name: 'Land',
  },
  {
    form: 'f2',
    name: 'Sky',
  },
  // Basculin
  {
    form: '',
    name: 'Red',
  },
  {
    form: 'f2',
    name: 'Blue',
  },
  // Darmanitan
  {
    form: '',
    name: 'Standard',
  },
  {
    form: 'f2',
    name: 'Zen',
  },
  // Tornadus, Thundurus, Landorus
  {
    form: '',
    name: 'Incarnate',
  },
  {
    form: 'f2',
    name: 'Therian',
  },
  // Kyurem
  {
    form: 'f2',
    name: 'White',
  },
  {
    form: 'f3',
    name: 'Black',
  },
  // Keldeo
  {
    form: '',
    name: 'Ordinary',
  },
  {
    form: 'f2',
    name: 'Resolute',
  },
  // Meloetta
  {
    form: '',
    name: 'Aria',
  },
  {
    form: 'f2',
    name: 'Pirouette',
  },
  // Greninja
  {
    form: 'f2',
    name: 'Ash',
  },
  // Meowstic
  {
    form: 'f2',
    name: 'Female',
  },
  {
    form: '',
    name: 'Male',
  },
  // Aegislash
  {
    form: '',
    name: 'Shield',
  },
  {
    form: 'f2',
    name: 'Blade',
  },
  // Pumpkaboo, Gourgeist
  {
    form: '',
    name: 'Average',
  },
  {
    form: 'f2',
    name: 'Small',
  },
  {
    form: 'f3',
    name: 'Large',
  },
  {
    form: 'f4',
    name: 'Super',
  },
  // Zygarde
  {
    form: '',
    name: '50%',
  },
  {
    form: 'f2',
    name: '10%',
  },
  {
    form: 'f3',
    name: 'Complete',
  },
  // Hoopa
  {
    form: '',
    name: 'Confined',
  },
  {
    form: 'f2',
    name: 'Unbound',
  },
  // Oricorio
  {
    form: '',
    name: 'Baile',
  },
  {
    form: 'f2',
    name: 'Pom-Pom',
  },
  {
    form: 'f3',
    name: "Pa'u",
  },
  {
    form: 'f4',
    name: 'Sensu',
  },
  // Rockruf
  {
    form: 'f2',
    name: 'Own Tempo',
  },
  // Lycanroc
  {
    form: '',
    name: 'Midday',
  },
  {
    form: 'f2',
    name: 'Midnight',
  },
  {
    // TODO: No info about this form in pokemon.com
    form: 'f3',
    id: '745',
    name: 'Dusk',
  },
  // Wishiwashi
  {
    form: '',
    name: 'Solo',
  },
  {
    form: 'f2',
    name: 'School',
  },
  // Minior
  {
    form: '',
    name: 'Meteor',
  },
  {
    form: 'f2',
    name: 'Core',
  },
  // Necrozma
  {
    form: 'f2',
    name: 'Dusk',
  },
  {
    form: 'f3',
    name: 'Dawn',
  },
  {
    form: 'f4',
    name: 'Ultra',
  },
];

module.exports = {
  getPaddedId,
  getVariantId,
  getVariantName,
};
