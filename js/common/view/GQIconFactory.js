// Copyright 2018, University of Colorado Boulder

/**
 * Factory for creating icons that appear in this sim.
 *
 * @author Andrea Lin
 */
define( require => {
  'use strict';

  // modules
  const Dimension2 = require( 'DOT/Dimension2' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const NumberPicker = require( 'SCENERY_PHET/NumberPicker' );
  const NumberProperty = require( 'AXON/NumberProperty' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const Property = require( 'AXON/Property' );
  const VSlider = require( 'SUN/VSlider' );

  // constants
  const NUMBER_PROPERTY = new NumberProperty( 0, { range: { min: -6, max: 6 } } );

  const GQIconFactory = {

    /**
     * Creates the icon for the 'Integers' scene in the 'Standard Form' screen.
     * @returns {Node}
     */
    createIntegersIcon() {
      return new NumberPicker( NUMBER_PROPERTY, new Property( NUMBER_PROPERTY.range ), {
        font: new PhetFont( { size: 16, weight: 'bold' } ),
        color: 'black',
        xMargin: 5,
        pickable: false
      } );
    },

    /**
     * Creates the icon for the 'Decimals' scene in the 'Standard Form' screen.
     * @returns {Node}
     */
    createDecimalsIcon() {
      return new VSlider( NUMBER_PROPERTY, NUMBER_PROPERTY.range, {
        trackSize: new Dimension2( 40, 0.4 ),
        thumbSize: new Dimension2( 12, 20 ),
        pickable: false
      } );
    }
  };

  return graphingQuadratics.register( 'GQIconFactory', GQIconFactory );
} );