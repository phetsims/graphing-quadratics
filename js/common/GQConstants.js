// Copyright 2014-2018, University of Colorado Boulder

/**
 * Constants that are global to this sim.
 *
 * @author Andrea Lin
 */
define( function( require ) {
  'use strict';

  // modules
  const Bounds2 = require( 'DOT/Bounds2' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const MathSymbolFont = require( 'SCENERY_PHET/MathSymbolFont' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const RangeWithValue = require( 'DOT/RangeWithValue' );

  const GQConstants = {
    SCREEN_VIEW_OPTIONS: { layoutBounds: new Bounds2( 0, 0, 1100, 700 ) },
    SCREEN_VIEW_X_MARGIN: 20,
    SCREEN_VIEW_Y_MARGIN: 16,
    X_AXIS_RANGE: new RangeWithValue( -10, 10 ),
    Y_AXIS_RANGE: new RangeWithValue( -10, 10 ),
    PICKER_TOUCH_AREA_X_DILATION: 30,
    MANIPULATOR_RADIUS: 0.425,
    POINT_RADIUS: 0.25,
    NUMBER_FONT: new PhetFont( { size: 21, weight: 'bold' } ),
    MATH_SYMBOL_FONT: new MathSymbolFont( { size: 24, weight: 'bold' } ),
    SMALLER_MATH_SYMBOL_FONT: new MathSymbolFont( { size: 18, weight: 'bold' } ),
    SLIDER_TICK_FONT: new PhetFont( 16 )
  };

  return graphingQuadratics.register( 'GQConstants', GQConstants );
} );
