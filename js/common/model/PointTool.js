// Copyright 2018, University of Colorado Boulder

/**
 * Model of the point tool. Knows when it is placed on one of the quadratics.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const DerivedProperty = require( 'AXON/DerivedProperty' );
  const DerivedPropertyIO = require( 'AXON/DerivedPropertyIO' );
  const GQQueryParameters = require( 'GRAPHING_QUADRATICS/common/GQQueryParameters' );
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
  const PROBE_SIDES = [ 'right', 'left' ];
  // snap to quadratic when <= this distance from the quadratic, in model coordinates
  const SNAP_DISTANCE = GQQueryParameters.snapDistance;

  class PointTool {

    /**
     * @param {ObservableArray.<Quadratic>} quadratics - Quadratics that the tool might intersect
     * @param {Object} [options]
     */
    constructor( quadratics, options ) {

      options = _.extend( {
        location: Vector2.ZERO, // {Vector2} initial location
        probeSide: 'left', // {string} which side the probe is on, see PROBE_SIDES
        dragBounds: null, // {Bounds2|null} drag bounds, in model coordinate frame
        tandem: Tandem.required
      }, options );

      assert && assert( PROBE_SIDES.includes( options.probeSide ),
        'invalid probeSide: ' + options.probeSide );
      
      // @public (read-only)
      this.quadratics = quadratics;
      this.probeSide = options.probeSide;
      this.dragBounds = options.dragBounds;
      this.snapDistance = SNAP_DISTANCE;

      // @public {Vector2}
      this.locationProperty = new Property( options.location, {
        valueType: Vector2,
        tandem: options.tandem.createTandem( 'locationProperty' ),
        phetioType: PropertyIO( Vector2IO ),
        phetioDocumentation: 'location of this point tool'
      } );

      // @public {DerivedProperty.<Quadratic|null>}
      this.snapQuadraticProperty = new DerivedProperty( [ this.locationProperty, quadratics.lengthProperty ],
        ( location, length ) => {
          for ( let i = 0; i < length; i++ ) {
            let quadratic = quadratics.get( i );
            if ( quadratic.isOnQuadratic( this.locationProperty.value, this.snapDistance ) ) {
              return quadratic;
            }
          }
          return null;
        }, {
          tandem: options.tandem.createTandem( 'snapQuadraticProperty' ),
          phetioType: DerivedPropertyIO( NullableIO( QuadraticIO ) ),
          phetioDocumentation: 'the quadratic that this point tool is snapped to, null if no quadratic'
        } );
    }

    // @public
    reset() {
      this.locationProperty.reset();
    }
  }

  return graphingQuadratics.register( 'PointTool', PointTool );
} );

