// Copyright 2018, University of Colorado Boulder

/**
 * View for the 'Vertex Form' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  const NumberProperty = require( 'AXON/NumberProperty' );
  var GQSceneNode = require( 'GRAPHING_QUADRATICS/common/view/GQSceneNode' );
  var GQScreenView = require( 'GRAPHING_QUADRATICS/common/view/GQScreenView' );
  var graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  var inherit = require( 'PHET_CORE/inherit' );
  var LineFormsViewProperties = require( 'GRAPHING_LINES/common/view/LineFormsViewProperties' );
  var VertexFormEquationNode = require( 'GRAPHING_QUADRATICS/vertexform/view/VertexFormEquationNode' );
  var VertexGraphControls = require( 'GRAPHING_QUADRATICS/vertexform/view/VertexGraphControls' );
  var VertexInteractiveEquationNode = require( 'GRAPHING_QUADRATICS/vertexform/view/VertexInteractiveEquationNode' );

  /**
   * @param {VertexFormModel} model
   * @constructor
   */
  function VertexFormScreenView( model ) {
    var self = this;

    var vertexViewProperties = new LineFormsViewProperties();

    GQScreenView.call( this, model, [ vertexViewProperties ] );

    this.addChild( new GQSceneNode(
      model.vertexScene,
      self.layoutBounds,
      new VertexFormEquationNode(),
      new VertexInteractiveEquationNode(
        new NumberProperty( 1, { range: { min: -6, max: 6 } } ),
        new NumberProperty( 0, { range: { min: -6, max: 6 } } ),
        new NumberProperty( 0, { range: { min: -6, max: 6 } } )
      ),
      new VertexGraphControls(),
      vertexViewProperties
    ) );
  }

  graphingQuadratics.register( 'VertexFormScreenView', VertexFormScreenView );

  return inherit( GQScreenView, VertexFormScreenView );
} );
