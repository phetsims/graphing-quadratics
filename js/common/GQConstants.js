// Copyright 2014-2017, University of Colorado Boulder

/**
 * Constants that are global to this sim.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var Bounds2 = require( 'DOT/Bounds2' );
  var graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  var RangeWithValue = require( 'DOT/RangeWithValue' );

  var GQConstants = {
    SCREEN_VIEW_OPTIONS: { layoutBounds: new Bounds2( 0, 0, 1100, 700 ) },
    X_AXIS_RANGE: new RangeWithValue( -10, 10 ),
    Y_AXIS_RANGE: new RangeWithValue( -10, 10 ),
    INTERACTIVE_EQUATION_FONT_SIZE: 34, PICKER_TOUCH_AREA_X_DILATION: 30,
    MANIPULATOR_RADIUS: 0.425
  };

  graphingQuadratics.register( 'GQConstants', GQConstants );

  return GQConstants;
} );
