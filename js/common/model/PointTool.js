// Copyright 2018, University of Colorado Boulder

/**
 * Model of the point tool. Highlights when it is placed on one of the quadratics.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  var graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  var Property = require( 'AXON/Property' );
  var Vector2 = require( 'DOT/Vector2' );

  class PointTool {

    /**
     * @param {ObservableArray.<Quadratic>} quadratics - Quadratics that the tool might intersect
     * @param {Object} [options]
     */
    constructor( quadratics, options ) {

      options = _.extend( {
        location: Vector2.ZERO, // {Vector2} initial location
        orientation: 'left', // {string} which side the probe is on, 'left' or 'right'
        dragBounds: null // {Bounds2|null} drag bounds in model coordinate frame
      }, options );

      assert && assert( [ 'right', 'left' ].includes( options.orientation ) );

      var self = this;

      // @public {Vector2} location of the point tool
      this.locationProperty = new Property( options.location );

      // @public (read-only)
      this.quadratics = quadratics;

      // @public quadratic that the tool is on, null if it's not on a quadratic
      this.onQuadraticProperty = new Property( null );

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

