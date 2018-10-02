// Copyright 2014-2018, University of Colorado Boulder

/**
 * Model for the 'Vertex Form' screen.
 *
 * @author Andrea Lin
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

  class VertexFormModel extends GQModel {

    /**
     * @param {Tandem} tandem
     * @param {Object} [options]
     */
    constructor( tandem, options ) {

      options = _.extend( {
        aRange: new RangeWithValue( -6, 6, 1 ),
        hRange: new RangeWithValue( -9, 9, 0 ),
        kRange: new RangeWithValue( -9, 9, 0 )
      }, options );

      // coefficients of y = a(x - h)^2 + k
      const aProperty = new NumberProperty( options.aRange.defaultValue, {
        reentrant: true, //TODO #17
        range: options.aRange,
        tandem: tandem.createTandem( 'aProperty' ),
        phetioInstanceDocumentation: 'coefficient a for the interactive quadratic'
      } );
      const hProperty = new NumberProperty( options.hRange.defaultValue, {
        range: options.hRange,
        tandem: tandem.createTandem( 'bProperty' ),
        phetioInstanceDocumentation: 'coefficient h for the interactive quadratic'
      } );
      const kProperty = new NumberProperty( options.kRange.defaultValue, {
        range: options.kRange,
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
  }

  return graphingQuadratics.register( 'VertexFormModel', VertexFormModel );
} );
