// Copyright 2018, University of Colorado Boulder

/**
 * Base type for scenes in Graphing Quadratics
 *
 * @author Andrea Lin
 */
define( function( require ) {
  'use strict';

  // modules
  const GQConstants = require( 'GRAPHING_QUADRATICS/common/GQConstants' );
  const Graph = require( 'GRAPHING_LINES/common/model/Graph' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const inherit = require( 'PHET_CORE/inherit' );
  const ModelViewTransform2 = require( 'PHETCOMMON/view/ModelViewTransform2' );
  const ObservableArray = require( 'AXON/ObservableArray' );
  const Property = require( 'AXON/Property' );
  const Vector2 = require( 'DOT/Vector2' );
  const Quadratic = require( 'GRAPHING_QUADRATICS/common/model/Quadratic' );

  // constants
  const GRID_VIEW_UNITS = 530; // max dimension (width or height) of the grid in view coordinates
  const ORIGIN_OFFSET = new Vector2( 315, 330 ); // offset of the graph's origin in view coordinates

  /**
   * @constructor
   */
  function GQScene() {

    // @public graph
    this.graph = new Graph( GQConstants.X_AXIS_RANGE, GQConstants.Y_AXIS_RANGE );

    // @public
    this.quadraticProperty = new Property( new Quadratic( 1, 0, 0 ) );

    // @public observable array of saved quadratics
    this.savedQuadratics = new ObservableArray( [] );

    // view units / model units
    const modelViewTransformScale = GRID_VIEW_UNITS / Math.max(
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

    /**
     * Resets this scene by resetting each of its properties
     *
     * @public
     */
    reset: function() {
      this.quadraticProperty.reset();
      this.clearQuadratics();
    },

    /**
     * Saves the current quadratic into the list
     *
     * @public
     */
    saveQuadratic: function() {
      this.clearQuadratics();
      this.savedQuadratics.add( this.quadraticProperty.get().getCopy() );
    },

    /**
     * Clears the list of saved Quadratics
     *
     * @public
     */
    clearQuadratics: function() {
      this.savedQuadratics.clear();
    }
  } );
} );
