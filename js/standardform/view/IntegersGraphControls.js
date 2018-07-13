// Copyright 2018, University of Colorado Boulder

/**
 * Integers scene controls for various features related to the graph.
 *
 * @author Andrea Lin
 */
define( function( require ) {
  'use strict';

  // modules
  var BooleanProperty = require( 'AXON/BooleanProperty' );
  var Checkbox = require( 'SUN/Checkbox' );
  var GQColors = require( 'GRAPHING_QUADRATICS/common/GQColors' );
  var GQFont = require( 'GRAPHING_QUADRATICS/common/GQFont' );
  var graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Panel = require( 'SUN/Panel' );
  var VBox = require( 'SCENERY/nodes/VBox' );

  // strings
  var axisOfSymmetryString = require( 'string!GRAPHING_QUADRATICS/axisOfSymmetry' );
  var rootsString = require( 'string!GRAPHING_QUADRATICS/roots' );
  var vertexString = require( 'string!GRAPHING_QUADRATICS/vertex' );

  // constants
  var TEXT_OPTIONS = { font: new GQFont( 18 ) };

  /**
   * @param {Object} [options]
   * @constructor
   */
  function IntegersGraphControls( options ) {

    options = _.extend( {
      fill: GQColors.CONTROL_PANEL_BACKGROUND,
      xMargin: 20,
      yMargin: 15
    }, options );

    // TODO: temporary. will be passed in as parameters.
    var vertexVisibleProperty = new BooleanProperty( false );
    var axisOfSymmetryVisibleProperty = new BooleanProperty( false );
    var rootsVisibleProperty = new BooleanProperty( false );

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