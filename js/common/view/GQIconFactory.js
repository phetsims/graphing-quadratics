// Copyright 2018, University of Colorado Boulder

/**
 * Factory for creating icons that appear in this sim.
 *
 * @author Andrea Lin
 */
define( function( require ) {
  'use strict';

  // modules
  const CoefficientSlider = require( 'GRAPHING_QUADRATICS/common/view/CoefficientSlider' );
  const Dimension2 = require( 'DOT/Dimension2' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const Node = require( 'SCENERY/nodes/Node' );
  const NumberPicker = require( 'SCENERY_PHET/NumberPicker' );
  const NumberProperty = require( 'AXON/NumberProperty' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const Property = require( 'AXON/Property' );

  // constants
  const NUMBER_PROPERTY = new NumberProperty( 0, { range: { min: -6, max: 6 } } );

  const GQIconFactory = {

    /**
     * Creates the icon for the 'Integers' scene in the 'Standard Form' screen.
     * @returns {Node}
     */
    createIntegersIcon() {
      const numberPicker = new NumberPicker( NUMBER_PROPERTY, new Property( NUMBER_PROPERTY.range ), {
        font: new PhetFont( { size: 21, weight: 'bold' } ),
        color: 'black',
        xMargin: 5,
        scale: 0.8
      } );
      return new Node( { children: [ numberPicker ], pickable: false } );
    },

    /**
     * Creates the icon for the 'Decimals' scene in the 'Standard Form' screen.
     * @returns {Node}
     */
    createDecimalsIcon() {
      const verticalSlider = new CoefficientSlider( '', NUMBER_PROPERTY, 1, {
        trackSize: new Dimension2( 50, 0.5 ),
        thumbSize: new Dimension2( 15, 25 ),
        showTicks: false,
        scale: 0.8
      } );
      return new Node( { children: [ verticalSlider ], pickable: false } );
    }
  };

  return graphingQuadratics.register( 'GQIconFactory', GQIconFactory );
} );