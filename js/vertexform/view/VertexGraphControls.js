// Copyright 2018, University of Colorado Boulder

/**
 * Controls for various features related to the graph on the vertex screen.
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
  const VBox = require( 'SCENERY/nodes/VBox' );

  // strings
  const axisOfSymmetryString = require( 'string!GRAPHING_QUADRATICS/axisOfSymmetry' );
  const directrixString = require( 'string!GRAPHING_QUADRATICS/directrix' );

  // constants
  const CHECKBOX_LABEL_OPTIONS = { font: new PhetFont( GQConstants.CHECKBOX_LABEL_FONT_SIZE ) };

  class VertexGraphControls extends Panel {

    /**
     * @param {BooleanProperty} axisOfSymmetryVisibleProperty
     * @param {BooleanProperty} directrixVisibleProperty
     * @param options
     */
    constructor( axisOfSymmetryVisibleProperty, directrixVisibleProperty, options ) {

      options = _.extend( {

        // superclass options
        fill: GQColors.CONTROL_PANEL_BACKGROUND,
        xMargin: 20,
        yMargin: 15
      }, options );

      // checkboxes that control visibility of vertex, axis of symmetry, and roots
      const axisOfSymmetryCheckbox = Checkbox.createTextCheckbox(
        axisOfSymmetryString,
        CHECKBOX_LABEL_OPTIONS,
        axisOfSymmetryVisibleProperty
      );
      const directrixCheckbox = Checkbox.createTextCheckbox( directrixString, CHECKBOX_LABEL_OPTIONS, directrixVisibleProperty );

      // vertical layout
      const contentNode = new VBox( {
        children: [
          axisOfSymmetryCheckbox,
          directrixCheckbox
        ],
        spacing: 20,
        align: 'left'
      } );

      super( contentNode, options );
    }
  }

  return graphingQuadratics.register( 'VertexGraphControls', VertexGraphControls );
} );