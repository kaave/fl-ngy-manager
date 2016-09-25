import * as React from 'react';
import { render } from 'react-dom';

import Main from './public/containers/main';

window.addEventListener('DOMContentLoaded', () => {
  render(<Main />, document.getElementById('mount-point'));
});
