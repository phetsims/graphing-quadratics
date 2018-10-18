// Copyright 2018, University of Colorado Boulder

/**
 * Model of the point tool. Knows when it is placed on one of the quadratics.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const Quadratic = require( 'GRAPHING_QUADRATICS/common/model/Quadratic' );
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

  class PointTool {

    /**
     * @param {Property.<Quadratic[]>} quadraticsProperty - Quadratics that the tool might intersect
     * @param {Object} [options]
     */
    constructor( quadraticsProperty, options ) {

      options = _.extend( {
        location: Vector2.ZERO, // {Vector2} initial location
        probeSide: 'left', // {string} which side the probe is on, see PROBE_SIDES
        dragBounds: null, // {Bounds2|null} drag bounds, in model coordinate frame
        tandem: Tandem.required
      }, options );

      assert && assert( PROBE_SIDES.includes( options.probeSide ),
        'invalid probeSide: ' + options.probeSide );

      // @public (read-only)
      this.probeSide = options.probeSide;
      this.dragBounds = options.dragBounds;

      // @private
      this.quadraticsProperty = quadraticsProperty;

      // @public {Vector2}
      this.locationProperty = new Property( options.location, {
        valueType: Vector2,
        tandem: options.tandem.createTandem( 'locationProperty' ),
        phetioType: PropertyIO( Vector2IO ),
        phetioDocumentation: 'location of this point tool'
      } );

      // @public (read-only) {Property.<Quadratic|null>}
      this.onQuadraticProperty = new Property( null, {
        isValidValue: value => ( value instanceof Quadratic || value === null ),
        tandem: options.tandem.createTandem( 'onQuadraticProperty' ),
        phetioType: PropertyIO( NullableIO( QuadraticIO ) ),
        phetioReadOnly: true,
        phetioDocumentation: 'the quadratic that this point tool is on, null if not on a quadratic'
      } );

      // Determine whether we're on a quadratic, using small distances.
      Property.multilink( [ this.locationProperty, quadraticsProperty ], ( location, quadratics ) => {
        this.onQuadraticProperty.value = this.getQuadraticNear( location, 0.01, 0.01 );
      } );
    }

    /**
     * Gets the quadratic that is close to a specified location, within a specified distance. 
     * This algorithm prefers to return the quadratic that the point tool is already on.
     * If that quadratic is too far away, then examine all quadratics, in foreground-to-background order.
     * See #47.
     * @param {Vector2} location - the point tool's location
     * @param {number} offDistance - greater this distance from the curve that we're on moves us off of it
     * @param {number} onDistance - less than or equal to this distance moves us onto a curve
     * @returns {Quadratic|null} null if no quadratic is close enough
     * @public
     */
    getQuadraticNear( location, offDistance, onDistance ) {
      let onQuadratic = this.onQuadraticProperty.value;
      const quadratics = this.quadraticsProperty.value;
      if ( !onQuadratic ||
           quadratics.indexOf( onQuadratic ) === -1 ||
           !onQuadratic.hasSolution( location, offDistance ) ) {
        onQuadratic = null;
        for ( let i = 0; i < quadratics.length && !onQuadratic; i++ ) {
          let quadratic = quadratics[ i ];
          if ( quadratic.hasSolution( location, onDistance ) ) {
            onQuadratic = quadratic;
          }
        }
      }
      return onQuadratic;
    }

    // @public
    reset() {
      this.locationProperty.reset();
    }
  }

  return graphingQuadratics.register( 'PointTool', PointTool );
} );

