// Copyright 2018, University of Colorado Boulder

/**
 * Graph for the 'Standard Form' screen.
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
  const NoRealRootsNode = require( 'GRAPHING_QUADRATICS/standardform/view/NoRealRootsNode' );
  const Property = require( 'AXON/Property' );
  const RootsNode = require( 'GRAPHING_QUADRATICS/standardform/view/RootsNode' );
  const Vector2 = require( 'DOT/Vector2' );
  const VertexNode = require( 'GRAPHING_QUADRATICS/common/view/VertexNode' );

  class StandardFormGraphNode extends GQGraphNode {

    /**
     * @param {GQModel} model
     * @param {StandardFormViewProperties} viewProperties
     * @param {Object} [options]
     */
    constructor( model, viewProperties, options ) {

      options = options || {};

      // Radius of plotted points, in view coordinate frame
      const pointRadius = model.modelViewTransform.modelToViewDeltaX( GQConstants.POINT_RADIUS );

      // Axis of symmetry
      const axisOfSymmetryNode = new AxisOfSymmetryNode( model.quadraticProperty, model.graph, model.modelViewTransform,
        viewProperties.axisOfSymmetryVisibleProperty, viewProperties.equationsVisibleProperty );

      // Roots
      const rootsNode = new RootsNode( model.quadraticProperty, model.modelViewTransform,
        viewProperties.rootsVisibleProperty, viewProperties.coordinatesVisibleProperty, {
          radius: pointRadius
        } );

      // Vertex
      const vertexNode = new VertexNode( model.quadraticProperty, model.modelViewTransform,
        viewProperties.vertexVisibleProperty, viewProperties.coordinatesVisibleProperty, {
          radius: pointRadius
        } );

      // 'NO REAL ROOTS' label
      const noRealRootsNode = new NoRealRootsNode( {
        center: model.modelViewTransform.modelToViewPosition( new Vector2( 0, 0 ) ) // at the origin
      } );
      Property.multilink( [ viewProperties.rootsVisibleProperty, model.quadraticProperty ],
        ( rootsVisible, quadratic ) => {
          noRealRootsNode.visible = !!( rootsVisible && quadratic.roots && quadratic.roots.length === 0 );
        } );

      assert && assert( !options.specialLines, 'StandardFormGraphNode sets specialLines' );
      options.specialLines = [ axisOfSymmetryNode ];

      assert && assert( !options.decorations, 'StandardFormGraphNode sets decorations' );
      options.decorations = [ rootsNode, vertexNode, noRealRootsNode ];

      super( model, viewProperties.graphContentsVisibleProperty, options );
    }
  }

  return graphingQuadratics.register( 'StandardFormGraphNode', StandardFormGraphNode );
} );