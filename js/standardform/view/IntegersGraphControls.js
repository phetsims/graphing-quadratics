// Copyright 2018, University of Colorado Boulder

/**
 * Integers scene controls for various features related to the graph.
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
  const rootsString = require( 'string!GRAPHING_QUADRATICS/roots' );
  const vertexString = require( 'string!GRAPHING_QUADRATICS/vertex' );

  // constants
  const TEXT_OPTIONS = { font: new GQFont( 18 ) };

  class IntegersGraphControls extends Panel {

    /**
     * @param {BooleanProperty} vertexVisibleProperty
     * @param {BooleanProperty} axisOfSymmetryVisibleProperty
     * @param {BooleanProperty} rootsVisibleProperty
     * @param {Object} [options]
     */
    constructor(
      vertexVisibleProperty,
      axisOfSymmetryVisibleProperty,
      rootsVisibleProperty,
      options
    ) {

      options = _.extend( {
        fill: GQColors.CONTROL_PANEL_BACKGROUND,
        xMargin: 20,
        yMargin: 15
      }, options );

      // checkboxes that control visibility of vertex, axis of symmetry, and roots
      const vertexCheckbox = Checkbox.createTextCheckbox( vertexString, TEXT_OPTIONS, vertexVisibleProperty );
      const axisOfSymmetryCheckbox = Checkbox.createTextCheckbox(
        axisOfSymmetryString,
        TEXT_OPTIONS,
        axisOfSymmetryVisibleProperty
      );
      const rootsCheckbox = Checkbox.createTextCheckbox( rootsString, TEXT_OPTIONS, rootsVisibleProperty );

      // vertical layout
      const contentNode = new VBox( {
        children: [
          vertexCheckbox,
          axisOfSymmetryCheckbox,
          rootsCheckbox
        ],
        spacing: 20,
        align: 'left'
      } );

      super( contentNode, options );
    }
  }

  return graphingQuadratics.register( 'IntegersGraphControls', IntegersGraphControls );
} );