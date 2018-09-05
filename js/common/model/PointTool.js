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

  /**
   * @param {Vector2} location - initial location of the tool
   * @param {string} orientation - direction that the sensor points, either 'right', or 'left'
   * @param {ObservableArray.<Quadratic>} quadratics - Quadratics that the tool might intersect
   * @param {Bounds2} dragBounds - tool can be dragged within these bounds
   * @constructor
   */
  class PointTool {

    constructor( location, orientation, quadratics, dragBounds ) {

      assert && assert( [ 'right', 'left' ].includes( orientation ) );

      var self = this;

      // @public {Vector2} location of the point tool
      this.locationProperty = new Property( location );

      // @public (read-only)
      this.quadratics = quadratics;

      // @public quadratic that the tool is on, null if it's not on a quadratic
      this.onQuadraticProperty = new Property( null );

      this.orientation = orientation; // @public
      this.dragBounds = dragBounds; // @public

      // Update when the point tool moves or the quadratics change. unmultilink not needed.
      Property.multilink( [ this.locationProperty, quadratics.lengthProperty ],
        ( location, length ) => {
          for ( let i = 0; i < length; i++ ) {
            var quadratic = quadratics.get( i );
            if ( self.isOnQuadratic( quadratic ) ) {
              self.onQuadraticProperty.set( quadratic );
              return;
            }
          }
          self.onQuadraticProperty.set( null );
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
      return false; //TODO
    }
  }

  return graphingQuadratics.register( 'PointTool', PointTool );
} );

