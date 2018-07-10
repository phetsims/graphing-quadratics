// Copyright 2018, University of Colorado Boulder

/**
 * Controls for various features related to the graph. Copied from graphing-lines.
 *
 * @author Chris Malley (PixelZoom, Inc.)
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
   * @constructor
   */
  function GraphControls( options ) {

    options = _.extend( {
      fill: GQColors.CONTROL_PANEL_BACKGROUND,
      xMargin: 20,
      yMargin: 15
    }, options );

    var vertexCheckbox = Checkbox.createTextCheckbox( vertexString, TEXT_OPTIONS, new BooleanProperty( false ) );
    var axisOfSymmetryCheckbox = Checkbox.createTextCheckbox( axisOfSymmetryString, TEXT_OPTIONS, new BooleanProperty( false ) );
    var rootsCheckbox = Checkbox.createTextCheckbox( rootsString, TEXT_OPTIONS, new BooleanProperty( false ) );

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

  graphingQuadratics.register( 'GraphControls', GraphControls );

  return inherit( Panel, GraphControls );
} );