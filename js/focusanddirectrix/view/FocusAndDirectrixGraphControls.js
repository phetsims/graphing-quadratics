// Copyright 2018, University of Colorado Boulder

/**
 * Controls for various features related to the graph on the 'Focus and Directrix' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const GQConstants = require( 'GRAPHING_QUADRATICS/common/GQConstants' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const HideCoordinatesCheckbox = require( 'GRAPHING_QUADRATICS/common/view/HideCoordinatesCheckbox' );
  const HideCurvesCheckbox = require( 'GRAPHING_QUADRATICS/common/view/HideCurvesCheckbox' );
  const Panel = require( 'SUN/Panel' );
  const VBox = require( 'SCENERY/nodes/VBox' );

  class FocusAndDirectrixGraphControls extends Panel {

    /**
     * @param {GQViewProperties} viewProperties
     * @param options
     */
    constructor( viewProperties, options ) {

      options = _.extend( {}, GQConstants.PANEL_OPTIONS, options );

      // Hide coordinates, dispose not needed
      const hideCoordinatesCheckbox = new HideCoordinatesCheckbox( viewProperties.coordinatesVisibleProperty );

      // Hide curves, dispose not needed
      const hideCurvesCheckbox = new HideCurvesCheckbox( viewProperties.curvesVisibleProperty );

      // vertical layout
      const contentNode = new VBox( {
        align: 'left',
        spacing: 20,
        children: [
          hideCoordinatesCheckbox,
          hideCurvesCheckbox
        ]
      } );

      super( contentNode, options );

      // Disable other controls when 'Hide curves' is checked
      viewProperties.curvesVisibleProperty.link( curvesVisible => {
        hideCoordinatesCheckbox.enabled = curvesVisible;
      } );
    }
  }

  return graphingQuadratics.register( 'FocusAndDirectrixGraphControls', FocusAndDirectrixGraphControls );
} );