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
  const BooleanProperty = require( 'AXON/BooleanProperty' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );

  /**
   * @param {Object} [options]
   */
  class GQViewProperties {

    constructor( options ) {

      options = _.extend( {
        equationAccordionBoxExpanded: true,
        curvesVisible: true,
        coordinatesVisible: true,
        quadraticTermVisible: false,
        linearTermVisible: false,
        constantTermVisible: false,
        axisOfSymmetryVisible: false,
        vertexVisible: false,
        rootsVisible: false,
      }, options );

      // @public whether the equation accordion box is expanded
      this.equationAccordionBoxExpandedProperty = new BooleanProperty( options.equationAccordionBoxExpanded );

      // @public whether curves and their decorations are visible on the graph
      this.curvesVisibleProperty = new BooleanProperty( options.curvesVisible );

      // @public whether coordinates are visible on points
      this.coordinatesVisibleProperty = new BooleanProperty( options.coordinatesVisible );

      // @public whether a curve is displayed to reflect the quadratic term (y=ax^2)
      this.quadraticTermVisibleProperty = new BooleanProperty( options.quadraticTermVisible );

      // @public whether a line is displayed to reflect the linear term (y=bx)
      this.linearTermVisibleProperty = new BooleanProperty( options.linearTermVisible );

      // @public whether a line is displayed to reflect the constant term (y=c)
      this.constantTermVisibleProperty = new BooleanProperty( options.constantTermVisible );

      // @public whether axis of symmetry on the quadratic is displayed
      this.axisOfSymmetryVisibleProperty = new BooleanProperty( options.axisOfSymmetryVisible );

      // @public whether a point is displayed to mark the vertex of the quadratic
      this.vertexVisibleProperty = new BooleanProperty( options.vertexVisible );

      // @public whether points are displayed to mark roots of the quadratic
      this.rootsVisibleProperty = new BooleanProperty( options.rootsVisible );
    }

    /**
     * @public
     * @override
     */
    reset() {
      this.equationAccordionBoxExpandedProperty.reset();
      this.curvesVisibleProperty.reset();
      this.coordinatesVisibleProperty.reset();
      this.quadraticTermVisibleProperty.reset();
      this.linearTermVisibleProperty.reset();
      this.constantTermVisibleProperty.reset();
      this.axisOfSymmetryVisibleProperty.reset();
      this.vertexVisibleProperty.reset();
      this.rootsVisibleProperty.reset();
    }
  }

  return graphingQuadratics.register( 'GQViewProperties', GQViewProperties );
} );

 