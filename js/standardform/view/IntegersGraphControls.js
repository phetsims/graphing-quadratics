// Copyright 2018, University of Colorado Boulder

/**
 * Controls for various features related to the graph on 'Decimals' scene of the 'Standard Form' screen.
 *
 * @author Andrea Lin
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const AxisOfSymmetryCheckbox = require( 'GRAPHING_QUADRATICS/common/view/AxisOfSymmetryCheckbox' );
  const GQConstants = require( 'GRAPHING_QUADRATICS/common/GQConstants' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const HideCoordinatesCheckbox = require( 'GRAPHING_QUADRATICS/common/view/HideCoordinatesCheckbox' );
  const HideCurvesCheckbox = require( 'GRAPHING_QUADRATICS/common/view/HideCurvesCheckbox' );
  const Panel = require( 'SUN/Panel' );
  const RootsCheckbox = require( 'GRAPHING_QUADRATICS/common/view/RootsCheckbox' );
  const VBox = require( 'SCENERY/nodes/VBox' );
  const VertexCheckbox = require( 'GRAPHING_QUADRATICS/common/view/VertexCheckbox' );

  class IntegersGraphControls extends Panel {

    /**
     * @param {GQViewProperties} viewProperties
     * @param {Object} [options]
     */
    constructor( viewProperties, options ) {

      options = _.extend( {}, GQConstants.PANEL_OPTIONS, options );

      // Vertex, dispose not needed
      const vertexCheckbox = new VertexCheckbox( viewProperties.vertexVisibleProperty );

      // Axis of Symmetry, dispose not needed
      const axisOfSymmetryCheckbox = new AxisOfSymmetryCheckbox( viewProperties.axisOfSymmetryVisibleProperty );

      // Roots, dispose not needed
      const rootsCheckbox = new RootsCheckbox( viewProperties.rootsVisibleProperty );

      // Hide coordinates, dispose not needed
      const hideCoordinatesCheckbox = new HideCoordinatesCheckbox( viewProperties.coordinatesVisibleProperty );

      // Hide curves, dispose not needed
      const hideCurvesCheckbox = new HideCurvesCheckbox( viewProperties.curvesVisibleProperty );

      // vertical layout
      const contentNode = new VBox( {
        align: 'left',
        spacing: 20,
        children: [
          vertexCheckbox,
          axisOfSymmetryCheckbox,
          rootsCheckbox,
          hideCoordinatesCheckbox,
          hideCurvesCheckbox
        ]
      } );

      super( contentNode, options );

      // Disable other controls when 'Hide curves' is checked
      viewProperties.curvesVisibleProperty.link( curvesVisible => {
        axisOfSymmetryCheckbox.enabled = curvesVisible;
        vertexCheckbox.enabled = curvesVisible;
        rootsCheckbox.enabled = curvesVisible;
        hideCoordinatesCheckbox.enabled = curvesVisible;
      } );
    }
  }

  return graphingQuadratics.register( 'IntegersGraphControls', IntegersGraphControls );
} );