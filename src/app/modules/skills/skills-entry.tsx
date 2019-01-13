import classnames from 'classnames';
import * as React from 'react';
import injectSheet from 'react-jss';
import { getPaddedId } from '../../utils/pokemon';
import { getUiTranslation } from '../../utils/translations';

import Buttons from '../../components/buttons';
import { TableCell, TableRow } from '../../components/table';
import Tag from '../../components/tag';

import { SKILLS } from '../../../constants/appRoutes';
import { getTypeName } from '../../../constants/pokemon/pokemon-types';
import { getTypeColor } from '../../../constants/pokemon/pokemon-types-color';
import { getTypeIcon } from '../../../constants/pokemon/pokemon-types-icons';

import { ISheet } from '../../root.models';
import { ISkill } from './skills.models';

const sheet: ISheet = {
  fullWidth: {
    width: '100%',
  },
  noMargin: {
    margin: 0,
  },
};

interface IOwnProps {
  classes: { [key: string]: string };
  className?: string;
  skill: ISkill;
}

const unstyledSkillsEntry = ({ classes, className, skill }: IOwnProps) => (
  <TableRow className={className}>
    {/* ID */}
    <TableCell center>{getPaddedId(String(skill.id))}</TableCell>

    {/* Name */}
    <TableCell>{skill.name}</TableCell>

    {/* Type */}
    <TableCell center>
      {skill.types.ownType && (
        <Tag
          key={skill.types.ownType}
          label={getTypeName(skill.types.ownType)}
          icon={getTypeIcon(skill.types.ownType)}
          backgroundColor={getTypeColor(skill.types.ownType)}
        />
      )}
    </TableCell>

    {/* Category */}
    <TableCell center>{skill.category}</TableCell>

    {/* Power */}
    <TableCell center>{skill.power}</TableCell>

    {/* Accuracy */}
    <TableCell center>{skill.accuracy ? `${skill.accuracy}%` : '-'}</TableCell>

    {/* PP */}
    <TableCell center>{skill.pp}</TableCell>

    {/* TM */}
    <TableCell center>{skill.tm}</TableCell>

    {/* Probability */}
    <TableCell center>{skill.probability ? `${skill.probability}%` : '-'}</TableCell>

    {/* Quick Actions */}
    <TableCell center style={{ height: 'auto' }}>
      <Buttons
        className={classnames(classes.fullWidth, classes.noMargin)}
        align="left"
        options={[
          {
            className: classes.noMargin,
            id: `${skill.id.toString()}-details`,
            label: getUiTranslation('skills-details'),
            to: SKILLS.replace(':id?', String(skill.id)),
            type: 'button',
          },
        ]}
      />
    </TableCell>
  </TableRow>
);

const SkillsEntry = injectSheet(sheet)(unstyledSkillsEntry);

export default SkillsEntry;
