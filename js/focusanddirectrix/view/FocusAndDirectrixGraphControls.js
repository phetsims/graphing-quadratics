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
  const GQConstants = require( 'GRAPHING_QUADRATICS/common/GQConstants' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const Panel = require( 'SUN/Panel' );
  const PointOnQuadraticCheckbox = require( 'GRAPHING_QUADRATICS/common/view/PointOnQuadraticCheckbox' );
  const VBox = require( 'SCENERY/nodes/VBox' );

  class FocusAndDirectrixGraphControls extends Panel {

    /**
     * @param {GQViewProperties} viewProperties
     * @param options
     */
    constructor( viewProperties, options ) {

      options = _.extend( {}, GQConstants.PANEL_OPTIONS, options );

      const pointOnQuadraticCheckbox = new PointOnQuadraticCheckbox( viewProperties.pointOnQuadraticVisibleProperty );
      const coordinatesCheckbox = new CoordinatesCheckbox( viewProperties.coordinatesVisibleProperty );

      // vertical layout
      const contentNode = new VBox( {
        align: 'left',
        spacing: 20,
        children: [
          pointOnQuadraticCheckbox,
          coordinatesCheckbox
        ]
      } );

      super( contentNode, options );

      // Disable other controls when 'Hide curves' is checked
      viewProperties.graphContentsVisibleProperty.link( curvesVisible => {
        pointOnQuadraticCheckbox.enabled = curvesVisible;
        coordinatesCheckbox.enabled = curvesVisible;
      } );
    }
  }

  return graphingQuadratics.register( 'FocusAndDirectrixGraphControls', FocusAndDirectrixGraphControls );
} );