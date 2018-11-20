import * as React from 'react';
import classnames from 'classnames';

interface OwnProps {
  profile: {
    picture: string;
    fullName?: string;
    name?: string;
  };
  size?: string;
  isExpandable?: boolean;
}

class Avatar extends React.Component<OwnProps> {
  static displayName = 'Avatar';

  render() {
    const { profile, size = 'md', isExpandable = false } = this.props;

    const classes = classnames({
      Avatar: true,
      [`Avatar--${size}`]: size,
      'is-empty': !profile || !profile.picture,
      'is-expandable': isExpandable,
    });

    return (
      <div className={classes}>
        {!profile.picture && profile.fullName && <i className="fa fa-user" />}
        {!profile.picture && profile.name && <i className="fa fa-globe" />}
        {profile.picture && <img className="Avatar-picture" src={profile.picture} />}
      </div>
    );
  }
}

export default Avatar;
