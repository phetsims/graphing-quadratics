// Copyright 2018, University of Colorado Boulder

//TODO does this really need to extend LineFormsViewProperties?
/**
 * View-specific Properties.
 * This extends LineFormsViewProperties in order to leverage view components from graphing-lines.
 *
 * @author Andrea Lin
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var BooleanProperty = require( 'AXON/BooleanProperty' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  var inherit = require( 'PHET_CORE/inherit' );
  var LineFormsViewProperties = require( 'GRAPHING_LINES/common/view/LineFormsViewProperties' );

  /**
   * @constructor
   */
  function GQViewProperties() {

    LineFormsViewProperties.call( this );

    // @public determines whether a point is displayed to mark the vertex of the quadratic
    this.vertexVisibleProperty = new BooleanProperty( false );

    // @public determines whether axis of symmetry on the quadratic is displayed
    this.axisOfSymmetryVisibleProperty = new BooleanProperty( false );

    // @public determines points are displayed to mark roots of the quadratic
    this.rootsVisibleProperty = new BooleanProperty( false );

    // @public determines whether a curve is displayed to reflect the quadratic term (y=ax^2)
    this.quadraticTermVisibleProperty = new BooleanProperty( false );

    // @public determines whether a line is displayed to reflect the linear term (y=bx)
    this.linearTermVisibleProperty = new BooleanProperty( false );

    // @public determines whether a line is displayed to reflect the constant term (y=c)
    this.constantTermVisibleProperty = new BooleanProperty( false );

    // @public determines whether a point and a line are displayed to mark the focus and directrix
    this.directrixVisibleProperty = new BooleanProperty( false );

    // @public determines whether curves are hidden on the graph
    this.hideCurvesProperty = new BooleanProperty( false );
  }

  graphingQuadratics.register( 'GQViewProperties', GQViewProperties );

  return inherit( LineFormsViewProperties, GQViewProperties, {

    /**
     * @public
     * @override
     */
    reset: function() {
      LineFormsViewProperties.prototype.reset.call( this );
      this.vertexVisibleProperty.reset();
      this.axisOfSymmetryVisibleProperty.reset();
      this.rootsVisibleProperty.reset();
      this.quadraticTermVisibleProperty.reset();
      this.linearTermVisibleProperty.reset();
      this.constantTermVisibleProperty.reset();
      this.directrixVisibleProperty.reset();
      this.hideCurvesProperty.reset();
    }
  } );
} );

 