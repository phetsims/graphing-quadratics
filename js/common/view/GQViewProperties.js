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

      // @public whether the equation accordion box is expanded
      this.equationAccordionBoxExpandedProperty = new BooleanProperty( true );

      // @public whether lines and their decorations are visible on the graph
      this.linesVisibleProperty = new BooleanProperty( true );

      // @public whether a curve is displayed to reflect the quadratic term (y=ax^2)
      this.quadraticTermVisibleProperty = new BooleanProperty( false );

      // @public whether a line is displayed to reflect the linear term (y=bx)
      this.linearTermVisibleProperty = new BooleanProperty( false );

      // @public whether a line is displayed to reflect the constant term (y=c)
      this.constantTermVisibleProperty = new BooleanProperty( false );

      // @public whether axis of symmetry on the quadratic is displayed
      this.axisOfSymmetryVisibleProperty = new BooleanProperty( false );

      // @public whether a point is displayed to mark the vertex of the quadratic
      this.vertexVisibleProperty = new BooleanProperty( false );

      // @public whether points are displayed to mark roots of the quadratic
      this.rootsVisibleProperty = new BooleanProperty( false );

      // @public whether focus is visible
      this.focusVisibleProperty = new BooleanProperty( false );

      // @public whether directrix is visible
      this.directrixVisibleProperty = new BooleanProperty( false );
    }

    /**
     * @public
     * @override
     */
    reset() {
      this.equationAccordionBoxExpandedProperty.reset();
      this.linesVisibleProperty.reset();
      this.quadraticTermVisibleProperty.reset();
      this.linearTermVisibleProperty.reset();
      this.constantTermVisibleProperty.reset();
      this.axisOfSymmetryVisibleProperty.reset();
      this.vertexVisibleProperty.reset();
      this.rootsVisibleProperty.reset();
      this.focusVisibleProperty.reset();
      this.directrixVisibleProperty.reset();
    }
  }

  return graphingQuadratics.register( 'GQViewProperties', GQViewProperties );
} );

 