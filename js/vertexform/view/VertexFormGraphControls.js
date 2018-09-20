// Copyright 2018, University of Colorado Boulder

/**
 * Controls for various features related to the graph on the 'Vertex' screen.
 *
 * @author Andrea Lin
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const AxisOfSymmetryCheckbox = require( 'GRAPHING_QUADRATICS/common/view/AxisOfSymmetryCheckbox' );
  const CoordinatesCheckbox = require( 'GRAPHING_QUADRATICS/common/view/CoordinatesCheckbox' );
  const GQConstants = require( 'GRAPHING_QUADRATICS/common/GQConstants' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const Panel = require( 'SUN/Panel' );
  const VBox = require( 'SCENERY/nodes/VBox' );
  const VertexCheckbox = require( 'GRAPHING_QUADRATICS/common/view/VertexCheckbox' );

  class VertexFormGraphControls extends Panel {

    /**
     * @param {GQViewProperties} viewProperties
     * @param options
     */
    constructor( viewProperties, options ) {

      options = _.extend( {}, GQConstants.PANEL_OPTIONS, options );

      const vertexCheckbox = new VertexCheckbox( viewProperties.vertexVisibleProperty, {
        manipulatorIcon: true
      } );
      const axisOfSymmetryCheckbox = new AxisOfSymmetryCheckbox( viewProperties.axisOfSymmetryVisibleProperty );
      const coordinatesCheckbox = new CoordinatesCheckbox( viewProperties.coordinatesVisibleProperty );

      // vertical layout
      const contentNode = new VBox( {
        align: 'left',
        spacing: 15,
        children: [
          vertexCheckbox,
          axisOfSymmetryCheckbox,
          coordinatesCheckbox
        ]
      } );

      super( contentNode, options );

      // Disable other controls when 'Hide curves' is checked
      viewProperties.graphContentsVisibleProperty.link( curvesVisible => {
        vertexCheckbox.enabled = curvesVisible;
        axisOfSymmetryCheckbox.enabled = curvesVisible;
        coordinatesCheckbox.enabled = curvesVisible;
      } );
    }
  }

  return graphingQuadratics.register( 'VertexFormGraphControls', VertexFormGraphControls );
} );