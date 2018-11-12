// Copyright 2018, University of Colorado Boulder

/**
 * Checkbox for the linear term, y = bx
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const GQCheckbox = require( 'GRAPHING_QUADRATICS/common/view/GQCheckbox' );
  const GQColors = require( 'GRAPHING_QUADRATICS/common/GQColors' );
  const GQSymbols = require( 'GRAPHING_QUADRATICS/common/GQSymbols' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const MathSymbols = require( 'SCENERY_PHET/MathSymbols' );

  class LinearTermCheckbox extends GQCheckbox {

    /**
     * @param {BooleanProperty} linearTermVisibleProperty
     * @param {Object} [options]
     */
    constructor( linearTermVisibleProperty, options ) {

      options = _.extend( {
        textFill: GQColors.LINEAR_TERM,

        // phet-io
        phetioDocumentation: 'checkbox that makes the linear term (y = bx) visible on the graph'
      }, options );

      // y = bx
      const text = GQSymbols.y + ' ' + MathSymbols.EQUAL_TO + ' ' + GQSymbols.b + GQSymbols.x;

      super( text, linearTermVisibleProperty, options );
    }
  }

  return graphingQuadratics.register( 'LinearTermCheckbox', LinearTermCheckbox );
} );