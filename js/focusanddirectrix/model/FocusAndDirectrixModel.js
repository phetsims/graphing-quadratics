// Copyright 2018, University of Colorado Boulder

/**
 * Model for the 'Focus & Directrix' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const GQModel = require( 'GRAPHING_QUADRATICS/common/model/GQModel' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const Quadratic = require( 'GRAPHING_QUADRATICS/common/model/Quadratic' );
  const Property = require( 'AXON/Property' );
  const RangeWithValue = require( 'DOT/RangeWithValue' );
  const Vector2 = require( 'DOT/Vector2' );

  class FocusAndDirectrixModel extends GQModel {

    /**
     * @param {Object} [options]
     */
    constructor( options ) {

      options = _.extend( {
        pRange: new RangeWithValue( -9, 9, 2 ),
        hRange: new RangeWithValue( -6, 6, 0 ),
        kRange: new RangeWithValue( -6, 6, 0 ),
        pointX: 5  // default x value for point on quadratic
      }, options );

      assert && assert( !options.quadratic, 'FocusAndDirectrixModel sets quadratic' );
      options.quadratic = Quadratic.createFromAlternateVertexForm(
        options.pRange.defaultValue, options.hRange.defaultValue, options.kRange.defaultValue, {
          color: 'black'
        } );

      super( options );

      // @public (read-only)
      this.pRange = options.pRange;
      this.hRange = options.hRange;
      this.kRange = options.kRange;

      const initialPoint = new Vector2( options.pointX, this.quadraticProperty.value.solveY( options.pointX ) );

      // @public
      this.pointOnQuadraticProperty = new Property( initialPoint, {
        valueType: Vector2
      } );

      // update the point
      this.quadraticProperty.lazyLink( ( quadratic, oldQuadratic ) => {

        assert && assert( quadratic.vertex !== undefined, 'undefined quadratic.vertex is not supported' );
        assert && assert( oldQuadratic.vertex !== undefined, 'undefined oldQuadratic.vertex is not supported' );

        const xRange = this.graph.xRange;
        const yRange = this.graph.yRange;

        //TODO logic duplicated in PointOnQuadraticManipulator
        const dx = quadratic.vertex.x - oldQuadratic.vertex.x;
        let x = xRange.constrainValue( this.pointOnQuadraticProperty.value.x + dx );
        let y = quadratic.solveY( x );
        if ( !yRange.contains( y ) ) {
          // y is off the graph, constrain y and solve for x
          y = yRange.constrainValue( y );
          const xValues = quadratic.solveX( y );
          x = ( x < quadratic.vertex.x ) ? xValues[ 0 ] : xValues[ 1 ];
        }
        this.pointOnQuadraticProperty.value = new Vector2( x, y );
      } );
    }

    // @public
    reset() {
      super.reset();
      this.pointOnQuadraticProperty.reset();
    }
  }

  return graphingQuadratics.register( 'FocusAndDirectrixModel', FocusAndDirectrixModel );
} );
