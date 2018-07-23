// Copyright 2018, University of Colorado Boulder

/**
 * Factory for creating icons that appear in this sim.
 *
 * @author Andrea Lin
 */
define( function( require ) {
  'use strict';

  // modules
  const GQFont = require( 'GRAPHING_QUADRATICS/common/GQFont' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const Node = require( 'SCENERY/nodes/Node' );
  const NumberPicker = require( 'SCENERY_PHET/NumberPicker' );
  const NumberProperty = require( 'AXON/NumberProperty' );
  const Property = require( 'AXON/Property' );
  const Text = require( 'SCENERY/nodes/Text' );

  // constants
  const NUMBER_PICKER_OPTIONS = {
    font: GQFont.NUMBER_FONT,
    color: 'black',
    xMargin: 5
  };

  var GQIconFactory = {
    createIntegersIcon: function() {
      var numberProperty = new NumberProperty( 0, { range: { min: -6, max: 6 } } );
      var numberPicker = new NumberPicker(
        numberProperty,
        new Property( numberProperty.range ),
        NUMBER_PICKER_OPTIONS
      );
      return new Node( { children: [ numberPicker ], pickable: false } );
    },
    createDecimalsIcon: function() {
      return new Text( 'Decimals' );
    }
  };

  graphingQuadratics.register( 'GQIconFactory', GQIconFactory );

  return GQIconFactory;
} );