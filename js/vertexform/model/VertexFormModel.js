// Copyright 2014-2018, University of Colorado Boulder

/**
 * Model for the 'Vertex Form' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const DerivedProperty = require( 'AXON/DerivedProperty' );
  const DerivedPropertyIO = require( 'AXON/DerivedPropertyIO' );
  const GQColors = require( 'GRAPHING_QUADRATICS/common/GQColors' );
  const GQModel = require( 'GRAPHING_QUADRATICS/common/model/GQModel' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const NumberProperty = require( 'AXON/NumberProperty' );
  const Property = require( 'AXON/Property' );
  const Quadratic = require( 'GRAPHING_QUADRATICS/common/model/Quadratic' );
  const QuadraticIO = require( 'GRAPHING_QUADRATICS/common/model/QuadraticIO' );
  const RangeWithValue = require( 'DOT/RangeWithValue' );

  // constants
  const A_RANGE = new RangeWithValue( -6, 6, 1 );
  const H_RANGE = new RangeWithValue( -9, 9, 0 );
  const K_RANGE = new RangeWithValue( -9, 9, 0 );
          
  class VertexFormModel extends GQModel {

    /**
     * @param {Tandem} tandem
     * @param {Object} [options]
     */
    constructor( tandem, options ) {

      // coefficients for vertex form: y = a(x - h)^2 + k
      const aProperty = new NumberProperty( A_RANGE.defaultValue, {
        range: A_RANGE,
        tandem: tandem.createTandem( 'aProperty' ),
        phetioInstanceDocumentation: 'coefficient a for the interactive quadratic'
      } );
      const hProperty = new NumberProperty( H_RANGE.defaultValue, {
        range: H_RANGE,
        tandem: tandem.createTandem( 'bProperty' ),
        phetioInstanceDocumentation: 'coefficient h for the interactive quadratic'
      } );
      const kProperty = new NumberProperty( K_RANGE.defaultValue, {
        range: K_RANGE,
        tandem: tandem.createTandem( 'cProperty' ),
        phetioInstanceDocumentation: 'coefficient k for the interactive quadratic'
      } );

      // @public {DerivedProperty.<Quadratic>}
      const quadraticProperty = new DerivedProperty(
        [ aProperty, hProperty, kProperty ],
        ( a, h, k ) => Quadratic.createFromVertexForm( a, h, k, {
          color: GQColors.VERTEX_FORM_INTERACTIVE_CURVE
        } ), {
          tandem: tandem.createTandem( 'quadraticProperty' ),
          phetioType: DerivedPropertyIO( QuadraticIO ),
          phetioInstanceDocumentation: 'the interactive quadratic'
        } );

      super( quadraticProperty, tandem );

      // @public
      this.aProperty = aProperty;
      this.hProperty = hProperty;
      this.kProperty = kProperty;

      // Update the list of quadratics on the graph, in the order that they will be consider by point tools
      Property.multilink( [ this.quadraticProperty, this.savedQuadraticProperty ],
        ( quadratic, savedQuadratic ) => {
          this.graph.quadratics.clear();
          this.graph.quadratics.add( quadratic );
          savedQuadratic && this.graph.quadratics.add( savedQuadratic );
        } );
    }

    /**
     * @public
     * @override
     */
    reset() {
      super.reset();
      this.aProperty.reset();
      this.hProperty.reset();
      this.kProperty.reset();
    }
  }

  return graphingQuadratics.register( 'VertexFormModel', VertexFormModel );
} );
