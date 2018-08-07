// Copyright 2014-2018, University of Colorado Boulder

/**
 * Abstract base type for scenes.
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
     * @param {Object} [options]
     * @abstract
     */
    constructor( options ) {

      options = _.extend( {
        quadratic: new Quadratic( 1, 0, 0 ), // initial interactive quadratic
        icon: null // used on radio button to select the scene
      }, options );

      // @public (read-only) icon that represents this scene
      this.icon = options.icon;

      // @public (read-only) graph
      this.graph = new Graph( GQConstants.X_AXIS_RANGE, GQConstants.Y_AXIS_RANGE );

      // @public the interactive quadratic
      this.quadraticProperty = new Property( options.quadratic );

      // @public saved quadratics
      this.savedQuadratics = new ObservableArray( [] );

      // @public (read-only) interactive and saved quadratics
      this.lines = new ObservableArray();
      Property.multilink( [ this.quadraticProperty, this.savedQuadratics.lengthProperty ], ( quadratic ) => {
        this.lines.clear();
        this.lines.add( quadratic );
        this.lines.addAll( this.savedQuadratics.getArray() );
      } );

      // transform between model and view coordinate frames
      const modelViewTransformScale = GRID_VIEW_UNITS / Math.max(
        this.graph.xRange.getLength(),
        this.graph.yRange.getLength()
      );

      // @public (read-only) model-view transform, created in the model because it's dependent on graph axes ranges.
      this.modelViewTransform = ModelViewTransform2.createOffsetXYScaleMapping(
        ORIGIN_OFFSET,
        modelViewTransformScale,
        -modelViewTransformScale // y is inverted
      );

      // @public (read-only) point tools, drag bounds determined empirically
      this.pointTools = [
        new PointTool( new Vector2( -2, -12 ), 'right', this.lines,
          new Bounds2(
            this.graph.xRange.min - 1,
            this.graph.yRange.min - 1,
            this.graph.xRange.max + 3,
            this.graph.yRange.max + 3
          ) ),
        new PointTool( new Vector2( 2, -12 ), 'left', this.lines,
          new Bounds2(
            this.graph.xRange.min - 1,
            this.graph.yRange.min - 3,
            this.graph.xRange.max + 3,
            this.graph.yRange.max + 1
          ) )
      ];
    }

    // @public
    reset() {
      this.quadraticProperty.reset();
      this.eraseQuadratics();
      this.pointTools.forEach( pointTool => { pointTool.reset(); } );
    }

    /**
     * Saves the current quadratic.
     * @public
     */
    saveQuadratic() {

      // The implementation supports N saved quadratics, but the requirements specify that N=1.
      // So before saving the quadratic, erase any saved quadratics.
      this.eraseQuadratics();
      this.savedQuadratics.add( this.quadraticProperty.value.withColor( GQColors.SAVED_CURVE ) );
    }

    /**
     * Erases the saved quadratics.
     * @public
     */
    eraseQuadratics() {
      this.savedQuadratics.clear();
    }
  }

  return graphingQuadratics.register( 'GQScene', GQScene );
} );
