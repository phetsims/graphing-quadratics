// Copyright 2018, University of Colorado Boulder

/**
 * Factory for creating icons that appear in this sim.
 *
 * @author Andrea Lin
 */
define( function( require ) {
  'use strict';

  // modules
  var graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  var Text = require( 'SCENERY/nodes/Text' );

  var GQIconFactory = {
    createIntegerCoefficientsIcon : function() {
      return new Text( 'Integers' );
    },
    createDecimalCoefficientsIcon : function() {
      return new Text( 'Decimals' );
    }
  };

  graphingQuadratics.register( 'GQIconFactory', GQIconFactory );

  return GQIconFactory;
} );