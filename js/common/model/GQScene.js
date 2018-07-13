// Copyright 2018, University of Colorado Boulder

/**
 * Base type for scenes in Graphing Quadratics
 * Copied from graphing-lines/common/model/LineFormsModel.js
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var GQConstants = require( 'GRAPHING_QUADRATICS/common/GQConstants' );
  var Graph = require( 'GRAPHING_LINES/common/model/Graph' );
  var graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  var inherit = require( 'PHET_CORE/inherit' );
  var ModelViewTransform2 = require( 'PHETCOMMON/view/ModelViewTransform2' );
  var Property = require( 'AXON/Property' );
  var Quadratic = require( 'GRAPHING_QUADRATICS/common/model/Quadratic' );
  var Vector2 = require( 'DOT/Vector2' );

  // constants
  var GRID_VIEW_UNITS = 530; // max dimension (width or height) of the grid in view coordinates
  var ORIGIN_OFFSET = new Vector2( 315, 330 ); // offset of the graph's origin in view coordinates

  /**
   * @param {Line} interactiveLine
   * @constructor
   */
  function GQScene( interactiveLine ) {

    // @public graph
    this.graph = new Graph( GQConstants.X_AXIS_RANGE, GQConstants.Y_AXIS_RANGE );
    this.quadraticProperty = new Property( new Quadratic( 1, 0, 0 ) );

    // view units / model units
    var modelViewTransformScale = GRID_VIEW_UNITS / Math.max(
      this.graph.xRange.getLength(),
      this.graph.yRange.getLength()
    );

    // @public model-view transform, created in the model because it's dependent on graph axes ranges.
    this.modelViewTransform = ModelViewTransform2.createOffsetXYScaleMapping(
      ORIGIN_OFFSET,
      modelViewTransformScale,
      -modelViewTransformScale // y is inverted
    );
  }

  graphingQuadratics.register( 'GQScene', GQScene );

  return inherit( Object, GQScene, {

    reset: function() {
      //TODO
    }
  } );
} );
