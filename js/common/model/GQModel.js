// Copyright 2014-2018, University of Colorado Boulder

/**
 * Base type for model in Graphing Quadratics.
 *
 * @author Andrea Lin
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const Bounds2 = require( 'DOT/Bounds2' );
  const GQColors = require( 'GRAPHING_QUADRATICS/common/GQColors' );
  const GQConstants = require( 'GRAPHING_QUADRATICS/common/GQConstants' );
  const Graph = require( 'GRAPHING_LINES/common/model/Graph' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const ModelViewTransform2 = require( 'PHETCOMMON/view/ModelViewTransform2' );
  const ObservableArray = require( 'AXON/ObservableArray' );
  const PointTool = require( 'GRAPHING_QUADRATICS/common/model/PointTool' );
  const Property = require( 'AXON/Property' );
  const Quadratic = require( 'GRAPHING_QUADRATICS/common/model/Quadratic' );
  const Vector2 = require( 'DOT/Vector2' );

  // constants
  const GRID_VIEW_UNITS = 530; // max dimension (width or height) of the grid in view coordinates
  const ORIGIN_OFFSET = new Vector2( 315, 330 ); // offset of the graph's origin in view coordinates

  class GQModel {

    /**
     * @param {Object} [options]
     */
    constructor( options ) {

      options = _.extend( {
        quadratic: new Quadratic( 1, 0, 0 )
      }, options );

      // @public (read-only) graph
      this.graph = new Graph( GQConstants.X_AXIS_RANGE, GQConstants.Y_AXIS_RANGE );

      // @public the interactive quadratic
      this.quadraticProperty = new Property( options.quadratic, {
        valueType: Quadratic,
        reentrant: true
      } );
      this.quadraticProperty.link( quadratic => {
        phet.log && phet.log( 'quadratic=' + quadratic.a + ' x^2 + ' + quadratic.b + ' x + ' + quadratic.c );
      } );

      // @public saved quadratics
      this.savedQuadratics = new ObservableArray( [] );

      // @public (read-only) {ObservableArray.<Quadratic>} quadratics displayed on the graph
      this.quadratics = new ObservableArray();
      Property.multilink( [ this.quadraticProperty, this.savedQuadratics.lengthProperty ], ( quadratic ) => {
        this.quadratics.clear();
        this.quadratics.add( quadratic );
        this.quadratics.addAll( this.savedQuadratics.getArray() );
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

      // @public (read-only) point tools, initial locations and drag bounds determined empirically
      this.pointTools = [

        // probe on right
        new PointTool( this.quadratics, {
          orientation: 'right',
          location: new Vector2( -2, -12 ),
          dragBounds: new Bounds2(
            this.graph.xRange.min - 1, this.graph.yRange.min - 3,
            this.graph.xRange.max + 1, this.graph.yRange.max + 1 )
        } ),

        // probe on left
        new PointTool( this.quadratics, {
          orientation: 'left',
          location: new Vector2( 2, -12 ),
          dragBounds: new Bounds2(
            this.graph.xRange.min - 1, this.graph.yRange.min - 3,
            this.graph.xRange.max + 1, this.graph.yRange.max + 1 )
        } )
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
      // So before saving the quadratic, perform an erase.
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

  return graphingQuadratics.register( 'GQModel', GQModel );
} );
