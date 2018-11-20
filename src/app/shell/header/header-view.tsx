import * as React from 'react';

class HeaderView extends React.Component {
  static displayName = 'HeaderView';

  render() {
    return (
      <header className="Header">
        <p>Hello, how are you?</p>
        <p>I'm fine, thanks. What about you?</p>
      </header>
    );
  }
}

export default HeaderView;
