// Copyright 2018, University of Colorado Boulder

/**
 * Controls for various features related to the graph on the vertex screen. Copied from graphing-lines.
 *
 * @author Andrea Lin
 */
define( function( require ) {
  'use strict';

  // modules
  const Checkbox = require( 'SUN/Checkbox' );
  const GQColors = require( 'GRAPHING_QUADRATICS/common/GQColors' );
  const GQFont = require( 'GRAPHING_QUADRATICS/common/GQFont' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const Panel = require( 'SUN/Panel' );
  const VBox = require( 'SCENERY/nodes/VBox' );

  // strings
  const axisOfSymmetryString = require( 'string!GRAPHING_QUADRATICS/axisOfSymmetry' );
  const directrixString = require( 'string!GRAPHING_QUADRATICS/directrix' );

  // constants
  const TEXT_OPTIONS = { font: new GQFont( 18 ) };

  class VertexGraphControls extends Panel {

    /**
     * @param {BooleanProperty} axisOfSymmetryVisibleProperty
     * @param {BooleanProperty} directrixVisibleProperty
     * @param options
     */
    constructor( axisOfSymmetryVisibleProperty, directrixVisibleProperty, options ) {

      options = _.extend( {
        fill: GQColors.CONTROL_PANEL_BACKGROUND,
        xMargin: 20,
        yMargin: 15
      }, options );

      // checkboxes that control visibility of vertex, axis of symmetry, and roots
      const axisOfSymmetryCheckbox = Checkbox.createTextCheckbox(
        axisOfSymmetryString,
        TEXT_OPTIONS,
        axisOfSymmetryVisibleProperty
      );
      const directrixCheckbox = Checkbox.createTextCheckbox( directrixString, TEXT_OPTIONS, directrixVisibleProperty );

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