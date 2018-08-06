// Copyright 2018, University of Colorado Boulder

/**
 * Factory for creating icons that appear in this sim.
 *
 * @author Andrea Lin
 */
define( function( require ) {
  'use strict';

  // modules
  const Dimension2 = require( 'DOT/Dimension2' );
  const GQConstants = require( 'GRAPHING_QUADRATICS/common/GQConstants' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const Node = require( 'SCENERY/nodes/Node' );
  const NumberPicker = require( 'SCENERY_PHET/NumberPicker' );
  const NumberProperty = require( 'AXON/NumberProperty' );
  const Property = require( 'AXON/Property' );
  const SliderUnit = require( 'GRAPHING_QUADRATICS/common/view/SliderUnit' );

  // constants
  const NUMBER_PROPERTY = new NumberProperty( 0, { range: { min: -6, max: 6 } } );

  const GQIconFactory = {

    createIntegersIcon() {
      const numberPicker = new NumberPicker(
        NUMBER_PROPERTY,
        new Property( NUMBER_PROPERTY.range ),
        {
          font: GQConstants.NUMBER_FONT,
          color: 'black',
          xMargin: 5,
          scale: 0.8
        }
      );
      return new Node( { children: [ numberPicker ], pickable: false } );
    },

    createDecimalsIcon() {
      const verticalSlider = new SliderUnit( '', NUMBER_PROPERTY, 1, {
        trackSize: new Dimension2( 50, 0.5 ),
        thumbSize: new Dimension2( 15, 25 ),
        centralTick: false,
        scale: 0.8
      } );
      return new Node( { children: [ verticalSlider ], pickable: false } );
    }
  };

  return graphingQuadratics.register( 'GQIconFactory', GQIconFactory );
} );