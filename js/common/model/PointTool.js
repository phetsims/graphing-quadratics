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
  const GQConstants = require( 'GRAPHING_QUADRATICS/common/GQConstants' );
  const GQQueryParameters = require( 'GRAPHING_QUADRATICS/common/GQQueryParameters' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const NullableIO = require( 'TANDEM/types/NullableIO' );
  const Quadratic = require( 'GRAPHING_QUADRATICS/common/model/Quadratic' );
  const QuadraticIO = require( 'GRAPHING_QUADRATICS/common/model/QuadraticIO' );
  const Tandem = require( 'TANDEM/Tandem' );
  const Vector2 = require( 'DOT/Vector2' );
  const Vector2Property = require( 'DOT/Vector2Property' );

  class PointTool {

    /**
     * @param {Property.<Quadratic[]>} quadraticsProperty - Quadratics that the tool might intersect
     * @param {Graph} graph
     * @param {Object} [options]
     */
    constructor( quadraticsProperty, graph, options ) {

      options = _.extend( {
        location: Vector2.ZERO, // {Vector2} initial location
        probeSide: 'left', // {string} which side the probe is on, see GQConstants.PROBE_SIDES
        dragBounds: null, // {Bounds2|null} drag bounds, in model coordinate frame

        // phet-io
        tandem: Tandem.required
      }, options );

      assert && assert( GQConstants.PROBE_SIDES.includes( options.probeSide ),
        'invalid probeSide: ' + options.probeSide );

      // @public (read-only)
      this.probeSide = options.probeSide;
      this.dragBounds = options.dragBounds;

      // @private
      this.quadraticsProperty = quadraticsProperty;

      // @public {Vector2}
      this.locationProperty = new Vector2Property( options.location, {
        tandem: options.tandem.createTandem( 'locationProperty' ),
        phetioDocumentation: 'location of this point tool',
        phetioFeatured: true
      } );

      // @public {DerivedProperty.<Quadratic|null>}
      this.onQuadraticProperty = new DerivedProperty(
        [ this.locationProperty, quadraticsProperty ],
        ( location, quadratics ) => {
          if ( graph.contains( location ) ) {
            return this.getQuadraticNear( location,
              GQQueryParameters.pointToolThreshold, GQQueryParameters.pointToolThreshold );
          }
          else {
            return null;
          }
        }, {
          isValidValue: value => ( value instanceof Quadratic || value === null ),
          tandem: options.tandem.createTandem( 'onQuadraticProperty' ),
          phetioDocumentation: 'the quadratic that this point tool is on, null if not on a quadratic',
          phetioType: DerivedPropertyIO( NullableIO( QuadraticIO ) )
        } );
    }

    /**
     * Gets the quadratic that is close to a specified location, within a specified distance.
     * This algorithm prefers to return the quadratic that the point tool is already on.
     * If that quadratic is too far away, then examine all quadratics, in foreground-to-background order.
     * See #47.
     * @param {Vector2} location - the point tool's location
     * @param {number} offDistance - if <= to this distance, snaps ON to a curve
     * @param {number} onDistance - if > this distance, snaps OFF of a curve
     * @returns {Quadratic|null} null if no quadratic is close enough
     * @public
     */
    getQuadraticNear( location, offDistance, onDistance ) {
      let onQuadratic = this.onQuadraticProperty && this.onQuadraticProperty.value;
      const quadratics = this.quadraticsProperty.value;
      if ( !onQuadratic ||
           quadratics.indexOf( onQuadratic ) === -1 ||
           !onQuadratic.hasSolution( location, offDistance ) ) {
        onQuadratic = null;
        for ( let i = 0; i < quadratics.length && !onQuadratic; i++ ) {
          const quadratic = quadratics[ i ];
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

