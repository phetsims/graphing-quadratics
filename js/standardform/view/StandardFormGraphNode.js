// Copyright 2018, University of Colorado Boulder

/**
 * Graph view for the 'Standard Form' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const AxisOfSymmetryNode = require( 'GRAPHING_QUADRATICS/common/view/AxisOfSymmetryNode' );
  const GQConstants = require( 'GRAPHING_QUADRATICS/common/GQConstants' );
  const GQGraphNode = require( 'GRAPHING_QUADRATICS/common/view/GQGraphNode' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const NoRealRootsNode = require( 'GRAPHING_QUADRATICS/common/view/NoRealRootsNode' );
  const Property = require( 'AXON/Property' );
  const RootsNode = require( 'GRAPHING_QUADRATICS/common/view/RootsNode' );
  const Vector2 = require( 'DOT/Vector2' );
  const VertexNode = require( 'GRAPHING_QUADRATICS/common/view/VertexNode' );

  class StandardFormGraphNode extends GQGraphNode {

    /**
     * @param {GQModel} model
     * @param {StandardFormViewProperties} viewProperties
     * @param {Object} [options]
     */
    constructor( model, viewProperties, options ) {
      super( model, viewProperties, options );

      // Radius of plotted points, in view coordinate frame
      const pointRadius = model.modelViewTransform.modelToViewDeltaX( GQConstants.POINT_RADIUS );

      // Axis of symmetry
      const axisOfSymmetryNode = new AxisOfSymmetryNode( model.quadraticProperty, model.graph, model.modelViewTransform );
      this.addChild( axisOfSymmetryNode );
      viewProperties.axisOfSymmetryVisibleProperty.link( visible => { axisOfSymmetryNode.visible = visible; } );

      // Roots
      const rootsNode = new RootsNode( model.quadraticProperty, model.modelViewTransform, viewProperties.coordinatesVisibleProperty, {
        radius: pointRadius
      } );
      this.addChild( rootsNode );
      viewProperties.rootsVisibleProperty.link( visible => { rootsNode.visible = visible; } );

      // Vertex
      const vertexNode = new VertexNode( model.quadraticProperty, model.modelViewTransform, viewProperties.coordinatesVisibleProperty, {
        radius: pointRadius
      } );
      this.addChild( vertexNode );
      viewProperties.vertexVisibleProperty.link( visible => { vertexNode.visible = visible; } );

      // 'NO REAL ROOTS' label
      const noRealRootsNode = new NoRealRootsNode( {
        center: model.modelViewTransform.modelToViewPosition( new Vector2( 0, 0 ) ) // at the origin
      } );
      this.addChild( noRealRootsNode );
      Property.multilink( [ viewProperties.rootsVisibleProperty, model.quadraticProperty ],
        ( rootsVisible, quadratic ) => {
          noRealRootsNode.visible = !!( rootsVisible && quadratic.roots && quadratic.roots.length === 0 );
        } );
    }
  }

  return graphingQuadratics.register( 'StandardFormGraphNode', StandardFormGraphNode );
} );