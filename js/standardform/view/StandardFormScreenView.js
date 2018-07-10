// Copyright 2014-2017, University of Colorado Boulder

/**
 * View for the 'Standard Form' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 * @author Andrea Lin
 */
define( function( require ) {
  'use strict';

  // modules
  var EquationControls = require( 'GRAPHING_QUADRATICS/common/view/EquationControls' );
  var GQConstants = require( 'GRAPHING_QUADRATICS/common/GQConstants' );
  var graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  var GraphNode = require( 'GRAPHING_LINES/common/view/GraphNode' );
  var inherit = require( 'PHET_CORE/inherit' );
  var ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  var ScreenView = require( 'JOIST/ScreenView' );

  /**
   * @param {StandardFormModel} model
   * @param {ModelViewTransform2} modelViewTransform
   * @constructor
   */
  function StandardFormScreenView( model, modelViewTransform ) {

    ScreenView.call( this, GQConstants.SCREEN_VIEW_OPTIONS );

    // Reset All Button
    var resetAllButton = new ResetAllButton( {
      listener: function() {
        model.reset();
      }
    } );
    resetAllButton.right = this.layoutBounds.right - 30;
    resetAllButton.bottom = this.layoutBounds.bottom - 30;
    this.addChild( resetAllButton );

    // Graph Node - the cartesian coordinates graph
    var graphNode = new GraphNode( model.graph, modelViewTransform );
    this.addChild( graphNode );

    // Equation Controls Panel
    var equationControls = new EquationControls();
    this.addChild( equationControls );
  }

  graphingQuadratics.register( 'StandardFormScreenView', StandardFormScreenView );

  return inherit( ScreenView, StandardFormScreenView );
} );
