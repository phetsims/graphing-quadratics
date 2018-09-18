// Copyright 2018, University of Colorado Boulder

/**
 * Graph view for the 'Focus & Directrix' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const DirectrixNode = require( 'GRAPHING_QUADRATICS/common/view/DirectrixNode' );
  const FocusNode = require( 'GRAPHING_QUADRATICS/common/view/FocusNode' );
  const GQConstants = require( 'GRAPHING_QUADRATICS/common/GQConstants' );
  const GQGraphNode = require( 'GRAPHING_QUADRATICS/common/view/GQGraphNode' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const PointOnQuadraticManipulator = require( 'GRAPHING_QUADRATICS/common/view/PointOnQuadraticManipulator' );
  const VertexManipulator = require( 'GRAPHING_QUADRATICS/common/view/VertexManipulator' );

  class FocusAndDirectrixGraphNode extends GQGraphNode {

    /**
     * @param {GQModel} model
     * @param {GQViewProperties} viewProperties
     * @param {Object} [options]
     */
    constructor( model, viewProperties, options ) {

      super( model, viewProperties, options );

      // Directrix
      const directrixNode = new DirectrixNode( model.quadraticProperty, model.graph, model.modelViewTransform );
      this.addChild( directrixNode );
      viewProperties.directrixVisibleProperty.link( visible => { directrixNode.visible = visible; } );

      //TODO replace with FocusManipulator
      // Focus
      const focusNode = new FocusNode( model.quadraticProperty, model.modelViewTransform, viewProperties.coordinatesVisibleProperty, {
        radius: model.modelViewTransform.modelToViewDeltaX( GQConstants.POINT_RADIUS )
      } );
      this.addChild( focusNode );
      viewProperties.focusVisibleProperty.link( visible => { focusNode.visible = visible; } );

      // Vertex manipulator
      const vertexManipulator = new VertexManipulator(
        model.modelViewTransform.modelToViewDeltaX( GQConstants.MANIPULATOR_RADIUS ),
        model.quadraticProperty,
        model.hRange,
        model.kRange,
        model.modelViewTransform,
        viewProperties.coordinatesVisibleProperty
      );
      this.addChild( vertexManipulator );
      viewProperties.vertexVisibleProperty.link( visible => { vertexManipulator.visible = visible; } );

      // Point on Quadratic manipulator
      const pointOnQuadraticManipulator = new PointOnQuadraticManipulator(
        model.modelViewTransform.modelToViewDeltaX( GQConstants.MANIPULATOR_RADIUS ),
        model.quadraticProperty,
        model.pointOnQuadraticProperty,
        model.graph.xRange,
        model.graph.yRange,
        model.modelViewTransform,
        viewProperties.coordinatesVisibleProperty
      );
      this.addChild( pointOnQuadraticManipulator );
      viewProperties.pointOnQuadraticVisibleProperty.link( visible => { pointOnQuadraticManipulator.visible = visible; } );
    }
  }

  return graphingQuadratics.register( 'FocusAndDirectrixGraphNode', FocusAndDirectrixGraphNode );
} );