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
  const Checkbox = require( 'SUN/Checkbox' );
  const GQColors = require( 'GRAPHING_QUADRATICS/common/GQColors' );
  const GQConstants = require( 'GRAPHING_QUADRATICS/common/GQConstants' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const HBox = require( 'SCENERY/nodes/HBox' );
  const HideCurvesCheckbox = require( 'GRAPHING_QUADRATICS/common/view/HideCurvesCheckbox' );
  const Panel = require( 'SUN/Panel' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const PlottedPointNode = require( 'GRAPHING_QUADRATICS/common/view/PlottedPointNode' );
  const Text = require( 'SCENERY/nodes/Text' );
  const VBox = require( 'SCENERY/nodes/VBox' );

  // strings
  const rootsString = require( 'string!GRAPHING_QUADRATICS/roots' );

  // constants
  const CHECKBOX_LABEL_OPTIONS = { font: new PhetFont( GQConstants.CHECKBOX_LABEL_FONT_SIZE ) };
  const POINT_RADIUS = 6;

  class VertexFormGraphControls extends Panel {

    /**
     * @param {GQViewProperties} viewProperties
     * @param options
     */
    constructor( viewProperties, options ) {

      options = _.extend( {}, GQConstants.PANEL_OPTIONS, options );

      // Axis of Symmetry, dispose not needed
      const axisOfSymmetryCheckbox = new AxisOfSymmetryCheckbox( viewProperties.axisOfSymmetryVisibleProperty );

      // Roots, dispose not needed
      const rootsLabel = new HBox( {
        align: 'center',
        spacing: 10,
        children: [
          new Text( rootsString, CHECKBOX_LABEL_OPTIONS ),
          new HBox( {
            align: 'center',
            spacing: 5,
            children: [
              new PlottedPointNode( POINT_RADIUS, GQColors.ROOTS ),
              new PlottedPointNode( POINT_RADIUS, GQColors.ROOTS )
            ]
          } )
        ]
      } );
      const rootsCheckbox = new Checkbox( rootsLabel, viewProperties.rootsVisibleProperty );

      // Hide curves, dispose not needed
      const hideCurvesCheckbox = new HideCurvesCheckbox( viewProperties.linesVisibleProperty );

      // vertical layout
      const contentNode = new VBox( {
        align: 'left',
        spacing: 20,
        children: [
          axisOfSymmetryCheckbox,
          rootsCheckbox,
          hideCurvesCheckbox
        ]
      } );

      super( contentNode, options );

      // Disable other controls when 'Hide curves' is checked
      viewProperties.linesVisibleProperty.link( ( linesVisible ) => {
        axisOfSymmetryCheckbox.enabled = linesVisible;
        rootsCheckbox.enabled = linesVisible;
      } );
    }
  }

  return graphingQuadratics.register( 'VertexFormGraphControls', VertexFormGraphControls );
} );