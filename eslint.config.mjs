// Copyright 2024, University of Colorado Boulder

/**
 * ESLint configuration for graphing-quadratics.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */

import banTSCommentConfig from '../perennial-alias/js/eslint/banTSCommentConfig.mjs';
import simEslintConfig from '../perennial-alias/js/eslint/sim.eslint.config.mjs';

export default [
  ...simEslintConfig,
  ...banTSCommentConfig
];