// Copyright 2018, University of Colorado Boulder

/**
 * Controls for various features related to the graph on the 'Vertex' screen.
 *
 * @author Andrea Lin
 */
define( function( require ) {
  'use strict';

  // modules
  const AxisOfSymmetryCheckbox = require( 'GRAPHING_QUADRATICS/common/view/AxisOfSymmetryCheckbox' );
  const Checkbox = require( 'SUN/Checkbox' );
  const GQColors = require( 'GRAPHING_QUADRATICS/common/GQColors' );
  const GQConstants = require( 'GRAPHING_QUADRATICS/common/GQConstants' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const HBox = require( 'SCENERY/nodes/HBox' );
  const Line = require( 'SCENERY/nodes/Line' );
  const Panel = require( 'SUN/Panel' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const Text = require( 'SCENERY/nodes/Text' );
  const VBox = require( 'SCENERY/nodes/VBox' );
  const VStrut = require( 'SCENERY/nodes/VStrut' );

  // strings
  const directrixString = require( 'string!GRAPHING_QUADRATICS/directrix' );
  const hideCurvesString = require( 'string!GRAPHING_QUADRATICS/hideCurves' );

  // constants
  const CHECKBOX_LABEL_OPTIONS = { font: new PhetFont( GQConstants.CHECKBOX_LABEL_FONT_SIZE ) };

  class VertexGraphControls extends Panel {

    /**
     * @param {BooleanProperty} axisOfSymmetryVisibleProperty
     * @param {BooleanProperty} directrixVisibleProperty
     * @param {BooleanProperty} hideCurvesProperty
     * @param options
     */
    constructor( axisOfSymmetryVisibleProperty, directrixVisibleProperty, hideCurvesProperty, options ) {

      options = _.extend( {

        // superclass options
        fill: GQColors.CONTROL_PANEL_BACKGROUND,
        xMargin: 20,
        yMargin: 15
      }, options );

      // Axis of Symmetry
      const axisOfSymmetryCheckbox = new AxisOfSymmetryCheckbox( axisOfSymmetryVisibleProperty );

      // Directrix
      const directrixLabel = new HBox( {
        align: 'center',
        spacing: 10,
        children: [
          new Text( directrixString, CHECKBOX_LABEL_OPTIONS ),
          new Line( 0, 0, 35, 0, {
            stroke: GQColors.DIRECTRIX,
            lineWidth: 3,
            lineDash: [ 5, 5 ]
          } )
        ]
      } );
      const directrixCheckbox = new Checkbox( directrixLabel, directrixVisibleProperty );

      // Hide curves
      const hideCurvesLabel = new Text( hideCurvesString, CHECKBOX_LABEL_OPTIONS );
      const hideCurvesCheckbox = new Checkbox( hideCurvesLabel, hideCurvesProperty );

      // vertical layout
      const contentNode = new VBox( {
        align: 'left',
        spacing: 20,
        children: [
          axisOfSymmetryCheckbox,
          directrixCheckbox,
          new VStrut( 1 ),
          hideCurvesCheckbox
        ]
      } );

      super( contentNode, options );
    }
  }

  return graphingQuadratics.register( 'VertexGraphControls', VertexGraphControls );
} );