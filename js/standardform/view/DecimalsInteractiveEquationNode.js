// Copyright 2018, University of Colorado Boulder

/**
 * Renderer for standard form equation with integer cofficients that can be changed.
 * Form is y = ax^2 + bx + c, where a, b, and c can be changed with number pickers
 *
 * @author Andrea Lin
 */
define( function( require ) {
  'use strict';

  // modules
  var graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var inherit = require( 'PHET_CORE/inherit' );
  var HSlider = require( 'SUN/HSlider' );
  var MathSymbols = require( 'SCENERY_PHET/MathSymbols' );
  var RichText = require( 'SCENERY/nodes/RichText' );
  var GQFont = require( 'GRAPHING_QUADRATICS/common/GQFont' );

  // strings
  var xSquaredString = require( 'string!GRAPHING_QUADRATICS/xSquared' );
  var xString = require( 'string!GRAPHING_QUADRATICS/x' );
  var yString = require( 'string!GRAPHING_QUADRATICS/y' );

  // constants
  var TEXT_OPTIONS = { font: GQFont.MATH_SYMBOL_FONT };

  /**
   * @param {Property.<Number>} aProperty - the coefficient for x^2 in the quadratic
   * @param {Property.<Number>} bProperty - the coefficient for x in the quadratic
   * @param {Property.<Number>} cProperty - the constant term in the quadratic
   * @param {Object} [options]
   * @constructor
   */
  function DecimalsInteractiveEquationNode( aProperty, bProperty, cProperty, options ) {

      // interactive components of the equation
      var aSlider = new HSlider( aProperty, aProperty.range );
      var bSlider = new HSlider( bProperty, bProperty.range );
      var cSlider = new HSlider( cProperty, cProperty.range );

      HBox.call( this, {
        children: [
          new RichText( yString, TEXT_OPTIONS ),
          new RichText( MathSymbols.EQUAL_TO, TEXT_OPTIONS ),
          aSlider,
          new RichText( xSquaredString, TEXT_OPTIONS ),
          new RichText( MathSymbols.PLUS, TEXT_OPTIONS ),
          bSlider,
          new RichText( xString, TEXT_OPTIONS ),
          new RichText( MathSymbols.PLUS, TEXT_OPTIONS ),
          cSlider
        ],
        align: 'center',
        spacing: 10
      } );
  }

  graphingQuadratics.register( 'DecimalsInteractiveEquationNode', DecimalsInteractiveEquationNode );

  return inherit( HBox, DecimalsInteractiveEquationNode );
} );
