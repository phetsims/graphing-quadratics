// Copyright 2018, University of Colorado Boulder

/**
 * Controls for various features related to the graph on the 'Integers' scene of the 'Standard Form' screen.
 *
 * @author Andrea Lin
 */
define( function( require ) {
  'use strict';

  // modules
  const Checkbox = require( 'SUN/Checkbox' );
  const GQColors = require( 'GRAPHING_QUADRATICS/common/GQColors' );
  const GQConstants = require( 'GRAPHING_QUADRATICS/common/GQConstants' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const Panel = require( 'SUN/Panel' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const Text = require( 'SCENERY/nodes/Text' );
  const VBox = require( 'SCENERY/nodes/VBox' );
  const VStrut = require( 'SCENERY/nodes/VStrut' );

  // strings
  const axisOfSymmetryString = require( 'string!GRAPHING_QUADRATICS/axisOfSymmetry' );
  const hideCurvesString = require( 'string!GRAPHING_QUADRATICS/hideCurves' );
  const rootsString = require( 'string!GRAPHING_QUADRATICS/roots' );
  const vertexString = require( 'string!GRAPHING_QUADRATICS/vertex' );

  // constants
  const CHECKBOX_LABEL_OPTIONS = { font: new PhetFont( GQConstants.CHECKBOX_LABEL_FONT_SIZE ) };

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
      const vertexLabel = new Text( vertexString, CHECKBOX_LABEL_OPTIONS );
      const vertexCheckbox = new Checkbox( vertexLabel, vertexVisibleProperty );

      // Axis of Symmetry
      const axisOfSymmetryLabel = new Text( axisOfSymmetryString, CHECKBOX_LABEL_OPTIONS );
      const axisOfSymmetryCheckbox = new Checkbox( axisOfSymmetryLabel, axisOfSymmetryVisibleProperty );

      // Roots
      const rootsLabel = new Text( rootsString, CHECKBOX_LABEL_OPTIONS );
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