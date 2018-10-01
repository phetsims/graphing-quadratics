// Copyright 2018, University of Colorado Boulder

/**
 * Model of the point tool. Highlights when it is placed on one of the quadratics.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const DerivedProperty = require( 'AXON/DerivedProperty' );
  const DerivedPropertyIO = require( 'AXON/DerivedPropertyIO' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const Property = require( 'AXON/Property' );
  const PropertyIO = require( 'AXON/PropertyIO' );
  const QuadraticIO = require( 'GRAPHING_QUADRATICS/common/model/QuadraticIO' );
  const Tandem = require( 'TANDEM/Tandem' );
  const Vector2 = require( 'DOT/Vector2' );
  const Vector2IO = require( 'DOT/Vector2IO' );

  // ifphetio
  const NullableIO = require( 'ifphetio!PHET_IO/types/NullableIO' );

  // constants
  const PROBE_LOCATIONS = [ 'right', 'left' ];

  class PointTool {

    /**
     * @param {ObservableArray.<Quadratic>} quadratics - Quadratics that the tool might intersect
     * @param {Object} [options]
     */
    constructor( quadratics, options ) {

      options = _.extend( {
        location: Vector2.ZERO, // {Vector2} initial location
        probeLocation: 'left', // {string} which side the probe is on, see PROBE_LOCATIONS
        dragBounds: null, // {Bounds2|null} drag bounds, in model coordinate frame
        tandem: Tandem.required
      }, options );

      assert && assert( PROBE_LOCATIONS.includes( options.probeLocation ),
        'invalid probeLocation: ' + options.probeLocation );
      
      // @public (read-only)
      this.quadratics = quadratics;
      this.probeLocation = options.probeLocation;
      this.dragBounds = options.dragBounds;

      // @public {Vector2}
      this.locationProperty = new Property( options.location, {
        valueType: Vector2,
        tandem: options.tandem.createTandem( 'locationProperty' ),
        phetioType: PropertyIO( NullableIO( Vector2IO ) ),
        phetioInstanceDocumentation: 'location of this point tool'
      } );

      // @public
      this.onQuadraticProperty = new DerivedProperty( [ this.locationProperty, quadratics.lengthProperty ],
        ( location, length ) => {
          for ( let i = 0; i < length; i++ ) {
            let quadratic = quadratics.get( i );
            if ( quadratic.isOnQuadratic( this.locationProperty.value ) ) {
              return quadratic;
            }
          }
          return null;
        }, {
          tandem: options.tandem.createTandem( 'onQuadraticProperty' ),
          phetioType: DerivedPropertyIO( NullableIO( QuadraticIO ) ),
          phetioInstanceDocumentation: 'the quadratic that this point tool is on, null if not on a quadratic'
        } );
    }

    // @public
    reset() {
      this.locationProperty.reset();
    }
  }

  return graphingQuadratics.register( 'PointTool', PointTool );
} );

