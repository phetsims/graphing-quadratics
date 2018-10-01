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
  const GQGraph = require( 'GRAPHING_QUADRATICS/common/model/GQGraph' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const ModelViewTransform2 = require( 'PHETCOMMON/view/ModelViewTransform2' );
  const PointTool = require( 'GRAPHING_QUADRATICS/common/model/PointTool' );
  const Property = require( 'AXON/Property' );
  const PropertyIO = require( 'AXON/PropertyIO' );
  const Quadratic = require( 'GRAPHING_QUADRATICS/common/model/Quadratic' );
  const QuadraticIO = require( 'GRAPHING_QUADRATICS/common/model/QuadraticIO' );
  const Vector2 = require( 'DOT/Vector2' );

  // ifphetio
  const NullableIO = require( 'ifphetio!PHET_IO/types/NullableIO' );

  // constants
  const GRID_VIEW_UNITS = 530; // max dimension (width or height) of the grid in view coordinates
  const ORIGIN_OFFSET = new Vector2( 315, 330 ); // offset of the graph's origin in view coordinates

  class GQModel {

    /**
     * @param {Quadratic} quadratic - the initial quadratic
     * @param {Tandem} tandem
     */
    constructor( quadratic, tandem ) {

      // @public (read-only) graph
      this.graph = new GQGraph( GQConstants.X_AXIS_RANGE, GQConstants.Y_AXIS_RANGE );

      // @public
      this.quadraticProperty = new Property( quadratic, {
        reentrant: true, //TODO #17
        valueType: Quadratic,
        tandem: tandem.createTandem( 'quadraticProperty' ),
        phetioType: PropertyIO( QuadraticIO ),
        phetioInstanceDocumentation: 'the interactive quadratic'
      } );
      this.quadraticProperty.link( quadratic => {
        phet.log && phet.log( 'quadratic=' + quadratic.a + ' x^2 + ' + quadratic.b + ' x + ' + quadratic.c );
      } );

      // @public
      this.savedQuadraticProperty = new Property( null, {
        isValidValue: function( value ) {
          return ( value instanceof Quadratic ) || ( value === null );
        },
        tandem: tandem.createTandem( 'savedQuadraticProperty' ),
        phetioType: PropertyIO( NullableIO( QuadraticIO ) ),
        phetioInstanceDocumentation: 'the saved quadratic, null if there is no saved quadratic'
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

      // @public (read-only)
      this.rightPointTool = new PointTool( this.graph.quadratics, {
        probeSide: 'right',
        location: new Vector2( -2, -12 ),
        dragBounds: new Bounds2(
          this.graph.xRange.min - 1, this.graph.yRange.min - 3,
          this.graph.xRange.max + 1, this.graph.yRange.max + 1 ),
        tandem: tandem.createTandem( 'rightPointTool' ),
        phetioInstanceDocumentation: 'the point tool whose probe is on the right side'
      } );

      // @public (read-only)
      this.leftPointTool = new PointTool( this.graph.quadratics, {
        probeSide: 'left',
        location: new Vector2( 2, -12 ),
        dragBounds: new Bounds2(
          this.graph.xRange.min - 1, this.graph.yRange.min - 3,
          this.graph.xRange.max + 1, this.graph.yRange.max + 1 ),
        tandem: tandem.createTandem( 'leftPointTool' ),
        phetioInstanceDocumentation: 'the point tool whose probe is on the left side'
      } );

      Property.multilink( [ this.quadraticProperty, this.savedQuadraticProperty ],
        ( quadratic, savedQuadratic ) => {
        this.graph.quadratics.clear();
        this.graph.quadratics.add( quadratic );
        if ( savedQuadratic !== null ) {
          this.graph.quadratics.add( savedQuadratic );
        }
      } );
    }

    // @public
    reset() {
      this.quadraticProperty.reset();
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
    eraseQuadratics() {
      this.savedQuadraticProperty.value = null;
    }
  }

  return graphingQuadratics.register( 'GQModel', GQModel );
} );
