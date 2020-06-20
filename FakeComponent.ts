import { Entry } from './Entry';

export class FakeComponent {
  state: { data: Entry };

  constructor(data: Entry) {
    this.state = { data };
  }

  private setState(newState: { data: Entry }) {
    this.state = newState;
  }

  handleInputChangeUnsafe = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    const name = target.name;
    const value = name === 'visible' ? target.checked : target.value;

    var data = this.state.data as any;
    data[name] = value;

    this.setState({
      data,
    });
  };

  handleInputChangeSafe = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    const name = target.name;

    var data = this.state.data;

    if (name === 'visible') {
      data[name] = target.checked;
    } else if (name === 'id' || name === 'description') {
      data[name] = target.value;
    } else if (name === 'minPrice' || name === 'maxPrice') {
      data[name] = parseInt(target.value, 10);
    }

    this.setState({
      data,
    });
  };
}
