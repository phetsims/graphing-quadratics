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
  const inherit = require( 'PHET_CORE/inherit' );
  const Panel = require( 'SUN/Panel' );
  const VBox = require( 'SCENERY/nodes/VBox' );

  // strings
  const axisOfSymmetryString = require( 'string!GRAPHING_QUADRATICS/axisOfSymmetry' );
  const rootsString = require( 'string!GRAPHING_QUADRATICS/roots' );
  const vertexString = require( 'string!GRAPHING_QUADRATICS/vertex' );

  // constants
  const TEXT_OPTIONS = { font: new GQFont( 18 ) };

  /**
   * @param {BooleanProperty} vertexVisibleProperty
   * @param {BooleanProperty} axisOfSymmetryVisibleProperty
   * @param {BooleanProperty} rootsVisibleProperty
   * @param {Object} [options]
   * @constructor
   */
  function IntegersGraphControls(
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
    var vertexCheckbox = Checkbox.createTextCheckbox( vertexString, TEXT_OPTIONS, vertexVisibleProperty );
    var axisOfSymmetryCheckbox = Checkbox.createTextCheckbox(
      axisOfSymmetryString,
      TEXT_OPTIONS,
      axisOfSymmetryVisibleProperty
    );
    var rootsCheckbox = Checkbox.createTextCheckbox( rootsString, TEXT_OPTIONS, rootsVisibleProperty );

    // vertical layout
    var contentNode = new VBox( {
      children: [
        vertexCheckbox,
        axisOfSymmetryCheckbox,
        rootsCheckbox
      ],
      spacing: 20,
      align: 'left'
    } );

    Panel.call( this, contentNode, options );
  }

  graphingQuadratics.register( 'IntegersGraphControls', IntegersGraphControls );

  return inherit( Panel, IntegersGraphControls );
} );