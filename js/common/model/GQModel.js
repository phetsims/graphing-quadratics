// Copyright 2014-2018, University of Colorado Boulder

/**
 * Abstract base class for model in Graphing Quadratics.
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

      // @public {Property.<Quadratic>} the interactive quadratic
      this.quadraticProperty = quadraticProperty;

      // @public (read-only) graph
      this.graph = new Graph( GQConstants.X_AXIS_RANGE, GQConstants.Y_AXIS_RANGE );

      // @public {Property.<Quadratic|null>} the saved quadratic, null if nothing is saved
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
        -modelViewTransformScale // y is inverted (+y is up in the model, +y is down in the view)
      );
      
      // {ObservableArray.<Quadratic>} Quadratics that are visible to the point tools.
      const pointToolQuadratics = new ObservableArray();

      // @public {ObservableArray.<Quadratic>} optional quadratic terms to be displayed,
      // in the order that they will be considered by point tools.
      this.quadraticTerms = new ObservableArray();

      // @public (read-only)
      this.rightPointTool = new PointTool( pointToolQuadratics, {
        probeSide: 'right',
        location: new Vector2( -2, -12 ),
        dragBounds: new Bounds2(
          this.graph.xRange.min - 1, this.graph.yRange.min - 3,
          this.graph.xRange.max + 1, this.graph.yRange.max + 1 ),
        tandem: tandem.createTandem( 'rightPointTool' ),
        phetioDocumentation: 'the point tool whose probe is on the right side'
      } );

      // @public (read-only)
      this.leftPointTool = new PointTool( pointToolQuadratics, {
        probeSide: 'left',
        location: new Vector2( 2, -12 ),
        dragBounds: new Bounds2(
          this.graph.xRange.min - 1, this.graph.yRange.min - 3,
          this.graph.xRange.max + 1, this.graph.yRange.max + 1 ),
        tandem: tandem.createTandem( 'leftPointTool' ),
        phetioDocumentation: 'the point tool whose probe is on the left side'
      } );

      // @private Update pointToolQuadratics, in the order that they will be considered by point tools.
      Property.multilink( [ this.quadraticProperty, this.quadraticTerms.lengthProperty, this.savedQuadraticProperty ],
        ( quadratic, quadraticTermsLength, savedQuadratic ) => {
          pointToolQuadratics.clear();
          // order is important!
          pointToolQuadratics.add( quadratic );
          pointToolQuadratics.addAll( this.quadraticTerms.getArray() );
          savedQuadratic && pointToolQuadratics.add( savedQuadratic );
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
