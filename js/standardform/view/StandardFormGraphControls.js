// Copyright 2018, University of Colorado Boulder

/**
 * Controls for various features related to the graph in the 'Standard Form' screen.
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
  const RootsCheckbox = require( 'GRAPHING_QUADRATICS/common/view/RootsCheckbox' );
  const VBox = require( 'SCENERY/nodes/VBox' );
  const VertexCheckbox = require( 'GRAPHING_QUADRATICS/common/view/VertexCheckbox' );

  class StandardFormGraphControls extends Panel {

    /**
     * @param {StandardFormViewProperties} viewProperties
     * @param {Object} [options]
     */
    constructor( viewProperties, options ) {

      options = _.extend( {}, GQConstants.PANEL_OPTIONS, options );

      const vertexCheckbox = new VertexCheckbox( viewProperties.vertexVisibleProperty );
      const axisOfSymmetryCheckbox = new AxisOfSymmetryCheckbox( viewProperties.axisOfSymmetryVisibleProperty );
      const rootsCheckbox = new RootsCheckbox( viewProperties.rootsVisibleProperty );
      const coordinatesCheckbox = new CoordinatesCheckbox( viewProperties.coordinatesVisibleProperty );

      // vertical layout
      const contentNode = new VBox( {
        align: 'left',
        spacing: GQConstants.CHECKBOXES_Y_SPACING,
        children: [
          vertexCheckbox,
          axisOfSymmetryCheckbox,
          rootsCheckbox,
          coordinatesCheckbox
        ]
      } );

      super( contentNode, options );

      // Disable other controls when 'Hide curves' is checked
      viewProperties.graphContentsVisibleProperty.link( curvesVisible => {
        axisOfSymmetryCheckbox.enabled = curvesVisible;
        vertexCheckbox.enabled = curvesVisible;
        rootsCheckbox.enabled = curvesVisible;
        coordinatesCheckbox.enabled = curvesVisible;
      } );
    }
  }

  return graphingQuadratics.register( 'StandardFormGraphControls', StandardFormGraphControls );
} );