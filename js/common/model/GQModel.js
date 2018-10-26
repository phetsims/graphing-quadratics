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
  const DerivedProperty = require( 'AXON/DerivedProperty' );
  const GQColors = require( 'GRAPHING_QUADRATICS/common/GQColors' );
  const GQConstants = require( 'GRAPHING_QUADRATICS/common/GQConstants' );
  const Graph = require( 'GRAPHING_LINES/common/model/Graph' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const ModelViewTransform2 = require( 'PHETCOMMON/view/ModelViewTransform2' );
  const NullableIO = require( 'TANDEM/types/NullableIO' );
  const PointTool = require( 'GRAPHING_QUADRATICS/common/model/PointTool' );
  const Property = require( 'AXON/Property' );
  const PropertyIO = require( 'AXON/PropertyIO' );
  const Quadratic = require( 'GRAPHING_QUADRATICS/common/model/Quadratic' );
  const QuadraticIO = require( 'GRAPHING_QUADRATICS/common/model/QuadraticIO' );
  const Vector2 = require( 'DOT/Vector2' );

  // constants
  const GRAPH_VIEW_ORIGIN = new Vector2( 315, 330 ); // location of the graph's origin, in view coordinates
  const GRAPH_VIEW_WIDTH = 530; // width of the graph, in view coordinates

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
        GRAPH_VIEW_ORIGIN,
        modelViewTransformScale,
        -modelViewTransformScale // y is inverted (+y is up in the model, +y is down in the view)
      );

      // Options for {Property.<Quadratic[]>} 
      const optionsPropertyQuadraticArray = {
        valueType: Array,
        isValidValue: array => _.every( array, function( value ) { return value instanceof Quadratic; } )
      };

      // @public {Property.<Quadratic[]>} optional quadratic terms to be displayed,
      // in the order that they will be considered by point tools (foreground to background).
      // ObservableArray is not used here because we need to change the entire array contents atomically.
      this.quadraticTermsProperty = new Property( [], optionsPropertyQuadraticArray );

      // {DerivedProperty.<Quadratic[]>} Quadratics that are visible to the point tools,
      // in the order that they will be considered by point tools (foreground to background).
      // ObservableArray is not used here because we need to change the entire array contents atomically.
      const pointToolQuadraticsProperty = new DerivedProperty(
        [ this.quadraticProperty, this.quadraticTermsProperty, this.savedQuadraticProperty ],
        ( quadratic, quadraticTerms, savedQuadratic ) => {
          // order is important! compact to remove nulls
          return _.compact( [ quadratic, ...quadraticTerms, savedQuadratic ] );
        }, optionsPropertyQuadraticArray );

      // @public (read-only)
      this.leftPointTool = new PointTool( pointToolQuadraticsProperty, this.graph, {
        probeSide: 'right', // probe is attached to the right side
        location: new Vector2( -2, -12 ),
        dragBounds: new Bounds2(
          this.graph.xRange.min - 1, this.graph.yRange.min - 3,
          this.graph.xRange.max + 1, this.graph.yRange.max + 1 ),
        tandem: tandem.createTandem( 'leftPointTool' ),
        phetioDocumentation: 'the point tool that is initially on the left'
      } );

      // @public (read-only)
      this.rightPointTool = new PointTool( pointToolQuadraticsProperty, this.graph, {
        probeSide: 'left', // probe is attached to the left side
        location: new Vector2( 2, -12 ),
        dragBounds: new Bounds2(
          this.graph.xRange.min - 1, this.graph.yRange.min - 3,
          this.graph.xRange.max + 1, this.graph.yRange.max + 1 ),
        tandem: tandem.createTandem( 'rightPointTool' ),
        phetioDocumentation: 'the point tool that is initially on the right'
      } );
    }

    // @public
    reset() {
      this.savedQuadraticProperty.reset();
      this.leftPointTool.reset();
      this.rightPointTool.reset();
    }

    /**
     * Saves the interactive quadratic.
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
