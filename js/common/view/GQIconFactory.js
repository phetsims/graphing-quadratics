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
    createIntegersIcon : function() {
      return new Text( 'Integers' );
    },
    createDecimalsIcon : function() {
      return new Text( 'Decimals' );
    }
  };

  graphingQuadratics.register( 'GQIconFactory', GQIconFactory );

  return GQIconFactory;
} );