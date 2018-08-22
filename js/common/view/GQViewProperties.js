// Copyright 2018, University of Colorado Boulder

/**
 * View-specific Properties. Some screens expose only a subset of these.
 *
 * @author Andrea Lin
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  var BooleanProperty = require( 'AXON/BooleanProperty' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );

  /**
   * @constructor
   */
  class GQViewProperties {

    constructor() {

      // @public determines whether a curve is displayed to reflect the quadratic term (y=ax^2)
      this.quadraticTermVisibleProperty = new BooleanProperty( false );

      // @public determines whether a line is displayed to reflect the linear term (y=bx)
      this.linearTermVisibleProperty = new BooleanProperty( false );

      // @public determines whether a line is displayed to reflect the constant term (y=c)
      this.constantTermVisibleProperty = new BooleanProperty( false );

      // @public determines whether lines and their decorations are visible on the graph
      this.linesVisibleProperty = new BooleanProperty( true );

      // @public determines whether axis of symmetry on the quadratic is displayed
      this.axisOfSymmetryVisibleProperty = new BooleanProperty( false );

      // @public determines whether a point is displayed to mark the vertex of the quadratic
      this.vertexVisibleProperty = new BooleanProperty( false );

      // @public determines whether points are displayed to mark roots of the quadratic
      this.rootsVisibleProperty = new BooleanProperty( false );

      // @public determines whether focus and directrix are visible
      this.directrixVisibleProperty = new BooleanProperty( false );
    }

    /**
     * @public
     * @override
     */
    reset() {
      this.linesVisibleProperty.reset();
      this.quadraticTermVisibleProperty.reset();
      this.linearTermVisibleProperty.reset();
      this.constantTermVisibleProperty.reset();
      this.axisOfSymmetryVisibleProperty.reset();
      this.vertexVisibleProperty.reset();
      this.rootsVisibleProperty.reset();
      this.directrixVisibleProperty.reset();
    }
  }

  return graphingQuadratics.register( 'GQViewProperties', GQViewProperties );
} );

 