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
  const Checkbox = require( 'SUN/Checkbox' );
  const GQColors = require( 'GRAPHING_QUADRATICS/common/GQColors' );
  const GQConstants = require( 'GRAPHING_QUADRATICS/common/GQConstants' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const HBox = require( 'SCENERY/nodes/HBox' );
  const HideCurvesCheckbox = require( 'GRAPHING_QUADRATICS/common/view/HideCurvesCheckbox' );
  const Panel = require( 'SUN/Panel' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const PlottedPointNode = require( 'GRAPHING_QUADRATICS/common/view/PlottedPointNode' );
  const RootsCheckbox = require( 'GRAPHING_QUADRATICS/common/view/RootsCheckbox' );
  const Text = require( 'SCENERY/nodes/Text' );
  const VBox = require( 'SCENERY/nodes/VBox' );

  // strings
  const vertexString = require( 'string!GRAPHING_QUADRATICS/vertex' );

  // constants
  const CHECKBOX_LABEL_OPTIONS = { font: new PhetFont( GQConstants.CHECKBOX_LABEL_FONT_SIZE ) };
  const POINT_RADIUS = 6;

  class IntegersGraphControls extends Panel {

    /**
     * @param {GQViewProperties} viewProperties
     * @param {Object} [options]
     */
    constructor( viewProperties, options ) {

      options = _.extend( {}, GQConstants.PANEL_OPTIONS, options );

      // Vertex, dispose not needed
      const vertexLabel = new HBox( {
        align: 'center',
        spacing: 10,
        children: [
          new Text( vertexString, CHECKBOX_LABEL_OPTIONS ),
          new PlottedPointNode( POINT_RADIUS, GQColors.VERTEX )
        ]
      } );
      const vertexCheckbox = new Checkbox( vertexLabel, viewProperties.vertexVisibleProperty );

      // Axis of Symmetry, dispose not needed
      const axisOfSymmetryCheckbox = new AxisOfSymmetryCheckbox( viewProperties.axisOfSymmetryVisibleProperty );

      // Roots, dispose not needed
      const rootsCheckbox = new RootsCheckbox( viewProperties.rootsVisibleProperty );

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
          hideCurvesCheckbox
        ]
      } );

      super( contentNode, options );

      // Disable other controls when 'Hide curves' is checked
      viewProperties.curvesVisibleProperty.link( curvesVisible => {
        axisOfSymmetryCheckbox.enabled = curvesVisible;
        vertexCheckbox.enabled = curvesVisible;
        rootsCheckbox.enabled = curvesVisible;
      } );
    }
  }

  return graphingQuadratics.register( 'IntegersGraphControls', IntegersGraphControls );
} );