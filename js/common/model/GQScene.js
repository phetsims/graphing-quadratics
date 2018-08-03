// Copyright 2018, University of Colorado Boulder

/**
 * Base type for scenes in Graphing Quadratics
 *
 * @author Andrea Lin
 */
define( function( require ) {
  'use strict';

  // modules
  const Bounds2 = require( 'DOT/Bounds2' );
  const GQColors = require( 'GRAPHING_QUADRATICS/common/GQColors' );
  const GQConstants = require( 'GRAPHING_QUADRATICS/common/GQConstants' );
  const Graph = require( 'GRAPHING_LINES/common/model/Graph' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const ModelViewTransform2 = require( 'PHETCOMMON/view/ModelViewTransform2' );
  const ObservableArray = require( 'AXON/ObservableArray' );
  const PointTool = require( 'GRAPHING_LINES/common/model/PointTool' );
  const Property = require( 'AXON/Property' );
  const Quadratic = require( 'GRAPHING_QUADRATICS/common/model/Quadratic' );
  const Vector2 = require( 'DOT/Vector2' );

  // constants
  const GRID_VIEW_UNITS = 530; // max dimension (width or height) of the grid in view coordinates
  const ORIGIN_OFFSET = new Vector2( 315, 330 ); // offset of the graph's origin in view coordinates

  class GQScene {

    /**
     * @param {Node} icon - only necessary for standard screen which has two scenes
     */
    constructor( icon ) {

      // @public view for the icon representing this scene
      this.icon = icon;

      // @public graph
      this.graph = new Graph( GQConstants.X_AXIS_RANGE, GQConstants.Y_AXIS_RANGE );

      // @public property that stores the active quadratic
      this.quadraticProperty = new Property( new Quadratic( 1, 0, 0 ) );

      // @public observable array of saved quadratics
      this.savedQuadratics = new ObservableArray( [] );

      // @public observable array of active and saved quadratics
      this.lines = new ObservableArray();
      Property.multilink( [ this.quadraticProperty, this.savedQuadratics.lengthProperty ], ( quadratic ) => {
        this.lines.clear();
        this.lines.add( quadratic );
        this.lines.addAll( this.savedQuadratics.getArray() );
      } );

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


      // @public point tools, drag bounds determined by 'eye balling' so that the point tool nodes remain on screen.
      this.pointTool1 = new PointTool( new Vector2( -2, -12 ), 'right', this.lines,
        new Bounds2(
          this.graph.xRange.min - 1,
          this.graph.yRange.min - 1,
          this.graph.xRange.max + 3,
          this.graph.yRange.max + 3
        ) );
      this.pointTool2 = new PointTool( new Vector2( 2, -12 ), 'left', this.lines,
        new Bounds2( this.graph.xRange.min - 1,
          this.graph.yRange.min - 3,
          this.graph.xRange.max + 3,
          this.graph.yRange.max + 1
        ) );

    }

    /**
     * Resets this scene by resetting each of its properties
     *
     * @public
     */
    reset() {
      this.quadraticProperty.reset();
      this.clearQuadratics();
      this.pointTool1.reset();
      this.pointTool2.reset();
    }

    /**
     * Saves the current quadratic into the list
     *
     * @public
     */
    saveQuadratic() {
      this.clearQuadratics();
      this.savedQuadratics.add( this.quadraticProperty.get().withColor( GQColors.SAVED_CURVE ) );
    }

    /**
     * Clears the list of saved Quadratics
     *
     * @public
     */
    clearQuadratics() {
      this.savedQuadratics.clear();
    }
  }

  return graphingQuadratics.register( 'GQScene', GQScene );
} );
