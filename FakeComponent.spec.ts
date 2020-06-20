import { FakeComponent } from './FakeComponent';
import { Entry } from './Entry';

describe('FakeComponent class', () => {
  let component: FakeComponent;

  beforeEach(() => {
    component = new FakeComponent({
      id: '1',
      description: 'initial description',
      minPrice: 10,
      maxPrice: 20,
      visible: true,
      photos: [],
    });
  });

  function createEvent(
    name: string,
    value = '',
    checked = false
  ): React.ChangeEvent<HTMLInputElement> {
    return {
      target: {
        name,
        value,
        checked,
      },
    } as React.ChangeEvent<HTMLInputElement>;
  }

  function calculateMidPrice(entry: Entry): number {
    return (entry.minPrice + entry.maxPrice) / 2;
  }

  describe('handleInputChangeUnsafe method', () => {
    it('can set additional fields', () => {
      const event = createEvent('unknown', 'some value');

      component.handleInputChangeUnsafe(event);

      expect((component.state.data as any).unknown).toBeUndefined();
    });

    it('sets value of wrong type', () => {
      const event = createEvent('minPrice', '12');

      component.handleInputChangeUnsafe(event);

      expect(component.state.data.minPrice).toBe(12);
    });

    it('causes hidden bugs', () => {
      const event = createEvent('minPrice', '12');

      component.handleInputChangeUnsafe(event);
      const midPrice = calculateMidPrice(component.state.data);

      expect(midPrice).toBe(16);
    });
  });

  describe('handleInputChangeSafe method', () => {
    it('can set additional fields', () => {
      const event = createEvent('unknown', 'some value');

      component.handleInputChangeSafe(event);

      expect((component.state.data as any).unknown).toBeUndefined();
    });

    it('sets value of wrong type', () => {
      const event = createEvent('minPrice', '12');

      component.handleInputChangeSafe(event);

      expect(component.state.data.minPrice).toBe(12);
    });

    it('prevents hidden bugs', () => {
      const event = createEvent('minPrice', '12');

      component.handleInputChangeSafe(event);
      const midPrice = calculateMidPrice(component.state.data);

      expect(midPrice).toBe(16);
    });
  });
});
