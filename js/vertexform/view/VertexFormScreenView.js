// Copyright 2018, University of Colorado Boulder

/**
 * View for the 'Vertex Form' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var GQSceneNode = require( 'GRAPHING_QUADRATICS/common/view/GQSceneNode' );
  var GQScreenView = require( 'GRAPHING_QUADRATICS/common/view/GQScreenView' );
  var graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Text = require( 'SCENERY/nodes/Text' );
  var VertexGraphControls = require( 'GRAPHING_QUADRATICS/vertexform/view/VertexGraphControls' );
  var EquationControls = require( 'GRAPHING_QUADRATICS/common/view/EquationControls' );

  /**
   * @param {VertexFormModel} model
   * @constructor
   */
  function VertexFormScreenView( model ) {
    var self = this;
    GQScreenView.call( this, model );

    this.addChild( new GQSceneNode( model.vertexScene, self.layoutBounds,
      new EquationControls( new Text( 'under construction' ), new Text( 'under construction' ) ),
      new VertexGraphControls()
    ) );
  }

  graphingQuadratics.register( 'VertexFormScreenView', VertexFormScreenView );

  return inherit( GQScreenView, VertexFormScreenView );
} );
