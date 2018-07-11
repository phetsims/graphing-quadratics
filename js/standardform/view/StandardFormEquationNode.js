// Copyright 2018, University of Colorado Boulder

/**
 * Renderer for standard form equation.
 * General form is y = ax^2 + bx + c
 *
 * @author Andrea Lin
 */
define( function( require ) {
  'use strict';

  // modules
  var graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  var inherit = require( 'PHET_CORE/inherit' );
  var RichText = require( 'SCENERY/nodes/RichText' );

  /**
   * @constructor
   */
  function StandardFormEquationNode( options ) {

    var equation = 'y = ax<sup>2</sup> + bx + c';

    RichText.call( this, equation, options );

  }

  graphingQuadratics.register( 'StandardFormEquationNode', StandardFormEquationNode );

  return inherit( RichText, StandardFormEquationNode );
} );
