// Copyright 2018, University of Colorado Boulder

/**
 * Controls for various features related to the graph on the vertex screen. Copied from graphing-lines.
 *
 * @author Andrea Lin
 */
define( function( require ) {
  'use strict';

  // modules
  var GQColors = require( 'GRAPHING_QUADRATICS/common/GQColors' );
  var graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Panel = require( 'SUN/Panel' );
  var VBox = require( 'SCENERY/nodes/VBox' );
  var GQFont = require( 'GRAPHING_QUADRATICS/common/GQFont' );
  var Checkbox = require( 'SUN/Checkbox' );

  // strings
  var axisOfSymmetryString = require( 'string!GRAPHING_QUADRATICS/axisOfSymmetry' );
  var directrixString = require( 'string!GRAPHING_QUADRATICS/directrix' );

  // constants
  var TEXT_OPTIONS = { font: new GQFont( 18 ) };

  /**
   * @param {BooleanProperty} axisOfSymmetryVisibleProperty
   * @param {BooleanProperty} directrixVisibleProperty
   * @param options
   * @constructor
   */
  function VertexGraphControls( axisOfSymmetryVisibleProperty, directrixVisibleProperty, options ) {

    options = _.extend( {
      fill: GQColors.CONTROL_PANEL_BACKGROUND,
      xMargin: 20,
      yMargin: 15
    }, options );

    // checkboxes that control visibility of vertex, axis of symmetry, and roots
    var axisOfSymmetryCheckbox = Checkbox.createTextCheckbox(
      axisOfSymmetryString,
      TEXT_OPTIONS,
      axisOfSymmetryVisibleProperty
    );
    var directrixCheckbox = Checkbox.createTextCheckbox( directrixString, TEXT_OPTIONS, directrixVisibleProperty );

    // vertical layout
    var contentNode = new VBox( {
      children: [
        axisOfSymmetryCheckbox,
        directrixCheckbox
      ],
      spacing: 20,
      align: 'left'
    } );

    Panel.call( this, contentNode, options );
  }

  graphingQuadratics.register( 'VertexGraphControls', VertexGraphControls );

  return inherit( Panel, VertexGraphControls );
} );