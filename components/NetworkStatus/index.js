// @flow
import * as React from 'react';
import * as styles from './styles';

type Props = {};
type State = {
  online: boolean
};

class NetworkStatus extends React.Component<Props, State> {
  state = {
    online: true
  };

  componentDidMount() {
    if (typeof window !== 'undefined') {
      window.addEventListener('online', this.updateOnlineStatus);
      window.addEventListener('offline', this.updateOnlineStatus);
    }
  }

  updateOnlineStatus = () => {
    const condition = navigator.onLine ? 'online' : 'offline';
    if (condition === 'offline') {
      this.setState({ online: false });
    } else if (condition === 'online') {
      this.setState({ online: true });
    }
  };

  render() {
    return (
      <div>
        {!this.state.online && (
          <styles.Root>
            <styles.Label> Offline </styles.Label>
          </styles.Root>
        )}
      </div>
    );
  }
}

export default NetworkStatus;
