// Copyright 2014-2018, University of Colorado Boulder

/**
 * Abstract base type for model in Graphing Quadratics.
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
  const GQGraph = require( 'GRAPHING_QUADRATICS/common/model/GQGraph' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const ModelViewTransform2 = require( 'PHETCOMMON/view/ModelViewTransform2' );
  const ObservableArray = require( 'AXON/ObservableArray' );
  const PointTool = require( 'GRAPHING_QUADRATICS/common/model/PointTool' );
  const Property = require( 'AXON/Property' );
  const PropertyIO = require( 'AXON/PropertyIO' );
  const Quadratic = require( 'GRAPHING_QUADRATICS/common/model/Quadratic' );
  const QuadraticIO = require( 'GRAPHING_QUADRATICS/common/model/QuadraticIO' );
  const Vector2 = require( 'DOT/Vector2' );

  // ifphetio
  const NullableIO = require( 'ifphetio!PHET_IO/types/NullableIO' );

  // constants
  const GRAPH_VIEW_WIDTH = 530; // width of the graph, in view coordinates
  const GRAPH_ORIGIN_OFFSET = new Vector2( 315, 330 ); // offset of the graph's origin, in view coordinates

  class GQModel {

    /**
     * @param {Property.<Quadratic>} quadraticProperty - the interactive quadratic
     * @param {Tandem} tandem
     * @abstract
     */
    constructor( quadraticProperty, tandem ) {

      // @public
      this.quadraticProperty = quadraticProperty;

      // @public (read-only) graph
      this.graph = new GQGraph( GQConstants.X_AXIS_RANGE, GQConstants.Y_AXIS_RANGE );

      // @public
      this.savedQuadraticProperty = new Property( null, {
        isValidValue: value => ( value instanceof Quadratic || value === null ),
        tandem: tandem.createTandem( 'savedQuadraticProperty' ),
        phetioType: PropertyIO( NullableIO( QuadraticIO ) ),
        phetioDocumentation: 'the saved quadratic, null if there is no saved quadratic'
      } );

      // scale from model to view
      const modelViewTransformScale = GRAPH_VIEW_WIDTH / this.graph.xRange.getLength();

      // @public (read-only) model-view transform, created in the model because it's dependent on graph axes ranges.
      this.modelViewTransform = ModelViewTransform2.createOffsetXYScaleMapping(
        GRAPH_ORIGIN_OFFSET,
        modelViewTransformScale,
        -modelViewTransformScale // y is inverted
      );

      // @public (read-only)
      this.rightPointTool = new PointTool( this.graph.quadratics, {
        probeSide: 'right',
        location: new Vector2( -2, -12 ),
        dragBounds: new Bounds2(
          this.graph.xRange.min - 1, this.graph.yRange.min - 3,
          this.graph.xRange.max + 1, this.graph.yRange.max + 1 ),
        tandem: tandem.createTandem( 'rightPointTool' ),
        phetioDocumentation: 'the point tool whose probe is on the right side'
      } );

      // @public (read-only)
      this.leftPointTool = new PointTool( this.graph.quadratics, {
        probeSide: 'left',
        location: new Vector2( 2, -12 ),
        dragBounds: new Bounds2(
          this.graph.xRange.min - 1, this.graph.yRange.min - 3,
          this.graph.xRange.max + 1, this.graph.yRange.max + 1 ),
        tandem: tandem.createTandem( 'leftPointTool' ),
        phetioDocumentation: 'the point tool whose probe is on the left side'
      } );

      // @public optional quadratic terms to be displayed, in the order that they will be considered by point tools.
      this.quadraticTerms = new ObservableArray();

      // @private Update the list of quadratics on the graph, in the order that they will be considered by point tools.
      Property.multilink( [ this.quadraticProperty, this.quadraticTerms.lengthProperty, this.savedQuadraticProperty ],
        ( quadratic, quadraticTermsLength, savedQuadratic ) => {
          this.graph.quadratics.clear();
          // order is important!
          this.graph.quadratics.add( quadratic );
          this.graph.quadratics.addAll( this.quadraticTerms.getArray() );
          savedQuadratic && this.graph.quadratics.add( savedQuadratic );
        } );
    }

    // @public
    reset() {
      this.savedQuadraticProperty.reset();
      this.rightPointTool.reset();
      this.leftPointTool.reset();
    }

    /**
     * Saves the current quadratic.
     * @public
     */
    saveQuadratic() {
      this.savedQuadraticProperty.value = this.quadraticProperty.value.withColor( GQColors.SAVED_CURVE );
    }

    /**
     * Erases the saved quadratic.
     * @public
     */
    eraseQuadratic() {
      this.savedQuadraticProperty.value = null;
    }
  }

  return graphingQuadratics.register( 'GQModel', GQModel );
} );
