// Copyright 2018, University of Colorado Boulder

/**
 * Controls for various features related to the graph on the 'Focus and Directrix' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const CoordinatesCheckbox = require( 'GRAPHING_QUADRATICS/common/view/CoordinatesCheckbox' );
  const DirectrixCheckbox = require( 'GRAPHING_QUADRATICS/common/view/DirectrixCheckbox' );
  const FocusCheckbox = require( 'GRAPHING_QUADRATICS/common/view/FocusCheckbox' );
  const GQConstants = require( 'GRAPHING_QUADRATICS/common/GQConstants' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const Panel = require( 'SUN/Panel' );
  const PointOnQuadraticCheckbox = require( 'GRAPHING_QUADRATICS/common/view/PointOnQuadraticCheckbox' );
  const VBox = require( 'SCENERY/nodes/VBox' );
  const VertexCheckbox = require( 'GRAPHING_QUADRATICS/common/view/VertexCheckbox' );

  class FocusAndDirectrixGraphControls extends Panel {

    /**
     * @param {GQViewProperties} viewProperties
     * @param options
     */
    constructor( viewProperties, options ) {

      options = _.extend( {}, GQConstants.PANEL_OPTIONS, options );

      const vertexCheckbox = new VertexCheckbox( viewProperties.vertexVisibleProperty );
      const focusCheckbox = new FocusCheckbox( viewProperties.focusVisibleProperty );
      const directrixCheckbox = new DirectrixCheckbox( viewProperties.directrixVisibleProperty );
      const pointOnQuadraticCheckbox = new PointOnQuadraticCheckbox( viewProperties.pointOnQuadraticVisibleProperty );
      const coordinatesCheckbox = new CoordinatesCheckbox( viewProperties.coordinatesVisibleProperty );

      // vertical layout
      const contentNode = new VBox( {
        align: 'left',
        spacing: 20,
        children: [
          vertexCheckbox,
          focusCheckbox,
          directrixCheckbox,
          pointOnQuadraticCheckbox,
          coordinatesCheckbox
        ]
      } );

      super( contentNode, options );

      // Disable other controls when 'Hide curves' is checked
      viewProperties.graphContentsVisibleProperty.link( curvesVisible => {
        vertexCheckbox.enabled = curvesVisible;
        focusCheckbox.enabled = curvesVisible;
        directrixCheckbox.enabled = curvesVisible;
        pointOnQuadraticCheckbox.enabled = curvesVisible;
        coordinatesCheckbox.enabled = curvesVisible;
      } );
    }
  }

  return graphingQuadratics.register( 'FocusAndDirectrixGraphControls', FocusAndDirectrixGraphControls );
} );