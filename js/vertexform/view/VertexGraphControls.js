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
  var Text = require( 'SCENERY/nodes/Text' );
  var VBox = require( 'SCENERY/nodes/VBox' );

  /**
   * @constructor
   */
  function VertexGraphControls( options ) {

    options = _.extend( {
      fill: GQColors.CONTROL_PANEL_BACKGROUND,
      xMargin: 20,
      yMargin: 15
    }, options );

    // vertical layout
    var contentNode = new VBox( {
      children: [
        new Text( 'under construction' )
      ],
      spacing: 20,
      align: 'left'
    } );

    Panel.call( this, contentNode, options );
  }

  graphingQuadratics.register( 'VertexGraphControls', VertexGraphControls );

  return inherit( Panel, VertexGraphControls );
} );