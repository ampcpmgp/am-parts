import { mount, storiesOf } from '@storybook/riot'
import { withKnobs, boolean } from '@storybook/addon-knobs'
import { withBackgrounds } from '@storybook/addon-backgrounds'
import './index.tag'
import catImage from './story/cat.image.js'

storiesOf('Image Clipper', module)
  .addDecorator(
    withBackgrounds([
      { name: 'grey', value: 'white', default: true },
      { name: 'lightgreen', value: 'lightgreen' }
    ])
  )
  .addDecorator(withKnobs)
  .add('normal', () =>
    mount('am-parts-image-clipper', {
      image: catImage,
      fit: boolean('fit', false),
      callback: console.info
    })
  )
