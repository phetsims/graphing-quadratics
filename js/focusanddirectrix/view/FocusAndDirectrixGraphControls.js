// Copyright 2018, University of Colorado Boulder

/**
 * Controls for various features related to the graph on the 'Focus and Directrix' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const AxisOfSymmetryCheckbox = require( 'GRAPHING_QUADRATICS/common/view/AxisOfSymmetryCheckbox' );
  const Checkbox = require( 'SUN/Checkbox' );
  const GQColors = require( 'GRAPHING_QUADRATICS/common/GQColors' );
  const GQConstants = require( 'GRAPHING_QUADRATICS/common/GQConstants' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const HBox = require( 'SCENERY/nodes/HBox' );
  const HideCurvesCheckbox = require( 'GRAPHING_QUADRATICS/common/view/HideCurvesCheckbox' );
  const Line = require( 'SCENERY/nodes/Line' );
  const Panel = require( 'SUN/Panel' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const PlottedPointNode = require( 'GRAPHING_QUADRATICS/common/view/PlottedPointNode' );
  const Text = require( 'SCENERY/nodes/Text' );
  const VBox = require( 'SCENERY/nodes/VBox' );

  // strings
  const directrixString = require( 'string!GRAPHING_QUADRATICS/directrix' );
  const focusString = require( 'string!GRAPHING_QUADRATICS/focus' );

  // constants
  const CHECKBOX_LABEL_OPTIONS = { font: new PhetFont( GQConstants.CHECKBOX_LABEL_FONT_SIZE ) };
  const DASH_LENGTH = 5;

  class FocusAndDirectrixGraphControls extends Panel {

    /**
     * @param {GQViewProperties} viewProperties
     * @param options
     */
    constructor( viewProperties, options ) {

      options = _.extend( {}, GQConstants.PANEL_OPTIONS, options );

      // Focus, dispose not needed
      const focusLabel = new HBox( {
        align: 'center',
        spacing: 15,
        children: [
          new Text( focusString, CHECKBOX_LABEL_OPTIONS ),
          new PlottedPointNode( 6, GQColors.FOCUS ) //TODO icon should be a manipulator
        ]
      } );
      const focusCheckBox = new Checkbox( focusLabel, viewProperties.focusVisibleProperty );

      // Directrix, dispose not needed
      const directrixLabel = new HBox( {
        align: 'center',
        spacing: 15,
        children: [
          new Text( directrixString, CHECKBOX_LABEL_OPTIONS ),
          new Line( 0, 0, 7 * DASH_LENGTH, 0, {
            stroke: GQColors.DIRECTRIX,
            lineWidth: 3,
            lineDash: [ DASH_LENGTH, DASH_LENGTH ]
          } )
        ]
      } );
      const directrixCheckbox = new Checkbox( directrixLabel, viewProperties.directrixVisibleProperty );

      // Axis of Symmetry, dispose not needed
      const axisOfSymmetryCheckbox = new AxisOfSymmetryCheckbox( viewProperties.axisOfSymmetryVisibleProperty );

      // Hide curves, dispose not needed
      const hideCurvesCheckbox = new HideCurvesCheckbox( viewProperties.linesVisibleProperty );

      // vertical layout
      const contentNode = new VBox( {
        align: 'left',
        spacing: 20,
        children: [
          focusCheckBox,
          directrixCheckbox,
          axisOfSymmetryCheckbox,
          hideCurvesCheckbox
        ]
      } );

      super( contentNode, options );

      // Disable other controls when 'Hide curves' is checked
      viewProperties.linesVisibleProperty.link( ( linesVisible ) => {
        axisOfSymmetryCheckbox.enabled = linesVisible;
        directrixCheckbox.enabled = linesVisible;
      } );
    }
  }

  return graphingQuadratics.register( 'FocusAndDirectrixGraphControls', FocusAndDirectrixGraphControls );
} );