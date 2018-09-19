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
  //TODO const FocusManipulator = require( 'GRAPHING_QUADRATICS/common/view/FocusManipulator' );
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

      options = options || {};

      // Directrix
      const directrixNode = new DirectrixNode( model.quadraticProperty, model.graph, model.modelViewTransform,
        viewProperties.directrixVisibleProperty );

      //TODO replace with FocusManipulator
      // const focusNode = new FocusManipulator(
      //   model.modelViewTransform.modelToViewDeltaX( GQConstants.MANIPULATOR_RADIUS ),
      //   model.quadraticProperty,
      //   model.graph.xRange,
      //   model.graph.yRange,
      //   model.modelViewTransform,
      //   viewProperties.focusVisibleProperty,
      //   viewProperties.coordinatesVisibleProperty
      // );

      // Focus
      const focusNode = new FocusNode( model.quadraticProperty, model.modelViewTransform,
        viewProperties.focusVisibleProperty, viewProperties.coordinatesVisibleProperty, {
        radius: model.modelViewTransform.modelToViewDeltaX( GQConstants.POINT_RADIUS )
      } );

      // Vertex manipulator
      const vertexManipulator = new VertexManipulator(
        model.modelViewTransform.modelToViewDeltaX( GQConstants.MANIPULATOR_RADIUS ),
        model.quadraticProperty,
        model.hRange,
        model.kRange,
        model.modelViewTransform,
        viewProperties.vertexVisibleProperty,
        viewProperties.coordinatesVisibleProperty
      );

      // Point on Quadratic manipulator
      const pointOnQuadraticManipulator = new PointOnQuadraticManipulator(
        model.modelViewTransform.modelToViewDeltaX( GQConstants.MANIPULATOR_RADIUS ),
        model.quadraticProperty,
        model.pointOnQuadraticProperty,
        model.graph.xRange,
        model.graph.yRange,
        model.modelViewTransform,
        viewProperties.pointOnQuadraticVisibleProperty,
        viewProperties.coordinatesVisibleProperty
      );

      assert && assert( !options.specialLines, 'FocusAndDirectrixGraphNode sets specialLines' );
      options.specialLines = [ directrixNode ];

      assert && assert( !options.decorations, 'FocusAndDirectrixGraphNode sets decorations' );
      options.decorations = [ focusNode, vertexManipulator, pointOnQuadraticManipulator ];

      super( model, viewProperties, options );
    }
  }

  return graphingQuadratics.register( 'FocusAndDirectrixGraphNode', FocusAndDirectrixGraphNode );
} );