// Copyright 2018, University of Colorado Boulder

/**
 * Controls for various features related to the graph on the 'Integers' scene of the 'Standard Form' screen.
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
  const Panel = require( 'SUN/Panel' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const PlottedPointNode = require( 'GRAPHING_QUADRATICS/common/view/PlottedPointNode' );
  const Text = require( 'SCENERY/nodes/Text' );
  const VBox = require( 'SCENERY/nodes/VBox' );
  const VStrut = require( 'SCENERY/nodes/VStrut' );

  // strings
  const hideCurvesString = require( 'string!GRAPHING_QUADRATICS/hideCurves' );
  const rootsString = require( 'string!GRAPHING_QUADRATICS/roots' );
  const vertexString = require( 'string!GRAPHING_QUADRATICS/vertex' );

  // constants
  const CHECKBOX_LABEL_OPTIONS = { font: new PhetFont( GQConstants.CHECKBOX_LABEL_FONT_SIZE ) };
  const POINT_RADIUS = 6;

  class IntegersGraphControls extends Panel {

    /**
     * @param {BooleanProperty} vertexVisibleProperty
     * @param {BooleanProperty} axisOfSymmetryVisibleProperty
     * @param {BooleanProperty} rootsVisibleProperty
     * @param {BooleanProperty} hideCurvesProperty
     * @param {Object} [options]
     */
    constructor( vertexVisibleProperty, axisOfSymmetryVisibleProperty,
                 rootsVisibleProperty, hideCurvesProperty, options ) {

      options = _.extend( {

        // superclass options
        fill: GQColors.CONTROL_PANEL_BACKGROUND,
        xMargin: 20,
        yMargin: 15
      }, options );

      // Vertex
      const vertexLabel = new HBox( {
        align: 'center',
        spacing: 10,
        children: [
          new Text( vertexString, CHECKBOX_LABEL_OPTIONS ),
          new PlottedPointNode( POINT_RADIUS, GQColors.VERTEX )
        ]
      } );
      const vertexCheckbox = new Checkbox( vertexLabel, vertexVisibleProperty );

      // Axis of Symmetry
      const axisOfSymmetryCheckbox = new AxisOfSymmetryCheckbox( axisOfSymmetryVisibleProperty );

      // Roots
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
        ] } );
      const rootsCheckbox = new Checkbox( rootsLabel, rootsVisibleProperty );

      // Hide curves
      const hideCurvesLabel = new Text( hideCurvesString, CHECKBOX_LABEL_OPTIONS );
      const hideCurvesCheckbox = new Checkbox( hideCurvesLabel, hideCurvesProperty );

      // vertical layout
      const contentNode = new VBox( {
        align: 'left',
        spacing: 20,
        children: [
          vertexCheckbox,
          axisOfSymmetryCheckbox,
          rootsCheckbox,
          new VStrut( 1 ),
          hideCurvesCheckbox
        ]
      } );

      super( contentNode, options );
    }
  }

  return graphingQuadratics.register( 'IntegersGraphControls', IntegersGraphControls );
} );