// Copyright 2018, University of Colorado Boulder

/**
 * Model of the point tool. Highlights when it is placed on one of the quadratics.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const Property = require( 'AXON/Property' );
  const PropertyIO = require( 'AXON/PropertyIO' );
  const Quadratic = require( 'GRAPHING_QUADRATICS/common/model/Quadratic' );
  const QuadraticIO = require( 'GRAPHING_QUADRATICS/common/model/QuadraticIO' );
  const Tandem = require( 'TANDEM/Tandem' );
  const Vector2 = require( 'DOT/Vector2' );
  const Vector2IO = require( 'DOT/Vector2IO' );

  // ifphetio
  const NullableIO = require( 'ifphetio!PHET_IO/types/NullableIO' );

  // constants
  const ORIENTATIONS = [ 'right', 'left' ];

  class PointTool {

    /**
     * @param {ObservableArray.<Quadratic>} quadratics - Quadratics that the tool might intersect
     * @param {Object} [options]
     */
    constructor( quadratics, options ) {

      options = _.extend( {
        location: Vector2.ZERO, // {Vector2} initial location
        orientation: 'left', // {string} which side the probe is on, see ORIENTATIONS
        dragBounds: null, // {Bounds2|null} drag bounds in model coordinate frame
        tandem: Tandem.required
      }, options );

      assert && assert( ORIENTATIONS.includes( options.orientation ),
        'invalid orientation: ' + options.orientation );

      var self = this;

      // @public {Vector2}
      this.locationProperty = new Property( options.location, {
        valueType: Vector2,
        tandem: options.tandem.createTandem( 'locationProperty' ),
        phetioType: PropertyIO( NullableIO( Vector2IO ) ),
        phetioInstanceDocumentation: 'location of this point tool'
      } );

      // @public (read-only)
      this.quadratics = quadratics;

      // @public quadratic that the tool is on, null if it's not on a quadratic
      this.onQuadraticProperty = new Property( null, {
        isValidValue: value => { return value instanceof Quadratic || value === null; },
        tandem: options.tandem.createTandem( 'onQuadraticProperty' ),
        phetioType: PropertyIO( NullableIO( QuadraticIO ) ),
        phetioInstanceDocumentation: 'the quadratic that this point tool is on, null if not on a quadratic'
      } );

      this.orientation = options.orientation; // @public
      this.dragBounds = options.dragBounds; // @public

      // Update when the point tool moves or the quadratics change.
      Property.multilink( [ this.locationProperty, quadratics.lengthProperty ],
        ( location, length ) => {
          for ( let i = 0; i < length; i++ ) {
            var quadratic = quadratics.get( i );
            if ( self.isOnQuadratic( quadratic ) ) {
              self.onQuadraticProperty.value = quadratic;
              return;
            }
          }
          self.onQuadraticProperty.value = null;
        }
      );
    }

    // @public
    reset() {
      this.locationProperty.reset();
      this.onQuadraticProperty.reset();
    }

    /**
     * Determines if the point tool is on the specified quadratic.
     * @param {Quadratic} quadratic
     * @returns {boolean}
     * @public
     */
    isOnQuadratic( quadratic ) {
      return quadratic.isOnQuadratic( this.locationProperty.value );
    }
  }

  return graphingQuadratics.register( 'PointTool', PointTool );
} );

