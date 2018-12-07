import { mount, storiesOf } from '@storybook/riot'
import { withKnobs, number } from '@storybook/addon-knobs'
import { withBackgrounds } from '@storybook/addon-backgrounds'
import './index.tag'

storiesOf('Header', module)
  .addDecorator(
    withBackgrounds([
      { name: 'grey', value: '#ccc', default: true },
      { name: 'lightgreen', value: 'lightgreen' }
    ])
  )
  .addDecorator(withKnobs)
  .add('normal', () =>
    mount('parts-header', {
      handleMenuClick: console.info,
      clickCount: number('clickCount', 0)
    })
  )
