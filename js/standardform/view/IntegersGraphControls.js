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
  const HSeparator = require( 'SUN/HSeparator' );
  const Panel = require( 'SUN/Panel' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const PlottedPointNode = require( 'GRAPHING_QUADRATICS/common/view/PlottedPointNode' );
  const Text = require( 'SCENERY/nodes/Text' );
  const VBox = require( 'SCENERY/nodes/VBox' );

  // strings
  const hideCurvesString = require( 'string!GRAPHING_QUADRATICS/hideCurves' );
  const rootsString = require( 'string!GRAPHING_QUADRATICS/roots' );
  const vertexString = require( 'string!GRAPHING_QUADRATICS/vertex' );

  // constants
  const CHECKBOX_LABEL_OPTIONS = { font: new PhetFont( GQConstants.CHECKBOX_LABEL_FONT_SIZE ) };
  const POINT_RADIUS = 6;

  class IntegersGraphControls extends Panel {

    /**
     * @param {BooleanProperty} axisOfSymmetryVisibleProperty
     * @param {BooleanProperty} vertexVisibleProperty
     * @param {BooleanProperty} rootsVisibleProperty
     * @param {BooleanProperty} hideCurvesProperty
     * @param {Object} [options]
     */
    constructor( axisOfSymmetryVisibleProperty, vertexVisibleProperty,
                 rootsVisibleProperty, hideCurvesProperty, options ) {

      options = _.extend( {}, GQConstants.PANEL_OPTIONS, options );

      // Axis of Symmetry
      const axisOfSymmetryCheckbox = new AxisOfSymmetryCheckbox( axisOfSymmetryVisibleProperty );

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

      const separatorWidth = _.maxBy(
        [ vertexCheckbox, axisOfSymmetryCheckbox, rootsCheckbox, hideCurvesCheckbox ],
        function( node ) {return node.width; } ).width;

      // vertical layout
      const contentNode = new VBox( {
        align: 'left',
        spacing: 20,
        children: [
          axisOfSymmetryCheckbox,
          vertexCheckbox,
          rootsCheckbox,
          new HSeparator( separatorWidth, { stroke: GQColors.SEPARATOR } ),
          hideCurvesCheckbox
        ]
      } );

      super( contentNode, options );
    }
  }

  return graphingQuadratics.register( 'IntegersGraphControls', IntegersGraphControls );
} );