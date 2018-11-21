import * as React from 'react';

interface OwnProps {
  src: string;
  [key: string]: any;
}

interface OwnState {
  preview: HTMLImageElement | void;
}

class CustomImage extends React.Component<OwnProps, OwnState> {
  static displayName = 'CustomImage';

  state = {
    preview: undefined,
  };

  componentDidMount() {
    this.updateImagePreview();
  }

  componentDidUpdate(prevProps: OwnProps) {
    if (prevProps.src !== this.props.src) {
      this.setState(
        {
          preview: undefined,
        },
        this.updateImagePreview
      );
    }
  }

  updateImagePreview() {
    const { src } = this.props;

    const preview = new Image();
    preview.src = src;

    preview.onload = event => {
      this.setState({
        // @ts-ignore
        preview: event.path && event.path[0] && event.path[0].src,
      });
    };
  }

  render() {
    const { src, ...props } = this.props;
    const { preview } = this.state;

    if (!preview) return null;

    return <img {...props} src={preview} />;
  }
}

export default CustomImage;
