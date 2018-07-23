// Copyright 2018, University of Colorado Boulder

/**
 * View for the 'Vertex Form' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  const GQSceneNode = require( 'GRAPHING_QUADRATICS/common/view/GQSceneNode' );
  const GQScreenView = require( 'GRAPHING_QUADRATICS/common/view/GQScreenView' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const inherit = require( 'PHET_CORE/inherit' );
  const LineFormsViewProperties = require( 'GRAPHING_LINES/common/view/LineFormsViewProperties' );
  const NumberProperty = require( 'AXON/NumberProperty' );
  const VertexFormEquationNode = require( 'GRAPHING_QUADRATICS/vertexform/view/VertexFormEquationNode' );
  const VertexGraphControls = require( 'GRAPHING_QUADRATICS/vertexform/view/VertexGraphControls' );
  const VertexInteractiveEquationNode = require( 'GRAPHING_QUADRATICS/vertexform/view/VertexInteractiveEquationNode' );

  /**
   * @param {VertexFormModel} model
   * @constructor
   */
  function VertexFormScreenView( model ) {
    const self = this;

    const vertexViewProperties = new LineFormsViewProperties();

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
      new VertexGraphControls(
        vertexViewProperties.axisOfSymmetryVisibleProperty,
        vertexViewProperties.directrixVisibleProperty
      ),
      vertexViewProperties
    ) );
  }

  graphingQuadratics.register( 'VertexFormScreenView', VertexFormScreenView );

  return inherit( GQScreenView, VertexFormScreenView );
} );
